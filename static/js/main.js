/* ═══════════════════════════════════════════════════════════════════════════
   SecureGuard — Unified JavaScript
   Scroll interactions, reveal animations, mobile menu, parallax
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Mobile Menu Toggle ─────────────────────────────────────────────── */
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const menuClose  = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
    });
  }

  if (menuClose && mobileMenu) {
    menuClose.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    });
  }

  // Close menu when a link is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      });
    });
  }


  /* ── Subtle Background Parallax (disabled on touch devices) ──────── */
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      document.body.style.backgroundPosition = `0 ${scrolled * 0.1}px`;
    }, { passive: true });
  }


  /* ── Intersection Observer: Reveal on Scroll ────────────────────────── */
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100");
        entry.target.classList.remove("opacity-0", "translate-y-10");
      }
    });
  }, observerOptions);

  // Observe obsidian panels for staggered reveal
  document.querySelectorAll(".obsidian-panel").forEach((el) => {
    el.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-10");
    revealObserver.observe(el);
  });


  /* ── Smooth Scroll for Anchor Links ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });


  /* ── Active Nav Highlight on Scroll (Home page sections) ────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#'], .hidden.md\\:flex a[href^='#']");

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && href.includes(current)) {
          link.classList.add("text-primary");
          link.classList.remove("text-on-surface-variant");
        } else if (href && href.startsWith("#")) {
          link.classList.remove("text-primary");
          link.classList.add("text-on-surface-variant");
        }
      });
    }, { passive: true });
  }

})();
