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

// Removing the scroll unitl site loaded
(() => {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
})();

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

// Prevent scroll with keyboard navigation
function preventDefaultForScrollKeys(e) {
  const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // Space, Page Up, Page Down, End, Home, Arrow keys
  if (keys.includes(e.keyCode)) {
    e.preventDefault();
    return false;
  }
}

document.addEventListener("keydown", preventDefaultForScrollKeys);

// Lenis js
const lenis = new Lenis();
const lenisJs = () => {
  lenis.on("scroll", (e) => {});

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });

  gsap.ticker.lagSmoothing(0);
};
lenisJs();

// window.addEventListener("load", loaderAnimation);

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
    let circle = document.querySelector("#wheel");
    // Getting the amount of scroll from the events
    let delta = event.deltaY;
    // Increase or decrease the rotation angle by the scroll amount
    rotationAngle += delta > 0 ? 5 : -5;

    // circle.style.transform = `translateX(-50%) rotate(${rotationAngle}deg) scale(1.2)`;
    gsap.to(circle, {
      rotate: rotationAngle,
      scale: 1.2,
      ease: "linear",
      duration: 0.5,
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

// Landing wheel animation
const landingWheelAnimation = () => {
  const landingWheel = document.querySelector("#landing-wheel");
  landingWheel.addEventListener("mousemove", (dets) => {
    const cursorX = dets.x / window.innerWidth;
    const cursorY = dets.y / window.innerHeight;

    if (cursorX > 0.5) {
      gsap.to(".landing-wheel-img > img", {
        rotate: cursorX * 90,
        duration: 0.5,
      });
    } else {
      gsap.to(".landing-wheel-img > img", {
        rotate: (cursorX - 0.5) * 180,
        duration: 0.5,
      });
    }
  });

  landingWheel.addEventListener("mouseleave", (dets) => {
    const cursorX = dets.x / window.innerWidth;
    const cursorY = dets.y / window.innerHeight;

    gsap.to(".landing-wheel-img > img", {
      rotate: 0,
      duration: 0.5,
    });
  });
};

landingWheelAnimation();

// Page1 Animation
const page1Animation = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: "#page1",
      start: "top 80%",
      end: "top 0%",
      scrub: 1,
      // markers: true,
    },
  });
  tl.from(".page1-energy-line", {
    height: "0",
  });

  tl.from(".page1-energy-button", {
    opacity: 0,
  });

  tl.from(".page1-energy-text > p", {
    opacity: 0,
  });
};
page1Animation();

