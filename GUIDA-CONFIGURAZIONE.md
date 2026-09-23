# Guida configurazione — Analytics, Banner pubblicitari, Search Console, Tag social (SEO/Open Graph)

## 1. Google Analytics

**Cosa fa**: traccia le pagine visitate e i click sui banner, solo per chi accetta il banner cookie.

1. Vai su [analytics.google.com](https://analytics.google.com) e crea una proprietà per il sito.
2. In **Amministrazione → Flussi di dati → il tuo flusso web** trovi l'ID di misurazione, formato `G-XXXXXXXXXX`.
3. Apri `js/cookie-consent.js` e sostituisci il valore placeholder:
   ```js
   var GA_MEASUREMENT_ID = "G-XXXXXXX"; // <-- metti qui il tuo ID reale
   ```
4. Non serve altro: la funzione `loadGoogleAnalytics()` carica lo script di Google **solo dopo che l'utente clicca "Accetta"** sul banner cookie. Se l'utente rifiuta o non ha ancora scelto, Analytics resta disattivato.
5. Verifica che funzioni: apri il sito, accetta il banner, poi controlla in Analytics → **Rapporti in tempo reale** che compaia la tua visita.

Note:
- L'ID non è un segreto: è normale che sia visibile nel codice sorgente/JS, tutti i siti con Analytics lo espongono così.
- Se cambi ID in futuro (nuova proprietà), basta aggiornare la stessa riga in `js/cookie-consent.js`.

## 2. Banner pubblicitari

**Cosa fa**: ogni banner è un link con immagine, cliccabile, che se l'utente ha accettato i cookie invia un evento `banner_click` a Google Analytics (per rendicontare ai clienti quanti click ha ricevuto la loro pubblicità). Gestito da `js/ads.js`.

### Come è fatto un banner esistente (esempio da `index.html`)

```html
<div class="ad-slot container">
  <a class="ad-banner ad-banner--leaderboard ad-banner--desktop-only"
     href="https://example.com" target="_blank" rel="noopener"
     onclick="trackBannerClick('Cliente_Esempio')">
    <img src="https://placehold.co/728x90/2e6b3e/ffffff?text=Banner+desktop+728x90" alt="Banner pubblicitario" />
  </a>
  <a class="ad-banner ad-banner--mobile ad-banner--mobile-only"
     href="https://example.com" target="_blank" rel="noopener"
     onclick="trackBannerClick('Cliente_Esempio')">
    <img src="https://placehold.co/320x50/2e6b3e/ffffff?text=Banner+mobile+320x50" alt="Banner pubblicitario" />
  </a>
</div>
```

Ci sono **sempre due `<a>`**: uno per desktop (728x90, classe `ad-banner--desktop-only`) e uno per mobile (320x50, classe `ad-banner--mobile-only`). Il CSS mostra l'uno o l'altro in base alla larghezza schermo — non toccare quelle classi.

### Per aggiungere un nuovo banner (nuovo cliente/spazio pubblicitario)

1. Copia il blocco `<div class="ad-slot container">...</div>` sopra.
2. Sostituisci in **entrambi** i link:
   - `href="https://example.com"` → l'URL reale del cliente/inserzionista.
   - `onclick="trackBannerClick('Cliente_Esempio')"` → un nome identificativo univoco per quel cliente/banner (es. `'AgriMacchine_Autunno2026'`). Questo nome è quello che vedrai nei report di Analytics, quindi usa nomi chiari e coerenti.
   - `src="..."` → l'immagine del banner. Deve rispettare le dimensioni: **728x90** per il desktop, **320x50** per il mobile (o proporzioni equivalenti), altrimenti risulta tagliata o deformata.
   - `alt="..."` → descrizione breve del banner (accessibilità/SEO).
3. Incolla il blocco dove vuoi che compaia il banner nella pagina (tra le `<section>`).

### Dove vedere i risultati

Google Analytics → **Rapporti → Coinvolgimento → Eventi** → cerca `banner_click`. Se vuoi un report dedicato per cliente, in Analytics crea una **dimensione personalizzata** basata sul parametro `client_name` (Amministrazione → Definizioni personalizzate).

Nota: se l'utente ha rifiutato i cookie, il click sul banner comunque porta al link del cliente (funziona sempre), ma **non viene registrato** in Analytics — è previsto, per rispettare il consenso.

## 3. Google Search Console

**Cosa fa**: mostra come il sito appare su Google (query di ricerca, posizione media, click dai risultati, eventuali errori di indicizzazione). Non traccia i visitatori, non serve consenso cookie.

1. Vai su [search.google.com/search-console](https://search.google.com/search-console).
2. **Aggiungi proprietà** → scegli **"Prefisso URL"** e inserisci `https://www.tuo-dominio.it/` (il dominio reale del sito, non il placeholder).
3. **Verifica proprietà** col metodo **"File HTML"**: scarica il file `google________.html` fornito da Google e caricalo nella root del sito, accanto a `index.html`. Conferma su Search Console.
4. **Invia la sitemap**: nel menu laterale vai su **Sitemap**, inserisci `sitemap.xml` (già presente nel progetto) e invia.
5. Aspetta qualche giorno: i primi dati (impressioni, click, query) compaiono dopo che Google ha scansionato il sito.

### Prima di fare tutto questo

Nei file del sito ci sono ancora placeholder da sostituire con il dominio reale, altrimenti Search Console e le anteprime social (Facebook/Twitter) puntano a un indirizzo falso:

- `index.html` e le altre pagine: tag `<link rel="canonical" href="https://www.tuo-dominio.it/...">` e i vari `og:url`.

Sostituisci `https://www.tuo-dominio.it` con il dominio vero in tutte le pagine prima di verificare la proprietà su Search Console.

## 4. Tag social / SEO (Open Graph, Twitter Card, canonical)

**Cosa fanno**: non influenzano il posizionamento su Google. Controllano solo come appare l'anteprima del link quando viene condiviso su social/chat (immagine, titolo, descrizione a riquadro).

- **`og:*`** (Open Graph) → letto da Facebook, WhatsApp, LinkedIn, Telegram.
- **`twitter:*`** → letto da X/Twitter.
- **`canonical`** → non è social: dice a Google qual è l'URL "ufficiale" di quella pagina (evita di essere penalizzati per contenuti duplicati).

Si trovano nell'`<head>` di ogni pagina, es. in `index.html:10-23`:

```html
<link rel="canonical" href="https://www.tuo-dominio.it/index.html" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Il Mio Blog" />
<meta property="og:locale" content="it_IT" />
<meta property="og:title" content="Il Mio Blog — Home" />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://www.tuo-dominio.it/index.html" />
<meta property="og:image" content="https://placehold.co/1200x630/2e6b3e/ffffff?text=Il+Mio+Blog" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Il Mio Blog — Home" />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://placehold.co/1200x630/2e6b3e/ffffff?text=Il+Mio+Blog" />
```

### Come personalizzarli, per ogni pagina statica (home, articoli-lista, contatti, privacy, cookie)

1. **`canonical`** e **`og:url`** → l'URL reale e definitiva di quella pagina, stesso dominio ovunque (es. `https://www.steagritech.com/contact.html`).
2. **`og:title`** e **`twitter:title`** → titolo specifico di quella pagina (non lasciare sempre lo stesso su tutte le pagine).
3. **`og:description`** e **`twitter:description`** → 1-2 frasi che riassumono il contenuto di quella pagina specifica.
4. **`og:image`** e **`twitter:image`** → un'immagine reale caricata in `assets/`, dimensioni consigliate **1200×630px** (formato per l'anteprima grande). Sostituisce il placeholder `placehold.co`.
5. **`og:site_name`** → nome del sito, fisso su tutte le pagine (es. "Agritech").
6. **`twitter:card`** → lascia `summary_large_image` (mostra l'immagine grande); non serve cambiarlo.
7. **`og:type`** → `website` per le pagine normali, `article` per le pagine di articolo (già impostato così in `article.html`).

Fai questa sostituzione su ogni file HTML del sito (`index.html`, `articles.html`, `contact.html`, `privacy.html`, `cookie.html`, ecc.), inserendo per ciascuno un titolo/descrizione/immagine coerenti con quella specifica pagina.

### Nota sugli articoli (`article.html`)

Per gli articoli questi tag **non vengono generati dinamicamente**: il contenuto dell'articolo è caricato via JavaScript (`content/articles-data.js` + `js/article.js`), ma i social non eseguono JS quando leggono un link — quindi ogni articolo condiviso mostrerà sempre lo stesso titolo/immagine generici del template, non quelli specifici dell'articolo. Per ora va bene così (rimandato); se in futuro vuoi risolverlo, serve generare una pagina HTML statica per ogni articolo con i suoi tag già scritti nell'HTML (non recuperabile solo con JS lato client).

### Come verificare il risultato

- Facebook/LinkedIn: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — incolla l'URL della pagina e vedi l'anteprima con cui la stai attualmente configurando.
- X/Twitter: [Twitter Card Validator](https://cards-dev.twitter.com/validator) (serve login).
- In generale: dopo ogni modifica ai tag di una pagina già condivisa in passato, questi strumenti hanno una cache — usa il pulsante "scrape again"/"ricarica" per vedere l'anteprima aggiornata.
