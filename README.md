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
index1.html ... index5.html   Varianti demo della Home, per confrontare stili/layout delle card
                     (vedi "Stili e layout delle card in evidenza" più sotto)
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
js/articles.js           Stili/layout delle card in evidenza (CARD_STYLES) + elenco con ricerca, filtro categoria, paginazione
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
  date: "2026-09-08",
  readTime: "5 min di lettura", // opzionale: se lo scrivi a mano compare nelle card accanto alla data
  image: "https://.../immagine.jpg",
  imagePosition: "75% 30%", // opzionale: inquadratura dell'immagine nelle card, vedi sotto
  imageZoom: 1.15, // opzionale: "stringe" l'inquadratura, vedi sotto
  featured: false,
  content: `<p>Qui va il contenuto HTML dell'articolo: paragrafi, titoli h2/h3, immagini, liste, blockquote...</p>`
}
```

Nota le virgolette **backtick** (`` ` ``) attorno al campo `content`: permettono di scrivere HTML su più righe. Ricorda la virgola `,` tra un oggetto e il successivo nell'array.

Il campo `readTime` è facoltativo e scritto a mano (non calcolato): se lo ometti, le card mostrano solo la data. Nella pagina dell'articolo singolo il tempo di lettura *effettivo* viene invece calcolato automaticamente dal testo (vedi "Condivisione, tempo di lettura e articoli correlati" più sotto) — sono due cose indipendenti.

### Inquadratura dell'immagine nelle card

`imagePosition` e `imageZoom` sono entrambi facoltativi e riguardano **solo l'anteprima nelle card**: aprendo l'articolo (`article.html`) si vede sempre la foto intera, senza ritagli. Servono per i casi in cui il soggetto della foto non è al centro e il ritaglio automatico delle card (che riempiono sempre lo spazio disponibile, tagliando i bordi) rischia di escluderlo:

- **`imagePosition`** — un valore CSS `object-position` (es. `"75% 30%"`, oppure parole chiave come `"right top"`); sposta il punto su cui si concentra il ritaglio. Default: centrato.
- **`imageZoom`** — un numero maggiore di 1 (es. `1.15` = 15% più vicino) per stringere l'inquadratura quando, anche riposizionandola, il soggetto resta troppo piccolo o lontano.

Il modo più semplice per trovare i valori giusti è per tentativi: apri la Home o `articles.html` nel browser, prova un valore, ricarica la pagina, aggiusta finché l'inquadratura non ti convince. Trovi un esempio già impostato sul secondo articolo di `content/articles-data.js`.

Fatto: l'articolo comparirà automaticamente nella pagina Articoli (in ordine di data), nella ricerca, nel filtro per categoria, tra gli articoli correlati di articoli della stessa categoria e, se `featured: true`, anche tra gli articoli in evidenza in Home (max 3 di default, modificabile con l'attributo `data-featured="N"` sull'elemento in `index.html`).

Il caricamento "a step" mostra un numero limitato di articoli alla volta (variabile `STEP` in `js/articles.js`, di default 2 in questo progetto — alzalo, es. a 10, quando pubblichi davvero).

**Ricorda anche**: quando aggiungi o modifichi un articolo, aggiorna a mano `sitemap.xml` (copia un blocco `<url>` esistente e cambia i valori) — non si aggiorna da solo, dato che il sito non ha un server che lo possa generare al volo. Non è obbligatorio per far funzionare il sito, ma aiuta i motori di ricerca a scoprire i nuovi contenuti.

## Personalizzare i colori e il tema

Tutto è in `css/variables.css`:

- variabili sotto `:root` → tema chiaro
- variabili sotto `:root[data-theme="dark"]` → tema scuro

Basta cambiare i valori esadecimali per rifare completamente la palette. Il pulsante 🌙/☀️ in navbar cambia tema e salva la scelta dell'utente in `localStorage`; se l'utente non ha mai scelto, il sito segue automaticamente il tema del sistema operativo.

## Stili e layout delle card in evidenza (Home)

La sezione "Articoli in evidenza" (usata in `index.html` e nelle varianti demo `index1.html`...`index5.html`) è completamente componibile: **struttura** (come sono disposte le card) e **stile** (che aspetto ha ogni singola card) sono due scelte indipendenti, decise entrambe sullo stesso `<div>` senza toccare il JavaScript:

