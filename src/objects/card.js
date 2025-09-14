import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

/**
 * @param {THREE.Texture} frontTex
 * @param {THREE.Texture} backTex
 * @returns {THREE.Group}
 */
export function createCard(frontTex, backTex) {
  const geometry = new THREE.PlaneGeometry(2.5, 3.5);

  const front = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ map: frontTex })
  );

  const back = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ map: backTex })
  );
  back.rotation.y = Math.PI;

  const card = new THREE.Group();
  card.add(front);
  card.add(back);

  card.rotation.x = -Math.PI / 2;
  card.position.y = 0.01;

  card.castShadow = true;
  card.userData.flipped = false;

  return card;
}
