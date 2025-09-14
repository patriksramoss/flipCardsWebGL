import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);
  return scene;
}

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 10, 0);
  camera.lookAt(0, 0, 0);
  return camera;
}

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
  return renderer;
}

export function addLights(scene) {
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;

  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  scene.add(dirLight);
}
