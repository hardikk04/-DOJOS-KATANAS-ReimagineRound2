// Importing the libraries
import "remixicon/fonts/remixicon.css";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { log } from "three/examples/jsm/nodes/Nodes.js";

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

//page4Animation

const page4HoverAnimation = () => {
  const sections = document.querySelectorAll("#page4 #left .section")

  sections.forEach(function(section) {
    const sectionOverlay = section.querySelector(".section-overlay")

    section.addEventListener("mouseenter", function() {
        sectionOverlay.style.pointerEvents = "all";

      gsap.to(section.querySelector(".section-overlay"), {
        opacity: 1,
        ease: "power4"
      })

      gsap.to(section.querySelector(".section-overlay #diamond"), {
        scale: 1,
        rotate: "45deg"
      })

      gsap.to(section.querySelector(".section-overlay button"), {
        opacity: 1,
        ease: "power4"
      })
    })

    section.addEventListener("mouseleave", function() {
      sectionOverlay.style.pointerEvents = "none";

      gsap.to(section.querySelector(".section-overlay"), {
        opacity: 0
      });
    
      gsap.to(section.querySelector(".section-overlay #diamond"), {
        scale: 0,
        rotate: "0deg"
      }, "<"); 
    
      gsap.to(section.querySelector(".section-overlay button"), {
        opacity: 0
      });

    });
    
  })
}
page4HoverAnimation()

const page4ClickAnimation = () => {
  const sections = document.querySelectorAll("#page4 #left .section")
  const but1 = document.getElementById("button1")
  const but2 = document.getElementById("button2")
  const but3 = document.getElementById("button3")
  const but4 = document.getElementById("button4")
  const but5 = document.getElementById("button5")

  sections.forEach(function(section) {
    but1.addEventListener("click", function() {
      gsap.to("#page4 #right #main", {
        transform: "translateX(0%)"
      })
    })
    but2.addEventListener("click", function() {
      gsap.to("#page4 #right #main", {
        transform: "translateX(-20%)"
      })
    })
    but3.addEventListener("click", function() {
      gsap.to("#page4 #right #main", {
        transform: "translateX(-40%)"
      })
    })
    but4.addEventListener("click", function() {
      gsap.to("#page4 #right #main", {
        transform: "translateX(-60%)"
      })
    })
    but5.addEventListener("click", function() {
      gsap.to("#page4 #right #main", {
        transform: "translateX(-80%)"
      })
    })
  })
}
page4ClickAnimation()

// page5Animation

const page5MarqueeAnimation = () => {
  // Initial animation setup
  gsap.to("#slide1 h2", {
    transform: "translateX(-100%)",
    duration: 10,
    repeat: -1,
    ease: "linear"
  });

  window.addEventListener("wheel", function (dets) {
    if (dets.deltaY > 0) {
      // Animation when scrolling up
      gsap.to("#slide1 h2", {
        transform: "translateX(-100%)",
        duration: 10,
        repeat: -1,
        ease: "linear"
      });
    } else {
      // Animation when scrolling down
      gsap.to("#slide1 h2", {
        transform: "translateX(0%)",
        duration: 10,
        repeat: -1,
        ease: "linear"
      });
    }
  });
}
page5MarqueeAnimation();


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
      trigger:"#discovery",
      scroller:"body",
      start:"top 40%",
      end:"top -15%",
      scrub:1,
      // markers:true
    }
  })
  tl7
  .to("#discovery #dis-text",{
    scale:1,
    clipPath:"polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
    duration: 2, 
    ease: "linear",
   
  })
  .from(".ig7",{
    y:10,
    opacity:0,
    stagger:0.3
  })
  
  var tl72 = gsap.timeline({
    scrollTrigger:{
      trigger:"#page7",
      scroller:"body",
      start:"bottom bottom",
      end:"bottom -50%",
      pin:true,
      scrub:1,
      // markers:true
    }
  })
  .to("#discovery #dis-text #container7",{
    x:"-71%",
    duration: 3, 
    ease: "power1.out",
  },"a")
  .to(".ig7",{
    x:-200,
    duration:4
  },"a")
}
page7Animation()

document.querySelectorAll(".text-animation").forEach(function(parent){
  gsap.from(parent.children[0],{
    y:100,
    duration:0.5,
    scrollTrigger:{
      trigger:parent,
      scroller:"body",
      start:"top 80%",
      end:"top 79%",
      scrub:1,
      // markers:true
    }
  })
})

// textEffect animation
// can be used by giving class .text-effect to parent , which has two childern
const textEffect = () => {
  // Splitting the text content into individual letters and wrapping each in a span with a class
  document.querySelectorAll(".text-effect").forEach(function(e){
    [...e.children].forEach(function(h){
      var clutter = "";
      h.textContent.split("").forEach(function (l) {
        clutter += `<span>${l}</span>`;
      });
      h.innerHTML = clutter;
    })
  })
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
