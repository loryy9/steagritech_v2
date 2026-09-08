# Blog Boilerplate

Boilerplate statico (HTML + CSS + JS puro, nessun framework, nessuna build) per un blog con Home, Articoli, Articolo singolo e Contatti.

## Come avviarlo

Nessun server richiesto: apri `index.html` con doppio click e il sito funziona subito, anche offline. Gli articoli sono inclusi come dati JavaScript (`content/articles-data.js`), non caricati via `fetch()`, quindi non c'è il classico blocco CORS dei file aperti da `file://`.

Se preferisci comunque un server locale (es. per pubblicare online o testare in condizioni più simili alla produzione), va bene lo stesso:

```bash
# Con Python
python -m http.server 8080

# Con Node (npx, nessuna installazione permanente)
npx serve .
```

## Struttura del progetto

```
index.html          Home (hero, chi siamo, articoli in evidenza)
articles.html        Elenco articoli con ricerca, filtro categoria e "carica altri"
article.html          Pagina di un singolo articolo (?slug=...), condivisione, articoli correlati
contact.html          Pagina contatti con form (demo, senza backend) e checkbox privacy
404.html               Pagina "non trovata"
privacy.html            Informativa privacy (scheletro da completare)
cookie.html              Cookie Policy (scheletro da completare)

robots.txt              Indica ai motori di ricerca dove trovare la sitemap
sitemap.xml             Elenco delle pagine per i motori di ricerca (da aggiornare a mano)

css/variables.css      Tutte le variabili di tema (colori, font, spazi, tema scuro)
css/style.css           Stili del sito, organizzato a sezioni commentate

js/main.js              Menu hamburger + cambio tema + link attivo + pulsante "torna su"
js/articles.js           Articoli in evidenza / elenco con ricerca, filtro categoria, paginazione
js/article.js            Articolo singolo: contenuto, condivisione, tempo di lettura, correlati
js/contact.js            Gestione demo del form contatti
js/ads.js                Tracciamento dei click sui banner pubblicitari (trackBannerClick)
js/cookie-consent.js     Banner cookie + attivazione di Google Analytics solo dopo consenso

content/articles-data.js  Tutti gli articoli (metadati + contenuto HTML), come dati JS

assets/logo.svg           Logo di esempio
assets/banners/           Qui salvi le immagini dei banner dei tuoi clienti
```

## Aggiungere un nuovo articolo

Apri `content/articles-data.js`: è un array `window.BLOG_ARTICLES`. Copia uno degli oggetti esistenti, incollalo in cima o in fondo all'array e cambia i valori:

```js
{
  slug: "il-tuo-slug",
  title: "Titolo dell'articolo",
  excerpt: "Breve riassunto mostrato nelle card.",
  category: "Sviluppo",
  author: "Il tuo nome",
  date: "2026-09-08",
  image: "https://.../immagine.jpg",
  featured: false,
  content: `<p>Qui va il contenuto HTML dell'articolo: paragrafi, titoli h2/h3, immagini, liste, blockquote...</p>`
}
```

Nota le virgolette **backtick** (`` ` ``) attorno al campo `content`: permettono di scrivere HTML su più righe. Ricorda la virgola `,` tra un oggetto e il successivo nell'array.

Fatto: l'articolo comparirà automaticamente nella pagina Articoli (in ordine di data), nella ricerca, nel filtro per categoria, tra gli articoli correlati di articoli della stessa categoria e, se `featured: true`, anche tra gli articoli in evidenza in Home (max 3 di default, modificabile con l'attributo `data-featured="N"` sull'elemento in `index.html`).

Il caricamento "a step" mostra un numero limitato di articoli alla volta (variabile `STEP` in `js/articles.js`, di default 2 in questo progetto — alzalo, es. a 10, quando pubblichi davvero).

**Ricorda anche**: quando aggiungi o modifichi un articolo, aggiorna a mano `sitemap.xml` (copia un blocco `<url>` esistente e cambia i valori) — non si aggiorna da solo, dato che il sito non ha un server che lo possa generare al volo. Non è obbligatorio per far funzionare il sito, ma aiuta i motori di ricerca a scoprire i nuovi contenuti.

## Personalizzare i colori e il tema

Tutto è in `css/variables.css`:

- variabili sotto `:root` → tema chiaro
- variabili sotto `:root[data-theme="dark"]` → tema scuro

