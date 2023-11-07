import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

let camera, controls, scene, renderer, effect;
let cube, plane;
const start = Date.now();

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.y = 150;
  camera.position.z = 500;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);

  const lights = [
    { color: 0xffffff, intensity: 1.5, position: [0, 500, 500] },
    { color: 0xffffff, intensity: 0.5, position: [0, -500, -500] },
  ];

  lights.forEach((light) => {
    const pointLight = new THREE.PointLight(light.color, light.intensity);
    pointLight.position.set(...light.position);
    scene.add(pointLight);
  });

  // Cube
  cube = new THREE.Mesh(
    new THREE.BoxGeometry(200, 200, 200),
    new THREE.MeshNormalMaterial()
  );
  scene.add(cube);

  // Plane
  plane = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
  );
  plane.position.y = -200;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // ASCII Effect - Adjust scale for a larger render preview
  effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true, scale: 1 });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = 'white';
  effect.domElement.style.backgroundColor = 'black';

  // Append ASCII effect to body
  document.body.appendChild(effect.domElement);

  // Controls
  controls = new TrackballControls(camera, effect.domElement);

  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const timer = (Date.now() - start) * 0.0005;

  cube.rotation.x = timer;
  cube.rotation.y = timer;

  controls.update();
  effect.render(scene, camera);
}
