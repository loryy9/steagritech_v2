/* =========================================================
   cookie-consent.js — banner cookie e attivazione di Google
   Analytics SOLO dopo il consenso dell'utente.

   La scelta dell'utente (accettato/rifiutato) viene salvata in
   localStorage, non in un cookie: è uno storage "tecnico" che
   serve solo a ricordare la scelta stessa, quindi non richiede
   a sua volta consenso (a differenza dei cookie di Analytics,
   che vengono impostati solo DOPO aver cliccato "Accetta").

   ATTENZIONE: questo file gestisce solo la parte tecnica
   (banner + attivazione/blocco di Analytics). Il testo del
   banner e delle pagine privacy.html / cookie.html è un
   punto di partenza, NON un testo legale verificato: vanno
   personalizzati (o affidati a un legale/servizio come
   Iubenda) prima di pubblicare il sito.
   ========================================================= */

(function () {
  "use strict";

  /* ============================================================
     CONFIGURA QUI il tuo ID di misurazione Google Analytics
     (lo trovi su analytics.google.com dopo aver creato una
     proprietà). Finché resta "G-XXXXXXX", Analytics non si attiva
     mai, nemmeno se l'utente accetta i cookie.
     ============================================================ */
  var GA_MEASUREMENT_ID = "G-XXXXXXX";

  /* Dopo quanti mesi la scelta dell'utente "scade" e il banner ricompare
     (prassi comune anche se il GDPR non impone un numero preciso: una
     scelta fatta anni fa non è più considerata davvero "informata"). */
  var CONSENT_EXPIRY_MONTHS = 6;

  var STORAGE_KEY = "cookie-consent"; // { value: "accepted" | "rejected", date: "2026-09-08T..." }
  var bannerEl = null;

  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var saved = JSON.parse(raw);

      var expiry = new Date(saved.date);
      expiry.setMonth(expiry.getMonth() + CONSENT_EXPIRY_MONTHS);
      if (new Date() > expiry) {
        localStorage.removeItem(STORAGE_KEY); // scelta scaduta: come se non l'avesse mai fatta
        return null;
      }

      return saved.value;
    } catch (e) {
      return null; // localStorage non disponibile (es. modalità privata restrittiva) o dato corrotto: niente banner, niente Analytics
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: value, date: new Date().toISOString() }));
    } catch (e) {
      /* niente da fare se localStorage non è disponibile */
    }
  }

  function isGaConfigured() {
    return GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXX";
  }

  function loadGoogleAnalytics() {
    if (!isGaConfigured() || window.__gaLoaded) return;
    window.__gaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function hideBanner() {
    if (bannerEl) bannerEl.classList.remove("is-visible");
  }

  function getOrCreateBanner() {
    if (bannerEl) return bannerEl;

    bannerEl = document.createElement("div");
    bannerEl.className = "cookie-banner";
    bannerEl.setAttribute("role", "dialog");
    bannerEl.setAttribute("aria-label", "Preferenze sui cookie");
    bannerEl.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<p class="cookie-banner__text">Usiamo cookie tecnici necessari al funzionamento del sito e, solo con il tuo consenso, cookie di analisi per capire come viene usato il blog. Leggi la <a href="cookie.html">Cookie Policy</a>.</p>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" class="btn btn--outline" data-cookie-reject>Rifiuta</button>' +
          '<button type="button" class="btn btn--primary" data-cookie-accept>Accetta</button>' +
        "</div>" +
      "</div>";
    document.body.appendChild(bannerEl);

    bannerEl.querySelector("[data-cookie-accept]").addEventListener("click", function () {
      setConsent("accepted");
      hideBanner();
      loadGoogleAnalytics();
    });
    bannerEl.querySelector("[data-cookie-reject]").addEventListener("click", function () {
      setConsent("rejected");
      hideBanner();
    });

    return bannerEl;
  }

  function showBanner() {
    var banner = getOrCreateBanner();
    // il timeout permette al browser di applicare prima lo stato "nascosto",
    // così la comparsa scorre invece di apparire di scatto
    window.requestAnimationFrame(function () {
      banner.classList.add("is-visible");
    });
  }

  function initManageCookiesLink() {
    document.querySelectorAll("[data-manage-cookies]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        showBanner();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var consent = getConsent();
    if (consent === "accepted") {
      loadGoogleAnalytics();
    } else if (consent !== "rejected") {
      showBanner();
    }
    initManageCookiesLink();
  });
})();
