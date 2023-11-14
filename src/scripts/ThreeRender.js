import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

// Define variables
let asciiEffectEnabled = true; // Initial state of the ASCII effect
let camera, controls, scene, renderer, effect;
let mesh;

// Define geometries
const geometries = {
    cube: new THREE.BoxGeometry(200, 200, 200),
    torus: new THREE.TorusGeometry(100, 30, 16, 100),
    prism: new THREE.CylinderGeometry(100, 100, 200, 3),
    torusknot: new THREE.TorusKnotGeometry(10, 3, 100, 16)
};

// Set current geometry
let currentGeometry = geometries.cube;

// Initialize and animate
init();
animate();

function init() {
    setupButtons();
    setupScene();
    setupRenderer();
    setupControls();
    window.addEventListener("resize", debounce(onWindowResize, 250), false);
    document.addEventListener("keydown", onDocumentKeyDown, false);
}

function setupScene() {
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(0, 150, 500);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);
    setupLights();
    const material = new THREE.MeshNormalMaterial({ wireframe: false });
    mesh = new THREE.Mesh(currentGeometry, material);
    scene.add(mesh);
}

function setupLights() {
    const light1 = new THREE.PointLight(0xffffff, 1.5);
    light1.position.set(500, 500, 500);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 0.5);
    light2.position.set(-500, -500, -500);
    scene.add(light2);
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    const sceneContainer = document.getElementById("scene-container");
    sceneContainer.appendChild(
        asciiEffectEnabled ? effect.domElement : renderer.domElement
    );
}

function setupControls() {
    controls = new TrackballControls(
        camera,
        asciiEffectEnabled ? effect.domElement : renderer.domElement
    );
}

function setupButtons() {
    const sceneContainer = document.getElementById("scene-container");
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
        "absolute",
        "top-0",
        "w-full",
        "flex",
        "justify-center",
        "z-10"
    );

    buttonContainer.innerHTML = `
        <button id="cubeButton" class="text-md font-light m-1 p-1 text-black bg-gray-200 hover:bg-gray-400 rounded">Cube</button>
        <button id="torusButton" class="text-md font-light m-1 p-1 text-black bg-gray-200 hover:bg-gray-400 rounded">Torus</button>
        <button id="prismButton" class="text-md font-light m-1 p-1 text-black bg-gray-200 hover:bg-gray-400 rounded">Prism</button>
        <button id="torusknotButton" class="text-md font-light m-1 text-black p-1 bg-gray-200 hover:bg-gray-400 rounded">Torus Knot</button>
        <button id="toggleAsciiButton" class="text-md font-light m-1 p-1 text-black bg-gray-200 hover:bg-gray-400 rounded">Toggle ASCII Effect</button>
        <button id="toggleWireframeButton" class="text-md font-light m-1 p-1 text-black bg-gray-200 hover:bg-gray-400 rounded">Toggle Wireframe</button>
    `;

    sceneContainer.appendChild(buttonContainer);

    document
        .getElementById("toggleWireframeButton")
        .addEventListener("click", toggleWireframeEffect);
    document
        .getElementById("toggleAsciiButton")
        .addEventListener("click", toggleAsciiEffect);

    buttonContainer.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const geometryKey = event.target.id.replace("Button", "");
            changeGeometry(geometryKey);
        }
    });
}

function onWindowResize() {
    const container = document.getElementById("scene-container");
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    effect.setSize(width, height);
    controls.handleResize();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    if (asciiEffectEnabled) {
        effect.render(scene, camera);
    } else {
        renderer.render(scene, camera);
    }
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 37: // left arrow key
            mesh.rotation.y -= 0.05;
            break;
        case 38: // up arrow key
            mesh.rotation.x -= 0.05;
            break;
        case 39: // right arrow key
            mesh.rotation.y += 0.05;
            break;
        case 40: // down arrow key
            mesh.rotation.x += 0.05;
            break;
        case 187: // '+' key
        case 107: // numpad '+' key
            camera.fov = Math.max(10, camera.fov - 5);
            camera.updateProjectionMatrix();
            break;
        case 189: // '-' key
        case 109: // numpad '-' key
            camera.fov = Math.min(100, camera.fov + 5);
            camera.updateProjectionMatrix();
            break;
    }
}

function toggleWireframeEffect() {
    mesh.material.wireframe = !mesh.material.wireframe;
}

function toggleAsciiEffect() {
    asciiEffectEnabled = !asciiEffectEnabled;
    const sceneContainer = document.getElementById("scene-container");

    if (asciiEffectEnabled) {
        sceneContainer.replaceChild(effect.domElement, renderer.domElement);
        controls.dispose();
        controls = new TrackballControls(camera, effect.domElement);
    } else {
        sceneContainer.replaceChild(renderer.domElement, effect.domElement);
        controls.dispose();
        controls = new TrackballControls(camera, renderer.domElement);
    }
}

function changeGeometry(geometryKey) {
    if (
        geometries[geometryKey] &&
        currentGeometry !== geometries[geometryKey]
    ) {
        currentGeometry = geometries[geometryKey];
        mesh.geometry.dispose(); // Dispose the old geometry
        mesh.geometry = currentGeometry;
        render(); // Re-render the scene to apply changes
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

onWindowResize();
window.addEventListener("resize", onWindowResize, false);
