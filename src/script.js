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
  const heads = document.querySelectorAll("#page4 #left .section #innerleft h3")

  heads.forEach(function(head) {
    var headText = head.textContent;
    var splittedText = headText.split("");
  
    var clutter = "";
    splittedText.forEach(function (elem) {
      if (elem === " ") {
        clutter += elem;
      } else {
        clutter += `<span>${elem}</span>`;
      }
    });
    head.innerHTML = clutter;
  });

  sections.forEach(function(section) {
    section.addEventListener("mouseenter", function() {
      gsap.to(section.querySelectorAll("#heading h3 span"), {
        y: -63,
        stagger: 0.025,
        ease: "elastic.in",
        duration: 0.15
      })

      gsap.to(section.querySelector(".section-overlay"), {
        opacity: 1
      })

      gsap.to(section.querySelector(".section-overlay #diamond"), {
        scale: 1,
        rotate: "45deg"
      })

      gsap.to(section.querySelector(".section-overlay #button"), {
        width: "12vw"
      })

      gsap.to(section.querySelector(".section-overlay #button h3"), {
        opacity: 1,
        delay: 0.3
      })
    })

    section.addEventListener("mouseleave", function() {
      gsap.to(section.querySelectorAll("#heading h3 span"), {
        y: 0,
        stagger: -0.025,
        ease: "elastic.out",
        duration: 0.15
      });
    
      gsap.to(section.querySelector(".section-overlay"), {
        opacity: 0
      });
    
      gsap.to(section.querySelector(".section-overlay #diamond"), {
        scale: 0,
        rotate: "0deg"
      }, "<"); // This makes the rotation animation start immediately
    
      gsap.to(section.querySelector(".section-overlay #button"), {
        width: "auto"
      });
    
      gsap.to(section.querySelector(".section-overlay #button h3"), {
        opacity: 0,
        delay: 0.3
      });
    });
    
  })
}
page4HoverAnimation()


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