Basta cambiare i valori esadecimali per rifare completamente la palette. Il pulsante 🌙/☀️ in navbar cambia tema e salva la scelta dell'utente in `localStorage`; se l'utente non ha mai scelto, il sito segue automaticamente il tema del sistema operativo.

## Layout degli articoli in evidenza (Home)

La sezione "Articoli in evidenza" in `index.html` usa lo stesso meccanismo della posizione del logo: cambia solo la classe sul contenitore, il JavaScript resta identico. Tre opzioni:

| Classe                        | Aspetto |
|--------------------------------|---------|
| `featured-grid--mosaic`         | 1 articolo grande a sinistra + 2 impilati a destra (default) |
| `featured-grid--mosaic-flip`    | Come sopra, specchiato: grande a destra |
| `featured-grid--equal`          | Tutti gli articoli della stessa dimensione, in fila (si adatta a qualsiasi numero) |

```html
<div class="featured-grid featured-grid--mosaic" data-featured="3">
```

Le varianti "mosaico" sono pensate per esattamente 3 articoli (il primo diventa quello grande); `featured-grid--equal` invece si adatta a qualunque numero, se cambi `data-featured="N"`. Su schermi sotto i 1000px tutte le varianti diventano una singola colonna impilata, per restare leggibili su tablet e mobile.

**Quali articoli compaiono**: quelli con `featured: true` in `content/articles-data.js` (in ordine di data, il più recente per primo — quindi il primo che marchi `featured: true` più recente diventa quello "grande" nel mosaico); se non ne marchi nessuno, vengono mostrati semplicemente gli ultimi 3 pubblicati.

## Posizione del logo nella navbar

Su ogni pagina, l'elemento `<header class="navbar ...">` ha una classe modificatore:

- `navbar--logo-left` (default)
- `navbar--logo-center`
- `navbar--logo-right`

Cambia quella classe (stessa su tutte le pagine, per coerenza) per spostare il logo. Su mobile il logo resta sempre a sinistra con l'hamburger a destra, per usabilità.

## Ricerca e categorie

Nella pagina Articoli c'è una barra di ricerca che filtra in tempo reale su titolo, riassunto, categoria e autore. Ogni categoria (mostrata come etichetta sulle card e sull'articolo) è anche un link a `articles.html?category=NomeCategoria`, che apre l'elenco filtrato con un badge per rimuovere il filtro. Quando un filtro (ricerca o categoria) è attivo, il "carica altri" si disattiva e vengono mostrati subito tutti i risultati.

## Condivisione, tempo di lettura e articoli correlati

Ogni articolo mostra automaticamente:

- **tempo di lettura stimato**, calcolato dal numero di parole del contenuto (circa 200 parole al minuto)
- **pulsanti di condivisione** (WhatsApp, X/Twitter, copia link) generati da `js/article.js`
- **articoli correlati** in fondo alla pagina: fino a 3 articoli della stessa categoria (se non ce ne sono abbastanza, vengono aggiunti altri articoli recenti)

Non serve configurare nulla: si aggiornano da soli in base ai dati in `content/articles-data.js`.

## SEO e anteprime social (Open Graph / Twitter Card)

Ogni pagina ha già i meta tag per le anteprime quando condividi un link su WhatsApp, Facebook, X o LinkedIn (`og:title`, `og:description`, `og:image`, ecc.) e per Google (`<link rel="canonical">`).

**Prima di pubblicare**, cerca e sostituisci `https://www.tuo-dominio.it` con il tuo dominio reale in tutte le pagine, `robots.txt` e `sitemap.xml`. Sostituisci anche l'immagine di anteprima di default (`https://placehold.co/1200x630/...`, un semplice segnaposto) con una tua immagine reale, idealmente 1200×630px, caricata da qualche parte nel sito (es. `assets/og-image.jpg`).

**Un limite da conoscere**: per `article.html`, `js/article.js` aggiorna i meta tag via JavaScript con titolo/descrizione/immagine del singolo articolo aperto — utile per chi visita la pagina col browser e per Google (che esegue JavaScript). Però i "robot" che generano le anteprime su WhatsApp, Facebook e X **non eseguono JavaScript**: vedranno quindi i meta tag generici scritti nell'HTML, non quelli specifici dell'articolo. Per un'anteprima perfettamente su misura per ogni singolo articolo servirebbe generare una pagina HTML statica per ciascuno (possibile, ma è esattamente la complessità che abbiamo scelto di evitare per tenere la gestione degli articoli semplice — vedi sopra). Se in futuro ti serve davvero, dimmelo e vediamo come aggiungerlo.

