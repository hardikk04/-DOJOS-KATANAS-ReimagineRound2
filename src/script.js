// Importing the libraries
import "remixicon/fonts/remixicon.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import GUI from "lil-gui";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import overlayVertexShader from "./shaders/overlay/vertex.glsl";
import overlayFragmentShader from "./shaders/overlay/fragment.glsl";
import Swiper from "swiper";
import "swiper/css";

// Scroll Trigger
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// Clutter Animation
const clutterAnimation = (element) => {
  const htmlTag = document.querySelector(element);
  let clutter = "";

  // Splitting the text content into individual letters and wrapping each in a span with a class
  htmlTag.textContent.split("").forEach((word) => {
    clutter += `<div class="inline-block">${word}</div>`;
  });

  // Updating the HTML content of the element with the animated spans
  htmlTag.innerHTML = clutter;
};

const clutterWordAnimation = (element) => {
  const htmlTag = document.querySelector(element);
  let clutter = "";

  // Splitting the text content into individual letters and wrapping each in a span with a class
  htmlTag.textContent.split(" ").forEach((word) => {
    clutter += `<span>${word + " "}</span>`;
  });

  // Updating the HTML content of the element with the animated spans
  htmlTag.innerHTML = clutter;
};

// Lenis js

const lenisJs = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });

  gsap.ticker.lagSmoothing(0);
};
lenisJs();

// magneticEffect animation
// can be used by giving class .magnet-effect to parent
const magneticEffect = () => {
  window.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      top: dets.y,
      left: dets.x,
    });
  });
  document.querySelectorAll(".magnet-effect").forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        scale: 1,
      });
    });
    e.addEventListener("mousemove", function (dets) {
      // for value of x
      var xStart = e.getBoundingClientRect().x;
      var xEnd = e.getBoundingClientRect().x + e.getBoundingClientRect().width;
      var valx = gsap.utils.mapRange(xStart, xEnd, -12, 12, dets.x);
      // for value of y
      var yStart = e.getBoundingClientRect().y;
      var yEnd = e.getBoundingClientRect().y + e.getBoundingClientRect().height;
      var valy = gsap.utils.mapRange(yStart, yEnd, -12, 12, dets.y);
      gsap.to(e.children[0], {
        x: valx,
        y: valy,
        duration: 0.5,
      });
    });
    e.addEventListener("mouseleave", function (dets) {
      gsap.to(e.children[0], {
        x: 0,
        y: 0,
        duration: 0.5,
      });
      gsap.to("#cursor", {
        scale: 0,
      });
    });
  });
};
magneticEffect();

//menu animation
const menuAnimation = () => {
  let rotationAngle = 0;

  document.querySelector(".menu-open").addEventListener("click", function () {
    rotationAngle = 0;
    //makeing wheel to initial position
    document.querySelector(
      "#wheel"
    ).style.transform = `translateX(-50%) rotate(${rotationAngle}deg) scale(1.2)`;
    document.querySelector(".mtxt1").style.opacity = 1;
    //makeing manuPage visible
    var otl = gsap.timeline();
    otl
      .to("#op-line1 ,#op-line2", {
        width: 0,
        duration: 0.4,
      })
      .to("#menu-page", {
        display: "block",
        opacity: 1,
        duration: 0.5,
      })
      .to("#cl-line1 , #cl-line2", {
        height: "100%",
        duration: 0.4,
      });
  });

  document.querySelector(".menu-close").addEventListener("click", function () {
    var mn = gsap.timeline();
    mn.to(
      window,
      {
        scrollTo: 0,
        duration: 1,
        ease: "power1.inOut",
      },
      "a"
    )
      .to(
        "#cl-line1 , #cl-line2",
        {
          height: 0,
          duration: 1,
        },
        "a"
      )
      .to("#menu-page", {
        display: "none",
        opacity: 0,
        duration: 0.2,
      })
      .to(
        "#op-line1",
        {
          width: "100%",
          duration: 0.4,
        },
        "a"
      )
      .to(
        "#op-line2",
        {
          width: "100%",
          duration: 0.4,
        },
        "a"
      );
  });
  //wheel movement
  window.addEventListener("wheel", function (event) {
    // Getting the amount of scroll from the events
    let delta = event.deltaY;
    // Increase or decrease the rotation angle by the scroll amount
    rotationAngle += delta*0.2;

    let circle = document.querySelector("#wheel");
    // circle.style.transform = `translateX(-50%) rotate(${rotationAngle}deg) scale(1.2)`;
    gsap.to(circle, {
      rotate: rotationAngle,
      scale: 1.2,
    });

    document.querySelectorAll(".mtxt").forEach(function (txt) {
      // center value of text in x-axis with respect to window
      let txtCenter =
        txt.getBoundingClientRect().x + txt.getBoundingClientRect().width / 2;
      // condition to check if center value lies b/w (window.innerWidth / 2 - 300) & (window.innerWidth / 2 + 300)
      if (
        window.innerWidth / 2 - 335 < txtCenter &&
        window.innerWidth / 2 + 335 > txtCenter
      ) {
        txt.style.opacity = 1;
      } else {
        txt.style.opacity = 0.2;
      }
    });
  });
};
menuAnimation();

