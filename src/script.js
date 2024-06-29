// Importing the libraries
import "remixicon/fonts/remixicon.css";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Scroll Trigger
gsap.registerPlugin(ScrollTrigger, TextPlugin);

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

  lenis.on("scroll", (e) => { });

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
    });
  });
  document.querySelectorAll(".magnet-effect").forEach(function (e) {
    e.addEventListener("mouseleave", function () {
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
    rotationAngle = 0
    document.querySelector('#wheel').style.transform = `translateX(-50%) rotate(${rotationAngle}deg) scale(1.2)`;
    document.querySelector("#contact").style.opacity = 1
    gsap.to("#menu-page", {
      display: "block",
      opacity: 1,
      duration: .5
    })
  })
  document.querySelector(".menu-close").addEventListener("click", function () {
   window.scrollTo(0,0)
    gsap.to("#menu-page", {
      display: "none",
      opacity: 0,
      duration: .5

    })
  })
  window.addEventListener('wheel', function (event) {
    // Getting the amount of scroll from the events
    let delta = event.deltaY;
    // Increase or decrease the rotation angle by the scroll amount
    rotationAngle += delta;

    let circle = document.querySelector('#wheel');
    circle.style.transform = `translateX(-50%) rotate(${rotationAngle}deg) scale(1.2)`;

    document.querySelectorAll(".mtxt").forEach(function (txt) {
      // center value of text in x-axis with respect to window
      let txtCenter = txt.getBoundingClientRect().x + txt.getBoundingClientRect().width / 2
      // condition to check if center value lies b/w (window.innerWidth / 2 - 300) & (window.innerWidth / 2 + 300)
      if ((window.innerWidth / 2 - 300) < txtCenter && (window.innerWidth / 2 + 300) > txtCenter) {
        txt.style.opacity = 1
      }
      else {
        txt.style.opacity = 0.2

      }
    })

  });
}
menuAnimation()

// Page2 Animation
const page2Animation = () => {
  const paragraphText = [
    "Model S Plaid has the quickest acceleration of any vehicle in production. Updated battery architecture for all Model S",
    "The Tesla Model 3 is a groundbreaking electric vehicle that has set new standards for performance, efficiency, and accessibility in the automotive industry. Launched in 2017.",
    "The Tesla Model X is a high-performance electric SUV that combines impressive range, cutting-edge technology, and unparalleled acceleration. Available in Long Range and Plaid variants.",
  ];

  const t1 = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: ".page2-img1",
      start: "top 100%",
      end: "top 0%",
      scrub: 2,
      // markers: true,
    },
  });

  const t2 = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: ".page2-img2",
      start: "top 100%",
      end: "top 0%",
      scrub: 2,
      // markers: true,
    },
  });

  const t3 = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: ".page2-img3",
      start: "top 100%",
      end: "top 0%",
      scrub: 2,
      // markers: true,
    },
  });

  t1.from(".page2-text>h1", {
    text: "",
    x: 30,
    opacity: 0,
    delay: 2,
  });

  t1.from(".page2-text>p", {
    text: "",
    delay: 2,
  });

  t1.from(".page2-text>button", {
    opacity: 0,
    x: 30,
  });

  t1.from(".page2-speed", {
    opacity: 0,
    x: 30,
  });

  t1.from(".page2-circle>h1", {
    text: "0.00s",
  });

  t1.from(".page2-speed>h3", {
    opacity: 0,
    x: 30,
  });

  t1.from(".page2-elem1>h1", {
    text: "000 mi",
  });

  t1.from(".page2-elem2>h1", {
    text: "000 mph",
  });

  t1.from(".page2-elem3>h1", {
    text: "0 Year",
  });

  t1.from(".page2-elem4>h1", {
    text: "0000 hp",
  });

  // Model 2

  t2.to(".page2-text>h1", {
    text: "TESLA",
  });

  t2.to(".page2-text>p", {
    text: paragraphText[1],
  });

  t2.to(".page2-circle>h1", {
    text: "2.89s",
  });

  t2.to(".page2-elem1>h1", {
    text: "580 mi",
  });

  t2.to(".page2-elem2>h1", {
    text: "400 mph",
  });

  t2.to(".page2-elem3>h1", {
    text: "8 Year",
  });

  t2.to(".page2-elem4>h1", {
    text: "2040 hp",
  });

  // Model 2

  t3.to(".page2-text>h1", {
    text: "TESLA",
  });

  t3.to(".page2-text>p", {
    text: paragraphText[2],
  });

  t3.to(".page2-circle>h1", {
    text: "3.89s",
  });

  t3.to(".page2-elem1>h1", {
    text: "680 mi",
  });

  t3.to(".page2-elem2>h1", {
    text: "600 mph",
  });

  t3.to(".page2-elem3>h1", {
    text: "10 Year",
  });

  t3.to(".page2-elem4>h1", {
    text: "3040 hp",
  });
};

