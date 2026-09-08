/* =========================================================
   contact.js — gestione base del form contatti (solo demo).
   Non invia dati a nessun server: mostra solo un messaggio
   di conferma. Per renderlo funzionante, collega l'attributo
   action del form a un servizio come Formspree, Getform,
   oppure a un tuo endpoint backend.
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("[data-contact-form]");
    var feedback = document.querySelector("[data-contact-feedback]");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      /* Qui andrebbe l'invio reale, es:
         fetch(form.action, { method: "POST", body: new FormData(form) }) */

      if (feedback) {
        feedback.textContent = "Grazie! Il tuo messaggio è stato inviato (demo, nessun dato è stato realmente trasmesso).";
        feedback.style.display = "block";
      }
      form.reset();
    });
  });
})();