// Page2 Animation
const page2Animation = () => {
  const pin = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: "#page2",
      start: "top 0%",
      end: "top -300%",
      scrub: 1,
      pin: true,
      // markers: true,
    },
  });
  pin.to(".page2-imgs", {
    top: "-200vh",
  });

  const t1 = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: ".page2-img1",
      start: "top 100%",
      end: "top -30%",
      scrub: 1,
      // markers: true,
    },
  });

  const t2 = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: ".page2-img2",
      start: "top 70%",
      end: "top -80%",
      scrub: 2,
      // markers: true,
    },
  });

  const t3 = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: ".page2-img3",
      start: "top 40%",
      end: "top -100%",
      scrub: 2,
      // markers: true,
    },
  });

  clutterAnimation(".page2-text>h1");
  t1.from(".page2-text>h1>div", {
    y: 30,
    opacity: 0,
    stagger: {
      amount: 0.2,
    },
    delay: 4,
  });

  t1.from(".page2-text-para1 .page2-para1", {
    opacity: 0,
    y: 50,
  });
  t1.from(".page2-text-para1 .page2-para2", {
    opacity: 0,
    y: 50,
  });
  t1.from(".page2-text-para1 .page2-para3", {
    opacity: 0,
    y: 50,
  });

  t1.from(".page2-text>button", {
    opacity: 0,
    y: 30,
  });

  t1.from(".page2-speed", {
    opacity: 0,
    y: 30,
  });

  t1.from(".page2-circle>h1", {
    text: "0.00s",
  });

  t1.from(".page2-speed>h3", {
    opacity: 0,
    y: 30,
  });

  t1.from(".page2-elem1>h1", {
    text: "",
    delay: 2,
  });

  t1.from(".page2-elem2>h1", {
    text: "",
  });

  t1.from(".page2-elem3>h1", {
    text: "",
  });

  t1.from(".page2-elem4>h1", {
    text: "",
  });

  t1.to(".page2-text-para1 .page2-para1", {
    y: -60,
  });

  t1.to(".page2-text-para1 .page2-para2", {
    y: -60,
  });
  t1.to(".page2-text-para1 .page2-para3", {
    y: -60,
  });

  // Model 2

  t2.to(".page2-text>h1", {
    text: "TESLA",
  });

  t2.from(".page2-text-para2 .page2-para1", {
    opacity: 0,
    y: 50,
  });

  t2.from(".page2-text-para2 .page2-para2", {
    opacity: 0,
    y: 50,
  });
  t2.from(".page2-text-para2 .page2-para3", {
    opacity: 0,
    y: 50,
  });

  t2.to(".page2-circle>h1", {
    text: "1.46s",
  });

  t2.to(".page2-elem1>h1", {
    text: "259 mi",
  });

  t2.to(".page2-elem2>h1", {
    text: "178 mph",
  });

  t2.to(".page2-elem3>h1", {
    text: "5 Year",
  });

  t2.to(".page2-elem4>h1", {
    text: "1040 hp",
  });

  t2.to(".page2-text-para2 .page2-para1", {
    y: -60,
  });

  t2.to(".page2-text-para2 .page2-para2", {
    y: -60,
  });

  t2.to(".page2-text-para2 .page2-para3", {
    y: -60,
  });

  // Model 2

  t3.to(".page2-text>h1", {
    text: "TESLA",
  });

  t3.from(".page2-text-para3 .page2-para1", {
    opacity: 0,
    y: 50,
    delay: 2,
  });

  t3.from(".page2-text-para3 .page2-para2", {
    opacity: 0,
    y: 50,
  });

  t3.from(".page2-text-para3 .page2-para3", {
    opacity: 0,
    y: 50,
  });

  t3.to(".page2-circle>h1", {
    text: "3.99s",
  });

  t3.to(".page2-elem1>h1", {
    text: "259 mi",
  });

  t3.to(".page2-elem2>h1", {
    text: "210 mph",
  });

  t3.to(".page2-elem3>h1", {
    text: "5 Year",
  });

  t3.to(".page2-elem4>h1", {
    text: "1200 hp",
  });
};

