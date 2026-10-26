// Carousels: every [data-carousel] element crossfades through its <img> slides.
// The interval (ms) comes from data-interval. Slides that fail to load are skipped.
Array.prototype.forEach.call(document.querySelectorAll("[data-carousel]"), function (hero) {
  var all = Array.prototype.slice.call(hero.querySelectorAll("img"));
  if (all.length < 2) return;
  var interval = parseInt(hero.getAttribute("data-interval"), 10) || 5000;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;
  var timer = null;

  function usable() {
    return all.filter(function (img) {
      return img.complete ? img.naturalWidth > 0 : true; // still loading counts as usable
    });
  }

  function show(next) {
    var slides = usable();
    if (slides.length < 2) return;
    var from = all[current];
    var idx = slides.indexOf(from);
    var target = typeof next === "number" ? slides[next % slides.length]
                                          : slides[(idx + 1) % slides.length];
    if (target === from) return;
    from.classList.remove("is-active");
    target.classList.add("is-active");
    current = all.indexOf(target);
  }

  function start() {
    stop();
    if (reduceMotion) return;          // no autoplay for people who asked for less motion
    timer = setInterval(function () { show(); }, interval);
  }

  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  // Pause while the tab is hidden so slides don't pile up
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  // Drop slides that 404 so the carousel never fades to an empty frame
  all.forEach(function (img) {
    img.addEventListener("error", function () {
      if (all.indexOf(img) === current) show();
      img.remove();
      all = all.filter(function (s) { return s !== img; });
      current = Math.max(0, all.findIndex(function (s) { return s.classList.contains("is-active"); }));
    });
  });

  start();
});
