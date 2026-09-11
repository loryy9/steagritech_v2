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
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec arcu fermentum posuere. Praesent euismod, nibh at tincidunt luctus, nisl erat ullamcorper massa, vitae facilisis erat urna sed justo.</p>

<h2>Lorem ipsum dolor sit amet</h2>
<p>Curabitur consequat, sapien non consequat tincidunt, erat nisl commodo massa, sed tincidunt libero ipsum non augue. Suspendisse potenti. Donec finibus, metus sed feugiat ultrices, mi purus varius sem, vitae luctus nulla libero at erat.</p>

<p>Maecenas eget sem sed arcu tincidunt consequat. Nam bibendum, sapien a commodo porta, massa justo cursus nisl, a efficitur sem tortor at erat.</p>`
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
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec arcu fermentum posuere. Praesent euismod, nibh at tincidunt luctus, nisl erat ullamcorper massa, vitae facilisis erat urna sed justo.</p>

  <h2>Lorem ipsum dolor sit amet</h2>
  <p>Curabitur consequat, sapien non consequat tincidunt, erat nisl commodo massa, sed tincidunt libero ipsum non augue. Suspendisse potenti. Donec finibus, metus sed feugiat ultrices, mi purus varius sem, vitae luctus nulla libero at erat.</p>

  <p>Maecenas eget sem sed arcu tincidunt consequat. Nam bibendum, sapien a commodo porta, massa justo cursus nisl, a efficitur sem tortor at erat.</p>`
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
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec arcu fermentum posuere. Praesent euismod, nibh at tincidunt luctus, nisl erat ullamcorper massa, vitae facilisis erat urna sed justo.</p>

<h2>Lorem ipsum dolor sit amet</h2>
<p>Curabitur consequat, sapien non consequat tincidunt, erat nisl commodo massa, sed tincidunt libero ipsum non augue. Suspendisse potenti. Donec finibus, metus sed feugiat ultrices, mi purus varius sem, vitae luctus nulla libero at erat.</p>

<p>Maecenas eget sem sed arcu tincidunt consequat. Nam bibendum, sapien a commodo porta, massa justo cursus nisl, a efficitur sem tortor at erat.</p>`
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
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec arcu fermentum posuere. Praesent euismod, nibh at tincidunt luctus, nisl erat ullamcorper massa, vitae facilisis erat urna sed justo.</p>

  <h2>Lorem ipsum dolor sit amet</h2>
  <p>Curabitur consequat, sapien non consequat tincidunt, erat nisl commodo massa, sed tincidunt libero ipsum non augue. Suspendisse potenti. Donec finibus, metus sed feugiat ultrices, mi purus varius sem, vitae luctus nulla libero at erat.</p>

  <p>Maecenas eget sem sed arcu tincidunt consequat. Nam bibendum, sapien a commodo porta, massa justo cursus nisl, a efficitur sem tortor at erat.</p>`
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
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec arcu fermentum posuere. Praesent euismod, nibh at tincidunt luctus, nisl erat ullamcorper massa, vitae facilisis erat urna sed justo.</p>

<h2>Lorem ipsum dolor sit amet</h2>
<p>Curabitur consequat, sapien non consequat tincidunt, erat nisl commodo massa, sed tincidunt libero ipsum non augue. Suspendisse potenti. Donec finibus, metus sed feugiat ultrices, mi purus varius sem, vitae luctus nulla libero at erat.</p>

<p>Maecenas eget sem sed arcu tincidunt consequat. Nam bibendum, sapien a commodo porta, massa justo cursus nisl, a efficitur sem tortor at erat.</p>`
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
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec arcu fermentum posuere. Praesent euismod, nibh at tincidunt luctus, nisl erat ullamcorper massa, vitae facilisis erat urna sed justo.</p>

<h2>Lorem ipsum dolor sit amet</h2>
<p>Curabitur consequat, sapien non consequat tincidunt, erat nisl commodo massa, sed tincidunt libero ipsum non augue. Suspendisse potenti. Donec finibus, metus sed feugiat ultrices, mi purus varius sem, vitae luctus nulla libero at erat.</p>

<p>Maecenas eget sem sed arcu tincidunt consequat. Nam bibendum, sapien a commodo porta, massa justo cursus nisl, a efficitur sem tortor at erat.</p>`
  }
];