```html
<div
  class="featured-grid featured-grid--mosaic"
  data-featured="3"
  data-styles="glass,standard,standard"
  data-sizes="lg,,"
>
  <p class="state-message">Caricamento articoli…</p>
</div>
```

- **classe sul contenitore** → la struttura (dove va ogni articolo)
- **`data-styles`** → lo stile di ogni articolo, nello stesso ordine, separati da virgola
- **`data-sizes`** → (opzionale) quale slot è "grande" (`lg`); lascialo vuoto (`,,`) per gli altri
- **`data-featured`** → quanti articoli mostrare in tutto

### Stili di card disponibili (`data-styles`)

| Nome       | Aspetto                                                                             |
| ---------- | ------------------------------------------------------------------------------------ |
| `standard` | Immagine sopra, titolo e sommario sotto — lo stesso stile della pagina Articoli      |
| `overlay`  | Immagine a piena card, titolo e categoria scritti sopra (in basso, su sfondo scuro)  |
| `glass`    | "Liquid glass": immagine + un pannello semi-trasparente sfocato che si sovrappone al bordo inferiore della foto |
| `compact`  | Miniatura piccola a sinistra + titolo e data a destra, pensata per elenchi verticali ("ultimi articoli") |

### Strutture disponibili (classe sul contenitore)

| Classe                          | Aspetto                                                                    |
| -------------------------------- | --------------------------------------------------------------------------- |
| `featured-grid--equal`           | Tutte le card della stessa larghezza E altezza, in fila (si adatta a qualsiasi numero); un titolo più lungo non allunga la card ma solo il suo contenuto interno (nella glass card, ad esempio, il pannello di vetro — che sporge sopra il bordo inferiore della foto — si allarga, e la foto si restringe di conseguenza) — mai tagli col "..." |
| `featured-grid--mosaic`          | 1 articolo grande a sinistra + 2 impilati a destra                        |
| `featured-grid--mosaic-flip`     | Come sopra, specchiato: grande a destra                                   |
| `featured-grid--mosaic-1-4`      | 1 articolo grande a sinistra (a tutta altezza) + 4 piccoli impilati a destra, tipo elenco "ultimi articoli" |
| `featured-grid--mosaic-1-4-flip` | Come sopra, specchiato: grande a destra, elenco a sinistra                 |

Le strutture "mosaico" sono pensate per esattamente 3 (o 5, per la `-1-4`) articoli, con il primo slot come quello "grande"; `featured-grid--equal` invece si adatta a qualunque numero, se cambi `data-featured="N"` (e allunghi di conseguenza `data-styles`). Su schermi sotto i 1000px tutte le varianti diventano una singola colonna impilata, per restare leggibili su tablet e mobile — e nei due slot "mosaico" piccoli, sotto i 1000px riappare anche il sommario completo (nel mosaico desktop viene nascosto per mancanza di spazio verticale).

**Per inventare una nuova combinazione**: scegli una riga della prima tabella per ogni slot (`data-styles`) e una struttura dalla seconda (classe sul contenitore) — qualunque accoppiamento funziona già, senza scrivere altro codice. Per aggiungere uno stile di card completamente nuovo, invece, serve una piccola modifica: la funzione che genera l'HTML va scritta in `js/articles.js` e registrata nell'oggetto `CARD_STYLES` in cima al file.

### Stili diversi per mobile e desktop

La struttura (classe sul contenitore) conta solo da desktop: sotto i 1000px diventa comunque sempre una colonna impilata, qualunque classe tu scelga. Puoi però scegliere **stili di card diversi** per quella colonna mobile, aggiungendo `data-styles-mobile` (e, se serve, `data-sizes-mobile` / `data-featured-mobile`) accanto agli attributi desktop — sono opzionali: se non li scrivi, sotto i 1000px vengono semplicemente impilate le stesse card scelte per desktop.

```html
<div
  class="featured-grid featured-grid--mosaic"
  data-featured="3"
  data-styles="glass,standard,standard"
  data-sizes="lg,,"
  data-styles-mobile="glass,glass,glass"
  data-sizes-mobile="lg,lg,lg"
>
  <p class="state-message">Caricamento articoli…</p>
</div>
```

Nell'esempio sopra (preso da `index2.html`): da desktop è un mosaico "1 glass grande + 2 standard piccole", da mobile diventano 3 card "glass" impilate, tutte in versione grande. Il cambio avviene subito, anche ridimensionando la finestra o ruotando lo schermo, senza dover ricaricare la pagina.