`robots.txt` e `sitemap.xml` sono già pronti nella cartella principale: indicano ai motori di ricerca quali pagine esistono. Ricorda di tenerli aggiornati (vedi sezione sopra).

## Pagina 404

`404.html` è la pagina mostrata quando un link non esiste. Sul tuo hosting Aruba, perché venga usata automaticamente al posto della pagina di errore standard del server, aggiungi (o chiedi al supporto di aggiungere) un file `.htaccess` nella cartella principale del sito con questa riga:

```
ErrorDocument 404 /404.html
```

Senza questo passaggio la pagina resta comunque raggiungibile visitandola direttamente (`tuosito.it/404.html`), semplicemente non compare automaticamente sui link rotti.

## Pulsante "torna su"

Compare da solo, in basso a destra, dopo aver scrollato circa mezza pagina, su ogni pagina del sito — lo aggiunge `js/main.js`, non serve inserirlo nell'HTML.

## Banner pubblicitari (gestiti da te, non AdSense)

Niente circuiti pubblicitari esterni: i banner li vendi e gestisci tu direttamente con i tuoi clienti. Ogni banner è semplicemente un link con dentro un'immagine, scritto a mano nel punto della pagina dove lo vuoi mostrare.

Nelle pagine sono già predisposti degli spazi placeholder tratteggiati (in Home, Articoli, Articolo singolo e Contatti), ciascuno con una classe di formato che ne fissa la dimensione:

| Classe                    | Dimensioni |
|---------------------------|------------|
| `.ad-banner--leaderboard` | 728×90     |
| `.ad-banner--large-rect`  | 336×280    |
| `.ad-banner--rectangle`   | 300×250    |
| `.ad-banner--skyscraper`  | 160×600    |
| `.ad-banner--mobile`      | 320×50     |

Un placeholder vuoto è così:

```html
<div class="ad-banner ad-banner--leaderboard">
  <span class="ad-banner__label">Spazio pubblicitario 728×90</span>
</div>
```

**Per attivare un banner**, sostituisci l'intero `<div>...</div>` con un `<a>` che porta **le stesse due classi** (`ad-banner` + il formato) e il link/immagine del cliente al posto dello `<span>`:

```html
<a class="ad-banner ad-banner--leaderboard" href="https://sito-cliente.com"
   target="_blank" rel="noopener" onclick="trackBannerClick('Nome_Cliente')">
  <img src="assets/banners/cliente.jpg" alt="Banner pubblicitario">
</a>
```

Usando sempre le stesse classi di formato (`ad-banner--leaderboard`, `ad-banner--rectangle`, ecc.) sia sui placeholder vuoti che sui banner attivi, tutti i banner del sito restano automaticamente della stessa dimensione e con lo stesso stile (bordo, angoli arrotondati, un leggero effetto al passaggio del mouse) — non devi ridefinire nulla, basta scegliere il formato giusto per lo spazio che stai riempiendo.

- `href` — la pagina di destinazione (il sito del cliente)
- l'immagine dentro `assets/banners/` (creala tu, es. `assets/banners/cliente.jpg`) può avere qualunque proporzione: viene sempre ritagliata per riempire esattamente il formato scelto
- `onclick="trackBannerClick('Nome_Cliente')"` traccia il click su Google Analytics (vedi sotto); usa un nome diverso per ogni cliente così puoi distinguerli nei report
- `rel="noopener"` — **non toglierlo**: senza, il sito del cliente (che non controlli) potrebbe manipolare la scheda del tuo blog rimasta aperta (tecnica nota come "tabnabbing"). Va messo ogni volta che usi `target="_blank"`, anche altrove nel sito

**Su mobile, di default**: un banner con una sola immagine (senza le classi speciali descritte sotto) si adatta già da solo — diventa largo quanto lo schermo, mantenendo un'altezza di 100px, senza bisogno di fare nulla.

**Se invece vuoi due immagini diverse** (una pensata per desktop/tablet, una per mobile — tipica per formati come il leaderboard 728×90, poco adatto a uno schermo stretto), metti **due banner** nello stesso punto della pagina, con due classi in più:

```html
<div class="ad-slot">
  <a class="ad-banner ad-banner--leaderboard ad-banner--desktop-only"
     href="https://sito-cliente.com" target="_blank" rel="noopener" onclick="trackBannerClick('Nome_Cliente')">
    <img src="assets/banners/cliente-desktop.jpg" alt="Banner pubblicitario">
  </a>
  <a class="ad-banner ad-banner--mobile ad-banner--mobile-only"
     href="https://sito-cliente.com" target="_blank" rel="noopener" onclick="trackBannerClick('Nome_Cliente')">
    <img src="assets/banners/cliente-mobile.jpg" alt="Banner pubblicitario">
  </a>
</div>
```

