// Reveal footer: the fixed footer sits under the site (see .end-footer in styles.css).
// Once it is more than halfway uncovered, the window border takes on the footer colour so the dark footer runs edge to edge.
(function () {
  var site = document.querySelector(".site");
  if (!site) return;
  var ticking = false;

  function update() {
    ticking = false;
    var gap = window.innerHeight - site.getBoundingClientRect().bottom; // how much of the footer is uncovered
    document.body.classList.toggle("is-footer", gap > window.innerHeight * 0.5);
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