**Le 5 pagine demo** (`index1.html`...`index5.html`, raggiungibili anche dalla barra nera in cima a `index.html`) mostrano alcune combinazioni pronte, per scegliere più facilmente prima di decidere quale portare sulla Home definitiva:

| Pagina        | Struttura            | Stili                                    |
| ------------- | --------------------- | ----------------------------------------- |
| `index1.html` | `--equal`              | 3 card grandi uguali, tutte `glass`       |
| `index2.html` | `--mosaic`             | 1 `glass` grande + 2 `standard` piccole   |
| `index3.html` | `--mosaic-1-4`         | 1 `standard` grande + 4 `compact` piccole |
| `index4.html` | `--mosaic-flip`        | 1 `glass` grande + 2 `overlay` piccole    |
| `index5.html` | `--equal`              | 3 card uguali, tutte `standard`           |

Una volta scelto il layout preferito, basta copiare il suo `<div class="featured-grid ...">` (con gli stessi `data-styles`/`data-sizes`) dentro `index.html`, al posto di quello attuale; le pagine demo si possono poi cancellare senza effetti su nient'altro, oppure tenerle come riferimento.

**Quali articoli compaiono**: quelli con `featured: true` in `content/articles-data.js` (in ordine di data, il più recente per primo — quindi il primo marcato `featured: true` più recente diventa quello "grande"); se gli articoli in `featured: true` non bastano a riempire tutti gli slot richiesti, vengono aggiunti gli articoli più recenti tra i restanti.

### Seconda sezione di articoli (`data-highlighted`)

Per aggiungere una seconda griglia sotto il pulsante "Vedi tutti gli articoli", usa un normale `<div class="articles-grid">` con questi attributi:

```html
<div
  class="articles-grid"
  data-highlighted="3"
  data-highlighted-offset="3"
  data-styles="glass,glass,glass"
>
  <p class="state-message">Caricamento articoli…</p>
</div>
```

- **`data-highlighted="N"`** → numero massimo di card da mostrare nella seconda sezione. Se omesso, sono 3.
- **`data-highlighted-offset="N"`** → quanti articoli saltare dall'inizio dell'elenco ordinato per data. Con `3`, la sezione salta i tre articoli già mostrati nella griglia principale e mostra i successivi tre. Se omesso, parte dal primo articolo (`0`).
- **`data-styles`** → stile di ogni card, nello stesso ordine, separato da virgole: `standard`, `overlay`, `glass` o `compact`. Se gli stili sono meno delle card, l'ultimo stile viene riutilizzato.
- **`data-sizes`** → opzionale, funziona come nella griglia principale e permette di assegnare `lg` agli slot desiderati.
- **`data-arrow="false"`** → opzionale, nasconde la freccia nelle card.

La seconda griglia viene renderizzata da `renderHighlighted()` in `js/articles.js` e usa gli stessi dati di `content/articles-data.js`. Gli articoli sono ordinati dal più recente al più vecchio; `data-highlighted-offset` non filtra la proprietà `featured`, ma salta semplicemente le prime posizioni dell'elenco completo. Per questo `data-styles="glass,glass,glass"` funziona anche qui: viene usato lo stesso registro `CARD_STYLES` della griglia principale.

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
| ------------------------- | ---------- |
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
<a
    class="ad-banner ad-banner--leaderboard"
    href="https://sito-cliente.com"
    target="_blank"
    rel="noopener"
    onclick="trackBannerClick('Nome_Cliente')"
>
    <img src="assets/banners/cliente.jpg" alt="Banner pubblicitario" />
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
    <a
        class="ad-banner ad-banner--leaderboard ad-banner--desktop-only"
        href="https://sito-cliente.com"
        target="_blank"
        rel="noopener"
        onclick="trackBannerClick('Nome_Cliente')"
    >
        <img
            src="assets/banners/cliente-desktop.jpg"
            alt="Banner pubblicitario"
        />
    </a>
    <a
        class="ad-banner ad-banner--mobile ad-banner--mobile-only"
        href="https://sito-cliente.com"
        target="_blank"
        rel="noopener"
        onclick="trackBannerClick('Nome_Cliente')"
    >
        <img
            src="assets/banners/cliente-mobile.jpg"
            alt="Banner pubblicitario"
        />
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