// Page2 Animation
const page2Animation = () => {
  const t1 = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: "#page2",
      start: "top 80%",
      end: "top -10%",
      scrub: 1,
      // markers: true,
    },
  });
  t1.from(".page2-text-para1 p", {
    y: 100,
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
  t1.from(".page2-box h1", {
    text: "",
    stagger: 0.2,
  });

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
  pin.to(
    ".page2-img1",
    {
      clipPath: `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)`,
    },
    "a"
  );
  pin.to(
    ".page2-img2",
    {
      clipPath: ` polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
    },
    "a"
  );
  pin.to(
    ".page2-text-para1 p",
    {
      y: -100,
      delay: 0.1,
    },
    "a"
  );
  pin.from(
    ".page2-text-para2 p",
    {
      y: 100,
      delay: 0.1,
    },
    "a"
  );
  pin.to(
    ".page2-circle>h1",
    {
      text: "1.46s",
      delay: 0.1,
    },
    "a"
  );
  pin.to(
    ".page2-circle>h1",
    {
      text: "1.46s",
      delay: 0.1,
    },
    "a"
  );

  pin.to(
    ".page2-elem1>h1",
    {
      text: "259 mi",
      delay: 0.1,
    },
    "a"
  );

  pin.to(
    ".page2-elem2>h1",
    {
      text: "178 mph",
      delay: 0.1,
    },
    "a"
  );

  pin.to(
    ".page2-elem3>h1",
    {
      text: "5 Year",
      delay: 0.1,
    },
    "a"
  );

  pin.to(
    ".page2-elem4>h1",
    {
      text: "1040 hp",
      delay: 0.1,
    },
    "a"
  );
  pin.to(
    ".page2-img2",
    {
      clipPath: `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)`,
    },
    "b"
  );
  pin.to(
    ".page2-img3",
    {
      clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
    },
    "b"
  );
  pin.to(
    ".page2-text-para2 p",
    {
      y: -100,
      delay: 0.1,
    },
    "b"
  );
  pin.from(
    ".page2-text-para3 p",
    {
      y: 100,
      delay: 0.1,
    },
    "b"
  );
  pin.to(
    ".page2-circle>h1",
    {
      text: "3.99s",
      delay: 0.1,
    },
    "b"
  );

  pin.to(
    ".page2-elem1>h1",
    {
      text: "259 mi",
      delay: 0.1,
    },
    "b"
  );

  pin.to(
    ".page2-elem2>h1",
    {
      text: "210 mph",
      delay: 0.1,
    },
    "b"
  );

  pin.to(
    ".page2-elem3>h1",
    {
      text: "5 Year",
      delay: 0.1,
    },
    "b"
  );

  pin.to(
    ".page2-elem4>h1",
    {
      text: "1200 hp",
      delay: 0.1,
    },
    "b"
  );
};
page2Animation();

// Three tesla model animation
const threeTeslaModelAnimation = () => {
  /**
   * Canvas
   */
  const canvas = document.querySelector(".modelS");

  /**
   * Scene
   */
  const scene = new THREE.Scene();

  /**
   * Loader
   */

  let checkLoadingStart = true;

  const loaderAnimation = () => {
    const tl = gsap.timeline();
    tl.to("#loader", {
      opacity: 0,
      duration: 1.5,
      delay: 1,
    });

    tl.from(".nav-child", {
      opacity: 0,
      y: 10,
      stagger: {
        amount: 0.4,
      },
    });

    tl.to(
      ".wheel-img",
      {
        opacity: 1,
        top: 0,
      },
      "a"
    );

    tl.to(".landing-wheel-overlay h1", {
      y: 0,
      stagger: {
        amount: 0.2,
      },
    });

    tl.from(
      ".landing-footer-elem",
      {
        opacity: 0,
        stagger: {
          amount: 0.1,
        },
      },
      "b"
    );

    tl.from(
      ".landing-footer-line",
      {
        height: 0,
      },
      "b"
    );

    tl.from(".landing-para>h3", {
      text: "",
    });

    tl.from(".landing-para>p", {
      text: "",
      onComplete: () => {
        // Enable scroll
        document.body.style.overflow = "initial";
        document.documentElement.style.overflow = "initial";
      },
    });
  };

  const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
      loaderAnimation();
    },
    // Process
    (itemUrl, itemsLoaded, itemsTotal) => {
      if (checkLoadingStart) {
        checkLoadingStart = false;
        var video = document.querySelector("video");
        var loader = gsap.timeline();

        loader.to(
          "#logo-warpper",
          {
            top: "50%",
            duration: 1,
            onComplete: function () {
              gsap.to(video, {
                opacity: 1,
                duration: 0.2,
              });
              video.play();
              video.playbackRate = 1.5;
              gsap.to("#loading-content", {
                opacity: 1,
                duration: 0.2,
              });
            },
          },
          "a"
        );
      }

      const progressRatio = itemsLoaded / itemsTotal;
      gsap.to("#black-bar", {
        width: progressRatio * 100 + "%",
      });
    }
  );

  const textureLoader = new THREE.TextureLoader(loadingManager);
  const gltfLoader = new GLTFLoader(loadingManager);
  const rgbeLoader = new RGBELoader(loadingManager);

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

  // Car Environment map
  rgbeLoader.load("/environment/modelReflection.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = environmentMap;
  });

  // Background environment
  rgbeLoader.load("/environment/garageBG.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
  });

  scene.environmentIntensity = 1;
  scene.backgroundIntensity = 1;

  // Custom material for models
  const carColorMaterial = new THREE.MeshStandardMaterial({
    color: "rgb(140,140,140)",
  });
  const carMirrorMaterial = new THREE.MeshStandardMaterial({ color: "black" });

  const carRimsMaterial = new THREE.MeshStandardMaterial({ color: "white" });

  // Update the materials
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
  // Displacement Texture
  const displacementTexture = textureLoader.load("/images/d2.jpg");
  // Video
  const video = document.querySelector(".overlay-video");
  video.playbackRate = 2;
  const videoTexture = new THREE.VideoTexture(video);

  // Make sure video always playing
  document.addEventListener("scroll", () => {
    if (video.paused) {
      video.play();
    }
  });

  // Overlay shaders
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

  // Animation Sound
  const animationSound = new Audio("/sounds/animation.mp3");

  const modelS = () => {
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
  };

  const roadster = () => {
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
  };

  const cybertruck = () => {
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
  };

  const select = document.querySelector("select");
  select.addEventListener("input", (event) => {
    if (select.value === "MODELS") {
      modelS();
    } else if (select.value === "ROADSTER") {
      roadster();
    } else if (select.value === "CYBERTRUCK") {
      cybertruck();
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

  // 3d section entry animations

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".threejs-models",
      scroller: "body",
      start: "top 40%",
      end: "top 0%",
      scrub: true,
      // markers: true,
      // pin: true,
    },
  });

  tl.from(".overlay-text1>h1", {
    y: 40,
    opacity: 0,
    stagger: {
      amount: 0.4,
      from: "center",
    },
  });

  tl.from(".overlay-text2>h1", {
    y: 40,
    opacity: 0,
    delay: -0.5,
    stagger: {
      amount: -0.4,
      from: "center",
    },
  });

  let scrollStopFlag = true;
  tl.from(".models-btn>h3", {
    opacity: 0,
    y: 10,
    stagger: 0.1,
    onComplete: () => {
      if (scrollStopFlag) {
        lenis.stop();

        // Hide the scroll bar
        document.body.style.overflow = "hidden";
      }
    },
  });

  const scrollDown = document.querySelector(".model-scroll-down");
  const viewModel = document.querySelector(".view-model");

  // Scroll down event
  const scrollDownAnimation = () => {
    scrollDown.addEventListener("click", () => {
      // prevent multiple clicks
      scrollDown.style.pointerEvents = "none";

      lenis.start();

      // Show the scroll bar
      document.body.style.overflow = "initial";

      const tl = gsap.timeline();

      tl.to(window, {
        duration: 1.5,
        scrollTo: "#page3",
        onComplete: () => {
          scrollDown.style.pointerEvents = "all";
        },
      });
    });
  };
  scrollDownAnimation();

  // View model event

  const viewModelAnimation = () => {
    viewModel.addEventListener("click", () => {
      // enable the click ag (prevent multiple clicks)
      viewModel.style.pointerEvents = "none";

      scrollStopFlag = false;

      // Show the scroll bar
      document.body.style.overflow = "initial";

      const viewTl = gsap.timeline();
      viewTl.to(".overlay-text1>h1", {
        y: -20,
        opacity: 0,
        duration: 0.2,
      });

      viewTl.to(".overlay-text2>h1", {
        y: -20,
        opacity: 0,
        duration: 0.2,
      });

      viewTl.to(".models-btn>h3", {
        opacity: 0,
        y: -20,
        stagger: 0.1,
      });

      viewTl.to(".overlay-content", {
        display: "none",
      });

      viewTl.to(overlay.material.uniforms.uOffset, {
        value: 1,
        duration: 1.5,
        onComplete: () => {
          animationSound.play();
          animationSound.playbackRate = 2.5;
        },
      });

      viewTl.from(camera.position, {
        x: -13,
        duration: 1.6,
      });

      viewTl.to(
        ".modelS",
        {
          pointerEvents: "all",
        },
        "pointerEvents"
      );

      viewTl.to(
        ".color-picker",
        {
          pointerEvents: "all",
        },
        "pointerEvents"
      );

      viewTl.to(".models-name>h1", {
        opacity: 1,
        y: 40,
      });

      viewTl.to(".model-transition", {
        opacity: 1,
        stagger: {
          amount: 0.2,
        },
        onComplete: () => {
          lenis.start();
        },
      });

      gsap.to(".black-over", {
        opacity: 1,
        scrollTrigger: {
          scroller: "body",
          trigger: ".black-over",
          start: "top 0%",
          end: "top -100%",
          scrub: 1,
        },
      });
    });
  };
  viewModelAnimation();

  /**
   * Lights
   */

  // Directional Light
  const directionalLight = new THREE.DirectionalLight("#ffffff", 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Shadow
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.near = 0;
  directionalLight.shadow.camera.far = 2;
  directionalLight.shadow.camera.top = 3;
  directionalLight.shadow.camera.right = 3;
  directionalLight.shadow.camera.bottom = -3;
  directionalLight.shadow.camera.left = -3;

  /**
   * Renderer
   */

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(sizes.widht, sizes.height);
  renderer.setClearColor("#000000");
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  let resizeTimeout;
  window.addEventListener("resize", () => {
    // Clear the previous timeout
    clearTimeout(resizeTimeout);

    // Set a new timeout
    resizeTimeout = setTimeout(() => {
      adjustLayout();
    }, 250);
  });

  function adjustLayout() {
    sizes.widht = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.widht / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.widht, sizes.height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  }

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

  // Model color switch animation
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
      end: "top -300%",
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
        duration: 0.5,
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
      duration: 1.5,
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
      end: "top -70%",
      scrub: true,
      // markers:true
    },
  });

  document.querySelectorAll(".swiper-slide").forEach(function (slide) {
    slide.addEventListener("mousemove", function () {
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

const page5Scroll = () => {
  var page5 = document.querySelector("#page5");
  var upper = document.querySelector("#page5 #upper");
  var center = document.querySelector("#page5 #center");
  var centerContent = document.querySelector("#page5 #center .content");
  var lower = document.querySelector("#page5 #lower");

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page5",
      scroller: "body",
      // markers: true,
      start: "50% 50%",
      end: "300% 50%",
      scrub: true,
      pin: true,
    },
  });

  tl.to(
    upper,
    {
      top: "-50%",
      ease: "power1.in",
    },
    "a"
  )
    .to(
      lower,
      {
        top: "100%",
        ease: "power1.in",
      },
      "a"
    )
    .from(centerContent, {
      y: 800,
      opacity: 0,
      delay: -0.4,
      ease: "power1.in",
    });
};
page5Scroll();

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
      display: "none",
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
  ig.addEventListener("mousemove", function () {
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
