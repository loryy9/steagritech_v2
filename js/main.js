/* =========================================================
   main.js — comportamenti globali comuni a tutte le pagine
   - menu hamburger (apri/chiudi su mobile)
   - cambio tema chiaro/scuro con salvataggio in localStorage
   - evidenzia il link attivo nella navbar
   ========================================================= */

(function () {
  "use strict";

  var THEME_KEY = "blog-theme";

  /* ---------- Tema chiaro/scuro ---------- */
  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.textContent = theme === "dark" ? "☀️" : "🌙";
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Attiva tema chiaro" : "Attiva tema scuro"
      );
    }
  }

  function initTheme() {
    var stored = getStoredTheme();
    var preferred = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    preferred = 'light'; // Forza il tema chiaro
    applyTheme(preferred);

    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        var next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      });
    }
  }

  /* ---------- Menu hamburger ---------- */
  function initHamburger() {
    var button = document.querySelector("[data-hamburger]");
    var menu = document.querySelector("[data-navbar-menu]");
    if (!button || !menu) return;

    button.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    /* chiudi il menu quando si clicca su un link */
    menu.querySelectorAll(".navbar__link").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    /* chiudi il menu se si allarga la finestra oltre il breakpoint mobile */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 699 && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Link attivo nella navbar ---------- */
  function markActiveLink() {
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar__link").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === currentPage) {
        link.classList.add("is-active");
      }
    });
  }

  /* ---------- Pulsante "torna su" ---------- */
  function initBackToTop() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Torna all'inizio della pagina");
    button.textContent = "↑";
    document.body.appendChild(button);

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
      button.classList.toggle("is-visible", window.scrollY > 500);
    });
  }

  /* ---------- Movimento della card contatti durante lo scroll ---------- */
  function initContactCardMotion() {
    var card = document.querySelector(".contact-cta__inner");
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var frameRequested = false;

    function updateCardPosition() {
      var viewportHeight = window.innerHeight;
      var cardHeight = card.offsetHeight;
      var progress = (viewportHeight - card.getBoundingClientRect().top) / (viewportHeight + cardHeight);
      var centeredProgress = Math.max(0, Math.min(1, progress));
      var distance = window.innerWidth <= 699
        ? 0
        : Math.min(120, window.innerWidth * 0.12);
      var horizontalProgress = centeredProgress < 0.5
        ? centeredProgress * 2
        : (1 - centeredProgress) * 2;
      var direction = centeredProgress < 0.5 ? -1 : 1;
      var translateX = direction * distance * (1 - horizontalProgress);
      var rotation = 8 * (1 - centeredProgress * 2);
      var scale = 0.97 + horizontalProgress * 0.03;

      card.style.setProperty("--contact-cta-x", translateX.toFixed(2) + "px");
      card.style.setProperty("--contact-cta-rotation", rotation.toFixed(2) + "deg");
      card.style.setProperty("--contact-cta-scale", scale.toFixed(3));
      frameRequested = false;
    }

    function requestCardPosition() {
      if (frameRequested) return;
      frameRequested = true;
      window.requestAnimationFrame(updateCardPosition);
    }

    window.addEventListener("scroll", requestCardPosition, { passive: true });
    window.addEventListener("resize", requestCardPosition);
    updateCardPosition();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initHamburger();
    markActiveLink();
    initBackToTop();
    initContactCardMotion();
  });
})();
