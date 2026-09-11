/* =========================================================
   articles.js — legge gli articoli da window.BLOG_ARTICLES
   (definito in content/articles-data.js, incluso PRIMA di
   questo script) e li mostra:
   - in home, come "articoli in evidenza" (data-featured="N")
     e come seconda griglia configurabile (data-highlighted="N")
   - nella pagina articoli, con paginazione "carica altri" (STEP),
     ricerca testuale e filtro per categoria (?category=...)

   Nessuna richiesta di rete: funziona anche aprendo i file
   HTML direttamente col doppio click.
   ========================================================= */

(function () {
  "use strict";

  var STEP = 3; // quanti articoli caricare ad ogni click / al primo caricamento

  function formatDate(isoDate) {
    var d = new Date(isoDate);
    if (isNaN(d)) return isoDate;
    return d.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : str;
    return div.innerHTML;
  }

  function metaText(article) {
    var text = formatDate(article.date);
    if (article.readTime) {
      text += " &middot; " + escapeHtml(article.readTime);
    }
    return text;
  }

  /* Inquadratura personalizzata dell'immagine in anteprima (solo nelle
     card: nell'articolo aperto si vede sempre l'immagine intera).
     - article.imagePosition: valore CSS object-position (es. "80% 30%"
       oppure "right top") — sposta il punto di inquadratura, utile se il
       soggetto non è al centro della foto.
     - article.imageZoom: numero > 1 (es. 1.2) per stringere l'inquadratura
       ("zoomare") quando il soggetto è comunque troppo piccolo/lontano.
     Vedi content/articles-data.js per un esempio commentato. */
  function imageStyleAttr(article) {
    var decl = [];
    if (article.imagePosition) {
      decl.push("object-position:" + article.imagePosition);
    }
    if (article.imageZoom && article.imageZoom !== 1) {
      decl.push("transform:scale(" + article.imageZoom + ")");
    }
    return decl.length ? ' style="' + decl.join(";") + '"' : "";
  }

  function articleCardAttrs(article) {
    return ' data-article-url="article.html?slug=' + encodeURIComponent(article.slug) + '" tabindex="0" role="link"';
  }

  function cardTemplate(article, sizeClass, showArrow) {
    var img = article.image
      ? '<img class="article-card__image" src="' +
        escapeHtml(article.image) +
        '" alt="' +
        escapeHtml(article.title) +
        '"' +
        imageStyleAttr(article) +
        ' loading="lazy">'
      : '<div class="article-card__image"></div>';

    return (
      '<article class="article-card' +
      (sizeClass ? " article-card--" + sizeClass : "") +
      '"' + articleCardAttrs(article) + '>' +
      img +
      '<div class="article-card__body">' +
      '<a class="article-card__category" href="articles.html?category=' +
      encodeURIComponent(article.category || "Blog") +
      '">' +
      escapeHtml(article.category || "Blog") +
      "</a>" +
      '<h3 class="article-card__title">' +
      escapeHtml(article.title) +
      "</h3>" +
      '<p class="article-card__excerpt">' +
      escapeHtml(article.excerpt || "") +
      "</p>" +
      '<div class="article-card__meta">' +
      "<span>" +
      metaText(article) +
      "</span>" +
      (showArrow === false ? "" : '<span class="article-card__arrow" aria-hidden="true">&rarr;</span>') +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function featuredCardTemplate(article, sizeClass, showArrow) {
    var img = article.image
      ? '<img class="featured-card__image" src="' + escapeHtml(article.image) + '" alt="' + escapeHtml(article.title) + '"' + imageStyleAttr(article) + ' loading="lazy">'
      : "";

    return (
      '<div class="featured-card"' + articleCardAttrs(article) + '>' +
        img +
        '<div class="featured-card__overlay">' +
          '<span class="featured-card__category">' + escapeHtml(article.category || "Blog") + "</span>" +
          '<h3 class="featured-card__title">' + escapeHtml(article.title) + "</h3>" +
          '<div class="featured-card__meta">' + metaText(article) + "</div>" +
        "</div>" +
        (showArrow === false ? "" : '<span class="featured-card__arrow" aria-hidden="true">&rarr;</span>') +
      "</div>"
    );
  }

  function glassCardTemplate(article, sizeClass, showArrow) {
    var isLarge = sizeClass === "lg";
    var img = article.image
      ? '<img src="' + escapeHtml(article.image) + '" alt="' + escapeHtml(article.title) + '"' + imageStyleAttr(article) + ' loading="lazy">'
      : "";

    return (
      '<article class="glass-card' + (sizeClass ? " glass-card--" + sizeClass : "") + '"' + articleCardAttrs(article) + '>' +
        '<div class="glass-card__media">' +
          img +
        "</div>" +
        '<div class="glass-card__panel">' +
          '<a class="glass-card__category" href="articles.html?category=' + encodeURIComponent(article.category || "Blog") + '">' +
            escapeHtml(article.category || "Blog") +
          "</a>" +
          '<h3 class="glass-card__title">' +
            escapeHtml(article.title) +
          "</h3>" +
          (isLarge && article.excerpt ? '<p class="glass-card__excerpt">' + escapeHtml(article.excerpt) + "</p>" : "") +
          '<div class="glass-card__meta">' +
            "<span>" + metaText(article) + "</span>" +
            (showArrow === false ? "" : '<span class="glass-card__arrow" aria-hidden="true">&rarr;</span>') +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function compactCardTemplate(article, showArrow) {
    var img = article.image
      ? '<div class="compact-card__image"><img src="' + escapeHtml(article.image) + '" alt="' + escapeHtml(article.title) + '"' + imageStyleAttr(article) + ' loading="lazy"></div>'
      : '<div class="compact-card__image"></div>';

    return (
      '<div class="compact-card"' + articleCardAttrs(article) + '>' +
        img +
        '<div class="compact-card__body">' +
          '<span class="compact-card__category">' + escapeHtml(article.category || "Blog") + "</span>" +
          '<h4 class="compact-card__title">' + escapeHtml(article.title) + "</h4>" +
          '<div class="compact-card__meta">' +
            "<span>" + metaText(article) + "</span>" +
            (showArrow === false ? "" : '<span class="compact-card__arrow" aria-hidden="true">&rarr;</span>') +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  /* Mappa nome stile (usato in data-styles) -> funzione che genera l'HTML
     della card. Per aggiungere uno stile di card nuovo, basta scrivere la
     funzione template e registrarla qui: sarà subito utilizzabile in
     qualunque combinazione di layout, senza toccare altro codice. */
  var CARD_STYLES = {
    standard: cardTemplate,
    overlay: featuredCardTemplate,
    glass: glassCardTemplate,
    compact: function (article, sizeClass, showArrow) {
      return compactCardTemplate(article, showArrow);
    },
  };

  function sortByDateDesc(list) {
    return list.slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  function getArticles() {
    return Array.isArray(window.BLOG_ARTICLES) ? window.BLOG_ARTICLES : [];
  }

  function initCardNavigation() {
    document.addEventListener("click", function (event) {
      var card = event.target.closest("[data-article-url]");
      if (!card) return;
      event.preventDefault();
      window.location.href = card.getAttribute("data-article-url");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var card = event.target.closest("[data-article-url]");
      if (!card || event.target !== card) return;
      event.preventDefault();
      window.location.href = card.getAttribute("data-article-url");
    });
  }

  /* Stessa soglia usata dal CSS per far scattare i mosaici (vedi
     css/style.css, "@media (min-width: 1000px)"): sotto ai 1000px la
     struttura mosaico torna sempre una singola colonna impilata, quindi
     su mobile ha senso scegliere anche uno stile di card diverso. */
  var DESKTOP_QUERY = "(min-width: 1000px)";

  /* ---------- Home: articoli in evidenza ----------
     Il contenitore [data-featured] decide layout e card in modo dichiarativo:
       - class sul contenitore (es. featured-grid--mosaic, --mosaic-1-4,
         --equal...) sceglie la STRUTTURA (dove va ogni slot) — conta solo
         da desktop (>= 1000px): sotto, è sempre una colonna impilata;
       - data-styles="glass,standard,standard" sceglie lo STILE di ogni
         slot, nello stesso ordine (uno dei nomi in CARD_STYLES);
       - data-sizes="lg,,"  (opzionale) applica un modificatore di
         dimensione allo slot corrispondente (per ora solo "lg");
       - data-arrow="false" (opzionale) nasconde la freccina "vai
         all'articolo" su tutte le card del contenitore (di default è
         sempre visibile);
       - data-styles-mobile / data-sizes-mobile / data-arrow-mobile /
         data-featured-mobile
         (tutti opzionali) sostituiscono le versioni sopra SOLO sotto i
         1000px — utile per mostrare, ad esempio, un mosaico "glass +
         standard" da desktop e solo card "glass" impilate da mobile.
         Se non li scrivi, sotto i 1000px si usano semplicemente le
         stesse impostazioni desktop, impilate in colonna.
     Se data-styles non è presente, il comportamento è quello originale:
     tutte le card in stile "overlay" (com'era prima su questa pagina). */
  function renderFeatured() {
    var container = document.querySelector("[data-featured]");
    if (!container) return;

    var isMobile = !window.matchMedia(DESKTOP_QUERY).matches;
    var useMobile = isMobile && container.hasAttribute("data-styles-mobile");

    var stylesAttr = container.getAttribute(useMobile ? "data-styles-mobile" : "data-styles");
    var styles = stylesAttr
      ? stylesAttr.split(",").map(function (s) { return s.trim(); })
      : null;
    var sizesAttr = container.getAttribute(useMobile ? "data-sizes-mobile" : "data-sizes") || "";
    var sizes = sizesAttr.split(",").map(function (s) { return s.trim(); });

    var showArrow = container.getAttribute(useMobile ? "data-arrow-mobile" : "data-arrow") !== "false";

    var countAttr = container.getAttribute(useMobile ? "data-featured-mobile" : "data-featured");
    var limit = parseInt(countAttr, 10) || (styles ? styles.length : 3);

    var articles = getArticles();
    if (!articles.length) {
      container.innerHTML =
        '<p class="state-message">Nessun articolo disponibile al momento.</p>';
      return;
    }

    var featured = articles.filter(function (a) {
      return a.featured;
    });
    var pool = featured.length >= limit ? featured : articles;
    var items = sortByDateDesc(pool).slice(0, limit);

    container.innerHTML = items
      .map(function (article, i) {
        var styleName = styles ? styles[i] || styles[styles.length - 1] : "overlay";
        var template = CARD_STYLES[styleName] || CARD_STYLES.overlay;
        return template(article, sizes[i] || "", showArrow);
      })
      .join("");
  }

  /* ---------- Home: seconda griglia di articoli ----------
     [data-highlighted] usa gli stessi stili di card di [data-featured], ma
     seleziona gli articoli in ordine di data partendo da data-highlighted-offset. */
  function renderHighlighted() {
    var container = document.querySelector("[data-highlighted]");
    if (!container) return;

    var limit = parseInt(container.getAttribute("data-highlighted"), 10) || 3;
    var offset = parseInt(container.getAttribute("data-highlighted-offset"), 10) || 0;
    var stylesAttr = container.getAttribute("data-styles");
    var styles = stylesAttr
      ? stylesAttr.split(",").map(function (s) { return s.trim(); })
      : null;
    var sizesAttr = container.getAttribute("data-sizes") || "";
    var sizes = sizesAttr.split(",").map(function (s) { return s.trim(); });
    var showArrow = container.getAttribute("data-arrow") !== "false";
    var articles = sortByDateDesc(getArticles()).slice(offset, offset + limit);

    if (!articles.length) {
      container.innerHTML = '<p class="state-message">Nessun articolo disponibile al momento.</p>';
      return;
    }

    container.innerHTML = articles
      .map(function (article, i) {
        var styleName = styles ? styles[i] || styles[styles.length - 1] : "standard";
        var template = CARD_STYLES[styleName] || CARD_STYLES.standard;
        return template(article, sizes[i] || "", showArrow);
      })
      .join("");
  }

  /* Se la Home usa impostazioni diverse per mobile (data-styles-mobile),
     ri-renderizza quando si attraversa la soglia dei 1000px (es. si
     ruota il telefono, o si ridimensiona la finestra) così il layout
     resta sempre coerente senza dover ricaricare la pagina. */
  function initFeaturedResponsive() {
    var container = document.querySelector("[data-featured]");
    if (!container || !container.hasAttribute("data-styles-mobile")) return;

    var query = window.matchMedia(DESKTOP_QUERY);
    var handler = function () {
      renderFeatured();
    };
    if (query.addEventListener) {
      query.addEventListener("change", handler);
    } else if (query.addListener) {
      query.addListener(handler); // fallback per Safari meno recenti
    }
  }

  /* ---------- Pagina articoli: elenco, ricerca, filtro categoria, "carica altri" ---------- */
  function initArticleList() {
    var container = document.querySelector("[data-articles-list]");
    var loadMoreBtn = document.querySelector("[data-load-more]");
    var statusEl = document.querySelector("[data-articles-status]");
    var searchInput = document.querySelector("[data-article-search]");
    var titleEl = document.querySelector("[data-articles-title]");
    var categoryLinks = document.querySelectorAll(".categorie__link");
    if (!container) return;

    var allArticles = sortByDateDesc(getArticles());
    var visibleCount = 0;
    var activeCategory = new URLSearchParams(window.location.search).get("category") || "";
    var showArrow = container.getAttribute("data-arrow") !== "false";

    function updateCategoryState() {
      if (titleEl) {
        titleEl.textContent = activeCategory
          ? "Tutti gli articoli della categoria: " + activeCategory
          : "Tutti gli articoli";
      }

      categoryLinks.forEach(function (link) {
        var linkCategory = new URL(link.href, window.location.href).searchParams.get("category") || "";
        var isActive = activeCategory && linkCategory.toLowerCase() === activeCategory.toLowerCase();
        link.classList.toggle("is-active", Boolean(isActive));
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function matches(article, query) {
      if (!query) return true;
      var haystack = (
        (article.title || "") +
        " " +
        (article.excerpt || "") +
        " " +
        (article.category || "") +
        " " 
      ).toLowerCase();
      return haystack.indexOf(query.toLowerCase()) !== -1;
    }

    function currentQuery() {
      return searchInput ? searchInput.value.trim() : "";
    }

    function filteredArticles() {
      return allArticles.filter(function (a) {
        var categoryOk = !activeCategory || (a.category || "").toLowerCase() === activeCategory.toLowerCase();
        return categoryOk && matches(a, currentQuery());
      });
    }

    function renderList() {
      var results = filteredArticles();

      if (!results.length) {
        container.innerHTML = '<p class="state-message">Nessun articolo trovato.</p>';
        if (loadMoreBtn) loadMoreBtn.style.display = "none";
        if (statusEl) statusEl.textContent = "";
        return;
      }

      // sempre paginato "a step", con o senza filtro attivo: anche con
      // centinaia di risultati, ne renderizziamo solo STEP alla volta
      visibleCount = 0;
      container.innerHTML = "";
      renderNextBatch(results);
    }

    function renderNextBatch(results) {
      results = results || filteredArticles();
      var nextItems = results.slice(visibleCount, visibleCount + STEP);
      container.insertAdjacentHTML(
        "beforeend",
        nextItems.map(function (article) { return CARD_STYLES.overlay(article, "", showArrow); }).join("")
      );
      visibleCount += nextItems.length;

      var remaining = results.length - visibleCount;
      if (loadMoreBtn) {
        loadMoreBtn.style.display = remaining > 0 ? "" : "none";
        loadMoreBtn.textContent =
          remaining > 0
            ? "Carica altri articoli (" + remaining + ")"
            : "Carica altri articoli";
      }
      if (statusEl) {
        statusEl.textContent = results.length
          ? "Visualizzati " + visibleCount + " di " + results.length + " articoli"
          : "";
      }
    }

    updateCategoryState();

    if (!allArticles.length) {
      container.innerHTML = '<p class="state-message">Nessun articolo pubblicato ancora.</p>';
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
    } else {
      renderList();
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function () {
        renderNextBatch();
      });
    }

    if (searchInput) {
      var debounceTimer = null;
      searchInput.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(renderList, 150);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCardNavigation();
    renderFeatured();
    renderHighlighted();
    initFeaturedResponsive();
    initArticleList();
  });
})();
