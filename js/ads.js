/* =========================================================
   ads.js — tracciamento dei banner pubblicitari gestiti da te
   (nessun servizio esterno, nessuna AdSense).

   Ogni banner è un normale <a href="..."><img ...></a> scritto
   a mano dentro la pagina, con un attributo onclick che chiama
   questa funzione per segnalare il click a Google Analytics.
   Vedi il README per l'esempio completo da incollare.
   ========================================================= */

function trackBannerClick(clientName) {
  if (typeof gtag !== "function") return; // Google Analytics non configurato: nessun tracciamento
  gtag("event", "banner_click", {
    client_name: clientName
  });
}
