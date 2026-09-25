// =====================================================================
// MISSION 2 ATTACK: The Runaway Button
// =====================================================================
// Write your attack here, then COPY the whole file and PASTE it into the
// DevTools Console of http://localhost:3000.
//
// Everything is wrapped in (() => { ... })(); on purpose. It is an
// immediately invoked function: it lets you paste the script again after
// a page reload without "Identifier has already been declared" errors.
//
// Author:
// =====================================================================

(() => {
  const zone = document.getElementById("danger-zone");
  const original = document.getElementById("purge-btn");


  // TODO R1: remove the portal's legitimate click listener.
  const button = original.cloneNode(true);
  original.replaceWith(button);
  // TODO R2: stop keyboard users from reaching the button.
  button.tabIndex = -1;
  // TODO R3: make the button jump inside zone on every approach, no overlap.
  button.addEventListener("mouseenter", () => {
    const maxX = zone.clientWidth - button.offsetWidth;
    const maxY = zone.clientHeight - button.offsetHeight;
    
    let x;
    let y;

    do {
      x = Math.floor(Math.random() * maxX);
      y = Math.floor(Math.random() * maxY);
    } while (
      x === button.offsetLeft && 
      y === button.offsetTop
    ); 

    button.style.position = "absolute";
    button.style.left = x + "px";
    button.style.top = y + "px";

  });
  // TODO R4: create a NEW element that shows the dodge counter.
  let dodges = 0;
  const counter = document.createElement("p");
  counter.textContent = "Dodges: 0";
  zone.appendChild(counter);
  button.addEventListener("mouseenter", () => {
    dodges++;
    counter.textContent = "Dodges: " + dodges;
  });

  // TODO R5: your creative twist.
  button.addEventListener("mouseenter", () => {
    button.textContent = "Mayan is coming for you!";
  });  


  console.log("[attack] runaway button installed");
})();
