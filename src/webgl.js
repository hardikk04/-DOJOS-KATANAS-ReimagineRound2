import * as THREE from "three";
import { gsap } from "gsap";
import vertexShader from "../src/shaders/water/vertex.glsl";
import fragmentShader from "../src/shaders/water/fragment.glsl";

function isMobileDevice() {
  return /Mobi|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini|Android/i.test(
    navigator.userAgent
  );
}

if (!isMobileDevice()) {
  const webGLEffect = (container, img, texture, planeWidth = 1) => {
    const imageContainer = document.querySelector(container);
    const imageElement = document.querySelector(img);

    let easeFactor = 0.2;
    let scene, camera, renderer, planeMesh;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let aberrationIntensity = 0;
    let prevPosition = { x: 0.5, y: 0.5 };

    function initializeScene(texture) {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        75,
        (imageElement.offsetWidth / imageElement.offsetHeight) * 1.1,
        0.01,
        100
      );
      camera.position.z = 1;

      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 32, 32),
        new THREE.ShaderMaterial({
          uniforms: {
            uTime: new THREE.Uniform(0),
            uFrequency: new THREE.Uniform(new THREE.Vector2(0, 0)),
            uMouse: new THREE.Uniform(new THREE.Vector2()),
            uPrevMouse: new THREE.Uniform(new THREE.Vector2()),
            uAberrationIntensity: new THREE.Uniform(0.0),
            uTexture: new THREE.Uniform(texture),
          },
          vertexShader,
          fragmentShader,
        })
      );

      scene.add(planeMesh);

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
      renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);

      imageContainer.appendChild(renderer.domElement);

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
        camera.aspect =
          imageElement.offsetWidth / planeWidth / imageElement.offsetHeight;
        camera.updateProjectionMatrix();

        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
        renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);
      }
    }

    const t = new THREE.TextureLoader().load(texture);

    initializeScene(t);

    const clock = new THREE.Clock();
    let deltaTime = null;

    let mouseE = false;
    animateScene();

    function animateScene() {
      requestAnimationFrame(animateScene);

      deltaTime = clock.getDelta();

      if (mouseE) {
        planeMesh.material.uniforms.uTime.value += deltaTime;
      }

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

      planeMesh.material.uniforms.uMouse.value.set(
        mousePosition.x,
        1.0 - mousePosition.y
      );

      planeMesh.material.uniforms.uPrevMouse.value.set(
        prevPosition.x,
        1.0 - prevPosition.y
      );

      aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);

      planeMesh.material.uniforms.uAberrationIntensity.value =
        aberrationIntensity;

      renderer.render(scene, camera);
    }

    imageContainer.addEventListener("mousemove", handleMouseMove);
    imageContainer.addEventListener("mouseenter", handleMouseEnter);
    imageContainer.addEventListener("mouseleave", handleMouseLeave);

    function handleMouseMove(event) {
      easeFactor = 0.05;
      let rect = imageContainer.getBoundingClientRect();
      prevPosition = { ...targetMousePosition };

      targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.y = (event.clientY - rect.top) / rect.height;

      aberrationIntensity = 1;
    }

    function handleMouseEnter(event) {
      mouseE = true;
      gsap.to(planeMesh.material.uniforms.uFrequency.value, {
        x: 3,
        y: 3,
        duration: 1,
      });

      easeFactor = 0.05;
      let rect = imageContainer.getBoundingClientRect();

      mousePosition.x = targetMousePosition.x =
        (event.clientX - rect.left) / rect.width;
      mousePosition.y = targetMousePosition.y =
        (event.clientY - rect.top) / rect.height;
    }

    function handleMouseLeave() {
      mouseE = false;
      gsap.to(planeMesh.material.uniforms.uFrequency.value, {
        x: 0,
        y: 0,
        duration: 1,
      });
      gsap.to(planeMesh.material.uniforms.uTime, {
        value: 0,
        duration: 1,
      });

      easeFactor = 0.05;
      targetMousePosition = { ...prevPosition };
    }
  };

  const img1 = document.querySelector(".page2-img1");
  const img2 = document.querySelector(".page2-img2");
  const img3 = document.querySelector(".page2-img3");

  img1.addEventListener(
    "mouseenter",
    webGLEffect(".page2-img1", ".page2-img1>img", "/images/page2_1.webp")
  );

  img2.addEventListener(
    "mouseenter",
    webGLEffect(".page2-img2", ".page2-img2>img", "/images/page2_2.webp")
  );

  img3.addEventListener(
    "mouseenter",
    webGLEffect(".page2-img3", ".page2-img3>img", "/images/page2_3.webp")
  );
} else {
  document.querySelector(".page2-img1>img").style.opacity = 1;
  document.querySelector(".page2-img2>img").style.opacity = 1;
  document.querySelector(".page2-img3>img").style.opacity = 1;
}

