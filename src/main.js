import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";
import {
  createScene,
  createCamera,
  createRenderer,
  addLights,
} from "./scenes/tableScene.js";
import { createTable } from "./objects/table.js";
import { createCard } from "./objects/card.js";
import { enableCardControls } from "./controls/cardControls.js";
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.10.4/index.js";

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
addLights(scene);

const table = createTable();
scene.add(table);

const cardNames = [
  "club_2",
  "club_3",
  "club_4",
  "club_5",
  "club_6",
  "club_7",
  "club_8",
  "club_9",
  "club_10",
  "club_jack",
  "club_queen",
  "club_king",
  "heart_2",
  "heart_3",
  "heart_4",
  "heart_5",
  "heart_6",
  "heart_7",
  "heart_8",
  "heart_9",
  "heart_10",
  "heart_jack",
  "heart_queen",
  "heart_king",
  "spade_2",
  "spade_3",
  "spade_4",
  "spade_5",
  "spade_6",
  "spade_7",
  "spade_8",
  "spade_9",
  "spade_10",
  "spade_jack",
  "spade_queen",
  "spade_king",
  "diamond_2",
  "diamond_3",
  "diamond_4",
  "diamond_5",
  "diamond_6",
  "diamond_7",
  "diamond_8",
  "diamond_9",
  "diamond_10",
  "diamond_jack",
  "diamond_queen",
  "diamond_king",
];

const loader = new THREE.TextureLoader();
const backTexture = loader.load("./assets/images/cards/back.png");

const shuffled = cardNames.sort(() => 0.5 - Math.random());
const selected = shuffled.slice(0, 5);

const cardsArray = [];

selected.forEach((name, index) => {
  const frontTex = loader.load(`./assets/images/cards/${name}.png`);
  const card = createCard(frontTex, backTexture);

  const spacing = 2.5;
  const angle = (index - 2) * 0.1;
  card.position.set((index - 2) * spacing, 0.01, 0);
  card.rotation.z = angle;

  card.rotation.y = Math.PI;
  card.userData.flipped = true;

  scene.add(card);
  cardsArray.push(card);
});

enableCardControls(cardsArray, camera, renderer, table);

const flipBtn = document.createElement("button");
flipBtn.innerText = "Flip All Cards";
flipBtn.style.position = "absolute";
flipBtn.style.top = "20px";
flipBtn.style.left = "50%";
flipBtn.style.boxShadow = "rgba(0, 0, 0, 0.1) 0px 4px 12px";
flipBtn.style.transform = "translateX(-50%)";
flipBtn.style.padding = "10px 20px";
flipBtn.style.fontSize = "14px";
flipBtn.style.background = "#efefef";
flipBtn.style.border = "none";
flipBtn.style.borderRadius = "3px";
flipBtn.style.cursor = "pointer";
document.body.appendChild(flipBtn);

flipBtn.addEventListener("click", () => {
  cardsArray.forEach((card) => {
    gsap.to(card.rotation, {
      y: card.userData.flipped ? 0 : Math.PI,
      duration: 0.8,
      ease: "power2.inOut",
    });
    card.userData.flipped = !card.userData.flipped;
  });
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
