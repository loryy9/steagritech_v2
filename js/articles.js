/* =========================================================
   articles.js — legge gli articoli da window.BLOG_ARTICLES
   (definito in content/articles-data.js, incluso PRIMA di
   questo script) e li mostra:
   - in home, come "articoli in evidenza" (data-featured="N")
   - nella pagina articoli, con paginazione "carica altri" (STEP),
     ricerca testuale e filtro per categoria (?category=...)

   Nessuna richiesta di rete: funziona anche aprendo i file
   HTML direttamente col doppio click.
   ========================================================= */

(function () {
  "use strict";

  var STEP = 2; // quanti articoli caricare ad ogni click / al primo caricamento

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

  function cardTemplate(article) {
    var img = article.image
      ? '<img class="article-card__image" src="' +
        escapeHtml(article.image) +
        '" alt="' +
        escapeHtml(article.title) +
        '" loading="lazy">'
      : '<div class="article-card__image"></div>';

    return (
      '<article class="article-card">' +
      img +
      '<div class="article-card__body">' +
      '<a class="article-card__category" href="articles.html?category=' +
      encodeURIComponent(article.category || "Blog") +
      '">' +
      escapeHtml(article.category || "Blog") +
      "</a>" +
      '<h3 class="article-card__title"><a href="article.html?slug=' +
      encodeURIComponent(article.slug) +
      '">' +
      escapeHtml(article.title) +
      "</a></h3>" +
      '<p class="article-card__excerpt">' +
      escapeHtml(article.excerpt || "") +
      "</p>" +
      '<div class="article-card__meta">' +
      "<span>" +
      escapeHtml(article.author || "Redazione") +
      "</span>" +
      "<span>&middot;</span>" +
      "<span>" +
      formatDate(article.date) +
      "</span>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function featuredCardTemplate(article) {
    var img = article.image
      ? '<img class="featured-card__image" src="' + escapeHtml(article.image) + '" alt="' + escapeHtml(article.title) + '" loading="lazy">'
      : "";

    return (
      '<a class="featured-card" href="article.html?slug=' + encodeURIComponent(article.slug) + '">' +
        img +
        '<div class="featured-card__overlay">' +
          '<span class="featured-card__category">' + escapeHtml(article.category || "Blog") + "</span>" +
          '<h3 class="featured-card__title">' + escapeHtml(article.title) + "</h3>" +
          '<div class="featured-card__meta">' + escapeHtml(article.author || "Redazione") + " &middot; " + formatDate(article.date) + "</div>" +
        "</div>" +
      "</a>"
    );
  }

  function sortByDateDesc(list) {
    return list.slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  function getArticles() {
    return Array.isArray(window.BLOG_ARTICLES) ? window.BLOG_ARTICLES : [];
  }

  /* ---------- Home: articoli in evidenza ---------- */
  function renderFeatured() {
    var container = document.querySelector("[data-featured]");
    if (!container) return;
    var limit = parseInt(container.getAttribute("data-featured"), 10) || 3;

    var articles = getArticles();
    if (!articles.length) {
      container.innerHTML =
        '<p class="state-message">Nessun articolo disponibile al momento.</p>';
      return;
    }

    var featured = articles.filter(function (a) {
      return a.featured;
    });
    var pool = featured.length ? featured : articles;
    var items = sortByDateDesc(pool).slice(0, limit);
    container.innerHTML = items.map(featuredCardTemplate).join("");
  }

  /* ---------- Pagina articoli: elenco, ricerca, filtro categoria, "carica altri" ---------- */
  function initArticleList() {
    var container = document.querySelector("[data-articles-list]");
    var loadMoreBtn = document.querySelector("[data-load-more]");
    var statusEl = document.querySelector("[data-articles-status]");
    var searchInput = document.querySelector("[data-article-search]");
    var filterBadge = document.querySelector("[data-category-filter]");
    if (!container) return;

    var allArticles = sortByDateDesc(getArticles());
    var visibleCount = 0;
    var activeCategory = new URLSearchParams(window.location.search).get("category") || "";

    function matches(article, query) {
      if (!query) return true;
      var haystack = (
        (article.title || "") +
        " " +
        (article.excerpt || "") +
        " " +
        (article.category || "") +
        " " +
        (article.author || "")
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

    function updateFilterBadge() {
      if (!filterBadge) return;
      if (activeCategory) {
        filterBadge.innerHTML =
          "Categoria: <strong>" + escapeHtml(activeCategory) + "</strong> &nbsp;·&nbsp; <a href=\"articles.html\">Rimuovi filtro ✕</a>";
        filterBadge.style.display = "";
      } else {
        filterBadge.style.display = "none";
      }
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
      container.insertAdjacentHTML("beforeend", nextItems.map(cardTemplate).join(""));
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

    updateFilterBadge();

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
    renderFeatured();
    initArticleList();
  });
})();
