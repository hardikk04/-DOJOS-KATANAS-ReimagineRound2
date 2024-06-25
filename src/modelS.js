// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/Addons.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import GUI from "lil-gui";
// import firefliesVertexShader from "./shaders/fireflies/vertex.glsl";
// import firefliesFragmentShader from "./shaders/fireflies/fragment.glsl";

// /**
//  * Canvas
//  */
// const canvas = document.querySelector(".modelS");

// /**
//  * Gui
//  */
// // const gui = new GUI();
// const object = {};
// object.renderColor = "#1c1c1c";

// /**
//  * Scene
//  */
// const scene = new THREE.Scene();

// /**
//  * Group
//  */
// const group = new THREE.Group();
// scene.add(group);

// const updateMaterial = () => {
//   scene.traverse((child) => {
//     if (child.isMesh && child.material.isMeshStandardMaterial) {
//       child.material.roughness = 0.2;
//     }
//   });
// };

// /**
//  * Canvas container
//  */
// const canvasContainer = document.querySelector(".page2-part1-model");

// /**
//  * Loader
//  */
// const textureLoader = new THREE.TextureLoader();
// const gltfLoader = new GLTFLoader();

// /**
//  * FireFlies
//  */
// //Geometry
// const fireFliesGeometry = new THREE.BufferGeometry();
// const fireFliesCount = 50;
// const positionArray = new Float32Array(fireFliesCount * 3);
// const scaleArray = new Float32Array(fireFliesCount);

// for (let i = 0; i < fireFliesCount; i++) {
//   positionArray[i * 3 + 0] = (Math.random() - 0.5) * 8;
//   positionArray[i * 3 + 1] = Math.random() * 2;
//   positionArray[i * 3 + 2] = (Math.random() - 0.5) * 8;

//   scaleArray[i] = Math.random();
// }
// fireFliesGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positionArray, 3)
// );

// fireFliesGeometry.setAttribute(
//   "aScale",
//   new THREE.BufferAttribute(scaleArray, 1)
// );

// // Matrial
// const fireFliesMaterial = new THREE.ShaderMaterial({
//   transparent: true,
//   blending: THREE.AdditiveBlending,
//   depthWrite: false,
//   uniforms: {
//     uTime: new THREE.Uniform(0),
//     uPixelRatio: new THREE.Uniform(Math.min(window.devicePixelRatio, 2)),
//     uSize: new THREE.Uniform(100),
//   },
//   vertexShader: firefliesVertexShader,
//   fragmentShader: firefliesFragmentShader,
// });

// // Point
// const fireFlies = new THREE.Points(fireFliesGeometry, fireFliesMaterial);
// scene.add(fireFlies);

// /**
//  * Model
//  */
// let model = null;
// gltfLoader.load("/models/modelS.glb", (gltf) => {
//   model = gltf.scene;
//   group.position.set(0, -1, 0.66);
//   group.rotation.y = -0.52;
//   group.add(model);

//   updateMaterial();
// });

// // Loading the textures
// // Floor
// const floorAlphaTexture = textureLoader.load("./textures/alpha.webp");
// const floorColorTexture = textureLoader.load(
//   "/textures/rubber_tiles_diff_1k.jpg"
// );
// const floorARMTexture = textureLoader.load("/textures/rubber_tiles_arm_1k.jpg");
// const floorNormalTexture = textureLoader.load(
//   "/textures/rubber_tiles_nor_gl_1k.jpg"
// );
// const floorDisplacementTexture = textureLoader.load(
//   "/textures/rubber_tiles_disp_1k.jpg"
// );

// floorColorTexture.repeat.set(8, 8);
// floorARMTexture.repeat.set(8, 8);
// floorNormalTexture.repeat.set(8, 8);
// floorDisplacementTexture.repeat.set(8, 8);

// floorColorTexture.wrapS = THREE.RepeatWrapping;
// floorARMTexture.wrapS = THREE.RepeatWrapping;
// floorNormalTexture.wrapS = THREE.RepeatWrapping;
// floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

// floorColorTexture.wrapT = THREE.RepeatWrapping;
// floorARMTexture.wrapT = THREE.RepeatWrapping;
// floorNormalTexture.wrapT = THREE.RepeatWrapping;
// floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// floorColorTexture.colorSpace = THREE.SRGBColorSpace;

