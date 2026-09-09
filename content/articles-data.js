/* =========================================================
   articles-data.js — contenuti del blog
   Nessuna richiesta di rete: il sito funziona anche aprendo
   index.html direttamente col doppio click, senza server locale.

   Per aggiungere un articolo, copia uno degli oggetti qui sotto
   e cambia i valori. Il campo "content" è l'HTML del corpo
   dell'articolo (paragrafi, titoli, immagini, liste...).
   Il campo "readTime" è opzionale (es. "5 min di lettura"):
   se presente viene mostrato accanto alla data nelle card.

   INQUADRATURA DELL'IMMAGINE NELLE CARD (entrambi opzionali, servono
   solo nell'anteprima: aprendo l'articolo si vede sempre la foto
   intera):
     imagePosition: "75% 30%"   sposta il punto di inquadratura (valore
                                 CSS object-position; default "50% 50%"
                                 cioè centrato). Usalo se il soggetto
                                 della foto non è al centro e rischia di
                                 essere tagliato dal ritaglio automatico
                                 della card (es. "right top", "20% 60%").
     imageZoom: 1.2              "stringe" l'inquadratura di quel tanto
                                 (1 = nessuno zoom, 1.2 = 20% più vicino).
                                 Utile insieme a imagePosition quando il
                                 soggetto è comunque troppo piccolo/lontano.
   Esempio più sotto sul secondo articolo.
   ========================================================= */