page2Animation();

// Three tesla model animation
const threeTeslaModelAnimation = () => {
  /**
   * Canvas
   */
  const canvas = document.querySelector(".modelS");

  /**
   * Gui
   */
  // const gui = new GUI();
  const object = {};
  object.renderColor = "#000000";
  object.carColor = "#ae0a0a";
  object.floorColor = "#969696";

  /**
   * Scene
   */
  const scene = new THREE.Scene();

  /**
   * Loader
   */
  const textureLoader = new THREE.TextureLoader();
  const gltfLoader = new GLTFLoader();
  const rgbeLoader = new RGBELoader();

  /**
   * DRACO Loader
   */
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  gltfLoader.setDRACOLoader(dracoLoader);

  /**
   * Environment map
   */

  /**
   * HDR (RGBE) equirectangular
   */
  rgbeLoader.load("/environment/withoutLight.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = environmentMap;
  });

  rgbeLoader.load("/environment/sky.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
  });

  scene.environmentIntensity = 1;
  scene.backgroundIntensity = 1;

  const carColorMaterial = new THREE.MeshStandardMaterial({ color: "black" });
  const carMirrorMaterial = new THREE.MeshStandardMaterial({ color: "black" });

  const carRimsMaterial = new THREE.MeshStandardMaterial({ color: "white" });

  const floor = new THREE.MeshStandardMaterial();

  const updateMaterial = () => {
    scene.traverse((child) => {
      if (child.isMesh && child.material.isMeshStandardMaterial) {
        child.material.roughness = 0;
        child.material.metalness = 1;

        if (child.material.name !== "Concrete_Tiles") {
          child.castShadow = true;
        }

        if (
          child.material.name === "car_main_paint" ||
          child.material.name === "calipers" ||
          child.material.name === "Burner_red" ||
          child.material.name === "Material.003"
        ) {
          child.material = carColorMaterial;
        }

        if (child.material.name === "Glass_mid_tint") {
          child.material = carMirrorMaterial;
        }

        if (
          child.material.name === "Rims" ||
          child.material.name === "Material.010"
        ) {
          child.material = carRimsMaterial;
        }

        if (child.material.name === "Brake_Disc") {
          child.material = carColorMaterial;
        }

        if (child.material.name === "Concrete_Tiles") {
          child.material.roughness = 1;
          child.receiveShadow = true;
        }
      }
    });
  };

  // gui.addColor(object, "carColor").onChange(() => {
  //   carColorMaterial.color.set(object.carColor);
  // });

  // Loading the garage
  let garage = null;
  gltfLoader.load("/models/garage/garage.glb", (gltf) => {
    garage = gltf.scene;
    scene.add(garage);

    updateMaterial();
  });

  // Loading the models

  // Array of model paths
  const modelPaths = [
    "/models/model3/model3.glb",
    "/models/roadster/roadster.glb",
    "/models/cybertruck/cybertruck.glb",
  ];

  let models = [];
  modelPaths.forEach((model, index) => {
    gltfLoader.load(model, (gltf) => {
      models[index] = gltf.scene;
      if (index === 0) {
        scene.add(models[index]);
      }

      models[index].position.x = 0.25;

      models[index].rotation.y = -0.56;
      updateMaterial();
      updateMaterial();
    });
  });

  /**
   * Model Overlay
   */
  const displacementTexture = textureLoader.load("/images/images.jpg");
  const video = document.querySelector(".overlay-video");
  const videoTexture = new THREE.VideoTexture(video);

  const overlay = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 1, 1),
    new THREE.ShaderMaterial({
      vertexShader: overlayVertexShader,
      fragmentShader: overlayFragmentShader,
      uniforms: {
        uDisplacementTexture: new THREE.Uniform(displacementTexture),
        uOverlayVideo: new THREE.Uniform(videoTexture),
        uOffset: new THREE.Uniform(0),
      },
      // side: THREE.DoubleSide,
      transparent: true,
    })
  );

  scene.add(overlay);

  const animationSound = new Audio("/sounds/animation.mp3");

  const select = document.querySelector("select");
  select.addEventListener("input", (event) => {
    if (select.value === "MODELS") {
      const tl = gsap.timeline();
      animationSound.play();
      animationSound.playbackRate = 1.8;
      tl.to(camera.position, {
        x: 14,
        y: 0,
        z: 0,
        ease: "expo.in",
        duration: 2,
        onStart: () => {
          gsap.to(".model-transition", {
            opacity: 0,
            stagger: {
              amount: 0.2,
            },
          });
        },
        onComplete: () => {
          gsap.to(".models-name>h1", {
            text: "MODEL S",
            duration: 0.5,
          });
          gsap.to(".model-transition", {
            opacity: 1,
            stagger: {
              amount: -0.2,
            },
          });
          scene.add(models[0]);
          scene.remove(models[1]);
          scene.remove(models[2]);
        },
      });
      tl.to(camera.position, {
        x: 0,
        y: 0,
        z: 4,
        ease: "expo.out",
        duration: 2,
      });
    } else if (select.value === "ROADSTER") {
      const tl = gsap.timeline();
      animationSound.play();
      animationSound.playbackRate = 1.8;
      tl.to(camera.position, {
        x: 14,
        y: 0,
        z: 0,
        ease: "expo.in",
        duration: 2,
        onStart: () => {
          gsap.to(".model-transition", {
            opacity: 0,
            stagger: {
              amount: 0.2,
            },
          });
        },
        onComplete: () => {
          gsap.to(".models-name>h1", {
            text: "ROADSTER",
            duration: 0.5,
          });
          gsap.to(".model-transition", {
            opacity: 1,
            stagger: {
              amount: -0.2,
            },
          });
          scene.remove(models[0]);
          scene.add(models[1]);
          scene.remove(models[2]);
          updateMaterial();
        },
      });
      tl.to(camera.position, {
        x: 0,
        y: 0,
        z: 4,
        ease: "expo.out",
        duration: 2,
      });
    } else if (select.value === "CYBERTRUCK") {
      const tl = gsap.timeline();
      animationSound.play();
      animationSound.playbackRate = 1.8;
      tl.to(camera.position, {
        x: 14,
        y: 0,
        z: 0,
        ease: "expo.in",
        duration: 2,
        onStart: () => {
          gsap.to(".model-transition", {
            opacity: 0,
            stagger: {
              amount: 0.2,
            },
          });
        },
        onComplete: () => {
          gsap.to(".models-name>h1", {
            text: "CYBERTRUCK",
            duration: 0.5,
          });
          gsap.to(".model-transition", {
            opacity: 1,
            stagger: {
              amount: -0.2,
            },
          });
          scene.remove(models[0]);
          scene.remove(models[1]);
          scene.add(models[2]);
          updateMaterial();
        },
      });
      tl.to(camera.position, {
        x: 0,
        y: 0,
        z: 4,
        ease: "expo.out",
        duration: 2,
      });
    }
  });

  /**
   * Fog
   */
  const fog = new THREE.Fog("#040b10", 3, 8);
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
  camera.position.z = 3.8;

  scene.add(camera);

  /**
   * Resize
   */
  window.addEventListener("resize", () => {
    sizes.widht = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.widht / sizes.height;
    camera.position.z = 4.0;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.widht, sizes.height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".threejs-models",
      scroller: "body",
      start: "top 0",
      end: "top -300%",
      scrub: true,
      // markers: true,
      pin: true,
    },
  });

  const real = gsap.timeline({
    scrollTrigger: {
      trigger: ".threejs-models",
      scroller: "body",
      start: "top 0",
      end: "top -300%",
      // scrub: true,
      // markers: true,
    },
  });

  clutterAnimation(".overlay-text1>h1");
  clutterAnimation(".overlay-text2>h1");

  tl.to(".modelS", {
    pointerEvents: "none",
  });

  tl.from(".overlay-text1>h1>div", {
    y: 40,
    opacity: 0,
    stagger: {
      amount: 0.4,
      from: "center",
    },
  });

  tl.from(".overlay-text2>h1>div", {
    y: 40,
    opacity: 0,
    delay: -0.5,
    stagger: {
      amount: -0.4,
      from: "center",
    },
  });

  real.from(".overlay-line", {
    height: "0",
  });

  real.from(".overlay-scroller>i", {
    opacity: 0,
  });

  real.from(".overlay-scroller>p", {
    opacity: 0,
  });

  tl.to(".overlay-text1>h1>div", {
    y: -40,
    opacity: 0,
    stagger: {
      amount: 0.4,
      from: "center",
    },
  });

  tl.to(".overlay-text2>h1>div", {
    y: -40,
    opacity: 0,
    delay: -0.5,
    stagger: {
      amount: -0.4,
      from: "center",
    },
  });

  tl.to(
    overlay.material.uniforms.uOffset,
    {
      value: 1,
      duration: 3,
    },
    "displacement"
  );

  tl.to(
    ".overlay-line",
    {
      height: "0",
    },
    "displacement"
  );

  tl.to(
    ".overlay-scroller > i",
    {
      opacity: "0",
    },
    "displacement"
  );

  tl.to(
    ".overlay-scroller > p",
    {
      opacity: "0",
    },
    "displacement"
  );

  tl.to(".modelS", {
    pointerEvents: "all",
  });

  tl.from(".model-transition", {
    duration: 0.3,
  });

  gsap.to(".models-name>h1", {
    opacity: 1,
    y: 40,
    scrollTrigger: {
      scroller: "body",
      trigger: ".black-over",
      start: "top -230%",
      end: "top -230%",
      scrub: 1,
    },
  });

  gsap.to(".model-transition", {
    opacity: 1,
    stagger: {
      amount: 0.5,
    },
    scrollTrigger: {
      scroller: "body",
      trigger: ".black-over",
      start: "top -230%",
      end: "top -230%",
      scrub: 1,
    },
  });

  gsap.from(".black-over", {
    opacity: 0,
    scrollTrigger: {
      scroller: "body",
      trigger: ".black-over",
      start: "top -300%",
      end: "top -400%",
      scrub: 1,
    },
  });

  /**
   * Lights
   */

  // Directional Light
  const directionalLight = new THREE.DirectionalLight("#ffffff", 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  object.LightColor = "#b4a26e";

  // gui.addColor(object, "LightColor").onChange(() => {
  //   scene.fog.color = new THREE.Color(object.LightColor);
  // });

  // gui
  //   .add(directionalLight.position, "x")
  //   .min(-30)
  //   .max(30)
  //   .step(0.001)
  //   .name("directionalLight X");
  // gui
  //   .add(directionalLight.position, "y")
  //   .min(-30)
  //   .max(30)
  //   .step(0.001)
  //   .name("directionalLight Y");
  // gui
  //   .add(directionalLight.position, "z")
  //   .min(-30)
  //   .max(30)
  //   .step(0.001)
  //   .name("directionalLight Z");

  // Shadow
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.near = 0;
  directionalLight.shadow.camera.far = 2;
  directionalLight.shadow.camera.top = 3;
  directionalLight.shadow.camera.right = 3;
  directionalLight.shadow.camera.bottom = -3;
  directionalLight.shadow.camera.left = -3;
  const directionalLightCameraHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
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
  //   scene.fog.color.setHex(new THREE.Color(object.renderColor));
  // });

  /**
   * Controls
   */
  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;

  controls.enableDamping = true;
  controls.maxPolarAngle = -Math.PI;
  controls.minPolarAngle = Math.PI / 2;
  controls.target.y = 0.85;

  /**
   * Clock
   */

  let time = Date.now();

  /**
   * Animation
   */
  let loop360AnimationRotationFlag = true;
  let speed = 0.25;
  const tick = () => {
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    // Sky Environment rotation
    scene.environmentRotation.y -= Math.sin(deltaTime * 0.00005) * 2;

    if (loop360AnimationRotationFlag) {
      speed -= deltaTime * 0.000025;
    } else {
      speed += deltaTime * 0.000025;
    }

    if (models[0] && models[1] && models[2]) {
      models[0].rotation.y = speed;
      models[1].rotation.y = speed;
      models[2].rotation.y = speed;
      garage.rotation.y = speed;
    }

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

  const screenHalfWidth = window.innerWidth / 2;
  let lastX = 0;
  canvas.addEventListener("mouseup", (event) => {
    canvas.style.cursor = "grab";
    if (lastX < event.clientX) {
      loop360AnimationRotationFlag = false;
    } else {
      loop360AnimationRotationFlag = true;
    }
    lastX = event.clientX;
  });

  canvas.addEventListener("mouseenter", () => {
    canvas.style.cursor = "grab";
  });

  const colorChangeAnimation = () => {
    const colorPickerElem = document.querySelectorAll(".color-picker-elem");
    const allColorPicker = document.querySelectorAll(
      ".color-picker-elem input"
    );

    colorPickerElem.forEach((elem, index) => {
      elem.addEventListener("click", () => {
        allColorPicker[index].click();

        allColorPicker[index].addEventListener("input", function () {
          const colorValue = allColorPicker[index].value;
          if (index === 0) {
            carColorMaterial.color = new THREE.Color(colorValue);
            gsap.to(colorPickerElem[index], {
              backgroundColor: colorValue,
            });
          } else {
            carRimsMaterial.color = new THREE.Color(colorValue);
            gsap.to(colorPickerElem[index], {
              backgroundColor: colorValue,
            });
          }
        });
      });
    });
  };
  colorChangeAnimation();
};
threeTeslaModelAnimation();

// page3Animation
const page3Animation = () => {
  var tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top top",
      end: "top -150%",
      scrub: true,
      pin: true,
      // markers:true
    },
  });
  tl3
    .to(
      "#circle1",
      {
        top: "50%",
        scale: 1,
        duration: 0.5,
      },
      "a"
    )
    .to(
      "#circle2",
      {
        top: "50%",
        scale: 1,
        delay: 0.2,
        duration: 0.5,
      },
      "a"
    )
    .to(
      ".circle3",
      {
        left: "50%",
        duration: 0.2,
      },
      "b"
    )
    .to(
      ".circle3 h4",
      {
        opacity: 0,
      },
      "b"
    )
    .to(
      "#circle2",
      {
        opacity: 0,
      },
      "c"
    )
    .to(
      "#circle1",
      {
        scale: 5,
        duration: 0.5,
      },
      "c"
    )
    .to("#energy", {
      opacity: 1,
      duration: 0,
    })
    .to("#circle1", {
      opacity: 0,
      duration: 0,
    })
    .to("#energy", {
      transform: "translateX(-52%)",
      ease: "linear",
      duration: 1,
    });

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3.2,
    freeMode: true,
  });

  gsap.from(".swiper-slide", {
    y: 400,
    stagger: {
      amount: 0.8,
    },
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top -10%",
      end: "top -60%",
      scrub: true,
      // markers:true
    },
  });

  document.querySelectorAll(".swiper-slide").forEach(function (slide) {
    slide.addEventListener("mouseenter", function () {
      gsap.to("#solar-cursor", {
        scale: 1,
        duration: 0.5,
      });
      gsap.to(slide.querySelector(".solar-overlay"), {
        opacity: 1,
        duration: 0.5,
      });
    });
  });
  document.querySelectorAll(".swiper-slide").forEach(function (slide) {
    slide.addEventListener("mouseleave", function () {
      gsap.to("#solar-cursor", {
        scale: 0,
        duration: 0.5,
      });
      gsap.to(slide.querySelector(".solar-overlay"), {
        opacity: 0,
        duration: 0.5,
      });
    });
  });
};
page3Animation();
// page5Animation

