/* =========================================================
   articles-data.js — contenuti del blog
   Nessuna richiesta di rete: il sito funziona anche aprendo
   index.html direttamente col doppio click, senza server locale.

   Per aggiungere un articolo, copia uno degli oggetti qui sotto
   e cambia i valori. Il campo "content" è l'HTML del corpo
   dell'articolo (paragrafi, titoli, immagini, liste...).
   ========================================================= */

window.BLOG_ARTICLES = [
  {
    slug: "benvenuti-nel-blog",
    title: "Benvenuti nel nostro nuovo blog",
    excerpt: "Una breve presentazione di questo spazio: di cosa parleremo e perché lo abbiamo creato.",
    category: "Annunci",
    author: "Redazione",
    date: "2026-09-01",
    image: "https://picsum.photos/seed/blog1/800/450",
    featured: true,
    content: `<p>Benvenuti su questo spazio! Abbiamo creato questo blog per condividere guide pratiche, riflessioni e piccoli trucchi su sviluppo web, design e strumenti digitali.</p>

<p>L'obiettivo è semplice: pubblicare contenuti utili, senza fronzoli, che si possano leggere in pochi minuti durante una pausa caffè.</p>

<h2>Cosa troverai da queste parti</h2>
<p>Gli argomenti principali che tratteremo sono:</p>
<ul>
  <li>Sviluppo front-end con HTML, CSS e JavaScript</li>
  <li>Design e usabilità</li>
  <li>Consigli pratici di marketing per piccoli progetti</li>
  <li>Performance e ottimizzazione dei siti</li>
</ul>

<blockquote>Il modo migliore per imparare è costruire qualcosa, romperlo, e capire perché si è rotto.</blockquote>

<p>Grazie per essere passato di qui. Se hai suggerimenti su argomenti da trattare, scrivici dalla pagina <a href="contact.html">Contatti</a>.</p>`
  },
  {
    slug: "guida-css-variables",
    title: "Guida alle CSS Custom Properties",
    excerpt: "Come usare le variabili CSS per creare temi personalizzabili e facili da mantenere.",
    category: "Sviluppo",
    author: "Marco Bianchi",
    date: "2026-08-28",
    image: "https://picsum.photos/seed/blog2/800/450",
    featured: true,
    content: `<p>Le <strong>CSS Custom Properties</strong> (o "variabili CSS") permettono di definire valori riutilizzabili in tutto il foglio di stile, rendendo la personalizzazione del sito molto più semplice.</p>

<h2>Come si definiscono</h2>
<p>Si dichiarano dentro un selettore, tipicamente <code>:root</code>, con la sintassi <code>--nome-variabile: valore;</code> e si richiamano con <code>var(--nome-variabile)</code>.</p>

<pre><code>:root {
  --color-primary: #2f6fed;
  --space-4: 1rem;
}

.btn {
  background-color: var(--color-primary);
  padding: var(--space-4);
}</code></pre>

<h2>Perché usarle in un boilerplate</h2>
<p>Centralizzando colori, spaziature e font in un unico file (<code>variables.css</code>), basta modificare poche righe per cambiare completamente l'aspetto del sito, incluso il supporto per la modalità scura tramite l'attributo <code>data-theme</code>.</p>

<blockquote>Una variabile cambiata in un punto solo vale più di cento valori copiati e incollati.</blockquote>

<p>Nel prossimo articolo vedremo come sfruttare questa stessa tecnica per implementare un tema chiaro/scuro in pochi minuti.</p>`
  },
  {
    slug: "dark-mode-in-5-minuti",
    title: "Implementare la dark mode in 5 minuti",
    excerpt: "Una tecnica semplice basata su attributi data-theme e localStorage per un tema scuro istantaneo.",
    category: "Sviluppo",
    author: "Giulia Verdi",
    date: "2026-08-20",
    image: "https://picsum.photos/seed/blog3/800/450",
    featured: true,
    content: `<p>Implementare un tema scuro non richiede librerie complesse: bastano variabili CSS, un attributo sull'elemento <code>&lt;html&gt;</code> e un po' di JavaScript.</p>

<h2>I tre ingredienti</h2>
<ul>
  <li>Un set di variabili per il tema chiaro in <code>:root</code></li>
  <li>Un set alternativo in <code>:root[data-theme="dark"]</code></li>
  <li>Un pulsante che aggiorna l'attributo e salva la scelta in <code>localStorage</code></li>
</ul>

<p>Con questo approccio il cambio tema è istantaneo, non richiede ricaricare la pagina e rispetta anche la preferenza di sistema dell'utente al primo accesso, grazie a <code>prefers-color-scheme</code>.</p>

<blockquote>La modalità scura non è solo estetica: riduce l'affaticamento visivo in ambienti poco illuminati.</blockquote>`
  },
  {
    slug: "responsive-design-mobile-first",
    title: "Responsive design: l'approccio mobile-first",
    excerpt: "Perché conviene progettare partendo dallo smartphone e come farlo con i media query.",
    category: "Design",
    author: "Marco Bianchi",
    date: "2026-08-15",
    image: "https://picsum.photos/seed/blog4/800/450",
    featured: false,
    content: `<p>Progettare "mobile-first" significa partire dallo schermo più piccolo e aggiungere complessità man mano che lo spazio disponibile aumenta, invece di fare il percorso inverso.</p>

<h2>Vantaggi principali</h2>
<ul>
  <li>Ti costringe a definire subito i contenuti essenziali</li>
  <li>Il CSS di base è più leggero: le media query aggiungono, non tolgono</li>
  <li>Il risultato finale è quasi sempre più performante su mobile</li>
</ul>

<p>In pratica, si scrivono prima gli stili "di default" (validi per schermi stretti) e poi si usano <code>@media (min-width: ...)</code> per adattare il layout a tablet e desktop, esattamente come in questo boilerplate.</p>`
  },
  {
    slug: "seo-base-per-blog",
    title: "SEO di base per un blog appena nato",
    excerpt: "Le prime cose da controllare per farsi trovare dai motori di ricerca senza spendere un euro.",
    category: "Marketing",
    author: "Chiara Neri",
    date: "2026-08-10",
    image: "https://picsum.photos/seed/blog5/800/450",
    featured: false,
    content: `<p>Un blog appena nato non ha bisogno di strategie SEO complicate: bastano alcune buone pratiche di base per partire con il piede giusto.</p>

<h2>Cosa controllare per primo</h2>
<ul>
  <li>Titoli di pagina (<code>&lt;title&gt;</code>) unici e descrittivi per ogni articolo</li>
  <li>Una meta description chiara per ogni pagina</li>
  <li>URL leggibili, con lo slug dell'articolo</li>
  <li>Immagini con testo alternativo (<code>alt</code>)</li>
  <li>Un solo <code>&lt;h1&gt;</code> per pagina</li>
</ul>

<p>Il resto verrà con il tempo: contenuti utili e pubblicati con costanza restano il fattore più importante.</p>`
  },
  {
    slug: "javascript-vanilla-vs-framework",
    title: "JavaScript vanilla o framework? Come scegliere",
    excerpt: "Vantaggi e svantaggi di scrivere JS puro rispetto ad affidarsi a React, Vue o Svelte.",
    category: "Sviluppo",
    author: "Marco Bianchi",
    date: "2026-08-05",
    image: "https://picsum.photos/seed/blog6/800/450",
    featured: false,
    content: `<p>Per un progetto come un blog boilerplate, JavaScript "vanilla" (senza framework) è spesso la scelta più sensata: nessuna build, nessuna dipendenza da aggiornare, caricamento immediato.</p>

<h2>Quando ha senso un framework</h2>
<p>React, Vue o Svelte diventano utili quando l'interfaccia è molto dinamica, con tanti stati da sincronizzare tra componenti diversi. Per un sito prevalentemente di contenuti, il costo aggiuntivo raramente si ripaga.</p>

<h2>Quando ha senso il vanilla JS</h2>
<ul>
  <li>Siti di contenuto (blog, siti vetrina, landing page)</li>
  <li>Progetti che devono restare leggeri e veloci da avviare</li>
  <li>Boilerplate pensati per essere personalizzati facilmente da chiunque</li>
</ul>`
  },
  {
    slug: "ottimizzare-immagini-web",
    title: "Come ottimizzare le immagini per il web",
    excerpt: "Formati, compressione e lazy loading: tutto quello che serve per pagine più veloci.",
    category: "Performance",
    author: "Giulia Verdi",
    date: "2026-07-30",
    image: "https://picsum.photos/seed/blog7/800/450",
    featured: false,
    content: `<p>Le immagini sono spesso la causa principale di pagine lente. Alcuni accorgimenti semplici possono fare una grande differenza.</p>

<h2>Consigli pratici</h2>
<ul>
  <li>Usa formati moderni come WebP o AVIF quando possibile</li>
  <li>Comprimi le immagini prima di caricarle</li>
  <li>Aggiungi <code>loading="lazy"</code> alle immagini fuori dallo schermo iniziale</li>
  <li>Definisci sempre larghezza e altezza (o <code>aspect-ratio</code>) per evitare "salti" del layout</li>
</ul>

<p>In questo boilerplate le card degli articoli usano già <code>loading="lazy"</code> e un <code>aspect-ratio</code> fisso per il contenitore immagine.</p>`
  },
  {
    slug: "accessibilita-web-basi",
    title: "Accessibilità web: le basi da conoscere",
    excerpt: "Piccoli accorgimenti che rendono un sito utilizzabile da tutti, incluse le tecnologie assistive.",
    category: "Design",
    author: "Chiara Neri",
    date: "2026-07-22",
    image: "https://picsum.photos/seed/blog8/800/450",
    featured: false,
    content: `<p>Rendere un sito accessibile significa permettere a chiunque, incluse le persone che usano tecnologie assistive, di usarlo senza barriere.</p>

<h2>Piccoli accorgimenti, grande impatto</h2>
<ul>
  <li>Usa elementi HTML semantici (<code>nav</code>, <code>header</code>, <code>main</code>, <code>footer</code>)</li>
  <li>Assicurati che ogni elemento interattivo sia raggiungibile da tastiera</li>
  <li>Aggiungi <code>aria-label</code> dove il testo visivo non basta a spiegare un pulsante</li>
  <li>Mantieni un contrasto sufficiente tra testo e sfondo, in entrambi i temi</li>
</ul>

<p>Questi principi sono stati tenuti in considerazione nella struttura di questo boilerplate, ad esempio nel pulsante hamburger e nel toggle del tema.</p>`
  },
  {
    slug: "google-analytics-e-banner",
    title: "Google Analytics e banner pubblicitari: come collegarli al sito",
    excerpt: "Una panoramica semplice su come tracciare le visite e gestire i tuoi banner pubblicitari sul blog.",
    category: "Marketing",
    author: "Redazione",
    date: "2026-07-15",
    image: "https://picsum.photos/seed/blog9/800/450",
    featured: false,
    content: `<p>Due cose distinte ma complementari per un blog: tracciare le visite con <strong>Google Analytics</strong> e gestire i tuoi banner pubblicitari, con clienti che paghi direttamente tu, senza circuiti esterni.</p>

<h2>Google Analytics</h2>
<p>Dopo aver creato una proprietà su analytics.google.com, si ottiene un ID di misurazione (es. <code>G-XXXXXXX</code>) e uno snippet <code>gtag.js</code> da incollare nell'<code>&lt;head&gt;</code> di ogni pagina. Da quel momento il sito invia dati anonimi sulle visite alla dashboard di Analytics.</p>

<h2>Banner pubblicitari gestiti da te</h2>
<p>Ogni banner è semplicemente un link con un'immagine, inserito a mano nel punto della pagina che preferisci. Un piccolo script traccia il click come evento su Google Analytics, così sai quante volte è stato cliccato il banner di ciascun cliente.</p>

<p>Consulta il file <code>README.md</code> del progetto per il codice esatto da usare.</p>`
  },
  {
    slug: "struttura-cartelle-progetto-web",
    title: "Come organizzare le cartelle di un progetto web",
    excerpt: "Una struttura chiara aiuta a mantenere il sito ordinato man mano che cresce.",
    category: "Sviluppo",
    author: "Marco Bianchi",
    date: "2026-07-08",
    image: "https://picsum.photos/seed/blog10/800/450",
    featured: false,
    content: `<p>Una struttura di cartelle chiara aiuta a orientarsi rapidamente anche quando il progetto cresce. In questo boilerplate, ad esempio, si segue una separazione netta tra codice e contenuti.</p>

<ul>
  <li><code>css/</code> — fogli di stile</li>
  <li><code>js/</code> — script</li>
  <li><code>content/</code> — dati e articoli, separati dal codice</li>
  <li><code>assets/</code> — immagini e risorse statiche</li>
</ul>

<p>Questa separazione rende semplice, ad esempio, aggiungere un nuovo articolo senza toccare una sola riga di HTML, CSS o JavaScript di layout: basta aggiungere una voce al file <code>content/articles-data.js</code>.</p>`
  },
  {
    slug: "scrivere-contenuti-che-funzionano",
    title: "Scrivere contenuti che funzionano davvero",
    excerpt: "Consigli pratici di copywriting per articoli che le persone leggono fino in fondo.",
    category: "Marketing",
    author: "Chiara Neri",
    date: "2026-07-01",
    image: "https://picsum.photos/seed/blog11/800/450",
    featured: false,
    content: `<p>Un buon articolo si legge dal titolo alla fine, senza sforzo. Alcuni accorgimenti semplici aiutano a mantenere alta l'attenzione del lettore.</p>

<h2>Regole pratiche</h2>
<ul>
  <li>Frasi brevi, un'idea per paragrafo</li>
  <li>Sottotitoli (<code>h2</code>, <code>h3</code>) per spezzare il testo e facilitare la scansione visiva</li>
  <li>Un'introduzione che spiega subito di cosa parla l'articolo</li>
  <li>Esempi concreti al posto di affermazioni generiche</li>
</ul>

<blockquote>Se un lettore capisce l'articolo leggendo solo i sottotitoli, hai fatto un buon lavoro.</blockquote>`
  },
  {
    slug: "checklist-lancio-sito",
    title: "La checklist prima di lanciare un sito",
    excerpt: "Tutti i controlli da fare prima di rendere pubblico il tuo nuovo blog.",
    category: "Sviluppo",
    author: "Giulia Verdi",
    date: "2026-06-24",
    image: "https://picsum.photos/seed/blog12/800/450",
    featured: false,
    content: `<p>Prima di rendere pubblico un sito, vale la pena dedicare qualche minuto a una verifica finale.</p>

<h2>Checklist essenziale</h2>
<ul>
  <li>Tutti i link della navbar e del footer funzionano</li>
  <li>Il sito è testato su desktop, tablet e smartphone</li>
  <li>Il tema chiaro e quello scuro sono entrambi leggibili</li>
  <li>Le immagini hanno un testo alternativo</li>
  <li>Il form contatti invia correttamente i messaggi</li>
  <li>Google Analytics (se previsto) è configurato e verificato</li>
</ul>

<p>Una checklist come questa, salvata da qualche parte, si riusa ad ogni nuovo progetto: risparmia tempo ed evita brutte sorprese dopo la pubblicazione.</p>`
  }
];