page2Animation();

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
        rotate: "45deg",
      });

      gsap.to(section.querySelector(".section-overlay button"), {
        opacity: 1,
        ease: "power4"
      })
    })

    section.addEventListener("mouseleave", function() {
      sectionOverlay.style.pointerEvents = "none";

      gsap.to(section.querySelector(".section-overlay"), {
        opacity: 0,
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

const page4LeftAnimation = () => {
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
page4LeftAnimation()

const page4RightAnimation = () => {
  // section 1 & 3
  const sections = document.querySelectorAll("#page4 #right .section");

  sections.forEach(function(section) {
    const subsecs1 = section.querySelectorAll("#overlay #sub-sec1");
    const hoverDivsPart1 = section.querySelectorAll("#hover-divs #hover-1");
    const parts = section.querySelectorAll("#hover-divs #hover-1 .parts");

    const subsecs2 = section.querySelectorAll("#overlay #sub-sec2");
    const hoverDivsPart2 = section.querySelectorAll("#hover-divs #hover-2");
    const parts2 = section.querySelectorAll("#hover-divs #hover-2 .parts");

    const subsecs3 = section.querySelectorAll("#overlay #sub-sec3");
    const hoverDivsPart3 = section.querySelectorAll("#hover-divs #hover-3");
    const parts3 = section.querySelectorAll("#hover-divs #hover-3 .parts");

    subsecs1.forEach(function(subsec1) {
      subsec1.addEventListener("mouseenter", function() {
        hoverDivsPart1.forEach(function(hoverDivPart1) {
          hoverDivPart1.style.height = "38.5vw";
        });

        parts.forEach((part) => {
          gsap.to(part, {
            duration: 0.5,
            display: "block",
          }),
          gsap.to(part, {
            opacity: 1,
            duration: 0.5,
          });
        });
      });
    });

    subsecs2.forEach(function(subsec2) {
      subsec2.addEventListener("mouseenter", function() {
        hoverDivsPart2.forEach(function(hoverDivPart2) {
          hoverDivPart2.style.height = "38.5vw";
        });

        parts2.forEach((part) => {
          gsap.to(part, {
            duration: 0.5,
            display: "block",
          }),
          gsap.to(part, {
            opacity: 1,
            duration: 0.5,
          });
        });
      });
    });

    subsecs3.forEach(function(subsec3) {
      subsec3.addEventListener("mouseenter", function() {
        hoverDivsPart3.forEach(function(hoverDivPart3) {
          hoverDivPart3.style.height = "38.5vw";
        });

        parts3.forEach((part) => {
          gsap.to(part, {
            duration: 0.5,
            display: "block",
          }),
          gsap.to(part, {
            opacity: 1,
            duration: 0.5,
          });
        });
      });
    });
  });

  // section 2
const subsections = document.querySelectorAll("#page4 #right #section2 [id^=sub-sec]");
const videos = document.querySelectorAll("#page4 #right #section2 #videos [id^=video]");

function showVideo(index) {
  videos.forEach((video, idx) => {
    if (idx === index) {
      video.style.opacity = "1";
      video.currentTime = 0;
      video.play();
    } else {
      video.style.opacity = "0";
    }
  });
}

subsections.forEach((subsec, idx) => {
  subsec.addEventListener("mouseenter", () => showVideo(idx));
});

};
page4RightAnimation();


// page5Animation

const page5MarqueeAnimation = () => {
  // Initial animation setup
  gsap.to("#slide1 h2", {
    transform: "translateX(-100%)",
    duration: 10,
    repeat: -1,
    ease: "linear"
  });

  // window.addEventListener("wheel", function (dets) {
  //   if (dets.deltaY > 0) {
  //     // Animation when scrolling up
  //     gsap.to("#slide1 h2", {
  //       transform: "translateX(-100%)",
  //       duration: 10,
  //       repeat: -1,
  //       ease: "linear"
  //     });
  //   } else {
  //     // Animation when scrolling down
  //     gsap.to("#slide1 h2", {
  //       transform: "translateX(0%)",
  //       duration: 10,
  //       repeat: -1,
  //       ease: "linear"
  //     });
  //   }
  // });
}
// page5MarqueeAnimation();


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