const page5MarqueeAnimation = () => {
  // Initial animation setup
  gsap.to("#slide1 h2", {
    transform: "translateX(-100%)",
    duration: 10,
    repeat: -1,
    ease: "linear",
  });

  window.addEventListener("wheel", function (dets) {
    if (dets.deltaY > 0) {
      // Animation when scrolling up
      gsap.to("#slide1 h2", {
        transform: "translateX(-100%)",
        duration: 10,
        repeat: -1,
        ease: "linear",
      });
    } else {
      // Animation when scrolling down
      gsap.to("#slide1 h2", {
        transform: "translateX(0%)",
        duration: 10,
        repeat: -1,
        ease: "linear",
      });
    }
  });
};
page5MarqueeAnimation();

// page6Animation
const page6LeftBtnHover = () => {
  var btn = document.querySelector("#page6 #button");
  var heads = document.querySelectorAll("#page6 #button h5");
  var arrows = document.querySelectorAll("#page6 #button #arrow i");

  heads.forEach(function (head) {
    btn.addEventListener("mouseenter", function () {
      gsap.to(head, {
        y: "-33",
        duration: 0.3,
      });
    });
    btn.addEventListener("mouseleave", function () {
      gsap.to(head, {
        y: "0",
        duration: 0.3,
      });
    });
  });
  arrows.forEach(function (arrow) {
    btn.addEventListener("mouseenter", function () {
      gsap.to(arrow, {
        y: "-30",
        duration: 0.3,
      });
    });
    btn.addEventListener("mouseleave", function () {
      gsap.to(arrow, {
        y: "0",
        duration: 0.3,
      });
    });
  });
};
page6LeftBtnHover();

