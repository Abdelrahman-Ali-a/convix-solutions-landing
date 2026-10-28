(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  /* ---------- the trunk line draws itself once ---------- */
  var map = document.querySelector(".map");
  var trunk = document.getElementById("trunk");
  if (map && trunk && !reduce && trunk.getTotalLength && trunk.getBoundingClientRect().width > 0) {
    var len = Math.ceil(trunk.getTotalLength());
    map.style.setProperty("--len", len);
    // stations and signs appear in route order as the line reaches them
    var stagger = map.querySelectorAll(".stn, .sign, .terminus, .branches, .bsign");
    for (var i = 0; i < stagger.length; i++) stagger[i].style.setProperty("--d", i * 90);
    map.classList.add("js-draw");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { map.classList.add("is-drawn"); });
    });
  }

  /* ---------- "you are here": markers ride the line as the reader moves ---------- */
  var tripLinks = Array.prototype.slice.call(document.querySelectorAll(".trip-stops a"));
  var tripMarker = document.querySelector(".trip-marker");
  var sections = tripLinks.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });

  var routeTrack = document.querySelector(".route-track");
  var routeMarker = document.querySelector(".route-marker");
  var stops = routeTrack ? Array.prototype.slice.call(routeTrack.querySelectorAll(".stop")) : [];

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function centerOf(el, origin) {
    var r = el.getBoundingClientRect();
    return r.left + r.width / 2 - origin;
  }

  function rideTrip() {
    if (!tripMarker || !tripLinks.length) return;
    var line = 110; // reading line below the sticky header
    var idx = 0, frac = 0;
    for (var k = 0; k < sections.length; k++) {
      if (sections[k] && sections[k].getBoundingClientRect().top <= line) idx = k;
    }
    var next = sections[idx + 1];
    if (next) {
      var a = sections[idx].getBoundingClientRect().top;
      var b = next.getBoundingClientRect().top;
      frac = clamp((line - a) / Math.max(1, b - a), 0, 1);
    }
    // page bottom: the contact section may never reach the reading line
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      idx = sections.length - 1; frac = 0;
    }
    var stopsBox = tripMarker.parentNode.getBoundingClientRect();
    var rtl = root.getAttribute("dir") === "rtl";
    var dots = tripLinks.map(function (a) {
      var r = a.getBoundingClientRect();
      // the roundel sits at the link's inline-start edge (or end edge on the last stop)
      var isLast = a === tripLinks[tripLinks.length - 1];
      var startEdge = rtl ? (isLast ? r.left + 8 : r.right - 8) : (isLast ? r.right - 8 : r.left + 8);
      return rtl ? stopsBox.right - startEdge : startEdge - stopsBox.left;
    });
    var from = dots[idx], to = dots[Math.min(idx + 1, dots.length - 1)];
    var x = from + (to - from) * frac - 11;
    tripMarker.style.setProperty("--ride", (rtl ? -x : x) + "px");
    tripLinks.forEach(function (a, n) {
      var here = n === idx;
      a.classList.toggle("is-here", here);
      if (here) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }

  function rideRoute() {
    if (!routeTrack || !routeMarker) return;
    var r = routeTrack.getBoundingClientRect();
    var travel = r.height - 48;
    var p = clamp((window.innerHeight * 0.55 - r.top) / Math.max(1, r.height), 0, 1);
    var y = p * travel;
    routeMarker.style.setProperty("--ride", y + "px");
    stops.forEach(function (s) { s.classList.toggle("is-passed", s.offsetTop + 4 < y); });
  }

  var queued = false;
  function update() {
    queued = false;
    rideTrip();
    rideRoute();
  }
  function queue() {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  document.addEventListener("qcore:lang", queue);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queue);
  update();
})();
