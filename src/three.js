import * as THREE from "three";
import { gsap } from "gsap";
import vertexShader from "/shaders/displacment/vertex.glsl";
import fragmentShader from "/shaders/displacment/fragment.glsl";

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

const displacmentTexture = textureLoader.load("images/displacement-map.jpg");

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
const imageTransitionAnimation = () => {
  const allHeroSections = document.querySelectorAll(".page1-hero");
  allHeroSections.forEach((hero, index) => {
    hero.addEventListener("mouseenter", () => {
      if (index === 0) {
        // Text animation
        gsap.from(".page1-hero-text-vehicle>h1>span", {
          opacity: 0,
          y: 60,
          stagger: {
            amount: 0.5,
            from: "random",
          },
        });

        // Changing the textures
        plane.material.uniforms.uTexture1.value = loadedHeroTextures[0];
        plane.material.uniforms.uTexture2.value = loadedHeroTextures[prevIndex];
        gsap.from(plane.material.uniforms.uOffset, {
          value: 1,
          duration: 0.5,
          ease: "favEase",
        });

        // Blur animation
        gsap.to(".page1-vehicle", {
          backdropFilter: "blur(10px)",
        });
        gsap.to(".page1-energy", {
          backdropFilter: "blur(0px)",
        });
        gsap.to(".page1-charging", {
          backdropFilter: "blur(0px)",
        });
      } else if (index === 1) {
        // Text animation
        gsap.from(".page1-hero-text-energy>h1>span", {
          opacity: 0,
          y: 60,
          stagger: {
            amount: 0.5,
            from: "random",
          },
        });

        // Changing the textures
        plane.material.uniforms.uTexture1.value = loadedHeroTextures[1];
        plane.material.uniforms.uTexture2.value = loadedHeroTextures[prevIndex];
        gsap.from(plane.material.uniforms.uOffset, {
          value: 1,
          duration: 0.5,
          ease: "favEase",
        });

        // Blur animation
        gsap.to(".page1-vehicle", {
          backdropFilter: "blur(0px)",
        });
        gsap.to(".page1-energy", {
          backdropFilter: "blur(10px)",
        });
        gsap.to(".page1-charging", {
          backdropFilter: "blur(0px)",
        });
      } else {
        // Text animation
        gsap.from(".page1-hero-text-charging>h1>span", {
          opacity: 0,
          y: 80,
          stagger: {
            amount: 0.5,
            from: "random",
          },
        });

        // Changing the textures
        plane.material.uniforms.uTexture1.value = loadedHeroTextures[2];
        plane.material.uniforms.uTexture2.value = loadedHeroTextures[prevIndex];
        gsap.from(plane.material.uniforms.uOffset, {
          value: 1,
          duration: 0.5,
          ease: "favEase",
        });

        // Blur animation
        gsap.to(".page1-vehicle", {
          backdropFilter: "blur(0px)",
        });
        gsap.to(".page1-energy", {
          backdropFilter: "blur(0px)",
        });
        gsap.to(".page1-charging", {
          backdropFilter: "blur(10px)",
        });
      }
      prevIndex = index;
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
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(sizes.width, sizes.height);
});

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
