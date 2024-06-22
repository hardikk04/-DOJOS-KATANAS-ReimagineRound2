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


// page6Animation
const page6LeftBtnHover = () => {
  var btn = document.querySelector("#page6 #button");
  var heads = document.querySelectorAll("#page6 #button h5"); 
  var arrows = document.querySelectorAll("#page6 #button #arrow i"); 
  
  heads.forEach(function(head) {
    btn.addEventListener("mouseenter", function(){
      gsap.to(head, {
        y: "-33",
        duration: 0.3
      })
    })
    btn.addEventListener("mouseleave", function(){
      gsap.to(head, {
        y: "0",
        duration: 0.3
      })
    })
  })
  arrows.forEach(function(arrow) {
    btn.addEventListener("mouseenter", function(){
      gsap.to(arrow, {
        y: "-30",
        duration: 0.3
      })
    })
    btn.addEventListener("mouseleave", function(){
      gsap.to(arrow, {
        y: "0",
        duration: 0.3
      })
    })
  })
}
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
    }
  })

  tl6
  .to("#page6 #section2 #right", {
    y: "-168%"
  })
}
page6ScrollAnimation()


// page7Animation
const page7Animation = ()=>{
  var tl7 = gsap.timeline({
    scrollTrigger:{
      trigger:"#page7",
      scroller:"body",
      start:"25% 40%",
      end:"25% -20%",
      scrub:1,
      // markers:true
    }
  })
  
  tl7
  .to("#discovery #dis-text",{
    scale:1,
    clipPath:"polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
    duration: 2, 
    ease: "linear"
  })
  
  var tl72 = gsap.timeline({
    scrollTrigger:{
      trigger:"#page7",
      scroller:"body",
      start:"bottom bottom",
      end:"bottom -50%",
      pin:true,
      scrub:2,
      // markers:true
    }
  })
  .to("#discovery #dis-text h1",{
    x:"-72%",
    duration: 3, 
    ease: "linear"
  })
}
page7Animation()