window.BLOG_ARTICLES = [
  {
    slug: "manutenzione-trattore-prima-della-stagione",
    title: "Manutenzione del trattore: la checklist prima della stagione",
    excerpt: "I controlli essenziali su motore, idraulica e pneumatici per partire senza fermi macchina nei mesi più intensi.",
    category: "Trattori",
    date: "2026-09-05",
    readTime: "5 min di lettura",
    image: "assets/KRONE_Swativo_T_1040_Pro_field_operation_2-1-1536x821.webp",
    featured: true,
    content: `<p>Prima dell'avvio della stagione agricola, una manutenzione accurata del trattore riduce drasticamente il rischio di fermi macchina nei momenti più critici.</p>

<h2>I controlli principali</h2>
<ul>
  <li>Livelli e qualità di olio motore e filtri</li>
  <li>Stato di pneumatici e pressione di gonfiaggio</li>
  <li>Tenuta del circuito idraulico</li>
  <li>Batteria e impianto elettrico</li>
</ul>

<p>Una pianificazione attenta della manutenzione permette di lavorare con continuità durante i periodi di maggior carico.</p>`
  },
  {
    slug: "attrezzature-lavorazione-terreno-guida",
    title: "Attrezzature per la lavorazione del terreno: come scegliere",
    excerpt: "Aratri, erpici e coltivatori a confronto: quali criteri considerare in base al tipo di suolo e alla coltura.",
    category: "Attrezzature",
    date: "2026-09-02",
    readTime: "6 min di lettura",
    image: "assets/KRONE_Swativo_T_1040_Pro_field_operation_2-1-1536x821.webp",
    imagePosition: "75% 35%", // il trattore, nella foto, è spostato verso destra: qui inquadriamo su di lui invece che sul centro della foto
    imageZoom: 1.15,
    featured: true,
    content: `<p>La scelta dell'attrezzatura giusta per la lavorazione del terreno dipende da diversi fattori: tipo di suolo, coltura successiva e potenza disponibile.</p>

<h2>Le opzioni più diffuse</h2>
<p>Tra le soluzioni più utilizzate troviamo aratri, erpici a dischi e coltivatori, ognuno con vantaggi specifici in termini di profondità di lavoro e consumo energetico.</p>

<blockquote>Investire nell'attrezzatura corretta significa risparmiare tempo e carburante in ogni passaggio.</blockquote>`
  },
  {
    slug: "macchine-raccolta-efficienza-campo",
    title: "Macchine da raccolta: come migliorare l'efficienza in campo",
    excerpt: "Regolazioni, velocità di avanzamento e manutenzione ordinaria per ridurre le perdite di raccolto.",
    category: "Macchine da raccolta",
    date: "2026-08-28",
    readTime: "4 min di lettura",
    image: "assets/KRONE_Swativo_T_1040_Pro_field_operation_2-1-1536x821.webp",
    featured: true,
    content: `<p>L'efficienza delle macchine da raccolta dipende in gran parte dalla corretta regolazione prima e durante il lavoro in campo.</p>

<h2>Punti chiave</h2>
<ul>
  <li>Velocità di avanzamento adeguata alla coltura</li>
  <li>Regolazione di testata e organi di trebbiatura</li>
  <li>Controllo costante delle perdite al suolo</li>
</ul>

<p>Piccoli accorgimenti quotidiani possono tradursi in una raccolta significativamente più redditizia.</p>`
  },
  {
    slug: "agronomia-rotazione-colture-benefici",
    title: "Rotazione delle colture: benefici agronomici concreti",
    excerpt: "Come una corretta rotazione migliora la fertilità del suolo e riduce la pressione di parassiti e malattie.",
    category: "Agronomia",
    date: "2026-08-20",
    readTime: "7 min di lettura",
    image: "assets/KRONE_Swativo_T_1040_Pro_field_operation_2-1-1536x821.webp",
    featured: true,
    content: `<p>La rotazione delle colture resta una delle pratiche agronomiche più efficaci per mantenere il suolo fertile nel tempo.</p>

<h2>Perché funziona</h2>
<p>Alternare colture con esigenze nutritive e apparati radicali diversi aiuta a limitare l'accumulo di parassiti specifici e a migliorare la struttura del terreno.</p>

<p>Pianificare la rotazione su un orizzonte di più anni permette di ottenere risultati misurabili sia in termini di resa che di riduzione degli input chimici.</p>`
  },
  {
    slug: "irrigazione-di-precisione-risparmio-idrico",
    title: "Irrigazione di precisione: risparmio idrico senza perdere resa",
    excerpt: "Sensori, centraline e programmazione: gli strumenti per ottimizzare ogni intervento irriguo.",
    category: "Agronomia",
    date: "2026-08-12",
    readTime: "5 min di lettura",
    image: "assets/KRONE_Swativo_T_1040_Pro_field_operation_2-1-1536x821.webp",
    featured: true,
    content: `<p>L'irrigazione di precisione consente di distribuire l'acqua solo dove e quando serve realmente, riducendo gli sprechi.</p>

<h2>Tecnologie disponibili</h2>
<ul>
  <li>Sensori di umidità del terreno</li>
  <li>Centraline di programmazione automatica</li>
  <li>Dati meteo integrati per adattare gli interventi</li>
</ul>

<p>L'investimento iniziale viene spesso ripagato in poche stagioni grazie al minor consumo idrico ed energetico.</p>`
  },
  {
    slug: "sicurezza-in-cantiere-agricolo-regole-base",
    title: "Sicurezza in cantiere agricolo: le regole di base da non dimenticare",
    excerpt: "Dispositivi di protezione, procedure e controlli periodici per lavorare in sicurezza ogni giorno.",
    category: "Altro",
    date: "2026-08-05",
    readTime: "3 min di lettura",
    image: "assets/KRONE_Swativo_T_1040_Pro_field_operation_2-1-1536x821.webp",
    featured: true,
    content: `<p>La sicurezza sul lavoro in ambito agricolo richiede attenzione costante, soprattutto quando si opera con macchine complesse.</p>

<h2>Buone pratiche</h2>
<ul>
  <li>Uso corretto dei dispositivi di protezione individuale</li>
  <li>Controlli periodici su macchine e attrezzature</li>
  <li>Formazione continua del personale</li>
</ul>

<p>Adottare procedure chiare riduce sensibilmente il rischio di infortuni durante le fasi più intense della stagione.</p>`
  }
];
