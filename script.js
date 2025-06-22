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

function homePageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
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