const page6ScrollAnimation = () => {
  var tl6 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page6",
      scroller: "body",
      start: "64.4% 50%",
      end: "250% 50%",
      pin: true,
      scrub: 1,
      // markers: true
    },
  });

  tl6.to("#page6 #section2 #right", {
    y: "-168%",
  });
};
page6ScrollAnimation();

// page7Animation
const page7Animation = () => {
  var tl7 = gsap.timeline({
    scrollTrigger: {
      trigger: "#discovery",
      scroller: "body",
      start: "top 40%",
      end: "top -15%",
      scrub: 1,
      // markers:true
    },
  });
  tl7
    .to("#discovery #dis-text", {
      scale: 1,
      clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "linear",
    })
    .from(".ig7", {
      y: 10,
      display:"none",
      stagger: 0.3,
    });

  var tl72 = gsap
    .timeline({
      scrollTrigger: {
        trigger: "#page7",
        scroller: "body",
        start: "bottom bottom",
        end: "bottom -150%",
        pin: true,
        scrub: 1,
        // markers:true
      },
    })
    .to(
      "#discovery #dis-text #container7",
      {
        x: "-71%",
        duration: 3,
        ease: "linear",
      },
      "a"
    )
    .to(
      ".ig7",
      {
        x: -200,
        duration: 3,
      },
      "a"
    );
};
page7Animation();

