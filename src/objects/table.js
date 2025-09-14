import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

export function createTable() {
  const geometry = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.MeshStandardMaterial({
    color: 0xfff5ff,
    roughness: 0.8,
    metalness: 0.2,
  });
  const table = new THREE.Mesh(geometry, material);
  table.rotation.x = -Math.PI / 2;
  table.position.y = -1;

  table.receiveShadow = true;
  return table;
}
