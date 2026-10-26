Export these from Figma into this folder:

HOME PAGE
hero-pizza.jpg   (first carousel slide)
  Figma node 2002:512 ("image 3" in the Home Page frame). Export as JPG at 2x.

hero-2.jpg, hero-3.jpg ...  (more carousel slides)
  Any photos you want in the carousel, ideally 2800 x 1200 (same 7:3 shape as the hero).
  To add more, copy a <img class="hero__slide" ...> line in index.html and change the file name.
  Slides whose file is missing are skipped automatically.
  Timing: data-interval (milliseconds) on the #hero element. Fade length: the 1200ms transition on .hero__slide.

INFORMATION PAGE
info-1.jpg, info-2.jpg
  Figma nodes 2002:317 ("image 3") and 2002:492 ("image 4") in the Information frame. Export as JPG at 2x
  (each slot is 690 x 460, so 1380 x 920). Both slots currently use the same bar photo in Figma;
  swap in a different photo for either one whenever you like.

The tumble logo (home) and the "Pizzeria Delores" lettering (information) are inline SVG, so there is nothing to export for them.