// /**
//  * Floor
//  */
// const floor = new THREE.Mesh(
//   new THREE.PlaneGeometry(12, 12, 128, 128),
//   new THREE.MeshStandardMaterial({
//     alphaMap: floorAlphaTexture,
//     transparent: true,
//     map: floorColorTexture,
//     roughnessMap: floorARMTexture,
//     metalnessMap: floorARMTexture,
//     normalMap: floorNormalTexture,
//     displacementMap: floorDisplacementTexture,
//     displacementScale: 0.3,
//     displacementBias: -0.2,
//   })
// );
// floor.rotation.x = -Math.PI / 2;
// group.add(floor);

// /**
//  * Fog
//  */
// const fog = new THREE.Fog(object.renderColor, 1, 9);
// scene.fog = fog;

// /**
//  * Sizes
//  */
// const sizes = {};
// sizes.widht = canvasContainer.offsetWidth;
// sizes.height = canvasContainer.offsetHeight;

// /**
//  * Camera
//  */

// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.widht / sizes.height,
//   1,
//   100
// );
// camera.position.z = 5;
// scene.add(camera);

// /**
//  * Resize
//  */
// window.addEventListener("resize", () => {
//   sizes.widht = canvasContainer.offsetWidth;
//   sizes.height = canvasContainer.offsetHeight;
//   camera.aspect = sizes.widht / sizes.height;
//   camera.updateProjectionMatrix();
//   renderer.setSize(sizes.widht, sizes.height);
//   renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

//   fireFliesMaterial.uniforms.uPixelRatio.value = Math.min(
//     2,
//     window.devicePixelRatio
//   );
// });

// // gui.add(camera.position, "x").min(-10).max(10).step(0.01).name("camera x");
// // gui.add(camera.position, "y").min(-10).max(10).step(0.01).name("camera y");
// // gui.add(camera.position, "z").min(-10).max(10).step(0.01).name("camera z");

// /**
//  * Lights
//  */
// // Ambient Light
// const ambientLight = new THREE.AmbientLight("#ffffff", 5);
// scene.add(ambientLight);

// // Directional Light
// const directionalLightBackLeft = new THREE.DirectionalLight("#ffffff", 4);
// directionalLightBackLeft.position.set(0, 0.1, -10);
// scene.add(directionalLightBackLeft);

// const directionalLightBackRight = new THREE.DirectionalLight("#ffffff", 4);
// directionalLightBackRight.position.set(8, 0.1, -8);
// scene.add(directionalLightBackRight);

// const directionalLightFrontLeft = new THREE.DirectionalLight("#ff0000", 1);
// directionalLightFrontLeft.position.set(0, 0.1, 30);
// scene.add(directionalLightFrontLeft);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLightFrontLeft
// );
// // scene.add(directionalLightHelper);

// object.directionalLightColor = "#ff00ff";

// // gui
// //   .add(directionalLightFrontLeft.position, "x")
// //   .min(-30)
// //   .max(30)
// //   .step(0.01)
// //   .name("camera x");
// // gui
// //   .add(directionalLightFrontLeft.position, "y")
// //   .min(-30)
// //   .max(30)
// //   .step(0.01)
// //   .name("camera y");
// // gui
// //   .add(directionalLightFrontLeft.position, "z")
// //   .min(-30)
// //   .max(30)
// //   .step(0.01)
// //   .name("camera z");

// // gui.addColor(object, "directionalLightColor").onChange(() => {
// //   directionalLightFrontLeft.color.set(object.directionalLightColor);
// // });

// /**
//  * Renderer
//  */

// const renderer = new THREE.WebGLRenderer({
//   canvas,
//   alpha: true,
//   antialias: true,
// });
// renderer.setSize(sizes.widht, sizes.height);
// renderer.setClearColor(object.renderColor);
// renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

// // gui.addColor(object, "renderColor").onChange(() => {
// //   scene.fog.color.set(object.renderColor);
// //   renderer.setClearColor(new THREE.Color(object.renderColor));
// // });

// /**
//  * Controls
//  */
// const controls = new OrbitControls(camera, canvas);
// controls.enableZoom = false;

// controls.enableDamping = true;
// // Restrict the vertical rotation
// controls.maxPolarAngle = Math.PI / 2;
// controls.minPolarAngle = 0;

// /**
//  * Clock
//  */
// const clock = new THREE.Clock();

// /**
//  * Animation
//  */
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   fireFliesMaterial.uniforms.uTime.value = elapsedTime * 0.25;

//   controls.update();
//   renderer.render(scene, camera);
//   requestAnimationFrame(tick);
// };
// tick();

// /**
//  * Mouse cursor change
//  */
// canvas.addEventListener("mousedown", () => {
//   canvas.style.cursor = "grabbing";
// });

// canvas.addEventListener("mouseup", () => {
//   canvas.style.cursor = "grab";
// });
