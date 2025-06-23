const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

var timeout;

function circleMouseFollow(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}

function cursorSkew() {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    var xdiff = dets.clientX - xprev;
    xprev = dets.clientX;

    var ydiff = dets.clientY - yprev;
    yprev = dets.clientY;

    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);
    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);

    circleMouseFollow(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}
cursorSkew();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mousemove", function (dets) {
    const img = elem.querySelector("img");
    const h1 = elem.querySelector("h1");

    // Get bounding rect of the image to get its width and height
    const rect = img.getBoundingClientRect();
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(img, {
      opacity: 1,
      ease: Power3,
      top: dets.clientY - elem.getBoundingClientRect().top - imgHeight / 2,
      left: dets.clientX - imgWidth / 2,
      rotate: gsap.utils.clamp(-30, 30, diffrot),
      duration: 0.5,
    });

    gsap.to(h1, {
      x: 30, // This moves the element 30px to the right
      ease: Power2.easeOut,
      duration: 0.5,
    });
  });

  elem.addEventListener("mouseleave", function (dets) {
    const h1 = elem.querySelector("h1");
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      duration: 0.5,
    });

    gsap.to(h1, {
      x: 0, // This moves the element 30px to the right
      ease: Power2.easeOut,
      duration: 0.5,
    });
  });
});

document.querySelectorAll("#footerright h5").forEach((h5) => {
  h5.addEventListener("click", function () {
    // Change color to orange for feedback
    h5.style.color = "orange";

    // Optional: animate back to original color after a short time
    setTimeout(() => {
      h5.style.color = ""; // Remove inline style to fallback to CSS
    }, 300); // 300ms = 0.3 second

    // Open link in new tab
    const url = h5.getAttribute("data-link");
    window.open(url, "_blank");
  });
});

function homePageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  });

  tl.to(".meleelem", {
    y: 0, // Bring it back to original position
    duration: 1,
    ease: "expo.inOut", // Or Expo.easeInOut if you're using GSAP v2
    stagger: 0.2, // Optional: stagger each element
    delay: -1,
  });

  tl.to(".boundingelem", {
    y: 0,
    ease: Expo.easeInOut,
    duration: 1.5,
    stagger: 0.2,
    delay: -1,
  });
}

// circleMouseFollow();
homePageAnim();
