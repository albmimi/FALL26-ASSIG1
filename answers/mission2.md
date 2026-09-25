# Mission 2: Console attack, sabotage the purge button

## Evidence

The button dodges (two positions), with my attacker counter visible:

![position 1](<img/img1 m2.png>)
![position 2](<img/img2 m2.png>) 


A legitimate click does nothing after my attack (log still reads "No purge requested"):

![click does nothing](<img/img3 m2.png>) 

## My attack script

Paste the full contents of `attacks/m2_runaway.js`, with one sentence per block:

```js
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

```

- **How do you remove the portal's original click handler without reloading?**

  > I cloned the original button and replaced it with the cloned button. The new button looks the same, but the og click event listenr is not copied over, so the og click handler no longer works. 

- **How do you stop a keyboard user from triggering the button?**

  > I set the buttons tabIndex to -1. this removes the button from the normal Tan order so a keyboard user cant reach it by pressing Tab. 

- **How do you keep the button fully inside `#danger-zone` and off its previous position?**

  > I calculated the avaialbe space by subtracting the buttons width and hight from the danger zones width and hight. I used a do...while loop to choose a random position and make sure it was not the same as the buttons previous position. 

## Creativity: my twist, R5

> I chnaged the button text to "Mayan is coming for you" when the user approaches it. I thought it was funny to say that even tho its running away from the user. 

## Think like a defender

The mouse trick is theater. The real problem is that attacker code ran in the operator's page at all. If "Purge All Incidents" were a real, destructive action:

1. Where must the actual protection live?

   > your answer

2. What should the server check on every purge request? Name at least two things.

   > your answer

3. Which Unit 1.3 slide or takeaway does this map to?

   > your answer

## Documentation log

| Page I used, with URL | One thing I learned from it |
|---|---|
| | |