window.addEventListener("mousemove", function (dets) {
  gsap.to("#dis-cursor , #solar-cursor", {
    top: dets.clientY,
    left: dets.clientX,
  });
});
document.querySelectorAll(".ig7").forEach(function (ig) {
  ig.addEventListener("mouseenter", function () {
    gsap.to("#dis-cursor", {
      scale: 1,
      duration: 0.5,
    });
    gsap.to(ig.querySelector(".overlay7"), {
      opacity: 0,
      duration: 0.5,
    });
  });
});
document.querySelectorAll(".ig7").forEach(function (ig) {
  ig.addEventListener("mouseleave", function () {
    gsap.to("#dis-cursor", {
      scale: 0,
      duration: 0.5,
    });
    gsap.to(ig.querySelector(".overlay7"), {
      opacity: 1,
      duration: 0.5,
    });
  });
});
// textEffect animation
// can be used by giving class .text-effect to parent ,
// which has two childern
const textEffect = () => {
  // Splitting the text content into individual letters and wrapping each in a span with a class
  document.querySelectorAll(".text-effect").forEach(function (e) {
    [...e.children].forEach(function (h) {
      var clutter = "";
      h.textContent.split("").forEach(function (l) {
        clutter += `<span>${l}</span>`;
      });
      h.innerHTML = clutter;
    });
  });
  //animation for mousemove
  document.querySelectorAll(".text-effect").forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      console.log(e.children[0]);
      gsap.to(e.children[0].querySelectorAll("span"), {
        y: "-106%",
        stagger: {
          amount: 0.2,
        },
        duration: 0.4,
      });
      gsap.to(e.children[1].querySelectorAll("span"), {
        y: "-100%",
        stagger: {
          amount: 0.2,
        },
        duration: 0.4,
      });
    });
  });
  //animation for mouseleave
  document.querySelectorAll(".text-effect").forEach(function (e) {
    e.addEventListener("mouseleave", function () {
      gsap.to(e.children[0].querySelectorAll("span"), {
        y: "0%",
        stagger: {
          amount: 0.2,
        },
      });
      gsap.to(e.children[1].querySelectorAll("span"), {
        y: "0%",
        stagger: {
          amount: 0.2,
        },
      });
    });
  });
};
textEffect();

