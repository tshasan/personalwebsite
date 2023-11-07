import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

let camera, controls, scene, renderer, effect;
let mesh; // This will replace 'cube' and 'plane' to be more generic
const start = Date.now();

// Define geometries available
const geometries = {
  cube: new THREE.BoxGeometry(200, 200, 200),
  torus: new THREE.TorusGeometry(100, 30, 16, 100),
  prism: new THREE.CylinderGeometry(100, 100, 200, 6), // A simple prism can be represented by a cylinder with 6 sides
  torusknot: new THREE.TorusKnotGeometry( 10, 3, 100, 16 )


};

// Start with the cube geometry
let currentGeometry = geometries.cube;

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

  // Mesh with current geometry
  mesh = new THREE.Mesh(currentGeometry, new THREE.MeshNormalMaterial());
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // ASCII Effect
  effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = 'white';
  effect.domElement.style.backgroundColor = 'black';

  // Append ASCII effect to body
  document.body.appendChild(effect.domElement);

  // Controls
  controls = new TrackballControls(camera, effect.domElement);

  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);

  // Listen for keydown events to change the geometry
  document.addEventListener('keydown', onDocumentKeyDown, false);
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

  //mesh.rotation.x = timer;
  //mesh.rotation.y = timer;

  controls.update();
  effect.render(scene, camera);
}

function onDocumentKeyDown(event) {
  var keyCode = event.which;
  // Use keys 1, 2, 3... to switch between geometries
  if (keyCode == 49) { // Key '1'
    changeGeometry('cube');
  } else if (keyCode == 50) { // Key '2'
    changeGeometry('torus');
  } else if (keyCode == 51) { // Key '3'
    changeGeometry('prism');
   } else if (keyCode == 52) { // Key '4'
    changeGeometry('torusknot');
  }
}

function changeGeometry(geometryKey) {
  if (geometries[geometryKey]) {
    // Remove the old mesh from the scene
    scene.remove(mesh);
    // Create a new mesh with the new geometry
    mesh = new THREE.Mesh(geometries[geometryKey], new THREE.MeshNormalMaterial());
    // Add the new mesh to the scene
    scene.add(mesh);
  }
}
