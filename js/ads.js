function trackBannerClick(clientName) {
  if (typeof gtag !== "function") return; // Google Analytics non configurato: nessun tracciamento
  gtag("event", "banner_click", {
    client_name: clientName
  });
}
