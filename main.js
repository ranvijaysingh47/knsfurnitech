import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// --- SCENE SETUP ---
const container = document.getElementById('canvas-container');
const loading = document.getElementById('loading');

const scene = new THREE.Scene();
// Optional: gentle fog to blend with the gradient background
scene.fog = new THREE.FogExp2(0xf8f7f4, 0.02);

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.set(4, 3, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Use modern colorspace for better material rendering
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
container.appendChild(renderer.domElement);

// --- CONTROLS ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't go too far below ground

// --- LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xfff5e6, 2); // Warm sunlight
dirLight.position.set(5, 8, 3);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 15;
dirLight.shadow.camera.left = -5;
dirLight.shadow.camera.right = 5;
dirLight.shadow.camera.top = 5;
dirLight.shadow.camera.bottom = -5;
dirLight.shadow.bias = -0.0005;
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0xe6f0ff, 1.5); // Cool fill light
fillLight.position.set(-5, 3, -5);
scene.add(fillLight);

// --- ENVIRONMENT SHADOW CATCHER ---
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.1 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0; // Ground level
plane.receiveShadow = true;
scene.add(plane);

// --- PROCEDURAL FURNITURE: MODERN MINIMALIST TABLE ---
const furnitureGroup = new THREE.Group();

// Materials
const woodMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x8B5A2B,          // Warm rich wood tone
    roughness: 0.4,           // Slightly matte wood finish
    metalness: 0.05,
    clearcoat: 0.2,           // Slight subtle polish
    clearcoatRoughness: 0.3,
});

const metalMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1a1a1a,          // Dark matte metal
    roughness: 0.3,
    metalness: 0.8,
});

// Table Top (Rounded Box for premium sleek edges)
const topThickness = 0.15;
const topWidth = 3;
const topDepth = 1.8;
const tableTopGeo = new RoundedBoxGeometry(topWidth, topThickness, topDepth, 4, 0.04);
const tableTop = new THREE.Mesh(tableTopGeo, woodMaterial);
tableTop.position.y = 1.5; // Table height
tableTop.castShadow = true;
tableTop.receiveShadow = true;
furnitureGroup.add(tableTop);

// Table Legs
const legRadius = 0.04;
const legHeight = 1.5 - (topThickness / 2);
const legGeo = new THREE.CylinderGeometry(legRadius, legRadius * 0.7, legHeight, 16);

// Leg positions (inset from corners)
const insetX = (topWidth / 2) - 0.2;
const insetZ = (topDepth / 2) - 0.2;
const legPositions = [
    [insetX, insetZ],
    [-insetX, insetZ],
    [insetX, -insetZ],
    [-insetX, -insetZ]
];

legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeo, metalMaterial);
    leg.position.set(pos[0], legHeight / 2, pos[1]);
    leg.castShadow = true;
    leg.receiveShadow = true;
    furnitureGroup.add(leg);
});

// Add subtle decorative elements (metal brace)
const braceThickness = 0.02;
const braceGeoX = new THREE.BoxGeometry(topWidth - 0.4, braceThickness, braceThickness);
const braceGeoZ = new THREE.BoxGeometry(braceThickness, braceThickness, topDepth - 0.4);

// X braces
const braceX1 = new THREE.Mesh(braceGeoX, metalMaterial);
braceX1.position.set(0, legHeight / 2, insetZ);
braceX1.receiveShadow = true;
braceX1.castShadow = true;
const braceX2 = new THREE.Mesh(braceGeoX, metalMaterial);
braceX2.position.set(0, legHeight / 2, -insetZ);
braceX2.receiveShadow = true;
braceX2.castShadow = true;

// Z braces
const braceZ1 = new THREE.Mesh(braceGeoZ, metalMaterial);
braceZ1.position.set(insetX, legHeight / 2, 0);
braceZ1.receiveShadow = true;
braceZ1.castShadow = true;
const braceZ2 = new THREE.Mesh(braceGeoZ, metalMaterial);
braceZ2.position.set(-insetX, legHeight / 2, 0);
braceZ2.receiveShadow = true;
braceZ2.castShadow = true;

furnitureGroup.add(braceX1, braceX2, braceZ1, braceZ2);

scene.add(furnitureGroup);

// Center the camera on the table
controls.target.set(0, 0.75, 0);
controls.update();

// --- ANIMATION & RESIZE ---
let isHovering = false;
let rotSpeed = 0.002;

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Subtle auto-rotate
container.addEventListener('mouseenter', () => isHovering = true);
container.addEventListener('mouseleave', () => isHovering = false);


const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    // Auto-rotate slowly if not hovering and no user interaction
    if (!isHovering && controls.getAzimuthalAngle) {
       furnitureGroup.rotation.y += rotSpeed;
       // Gentle floating effect
       furnitureGroup.position.y = Math.sin(clock.getElapsedTime()) * 0.03;
    } else {
        // Smoothly return to center Y
        furnitureGroup.position.y += (0 - furnitureGroup.position.y) * 0.05;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

// Hide loader and start
setTimeout(() => {
    loading.style.opacity = '0';
    setTimeout(() => loading.style.display = 'none', 500);
    animate();
}, 1000); // Artificial short delay to simulate asset loading feeling

// Initial render
renderer.render(scene, camera);
