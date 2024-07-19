import * as THREE from "three";
import { gsap } from "gsap";
import vertexShader from "/shaders/displacment/vertex.glsl";
import fragmentShader from "/shaders/displacment/fragment.glsl";

function isMobileDevice() {
  return /Mobi|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini|Android/i.test(
    navigator.userAgent
  );
}

if (!isMobileDevice()) {
  // Clutter Animation
  const clutterAnimation = (element) => {
    const htmlTag = document.querySelector(element);
    let clutter = "";

    // Splitting the text content into individual letters and wrapping each in a span with a class
    htmlTag.textContent.split("").forEach((word) => {
      clutter += `<span class="inline-block">${word}</span>`;
    });

    // Updating the HTML content of the element with the animated spans
    htmlTag.innerHTML = clutter;
  };

  /**
   * Scene
   */
  const scene = new THREE.Scene();

  /**
   * Loader
   */
  const textureLoader = new THREE.TextureLoader();

  // Loading all textures

  const video1 = document.querySelector(".page1-video1");
  const video2 = document.querySelector(".page1-video2");
  const video3 = document.querySelector(".page1-video3");

  const videoTextures = [video2, video3, video1];

  const displacmentTexture = textureLoader.load("images/d3.webp");

  const loadedHeroTextures = videoTextures.map((texture) => {
    const t = new THREE.VideoTexture(texture);
    return t;
  });

  /**
   * Plane
   */
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture1: new THREE.Uniform(loadedHeroTextures[0]),
        uTexture2: new THREE.Uniform(loadedHeroTextures[1]),
        uDisplacmentTexture: new THREE.Uniform(displacmentTexture),
        uOffset: new THREE.Uniform(0),
      },
    })
  );
  scene.add(plane);

  /**
   * Image transition animation
   */

  // Breaking the text
  clutterAnimation(".page1-hero-text-vehicle>h1");
  clutterAnimation(".page1-hero-text-energy>h1");
  clutterAnimation(".page1-hero-text-charging>h1");

  let prevIndex = 0;
  let vehicleTextAnimation = true;
  let energyTextAnimation = true;
  let chargingTextAnimation = true;

  // Vehicle Video Transition
  const vehicleVideoAnimation = (index, prevIndex) => {
    // Random displacement texture
    plane.material.uniforms.uDisplacmentTexture.value = displacmentTexture;
    // Text animation
    if (vehicleTextAnimation) {
      vehicleTextAnimation = false;
      gsap.from(".page1-hero-text-vehicle>h1>span", {
        opacity: 0,
        y: 45,
        stagger: {
          amount: prevIndex <= 0 ? 0.25 : -0.25,
          from: "x",
        },
        onComplete: () => {
          vehicleTextAnimation = true;
        },
      });
    }

    // Changing the textures
    plane.material.uniforms.uTexture1.value = loadedHeroTextures[0];
    plane.material.uniforms.uTexture2.value = loadedHeroTextures[prevIndex];
    gsap.from(plane.material.uniforms.uOffset, {
      value: 1,
      duration: 0.5,
      ease: "favEase",
    });

    // Blur animation
    gsap.to(".page1-blur", {
      left: "0%",
    });
  };

  // Energy Video Transition
  const energyVideoAnimation = (index, prevIndex) => {
    // Random displacement texture
    plane.material.uniforms.uDisplacmentTexture.value = displacmentTexture;

    // Text animation
    if (energyTextAnimation) {
      energyTextAnimation = false;
      gsap.from(".page1-hero-text-energy>h1>span", {
        opacity: 0,
        y: 45,
        stagger: {
          amount: prevIndex <= 1 ? 0.25 : -0.25,
          from: "x",
        },
        onComplete: () => {
          energyTextAnimation = true;
        },
      });
    }

    // Changing the textures
    plane.material.uniforms.uTexture1.value = loadedHeroTextures[1];
    plane.material.uniforms.uTexture2.value = loadedHeroTextures[prevIndex];
    gsap.from(plane.material.uniforms.uOffset, {
      value: 1,
      duration: 0.5,
      ease: "favEase",
    });

    // Blur animation
    gsap.to(".page1-blur", {
      left: "33.3333%",
    });
  };

  // Charging Video Transition
  const chargingVideoAnimation = () => {
    // Random displacement texture
    plane.material.uniforms.uDisplacmentTexture.value = displacmentTexture;

    // Text animation
    if (chargingTextAnimation) {
      chargingTextAnimation = false;
      gsap.from(".page1-hero-text-charging>h1>span", {
        opacity: 0,
        y: 45,
        stagger: {
          amount: 0.25,
          from: "x",
        },
        onComplete: () => {
          chargingTextAnimation = true;
        },
      });
    }

    // Changing the textures
    plane.material.uniforms.uTexture1.value = loadedHeroTextures[2];
    plane.material.uniforms.uTexture2.value = loadedHeroTextures[prevIndex];
    gsap.from(plane.material.uniforms.uOffset, {
      value: 1,
      duration: 0.5,
      ease: "favEase",
    });

    // Blur animation
    gsap.to(".page1-blur", {
      left: "66.6666%",
    });
  };

  // Event listener on vehicle,energy and charging
  const imageTransitionAnimation = () => {
    const allHeroSections = document.querySelectorAll(".page1-hero");
    allHeroSections.forEach((hero, index) => {
      hero.addEventListener("mouseenter", () => {
        if (index === 0) {
          vehicleVideoAnimation(index, prevIndex);
        } else if (index === 1) {
          energyVideoAnimation(index, prevIndex);
        } else {
          chargingVideoAnimation(index, prevIndex);
        }
        prevIndex = index;
      });
      hero.addEventListener("mouseleave", () => {
        // video playing from over
        video1.currentTime = 0;
        video2.currentTime = 0;
        video3.currentTime = 0;
        plane.material.uniforms.uOffset.value = 0;
      });
    });
  };

  imageTransitionAnimation();

  /**
   * Sizes
   */
  const sizes = {};
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    1,
    100
  );
  camera.position.z = 3;
  scene.add(camera);

  /**
   * Canvas
   */
  const canvas = document.querySelector(".webgl");

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight);

  /**
   * Animation
   */
  const tick = () => {
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
  };
  tick();

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
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(sizes.width, sizes.height);
  }
}
