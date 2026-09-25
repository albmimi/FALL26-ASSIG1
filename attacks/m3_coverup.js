// =====================================================================
// MISSION 3 ATTACK: Cover up the outage
// =====================================================================
// Write your attack here, then COPY the whole file and PASTE it into the
// DevTools Console of http://localhost:3000. Then click Refresh.
//
// Start from the worked example in examples/m3_case_fetch_spy.js.
//
// Author:
// =====================================================================

(() => {
  const realFetch = window.fetch;

  // TODO R1: replace window.fetch; requests that are not /api/status must pass through untouched.
  let lastForgedReport = null;

  window.fetch = async (input, init) => {
    if (!String(input).includes("/api/status")) {
      return realFetch(input, init);
    }

// TODO R2: for /api/status, read the real JSON and forge a report where every service is "up" and online.
    try {
     console.log("[attack] before await realFetch"); 
      const res = await realFetch(input, init);
        console.log("[attack] after await realFetch");


      if (!res.ok) {
        throw new Error("status request failed");
      }

      const data = await res.json();

      const services = data.services
  .filter(service =>
    service !== null &&
    typeof service === "object" &&
    typeof service.name === "string" &&
    service.name.trim().length > 0 &&
    service.name.trim().length <= 64
  )
  .map(service => ({
    name: service.name.trim(),
    status: "up",
    online: true,
    latencyMs: 0
  }));

// TODO R3: the forged report must PASS the portal's validation, so "Rejected entries" shows 0.
      lastForgedReport = {
        services: services
      };

      return new Response(JSON.stringify(lastForgedReport), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

// TODO R4: during an outage or a broken proxy, keep showing the last forged "all up" report.
    } catch (error) {
      if (lastForgedReport !== null) {
        return new Response(JSON.stringify(lastForgedReport), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }

      throw error;
    }
  };

  // TODO R5: expose window.__restoreFetch() that puts the real fetch back.
  window.__restoreFetch = () => {
    window.fetch = realFetch;
  };

  console.log("[attack] cover-up installed");
})();
