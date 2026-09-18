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
    slug: "sette-consigli-insilato-mais-qualita",
    title: "Sette consigli per un insilato di mais di qualità",
    excerpt: "Dalla scelta del momento giusto per la trinciatura al desilamento: le indicazioni fondamentali per ottenere un insilato di mais ben conservato.",
    category: "Agronomia",
    date: "2026-09-18",
    readTime: "8 min di lettura",
    image: "assets/articles/tips-insilato/copertina.webp",
    featured: true,
    content: `<p>La trinciatura del mais è una lavorazione tanto spettacolare per noi appassionati di meccanizzazione agricola quanto importante per tutte quelle aziende che hanno la necessità di portare a casa un prodotto di qualità. L’insilato di mais rappresenta una parte fondamentale dell’alimentazione dei ruminanti. Un alimento chiave, soprattutto nella razione dei bovini da latte, grazie al suo valore energetico, all’apporto di fibra e alla facilità di conservazione. In questo articolo vediamo sette consigli per ottenere un insilato di mais perfetto.</p>

<p><strong>Piccolo disclaimer:</strong> questi consigli sono puramente teorici e magari lontani dalle reali casistiche presenti nelle singole aziende agricole.</p>


<h2>Numero 1: tempistiche</h2>
<p>Trinciare al momento giusto è cruciale. L’ideale sarebbe entrare in campo quando la sostanza secca della pianta si aggira intorno al 32-35%. Per misurare questo parametro ci sono varie soluzioni.</p>
<p>È possibile utilizzare una stufa da laboratorio. Basta prendere un campione rappresentativo di sostanza, pesarlo e metterlo in stufa a 105 °C in modo da far evaporare l’acqua. Successivamente, è possibile calcolare la percentuale di acqua (e quindi per differenza la percentuale di sostanza secca) utilizzando il peso umido e il peso secco, ovvero il peso del campione prima di essere messo in stufa e appena tirato fuori dalla stufa, utilizzando la seguente formula:</p>
<p><strong>Umidità = [(peso iniziale - peso secco) / peso iniziale] × 100</strong></p>
<p>È possibile anche misurare l’umidità di una biomassa utilizzando un sensore NIR, ovvero un sensore che, utilizzando la spettroscopia NIR, è in grado di restituire parametri come amido, zuccheri, fibra e anche umidità di una biomassa. Sono sensori spesso equipaggiati su trince semoventi o mietitrebbie in modo da misurare in tempo reale la qualità del prodotto, ma esistono anche sensori portatili, sicuramente più comodi se si vuole capire l’umidità di un prodotto ancora in campo prima della raccolta. Anche in questo caso bisognerà prendere un campione rappresentativo, trinciarlo e utilizzare il NIR per misurarne l’umidità.</p>
<p>Il terzo metodo è meno preciso ma sicuramente più veloce. Consiste nel prendere una spiga di mais e spezzarla a metà; osservando le cariossidi, se la linea latteo-cerosa si trova a metà cariosside, ovvero la cariosside a metà bianca e metà gialla-arancione, allora il mais è pronto per essere trinciato.</p>

<h2>Numero 2: lunghezza di taglio</h2>
<p>La lunghezza di taglio, ovvero la lunghezza dei pezzettini di trinciato, è un parametro fondamentale per ottenere un trinciato di qualità. A parità di coltura, essa dipende da due fattori: umidità e destinazione del prodotto. Più un prodotto è secco, più si disporrà in modo irregolare in trincea e quindi potranno crearsi delle zone in cui rimane intrappolato ossigeno, sfavorendo l’anaerobiosi (condizione necessaria per le fermentazioni che abbasseranno il pH della biomassa permettendone la conservazione). Quindi, se il prodotto tende ad essere secco, occorre diminuire la lunghezza di taglio. In caso contrario, all’aumentare dell’umidità è possibile aumentare la lunghezza di taglio in quanto in fase di riempimento della trincea i singoli pezzettini di trinciato saranno compattati meglio.</p>
<p>Anche la destinazione d’uso gioca un ruolo importante. Un mais destinato agli impianti di biogas deve essere trinciato più fine per favorire l’azione dei batteri metanigeni. Al contrario, un mais per alimentazione dei ruminanti può essere trinciato con lunghezze maggiori per favorire l’attività ruminale.</p>
<figure class="article-content__image"><img src="assets/articles/tips-insilato/fine-2-paragrafo.jpg" alt="Lunghezze di trinciatura consigliate per le principali foraggere"></figure>

<p>Nella tabella soprastante, tratta da un articolo pubblicato sull’<em>Informatore Zootecnico</em> n. 10/2023, il Forage Team di Torino indica le lunghezze di taglio consigliate per alcune colture.</p>

<h2>Numero 3: altezza di taglio</h2>
<p>La letteratura non ha dubbi nel suggerire un’altezza di taglio da terra di almeno 40 centimetri e i motivi sono tre: evitare la contaminazione del prodotto da terra o batteri presenti sul suolo; evitare le zone più lignificate della pianta e quindi inutili al fine nutrizionale; evitare le zone in cui si accumulano i nitrati qualora la pianta entri in stress.</p>

<figure class="article-content__image"><img src="assets/articles/tips-insilato/fine-3.webp" alt="Trinciatura del mais in campo"></figure>

<h2>Numero 4: rompere la granella</h2>
<p>L’utilizzo del rompigranella (o corn cracker) favorisce la fuoriuscita di amido dalle cariossidi a beneficio dei processi fermentativi. Questo porta a benefici anche in termini di digeribilità dell’alimento.</p>

<figure class="article-content__image"><img src="assets/articles/tips-insilato/fine-4.webp" alt="Rompigranella durante la raccolta del mais"></figure>

<h2>Numero 5: compattamento della trincea</h2>
<p>Il compattamento della trincea dev’essere rapido ma allo stesso tempo preciso. Non bisogna avere fretta nel chiudere la trincea, ma prestare molta attenzione ed evitare bolle d’aria sotto ai teli. Una trincea andrebbe riempita in uno o massimo due giorni, e nel caso di riempimento in più giorni andrebbe coperta durante la sosta.</p>

<figure class="article-content__image"><img src="assets/articles/tips-insilato/fine-5.webp" alt="Compattamento dell'insilato di mais in trincea"></figure>

<h2>Numero 6: copertura della trincea</h2>
<p>La letteratura consiglia di coprire la trincea con teli spessi almeno cinque millimetri facendo molta attenzione a far aderire bene il telo alla biomassa, senza creare sacche d’aria o avvallamenti dove potrebbe stagnare l’acqua. Per quanto riguarda la zavorratura, la letteratura consiglia di applicare un peso di almeno cento chilogrammi per metro quadro.</p>

<figure class="article-content__image"><img src="assets/articles/tips-insilato/fine-6.webp" alt="Trinciatura del mais con raccolta dell'insilato"></figure>

<h2>Numero 7: desilamento</h2>
<p>È consigliabile organizzare le proprie trincee in modo da avere un fronte di desilamento di almeno 15 centimetri in inverno e 25 in estate. Questo perché i primi centimetri di fronte tendono a ossidarsi e quindi perdere di qualità. Garantendo un fronte di desilamento giornaliero abbastanza spesso, è possibile fornire agli animali prodotto ben conservato e non solo quello ossidato presente nei primi centimetri.</p>`
  },
  {
    slug: "perche-trattori-john-deere-verdi-gialli",
    title: "Perché i trattori John Deere sono verdi e gialli? La storia dietro i colori iconici",
    excerpt: "Dalla Waterloo Engine Company alla tutela legale: come il verde e il giallo sono diventati il simbolo inconfondibile di John Deere.",
    category: "Altro",
    date: "2026-09-18",
    readTime: "5 min di lettura",
    image: "assets/articles/colore-john-deere/copertina.webp",
    featured: true,
    content: `<p>John Deere è uno dei marchi di macchine agricole più famosi e riconosciuti al mondo. Nel 2023 ha registrato un fatturato di circa 61 miliardi di dollari e conta oltre 83.000 dipendenti a livello globale.</p>

<p>Quando si parla di John Deere, due elementi vengono subito in mente: il logo con il cervo e i caratteristici colori verde e giallo.</p>

<p>Se il logo è un chiaro riferimento al cognome del fondatore, la scelta della combinazione cromatica non è altrettanto scontata. In realtà, dietro al verde e al giallo ci sono motivi storici, curiosità legali e anche qualche leggenda.</p>

<h2>Una combinazione di colori “protetta” per legge</h2>
<p>Nel 2017, John Deere intentò una causa contro un’azienda concorrente che aveva verniciato le proprie attrezzature agricole con gli stessi colori verde e giallo.</p>

<p>Il tribunale diede ragione al costruttore americano: quella combinazione era ormai talmente iconica da essere immediatamente associata a John Deere, sinonimo di qualità e affidabilità nel settore agricolo.</p>

<p>Proteggere questi colori significava difendere l’identità visiva e commerciale dell’azienda, evitando che altri potessero trarne vantaggio.</p>

<h2>Le teorie, più o meno fondate, sull’origine dei colori</h2>
<p>Negli anni sono circolate diverse ipotesi sulla scelta del verde e del giallo.</p>

<p>Una delle più romantiche sostiene che sia stata la moglie di John Deere a selezionare i colori: il verde per rappresentare le colture in crescita e il giallo per quelle mature, pronte per la raccolta.</p>

<p>Tuttavia, questa versione è improbabile: quando l’azienda iniziò a produrre trattori, il fondatore e sua moglie erano già scomparsi.</p>

<figure class="article-content__image"><img src="assets/articles/colore-john-deere/middle.webp" alt="Trattori John Deere al lavoro in campo"></figure>

<h2>Dai primi aratri ai trattori verdi</h2>
<p>All’inizio, John Deere non produceva trattori, ma aratri. Il fondatore divenne famoso per aver ideato il primo aratro autopulente negli Stati Uniti, una soluzione che risolveva il problema del terreno appiccicoso che costringeva gli agricoltori a continue pause per la pulizia del vomere.</p>

<p>La svolta arrivò nel 1918, quando John Deere acquistò la Waterloo Engine Company, già produttrice di trattori. I modelli Waterloo erano dipinti di verde con dettagli gialli e l’azienda decise di mantenere questa livrea, che la distingueva nettamente dai competitor, i quali utilizzavano il rosso.</p>

<p>Piccola curiosità: all’epoca, circolava una battuta tra i sostenitori di John Deere: i trattori dei competitor erano rossi in quanto più facili da trovare nei campi quando fermi per rotture.</p>

<p>I John Deere, invece, “potevano mimetizzarsi” nel verde delle colture, visto che continuavano a lavorare senza problemi.</p>

<p>La combinazione verde e giallo di John Deere non è frutto del caso: nasce da una scelta strategica legata a un’acquisizione e si è trasformata in un simbolo distintivo e tutelato.</p>

<p>Oggi, quel mix cromatico è parte integrante dell’identità del marchio e continua a rendere inconfondibili le sue macchine in tutto il mondo.</p>`
  },
  {
    slug: "record-mondiale-resa-granella-mais-david-hula",
    title: "Qual è il record del mondo per la più alta resa di granella di mais?",
    excerpt: "David Hula ha raggiunto 390 quintali di mais per ettaro: ecco le scelte agronomiche e tecniche dietro una resa da record.",
    category: "Altro",
    date: "2026-09-18",
    readTime: "4 min di lettura",
    image: "assets/articles/record-mais/copertina.webp",
    featured: true,
    content: `<p><strong>390 quintali di mais per ettaro:</strong> ecco come David Hula nel 2023 è riuscito a raggiungere questa incredibile produzione, battendo il precedente record del mondo, che tra l’altro era già suo.</p>

<h2>Una densità di semina elevata</h2>
<p>Per avere una resa così alta serve un elevato investimento iniziale: David ha ottenuto il record con una densità di semina pari a 12 piante per metro quadro, seminate con un interfila di 75 centimetri.</p>

<h2>La scelta dell’ibrido</h2>
<p>Un altro fattore importante è l’ibrido di partenza, che dev’essere in grado di garantire un’elevata produzione potenziale. David ha utilizzato un ibrido Pioneer chiamato P14830VYHR, con un ciclo di 114 giorni.</p>

<p>Si tratta di un ibrido OGM resistente a diversi erbicidi e anche alla piralide. Questo sicuramente ha aiutato sia nel controllo delle infestanti sia nel controllo della piralide stessa, che in Italia può creare un sacco di problemi, minacciando la resa sia in termini di quantità sia di qualità. Dalle ferite provocate dalla piralide, infatti, possono entrare funghi patogeni che talvolta possono portare alla formazione di micotossine. E ricordiamo che un mais che supera una certa soglia di micotossine è invendibile.</p>

<figure class="article-content__image"><img src="assets/articles/record-mais/middle.webp" alt="Mais in campo sotto il cielo estivo"></figure>

<h2>Irrigazione efficiente e monitorata</h2>
<p>Per quanto riguarda l’irrigazione, il mais è stato irrigato a manichetta, quindi con un metodo estremamente efficiente dal punto di vista del consumo idrico. L’acqua per irrigare i campi viene presa direttamente dal fiume James, che scorre vicino all’azienda di David, quindi è sempre presente e abbondante.</p>

<p>Inoltre, nel campo erano presenti sensori per il monitoraggio dell’umidità del terreno, così da capire quando la pianta aveva bisogno di acqua e fornirla tempestivamente, evitando lo stress idrico.</p>

<h2>Le concimazioni</h2>
<p>Veniamo ora alle concimazioni:</p>
<ul>
  <li>640 kg di azoto per ettaro;</li>
  <li>173 kg/ha di fosforo;</li>
  <li>536 kg/ha di potassio;</li>
  <li>90 kg/ha di zolfo;</li>
  <li>14 kg/ha di boro.</li>
</ul>
<p>E come se non bastasse, David ha anche utilizzato diversi biostimolanti per dare una marcia in più alla coltura e migliorare anche tutti i meccanismi di assorbimento delle sostanze nutritive.</p>

<h2>La raccolta e il calcolo della resa</h2>
<p>Nel complesso David ha coltivato 5 ettari in questo modo e la resa record di 390 quintali per ettaro è stata calcolata trebbiando tutti e 5 gli ettari e dividendo la resa finale per 5, ottenendo così una media per ettaro.</p>

<p>Per quanto riguarda l’umidità di raccolta, questa si aggira intorno al 22-25%. Per la trebbiatura è stata utilizzata una John Deere S770.</p>`
  },
  {
    slug: "krone-aggiorna-carro-trasporto-universale-gx",
    title: "Krone aggiorna il suo carro da trasporto universale GX: ecco cosa cambia",
    excerpt: "Tre modelli, sterzatura elettronica attiva e nuove funzioni di scarico: le principali novità della gamma Krone GX.",
    category: "Attrezzature",
    date: "2026-09-18",
    readTime: "4 min di lettura",
    image: "assets/articles/krone-gx/copertina.webp",
    featured: true,
    content: `<p>Krone ha presentato la versione aggiornata dei suoi carri da trasporto universale GX introducendo tre modelli: GX 360, GX 440 e GX 520, con un volume di carico rispettivamente di 36, 44 e 52 metri cubi. Tutti i nuovi modelli dispongono di una nuova generazione di centraline elettroniche, di una nuova interfaccia grafica e di un design esterno rinnovato.</p>

<h2>La nuova sterzatura attiva elettronica</h2>
<p>La nuova generazione GX offre ora la sterzatura attiva elettronica, caratterizzata dall’assenza di contatto meccanico. Il sensore posto davanti al primo assale calcola l’angolo di sterzata migliore a ogni curva, considerando direzione di marcia e velocità.</p>

<p>In questo modo non sono richiesti attuatori o componenti meccanici; quindi, l’angolo di sterzata risulta più preciso, a vantaggio della manovrabilità del carro.</p>

<h2>Più robusto e facile da manutenere</h2>
<p>Sono stati migliorati anche numerosi dettagli costruttivi, al fine di rendere il carro ancora più robusto, pulito e facile da manutenere. Un esempio è il riposizionamento della scatola di trasmissione, che consente di avere più spazio libero nella parte frontale del carro.</p>

<figure class="article-content__image"><img src="assets/articles/krone-gx/middle-o-finale.webp" alt="Carro Krone GX durante il trasporto del raccolto"></figure>

<h2>Allestimenti PLUS e PRO</h2>
<p>I modelli GX sono disponibili nelle varianti “PLUS” o “PRO”. Nello specifico, il GX 360 è disponibile nella variante PLUS, il GX 440 in entrambe le varianti e il GX 520 nella variante PRO.</p>

<p>Le varianti PLUS sono caratterizzate da elettronica e impianto oleodinamico più semplici. Le varianti PRO sono dotate di serie della gestione ISOBUS. Sono disponibili, inoltre, paratie laterali telescopiche e azionate idraulicamente.</p>

<h2>La funzione ExactUnload</h2>
<p>I modelli PRO possono contare sulla funzione “ExactUnload”, che permette di adeguare la velocità di scarico alla lunghezza del silo e alla velocità del trattore.</p>`
  },
  {
    slug: "krone-presenta-nuova-generazione-carri-autocaricanti-mx",
    title: "Krone presenta la nuova generazione di carri autocaricanti MX",
    excerpt: "Tre modelli, il nuovo raccoglitore EasyFlow e il rotore OptiGrass: tutte le novità della gamma Krone MX.",
    category: "Attrezzature",
    date: "2026-09-18",
    readTime: "5 min di lettura",
    image: "assets/articles/krone-mx/copertina.webp",
    featured: true,
    content: `<p>Krone ha appena presentato l’aggiornamento dei suoi carri autocaricanti MX introducendo tre modelli:</p>
<ul>
  <li><strong>MX 310</strong>, da 30 metri cubi di volume di carico e con un’altezza che non supera i 3,4 metri;</li>
  <li><strong>MX 340</strong>, la via di mezzo, con un volume di carico pari a 34 metri cubi;</li>
  <li><strong>MX 380</strong>, da 38 metri cubi e con un’altezza pari a 3,7 metri.</li>
</ul>

<h2>Il nuovo raccoglitore EasyFlow</h2>
<p>Il raccoglitore EasyFlow è stato allargato di 20 centimetri e ora misura 2,02 metri di larghezza. È dotato del nuovo azionamento oleodinamico, che permette di adeguare in ogni momento la sua velocità alle condizioni operative.</p>

<p>Il raccoglitore è sospeso lungo l’asse del rotore; questo permette di avere un’ampia possibilità di escursione verticale e un ottimo adattamento al terreno in ogni contesto.</p>

<figure class="article-content__image"><img src="assets/articles/krone-mx/foto-meta.webp" alt="Carro autocaricante Krone MX al lavoro in campo"></figure>

<h2>Rotore OptiGrass e sistema di taglio SplitCut</h2>
<p>Novità assoluta è l’adozione del sistema rotore OptiGrass, già presente nei carri RX e ZX. Il rotore ha un diametro di 760 mm ed è dotato anche di ampi listelli di convogliamento e del sistema di taglio periferico SplitCut.</p>

<p>Sono disponibili due versioni, da 39 coltelli o 52 coltelli, in modo da avere una lunghezza di taglio teorica rispettivamente di 37 o 28 mm.</p>

<h2>Fondo mobile e trasmissione</h2>
<p>Le novità riguardano anche il fondo mobile del carro, in quanto per la prima volta il tensionatore della catena è alloggiato posteriormente. Nella parte anteriore si libera dello spazio che permette al fondo mobile di arrivare a ridosso del rotore, assicurando il completo svuotamento del vano di carico.</p>

<p>L’azionamento è a cinghia. Il sistema è stato adeguato e protetto fino a 2.000 Nm, risultando ideale per trattori con potenze comprese tra i 130 e 250 cavalli.</p>

<h2>Assali, pneumatici e interfaccia</h2>
<p>Il carro MX è disponibile con assale tandem o assale tandem con sospensione oleodinamica. Gli pneumatici da 22,5 o 26,5 pollici garantiscono un basso compattamento.</p>

<p>Completano il quadro l’interfaccia ISOBUS completamente ridisegnata, che permette la gestione intuitiva e la configurazione di numerose funzioni automatiche.</p>`
  },
  {
    slug: "prima-fendt-ideal-riso-italia",
    title: "La prima Fendt Ideal a riso in Italia: cosa cambia rispetto a una normale Ideal?",
    excerpt: "Motore, barra di taglio, sistema di trebbiatura e adattamenti specifici: alla scoperta della prima Fendt Ideal a riso in Italia.",
    category: "Macchine da raccolta",
    date: "2026-09-18",
    readTime: "7 min di lettura",
    image: "assets/articles/fendt-ideal-riso/copertina.webp",
    featured: true,
    content: `<p>L’annata agraria 2026 ha visto scendere in campo la prima Fendt Ideal a riso presente sul territorio italiano e, grazie alla disponibilità della concessionaria, ho avuto modo di vederla quasi in anteprima.</p>

<h2>Motore e sistemi principali</h2>
<p>Si tratta di una Ideal 9T, che monta un motore MAN da 15,2 litri a 6 cilindri e 660 CV di potenza massima. Si tratta dello stesso motore presente sui Fendt 1100 Vario MT di prima e seconda generazione.</p>

<p>Caratteristica particolare delle Ideal è la presenza di una ventola reversibile, su questo modello da 950 mm, con una superficie di raffreddamento pari a 2,7 metri quadrati. L’aria viene aspirata centralmente attraverso la griglia del radiatore e, a seconda della temperatura, la ventola cambia automaticamente il senso di rotazione.</p>

<p>La trasmissione offre due marce con un range di velocità rispettivamente di 0-15 km/h e 0-40 km/h, che si possono cambiare comodamente dal bracciolo a fianco del sedile in cabina.</p>

<h2>Barra di taglio e automazione</h2>
<p>La barra di taglio che si vede nelle immagini copre circa 7,5 metri di larghezza, ma su questa macchina è possibile montare barre fino a 12,2 metri.</p>

<p>Il sistema TerraControl permette di automatizzare distanza e angolazione della barra sul terreno. L’operatore è supportato da diverse funzioni automatiche, come la regolazione dell’altezza di lavoro, la posizione zero, la pressione al suolo, il sollevamento in retromarcia, la velocità dell’aspo e la gestione della posizione e del bordo campo.</p>

<p>I cilindri di sollevamento della barra sulla Ideal 9 hanno un diametro di 85 mm e sollevano fino a 6,5 tonnellate. La barra è in grado di compensare pendenze laterali fino all’8% grazie a due cilindri sul telaio.</p>

<p>Il sistema AutoDock aggancia automaticamente l’attrezzo senza dover lasciare il posto di guida.</p>

<figure class="article-content__image"><img src="assets/articles/fendt-ideal-riso/middle-prima-del-titolo.webp" alt="Mietitrebbia Fendt Ideal al lavoro in una risaia"></figure>

<h2>La trebbiatura</h2>
<p>La trebbiatura è resa possibile grazie a due rotori da 600 mm di diametro e 4.838 mm di lunghezza, per un’area di trebbiatura pari a 1,66 metri quadrati e un’area di separazione di 2,88 metri quadrati.</p>

<p>Tutti i componenti di trebbiatura sono disposti su quattro file, ricreando una struttura elicoidale per accompagnare il prodotto lungo il rotore nel modo più delicato possibile.</p>

<p>I controbattitori sono disponibili in più versioni e sostituibili lateralmente.</p>

<p>Il rullo di alimentazione da 600 mm ruota a una velocità pari al 70% della velocità dei rotori.</p>

<p>La pula può essere trattata in tre diversi modi: trinciata e miscelata con la paglia, inclusa nell’andana oppure sparsa lateralmente, separandola dalla paglia.</p>

<h2>Cosa cambia rispetto a una normale Ideal?</h2>
<p>Rispetto a tutte le altre Ideal presenti sul mercato, questa particolare versione a riso può contare su uno speciale rivestimento degli organi interni, pensato per proteggerli dall’elevata usura causata dalla coltura.</p>

<p>In secondo luogo, questa Ideal presenta una griglia del controbattitore universale. Di fatto, non è specifica per il riso, ma può adattarsi a qualsiasi coltura, riso compreso, in modo da non dover cambiare griglie ogniqualvolta si cambia tipologia di coltura da raccogliere.</p>`
  },
  {
    slug: "mietitrebbie-full-track-risaia",
    title: "Mietitrebbie full track: hanno davvero senso?",
    excerpt: "Perché le mietitrebbie con quattro cingoli possono fare la differenza nella raccolta del riso su terreni difficili e umidi.",
    category: "Macchine da raccolta",
    date: "2026-09-18",
    readTime: "5 min di lettura",
    image: "assets/articles/mietitrebbie-full-track/copertina.webp",
    featured: true,
    content: `<p>Perché spendere centinaia di migliaia di euro per una mietitrebbia e altre decine di migliaia per equipaggiarla con dei cingoli al posteriore?</p>

<h2>Il problema del terreno in risaia</h2>
<p>In agricoltura, è noto, bisognerebbe entrare in campo solo quando il terreno è in tempera, ovvero quando l’umidità del suolo non è eccessiva. In caso contrario si rischierebbe di compattare il terreno in modo eccessivo, danneggiandone la struttura e minacciandone la fertilità.</p>

<p>Questo discorso in risaia viene a mancare per due motivi:</p>
<ul>
  <li>durante l’anno, per più mesi, la camera di risaia viene allagata per creare le condizioni necessarie alla crescita del riso. Questo crea un ambiente estremamente umido, che difficilmente si asciugherà del tutto per la raccolta, nonostante l’acqua venga tolta settimane prima;</li>
  <li>il compattamento in risaia non è da vedere come un aspetto del tutto negativo. Esso favorisce la tenuta della camera di risaia, diminuendo la quantità d’acqua necessaria per garantire una continua sommersione.</li>
</ul>

<p>Questi fattori rendono la risaia un ambiente difficile soprattutto per i mezzi agricoli: da qui la necessità di utilizzare soluzioni alternative ai classici pneumatici.</p>

<h2>Dagli pneumatici ai cingoli</h2>
<p>Se durante le lavorazioni è sufficiente sostituire gli pneumatici tradizionali con le ruote in ferro, durante la trebbiatura la soluzione è un’altra: il cingolo.</p>

<p>Non esiste mietitrebbia in risaia che non sia dotata almeno di due cingoli, siano essi in ferro o in gomma, anche se, soprattutto nei terreni difficili, due cingoli non sempre bastano.</p>

<figure class="article-content__image"><img src="assets/articles/mietitrebbie-full-track/middle.webp" alt="Mietitrebbia full track al lavoro in risaia"></figure>

<h2>La soluzione full track</h2>
<p>Ecco che entrano in gioco le mietitrebbie “full track”, ovvero con quattro cingoli, realizzate solitamente da ditte che si occupano di produrre cingolature su misura per macchinari che dalla fabbrica uscirebbero senza.</p>

<h2>Più produttività e tempestività</h2>
<p>Una spesa sicuramente importante, ma giustificata da diversi fattori, primo tra tutti la produttività. Avere una macchina in grado di entrare in campo quando le normali mietitrebbie non riuscirebbero significa aumentarne la capacità di lavoro. Questo è un aspetto positivo sia per le aziende agricole sia per i contoterzisti.</p>

<p>Avere una macchina in grado di entrare in campo quando le altre non riescono è un enorme vantaggio competitivo per il contoterzista, ma anche una comodità per il cliente, che non vede l’ora di vedere tutta quella granella al sicuro nei silos.</p>

<p>Il discorso è il medesimo anche per le aziende agricole senza terzista che decidono di acquistare una macchina da raccolta per poi dotarla di cingolatura posteriore. Maggiore tempestività, maggiore produttività e granella al sicuro.</p>

<p>Sei curioso di vedere una di queste macchine all’opera? Fatti un giro sul mio canale YouTube “ste.agritech”!</p>`
  },
  {
    slug: "claas-presenta-nuovi-arion-5-cmatic",
    title: "Claas ha presentato i nuovi Arion 5 CMATIC introducendo tre nuovi modelli",
    excerpt: "Tre nuovi Arion 5 CMATIC da 145 a 180 cavalli: motore, trasmissione continua e comfort per un trattore tuttofare.",
    category: "Trattori",
    date: "2026-09-18",
    readTime: "4 min di lettura",
    image: "assets/articles/claas-arion-5-cmatic/copertina.webp",
    featured: true,
    content: `<p>Dopo aver rinnovato le gamme più potenti, come Axion 8 e Axion 9, Claas pensa ora ai più piccoli, introducendo tre nuovi modelli: ARION 5.180 CMATIC, ARION 5.160 CMATIC e ARION 5.140 CMATIC, con potenze massime rispettivamente pari a 180, 165 e 145 cavalli.</p>

<h2>Motore e versatilità</h2>
<p>Sotto al cofano troviamo un motore a quattro cilindri da 4,5 litri che, sul modello top di gamma, eroga 180 CV e 730 Nm di coppia a 1.500 giri al minuto.</p>

<p>Potenza e compattezza rendono questi nuovi Arion dei tuttofare, anche grazie alla possibilità di equipaggiarli con un caricatore frontale.</p>

<h2>Trasmissione CMATIC</h2>
<p>La trasmissione a variazione continua CMATIC rende più fluide le lavorazioni quotidiane e offre una velocità massima pari a 50 km/h a 1.490 giri al minuto.</p>

<h2>Auto Load Anticipation</h2>
<p>Una funzione interessante, presente anche sui modelli delle gamme superiori, è l’<strong>Auto Load Anticipation</strong>, che permette di aumentare automaticamente i giri motore prima del verificarsi di un aumento di carico, garantendo una migliore erogazione della potenza e una maggiore efficienza.</p>

<h2>Comfort in cabina</h2>
<p>In cabina viene migliorato il comfort dell’operatore attraverso alcune novità, come il nuovo sedile di guida con funzione massaggio e il nuovo sistema multimediale con Apple CarPlay, Android Auto e DAB+.</p>

<p>L’assale anteriore PROACTIV e la cabina ancora più silenziosa e ammortizzata completano il pacchetto.</p>

<figure class="article-content__image"><img src="assets/articles/claas-arion-5-cmatic/finale.webp" alt="Trattore Claas Arion al lavoro con un rimorchio"></figure>`
  },
  {
    slug: "seconda-generazione-fendt-1100-vario-mt",
    title: "Fendt ha presentato la seconda generazione dei cingolati 1100 Vario MT",
    excerpt: "Nuova cabina FendtOne, illuminazione fino a 84.300 lumen, sospensione Smart Ride e motori fino a 680 cavalli.",
    category: "Trattori",
    date: "2026-09-18",
    readTime: "7 min di lettura",
    image: "assets/articles/fendt-1100-vario-mt/copertina.webp",
    featured: true,
    content: `<p>Tra i più grandi cambiamenti troviamo la cabina, che vede un nuovo concetto di illuminazione a LED, e la postazione di guida FendtOne.</p>

<h2>Illuminazione e cabina FendtOne</h2>
<p>Con i 12 fari Ultra Vision il trattore raggiunge i 55.800 lumen, mentre i fari di lavoro sul tetto superiore erogano altri 6.400 lumen. Su richiesta è possibile aggiungere ulteriori fari di lavoro, arrivando così a 11.600 lumen. Aggiungendo altri quattro fari da 4.400 lumen posti sulle tech rails, il trattore arriva, nella versione più equipaggiata, a toccare gli 84.300 lumen.</p>

<p>Grazie alla consolle in cabina è possibile memorizzare fino a quattro profili di illuminazione, in modo da regolare le luci a seconda delle esigenze. Ad esempio, se il trattore si trova di fianco a una mietitrebbia o a una trincia, è possibile diminuire l’intensità delle luci verso la macchina semovente, evitando di abbagliare l’operatore.</p>

<p>La postazione di guida FendtOne permette agli operatori di trovare gli stessi comandi presenti sui trattori gommati. La dotazione di base comprende il bracciolo con joystick multifunzionale e tasti configurabili, un terminale da bracciolo da 12 pollici, il joystick 3L e una dashboard digitale dietro al volante. Inoltre, è possibile equipaggiare un altro schermo aggiuntivo nel tetto della cabina come optional.</p>

<figure class="article-content__image"><img src="assets/articles/fendt-1100-vario-mt/meta.webp" alt="Postazione di guida del Fendt 1100 Vario MT"></figure>

<h2>Agricoltura di precisione e gestione della polvere</h2>
<p>Non mancano tutte le funzioni di agricoltura di precisione, la connessione ISOBUS, la telemetria e i sistemi di guida automatica. La gestione delle capezzagne permette di programmare manovre automatiche sia del trattore sia delle attrezzature.</p>

<p>La nuova serie 1100 Vario può essere dotata di una ventola reversibile, che pulisce autonomamente la griglia e il pacchetto radiatori. Nella configurazione standard sono inclusi anche un’aspirazione passiva della polvere per il filtro dell’aria del motore e una pulizia passiva opzionale del filtro dell’aria della cabina.</p>

<p>I filtri vengono puliti di continuo tramite l’effetto di aspirazione creato dalla ventola di raffreddamento e grazie a un getto d’aria a ciclone, senza intervento manuale. Questo permette di aumentare le prestazioni in ambienti particolarmente polverosi.</p>

<h2>Sospensione e sterzo</h2>
<p>La sospensione Smart Ride, collegata al telaio del trattore e a entrambe le unità cingolate, permette a queste ultime di muoversi liberamente l’una dall’altra. Questo vantaggio è particolarmente evidente in caso di irregolarità del terreno.</p>

<p>Come optional è disponibile anche l’autolivellamento Smart Ride+, che ottimizza la posizione del veicolo durante le interazioni tra trattore e attrezzo.</p>

<p>Lo sterzo con bloccaggio differenziale, esente da manutenzione, assicura una differenza di velocità tra le due unità senza frenata attiva e quindi un funzionamento fluido, che protegge il suolo.</p>

<p>Per quanto riguarda le zavorre, sono disponibili diverse opzioni, tra cui zavorre anteriori, zavorre nel telaio, zavorre sulla ruota di guida e sulle ruote motrici.</p>

<h2>Motori e trasmissione</h2>
<p>I motori restano invariati rispetto alla prima generazione. I Fendt 1151, 1156 e 1162 ospitano un motore MAN a sei cilindri da 15,2 litri, mentre il top di gamma 1167 ospita un motore MAN a sei cilindri da 16,2 litri.</p>

<p>Le potenze sono rispettivamente pari a 521, 571, 625 e 680 cavalli, con una coppia massima pari a 2.500, 2.700, 2.900 e 3.100 Nm sul top di gamma.</p>

<p>La trasmissione a variazione continua è stata ulteriormente perfezionata per gestire queste potenze. Di fatto si tratta del trattore a variazione continua più potente attualmente a listino.</p>

<h2>Impianto idraulico</h2>
<p>Come nella serie precedente, il trattore dispone di una pompa idraulica da 220 litri al minuto e, in opzione, di una seconda pompa idraulica sempre da 220 litri al minuto. Queste alimentano due circuiti separati, con tutti i vantaggi annessi.</p>

<p>Ad esempio, quando si utilizza una seminatrice pneumatica combinata, mentre il ventilatore richiede costantemente un’elevata quantità di olio a bassa pressione, l’impianto di sollevamento relativo alla barra di semina richiede una pressione elevata a bassa quantità. Avere due circuiti indipendenti permette di gestire le varie richieste in modo ottimale.</p>

<figure class="article-content__image"><img src="assets/articles/fendt-1100-vario-mt/fine.webp" alt="Fendt 1100 Vario MT cingolato al lavoro in campo"></figure>`
  }
];
