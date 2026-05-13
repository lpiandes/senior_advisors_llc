const revealElements = document.querySelectorAll(".reveal");
const parallaxElements = document.querySelectorAll("[data-parallax]");
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -70px",
  },
);

revealElements.forEach((element) => observer.observe(element));

const updateParallax = () => {
  const scrollY = window.scrollY;

  parallaxElements.forEach((element) => {
    const speed = Number(element.dataset.parallax || 0);
    const offset = scrollY * speed;
    element.style.setProperty("--parallax-offset", `${offset}px`);
  });
};

let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true },
);

updateParallax();
