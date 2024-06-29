import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";

/**
 * Canvas
 */
const canvas = document.querySelector(".modelS");

/**
 * Gui
 */
// const gui = new GUI();
const object = {};
object.renderColor = "#ffffff";
object.carColor = "#ae0a0a";
object.floorColor = "#969696";

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Group
 */
const group = new THREE.Group();
scene.add(group);

const carColormaterial = new THREE.MeshStandardMaterial({
  color: object.carColor,
});

const updateMaterial = () => {
  scene.traverse((child) => {
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.roughness = 0.6;
      child.material.metalness = 0.1;
      child.castShadow = true; // The object will cast a shadow
      if (child.material.name === "car_main_paint")
        child.material = carColormaterial;
    }
  });
};

// gui.addColor(object, "carColor").onChange(() => {
//   material.color.set(object.carColor);
// });

/**
 * Loader
 */
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

gltfLoader.load("/models/example/scene.gltf", (gltf) => {
  group.add(gltf.scene);

  group.rotation.y = -0.56;
  updateMaterial();
});

/**
 * Floor
 */
// // Loading the textures

const floorAlphaTexture = textureLoader.load("./textures/alpha.webp");
const floorColorTexture = textureLoader.load(
  "/textures/rubber_tiles_diff_1k.jpg"
);
const floorARMTexture = textureLoader.load("/textures/rubber_tiles_arm_1k.jpg");
const floorNormalTexture = textureLoader.load(
  "/textures/rubber_tiles_nor_gl_1k.jpg"
);
const floorDisplacementTexture = textureLoader.load(
  "/textures/rubber_tiles_disp_1k.jpg"
);

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(12,12, 128,128),
  new THREE.MeshStandardMaterial({
    // alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
group.add(floor);

/**
 * Fog
 */
const fog = new THREE.Fog(object.renderColor,3, 8);
scene.fog = fog;

/**
 * Sizes
 */
const sizes = {};
sizes.widht = window.innerWidth;
sizes.height = window.innerHeight;

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.widht / sizes.height,
  1,
  100
);
camera.position.z = 4.0;

scene.add(camera);

/**
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.widht = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.widht / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.widht, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

  fireFliesMaterial.uniforms.uPixelRatio.value = Math.min(
    2,
    window.devicePixelRatio
  );
});

// gui.add(camera.position, "x").min(-10).max(10).step(0.01).name("camera x");
// gui.add(camera.position, "y").min(-10).max(10).step(0.01).name("camera y");
// gui.add(camera.position, "z").min(-10).max(20).step(0.01).name("camera z");

/**
 * Lights
 */
// Ambient Light
const ambientLight = new THREE.AmbientLight("#ffffff", 5);
scene.add(ambientLight);

// Directional Light
const directionalLightBackLeft = new THREE.DirectionalLight("#ffffff", 4);
directionalLightBackLeft.castShadow = true;
// directionalLightBackLeft.position.set(0, 0.1, -10);
scene.add(directionalLightBackLeft);

// Shadow
directionalLightBackLeft.shadow.mapSize.set(1024, 1024);
directionalLightBackLeft.shadow.camera.near = -2;
directionalLightBackLeft.shadow.camera.far = 2;
directionalLightBackLeft.shadow.camera.top = 3;
directionalLightBackLeft.shadow.camera.right = 3.5;
directionalLightBackLeft.shadow.camera.bottom = -3;
directionalLightBackLeft.shadow.camera.left = -3.5;
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLightBackLeft.shadow.camera
);
// scene.add(directionalLightCameraHelper);

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.widht, sizes.height);
renderer.setClearColor(object.renderColor);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// gui.addColor(object, "renderColor").onChange(() => {
//   renderer.setClearColor(new THREE.Color(object.renderColor));
// });

// gui.addColor(object, "floorColor").onChange(() => {
//   floor.material.color.set(object.floorColor);
// });

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;

// gui
//   .add(controls.target, "x")
//   .min(-30)
//   .max(30)
//   .setValue(0.001)
//   .name("control x");
// gui
//   .add(controls.target, "y")
//   .min(-30)
//   .max(30)
//   .setValue(0.001)
//   .name("control y");
// gui
//   .add(controls.target, "z")
//   .min(-30)
//   .max(30)
//   .setValue(0.001)
//   .name("control z");

controls.enableDamping = true;
controls.maxPolarAngle = -Math.PI;
controls.minPolarAngle = Math.PI / 2;
controls.target.y = 0.85;

/**
 * Clock
 */
const clock = new THREE.Clock();

/**
 * Animation
 */
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();

/**
 * Mouse cursor change
 */
canvas.addEventListener("mousedown", () => {
  canvas.style.cursor = "grabbing";
});

canvas.addEventListener("mouseup", () => {
  canvas.style.cursor = "grab";
});

canvas.addEventListener("mouseenter", () => {
  canvas.style.cursor = "grab";
});
