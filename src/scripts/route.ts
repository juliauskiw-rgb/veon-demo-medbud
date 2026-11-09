// Effect 2 and 3 from design/concept.md: the route line grows into each section, its stops fill red when
// the reader reaches them, and the word «Цілодобово» is revealed once. Only classes change; the CSS animates
// transform / clip-path. Without JS or with reduced motion everything is drawn from the start.
const targets = document.querySelectorAll<HTMLElement>(".track, .stop, .wipe");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce || !("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("is-on"));
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-on");
        io.unobserve(e.target);
      }
    }
  }, { rootMargin: "0px 0px -18% 0px", threshold: 0 });
  targets.forEach((el) => io.observe(el));
}