Sotto i 700px di larghezza compare solo il secondo (con la classe `ad-banner--mobile-only`), sopra solo il primo (`ad-banner--desktop-only`): non serve altro, il CSS li scambia da solo. Puoi usare questa coppia con qualsiasi formato, non solo leaderboard/mobile.

**Tracciamento dei click**: la funzione `trackBannerClick`, definita in `js/ads.js` e già inclusa in ogni pagina, invia a Google Analytics (se configurato, vedi sotto) un evento `banner_click` con il nome del cliente. In Google Analytics 4 lo trovi in **Report → Coinvolgimento → Eventi → banner_click**, filtrabile per `client_name`: così hai un numero preciso di click da mostrare a ciascun cliente. Se Google Analytics non è configurato, il click porta comunque alla pagina di destinazione, semplicemente non viene registrato nulla.

## Google Analytics e banner cookie

Google Analytics **non parte automaticamente**: si attiva solo dopo che l'utente clicca "Accetta" sul banner cookie (obbligatorio per legge in UE prima di impostare cookie non tecnici — vedi sotto). Tutta la logica è in un unico file, `js/cookie-consent.js`.

**Per attivare Analytics**, apri `js/cookie-consent.js` e sostituisci in cima al file:

```js
var GA_MEASUREMENT_ID = "G-XXXXXXX";
```

con il tuo ID di misurazione reale (lo trovi su analytics.google.com dopo aver creato una proprietà). Finché resta `"G-XXXXXXX"`, il banner compare comunque ma Analytics non si attiva mai, nemmeno se l'utente accetta — utile per testare il sito senza tracciare nulla.

**Come funziona il banner** (già incluso in ogni pagina, non serve aggiungerlo a mano):
- Alla prima visita compare in basso, con due pulsanti: **Rifiuta** e **Accetta** (mai un singolo pulsante "OK": la normativa richiede una scelta reale, non solo un avviso).
- Se l'utente **rifiuta**, Analytics non si carica affatto e la scelta viene ricordata (non ricompare ad ogni pagina).
- Se l'utente **accetta**, Analytics si carica in quel momento (non prima) e la scelta viene ricordata.
- La scelta viene salvata in `localStorage` (non in un cookie: è uno storage tecnico usato solo per ricordare la preferenza stessa, per questo non richiede a sua volta consenso).
- Un link **"Gestisci cookie"** nel footer di ogni pagina permette di riaprire il banner in qualsiasi momento e cambiare scelta.

**Nota sul tracciamento dei banner pubblicitari**: `trackBannerClick()` (vedi sopra) chiama `gtag`, che esiste solo se Analytics è stato caricato — quindi anche i click sui banner vengono tracciati automaticamente solo se l'utente ha accettato i cookie, senza bisogno di altre modifiche.

**Importante — questo è materiale legale, non solo tecnico**: il testo del banner e le pagine `privacy.html` e `cookie.html` (già collegate nel footer, in una nuova colonna "Legale") sono uno **scheletro di partenza**, non un testo verificato da un legale. Prima di pubblicare il sito, vanno completate con i tuoi dati reali (titolare del trattamento, finalità, ecc. — le parti tra `[ ]` te lo ricordano) oppure sostituite con un servizio come [Iubenda](https://www.iubenda.com), che genera sia il testo legale che un banner equivalente già pronto per il mercato italiano.

## Form contatti

`contact.html` invia il form solo via JavaScript demo (nessun dato reale trasmesso). Per renderlo funzionante:

- collega `action` del form a un servizio come [Formspree](https://formspree.io) o [Getform](https://getform.io), oppure
- sostituisci la logica in `js/contact.js` con una `fetch()` verso un tuo backend.

Il form include anche una checkbox obbligatoria di accettazione dell'Informativa Privacy (collegata a `privacy.html`): l'invio è bloccato finché non viene spuntata, tramite la normale validazione HTML del browser (`required`), senza bisogno di JavaScript aggiuntivo.

## Responsive

Il layout è mobile-first con breakpoint principali a `700px` (tablet) e `1000px` (desktop). Il menu diventa un pannello a scomparsa (hamburger) sotto i `700px`.
# steagritech_v2