const textAnimation = () => {
  var tl61 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page6 #section1",
      scroller: "body",
      start: "top 85%",
      end: "top 60%",
      scrub: 1,
    },
  });
  tl61
    .from("#page6 #section1 h1", {
      y: 100,
      duration: 1,
    })
    .from(".section1-dis h3", {
      y: 100,
      stagger: 0.4,
      duration: 1,
    });

  var tl62 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page6 #section2",
      scroller: "body",
      start: "top 70%",
      end: "top 30%",
      scrub: 1,
    },
  });
  tl62
    .from("#page6 #section2 h1", {
      y: 100,
      stagger: 0.6,
      duration: 2,
    })
    .from("#page6 #section2 #line", {
      width: 0,
      duration: 2,
      delay: 0.8,
    })
    .from("#page6 #section2 .description h3", {
      y: 100,
      stagger: 0.4,
      duration: 2,
    });

  var tl63 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page7",
      scroller: "body",
      start: "top 80%",
      end: "top 45%",
      scrub: 1,
    },
  });
  tl63
    .from("#page7 #head-wrap7 h1", {
      y: 100,
      duration: 1,
    })
    .from("#page7 .para-wrap7 p", {
      y: 100,
      stagger: 0.6,
      duration: 2,
    });
};
textAnimation();
