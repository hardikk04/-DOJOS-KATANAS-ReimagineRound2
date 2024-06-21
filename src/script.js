// Importing the libraries
import "remixicon/fonts/remixicon.css";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll Trigger
gsap.registerPlugin(ScrollTrigger);

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

const page5Animation = () => {
  const container = document.querySelectorAll(".container")
  container.forEach( (con) => {
    gsap.to(con, {
      x: calc("100%" - "20vw"),
      duration: 5,
      ease: "linear",
      repeat: Infinity,
    })
  })
};
page5Animation();