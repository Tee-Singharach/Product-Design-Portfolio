(function () {
  const header = document.querySelector(".header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navAnchors = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 16);
  });

  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navAnchors.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  const revealElements = document.querySelectorAll(
    ".section-header, .about-layout, .subsection, .goal-card, .skill-group, .project-feature, .projects-empty, .contact-card"
  );

  revealElements.forEach(function (el) {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll(".strength-card, .hobby-card, .skill-group, .contact-card").forEach(function (el, i) {
    el.style.transitionDelay = (i % 6) * 0.06 + "s";
  });
})();
