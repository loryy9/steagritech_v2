# Checklist pre-lancio

Elenco di tutto quello che resta da modificare/sistemare/correggere prima di pubblicare il sito.

## Bloccanti (da fare per forza prima di andare online)

- [ ] **Dominio reale**: sostituire `https://www.tuo-dominio.it` con il dominio vero in:
  - `robots.txt` (riga con `Sitemap:`)
  - `sitemap.xml` (tutti i 14 tag `<loc>`)
  - ogni pagina HTML: `<link rel="canonical">`, `og:url`
- [ ] **Immagine social di default**: sostituire `https://placehold.co/1200x630/...` (placeholder) con un'immagine reale 1200×630px, caricata in `assets/` (es. `assets/og-image.jpg`), in tutti gli `og:image` / `twitter:image` — vedi `GUIDA-CONFIGURAZIONE.md` sezione 4.
- [ ] **Titoli/descrizioni social per pagina**: personalizzare `og:title`, `og:description`, `twitter:title`, `twitter:description` per ogni pagina (oggi sono generici/uguali ovunque) — vedi `GUIDA-CONFIGURAZIONE.md` sezione 4.
- [ ] **Google Analytics**: inserire l'ID reale (`G-XXXXXXXXXX`) in `js/cookie-consent.js`, variabile `GA_MEASUREMENT_ID` — vedi `GUIDA-CONFIGURAZIONE.md` sezione 1.
- [ ] **Banner pubblicitari d'esempio**: in `index.html` (righe con `href="https://example.com"` e `onclick="trackBannerClick('Cliente_Esempio')"`) sostituire con un cliente reale, oppure rimuovere il blocco `<div class="ad-slot container">...</div>` finché non hai un cliente — vedi `GUIDA-CONFIGURAZIONE.md` sezione 2.
- [X] **Testo legale privacy/cookie**: completare tutti i placeholder `[DA COMPLETARE]` in `privacy.html` e `cookie.html` (titolare del trattamento, finalità, base giuridica, conservazione dati, data ultimo aggiornamento) — o sostituire con un servizio come Iubenda.
- [ ] **File `.htaccess`**: caricarlo su Aruba nella cartella principale del sito (già presente nel progetto, manca solo l'upload).

## Da correggere

- [ ] **Slug articoli demo in `sitemap.xml`**: alcuni URL (es. `guida-css-variables`, `dark-mode-in-5-minuti`) sembrano articoli di esempio, non reali — verificare e aggiornare l'elenco con gli articoli veri quando saranno pubblicati.
- [ ] **`STEP` in `js/articles.js`**: di default è basso (2) per test — alzalo (es. a 10) quando il sito va online, come indicato nel README.

## Nice-to-have (facoltativo, non bloccante)

- [ ] Verificare le anteprime social con [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) e [Twitter Card Validator](https://cards-dev.twitter.com/validator) dopo aver messo dominio/immagini reali.
- [ ] Registrare la proprietà su Google Search Console e inviare la sitemap — vedi `GUIDA-CONFIGURAZIONE.md` sezione 3.

## Riferimento

Per le guide passo-passo su Analytics, banner pubblicitari, Search Console e tag social, vedi `GUIDA-CONFIGURAZIONE.md`.
