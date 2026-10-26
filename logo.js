// Tumble logo: the letters fall in whenever the logo scrolls into view.
// It starts only once the logo is clear of the sticky footer, and replays each time you scroll back to it.
// (The endless floating afterwards is pure CSS, see .float in styles.css.)
(function () {
  var logo = document.getElementById("wordmark");
  if (!logo) return;

  var timer;
  // Short delay so the fall is seen even when the logo is already on screen at page load
  function reveal() { clearTimeout(timer); timer = setTimeout(function () { logo.classList.add("is-in"); }, 350); }
  function reset()  { clearTimeout(timer); logo.classList.remove("is-in"); }

  if (!("IntersectionObserver" in window)) { reveal(); return; }

  // Trigger zone: the viewport minus the sticky footer (about 120px) at the bottom
  var trigger = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) reveal(); });
  }, { threshold: 0.3, rootMargin: "0px 0px -130px 0px" });

  // Rewind once the logo has left the trigger zone (it is hidden behind the footer or off screen by then)
  var offscreen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (!e.isIntersecting) reset(); });
  }, { threshold: 0, rootMargin: "0px 0px -130px 0px" });

  trigger.observe(logo);
  offscreen.observe(logo);
})();
