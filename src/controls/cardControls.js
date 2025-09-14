import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.10.4/index.js";

export function enableCardControls(cardsArray, camera, renderer, table) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let draggingCard = null;
  let isDragging = false;
  let dragStart = new THREE.Vector2();

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    //removed mouse dragging for now, have to improve
    // if (draggingCard) {
    //   const dx = event.clientX - dragStart.x;
    //   const dy = event.clientY - dragStart.y;
    //   if (Math.sqrt(dx * dx + dy * dy) > 2) isDragging = true;

    //   const planeIntersect = raycaster.intersectObject(table);
    //   if (planeIntersect.length > 0) {
    //     const { x, z } = planeIntersect[0].point;
    //     draggingCard.position.x = x;
    //     draggingCard.position.z = z;
    //   }
    // }

    let hovered = false;
    cardsArray.forEach((card) => {
      const intersects = raycaster.intersectObject(card, true);
      if (intersects.length > 0 && !draggingCard) {
        hovered = true;
        gsap.to(card.position, { y: 0.3, duration: 0.2 });
        document.body.style.cursor = "grab";
      } else if (!draggingCard) {
        gsap.to(card.position, { y: 0.01, duration: 0.2 });
      }
    });

    if (!hovered && !draggingCard) document.body.style.cursor = "default";
  }

  function onMouseDown(event) {
    dragStart.set(event.clientX, event.clientY);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cardsArray, true);
    if (intersects.length > 0) {
      let card = intersects[0].object;
      while (!cardsArray.includes(card) && card.parent) card = card.parent;
      draggingCard = card;
      document.body.style.cursor = "grabbing";
    }
  }

  function onMouseUp() {
    draggingCard = null;
    document.body.style.cursor = "default";
    isDragging = false;
  }

  function onClick(event) {
    if (isDragging) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cardsArray, true);
    if (intersects.length > 0) {
      let card = intersects[0].object;
      while (!cardsArray.includes(card) && card.parent) card = card.parent;

      if (!card.userData.flipped) card.userData.flipped = false;
      gsap.to(card.rotation, {
        y: card.userData.flipped ? 0 : Math.PI,
        duration: 0.8,
        ease: "power2.inOut",
      });
      card.userData.flipped = !card.userData.flipped;
    }
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("click", onClick);
}
