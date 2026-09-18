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

    function setMenuOpen(isOpen) {
      menu.classList.toggle("is-open", isOpen);
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.documentElement.classList.toggle("is-menu-open", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    }

    button.addEventListener("click", function () {
      setMenuOpen(!menu.classList.contains("is-open"));
    });

    /* chiudi il menu quando si clicca su un link */
    menu.querySelectorAll(".navbar__link").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });

    /* chiudi il menu se si allarga la finestra oltre il breakpoint mobile */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 699 && menu.classList.contains("is-open")) {
        setMenuOpen(false);
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
    if (!card) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      card.classList.add("is-revealed");
      return;
    }

    var mobileQuery = window.matchMedia("(max-width: 699px)");
    var scrollHandler = null;
    var resizeHandler = null;
    var observer = null;

    /* Desktop/tablet: movimento continuo legato allo scroll (traslazione,
       rotazione e scala), invariato. */
    function setupDesktopMotion() {
      var frameRequested = false;

      function updateCardPosition() {
        var viewportHeight = window.innerHeight;
        var cardHeight = card.offsetHeight;
        var progress = (viewportHeight - card.getBoundingClientRect().top) / (viewportHeight + cardHeight);
        var centeredProgress = Math.max(0, Math.min(1, progress));
        var distance = Math.min(120, window.innerWidth * 0.12);
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

      scrollHandler = requestCardPosition;
      resizeHandler = requestCardPosition;
      window.addEventListener("scroll", scrollHandler, { passive: true });
      window.addEventListener("resize", resizeHandler);
      updateCardPosition();
    }

    /* Mobile: niente rotazione. La card segue l'ingresso e l'uscita dalla
       viewport, così il movimento si ripete anche tornando indietro. */
    function setupMobileReveal() {
      card.classList.remove("is-revealed");
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              card.classList.add("is-revealed");
            } else {
              card.classList.remove("is-revealed");
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(card);
    }

    function teardown() {
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (observer) observer.disconnect();
      scrollHandler = resizeHandler = observer = null;
      card.style.removeProperty("--contact-cta-x");
      card.style.removeProperty("--contact-cta-rotation");
      card.style.removeProperty("--contact-cta-scale");
      card.classList.remove("is-revealed");
    }

    function applyForViewport(matches) {
      teardown();
      if (matches) {
        setupMobileReveal();
      } else {
        setupDesktopMotion();
      }
    }

    applyForViewport(mobileQuery.matches);
    mobileQuery.addEventListener("change", function (event) {
      applyForViewport(event.matches);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initHamburger();
    markActiveLink();
    initBackToTop();
    initContactCardMotion();
  });
})();
