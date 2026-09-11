/* =========================================================
   article.js — pagina articolo singolo (article.html?slug=...)
   Legge lo slug dalla querystring e trova l'articolo in
   window.BLOG_ARTICLES (definito in content/articles-data.js,
   incluso PRIMA di questo script).

   Nessuna richiesta di rete: funziona anche aprendo i file
   HTML direttamente col doppio click.
   ========================================================= */

(function () {
  "use strict";

  var WORDS_PER_MINUTE = 200;

  function getSlugFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get("slug");
  }

  function formatDate(isoDate) {
    var d = new Date(isoDate);
    if (isNaN(d)) return isoDate;
    return d.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : str;
    return div.innerHTML;
  }

  function estimateReadingTime(html) {
    var text = (html || "").replace(/<[^>]*>/g, " ");
    var words = text.trim().split(/\s+/).filter(Boolean).length;
    var minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
    return minutes + (minutes === 1 ? " minuto di lettura" : " minuti di lettura");
  }

  function showError(message) {
    var main = document.querySelector("[data-article-root]");
    if (main) {
      main.innerHTML = '<div class="container section text-center">' +
        "<h1>Articolo non trovato</h1>" +
        "<p class=\"text-muted\">" + message + "</p>" +
        '<a class="btn btn--primary" href="articles.html">Torna agli articoli</a>' +
        "</div>";
    }
  }

  function renderShareButtons(article) {
    var wrap = document.querySelector("[data-share-buttons]");
    if (!wrap) return;

    var url = window.location.href;
    var text = article.title;
    var whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(text + " " + url);

    wrap.innerHTML =
      '<span class="share-buttons__label">Condividi:</span>' +
      '<a class="share-btn" href="' + whatsappUrl + '" target="_blank" rel="noopener">WhatsApp</a>' +
      '<button type="button" class="share-btn" data-copy-link>Copia link</button>';

    var copyBtn = wrap.querySelector("[data-copy-link]");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var done = function () {
          var original = copyBtn.textContent;
          copyBtn.textContent = "Link copiato!";
          setTimeout(function () {
            copyBtn.textContent = original;
          }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done).catch(function () {
            window.prompt("Copia il link:", url);
          });
        } else {
          window.prompt("Copia il link:", url);
        }
      });
    }
  }

  function relatedCardTemplate(article) {
    var img = article.image
      ? '<img class="article-card__image" src="' + escapeHtml(article.image) + '" alt="' + escapeHtml(article.title) + '" loading="lazy">'
      : '<div class="article-card__image"></div>';
    return (
      '<article class="article-card" data-article-url="article.html?slug=' + encodeURIComponent(article.slug) + '" tabindex="0" role="link">' +
        img +
        '<div class="article-card__body">' +
          '<a class="article-card__category" href="articles.html?category=' + encodeURIComponent(article.category || "Blog") + '">' + escapeHtml(article.category || "Blog") + "</a>" +
          '<h3 class="article-card__title"><a href="article.html?slug=' + encodeURIComponent(article.slug) + '">' + escapeHtml(article.title) + "</a></h3>" +
          '<p class="article-card__excerpt">' + escapeHtml(article.excerpt || "") + "</p>" +
        "</div>" +
      "</article>"
    );
  }

  function initRelatedCardNavigation() {
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

  function renderRelatedArticles(current, allArticles) {
    var section = document.querySelector("[data-related-articles]");
    var list = document.querySelector("[data-related-articles-list]");
    if (!section || !list) return;

    var sameCategory = allArticles.filter(function (a) {
      return a.slug !== current.slug && a.category === current.category;
    });
    var others = allArticles.filter(function (a) {
      return a.slug !== current.slug && a.category !== current.category;
    });
    var related = sameCategory.concat(others).slice(0, 3);

    if (!related.length) return;
    list.innerHTML = related.map(relatedCardTemplate).join("");
    section.style.display = "";
  }

  function init() {
    var slug = getSlugFromUrl();
    if (!slug) {
      showError("Nessun articolo specificato.");
      return;
    }

    var articles = Array.isArray(window.BLOG_ARTICLES) ? window.BLOG_ARTICLES : [];
    var article = articles.find(function (a) { return a.slug === slug; });
    if (!article) {
      showError("L'articolo richiesto non esiste o è stato rimosso.");
      return;
    }

    document.title = article.title + " · Il Mio Blog";

    var categoryEl = document.querySelector("[data-article-category]");
    var titleEl = document.querySelector("[data-article-title]");
    var dateEl = document.querySelector("[data-article-date]");
    var readingTimeEl = document.querySelector("[data-article-reading-time]");
    var coverEl = document.querySelector("[data-article-cover]");
    var contentEl = document.querySelector("[data-article-content]");

    if (categoryEl) {
      categoryEl.textContent = article.category || "Blog";
      categoryEl.setAttribute("href", "articles.html?category=" + encodeURIComponent(article.category || "Blog"));
    }
    if (titleEl) titleEl.textContent = article.title;
    if (dateEl) dateEl.textContent = formatDate(article.date);
    if (readingTimeEl) readingTimeEl.textContent = estimateReadingTime(article.content);
    if (coverEl && article.image) {
      coverEl.src = article.image;
      coverEl.alt = article.title;
      coverEl.style.display = "";
    }
    if (contentEl) contentEl.innerHTML = article.content || "";

    renderShareButtons(article);
    renderRelatedArticles(article, articles);

    /* Aggiorna i meta tag Open Graph/Twitter con i dati di QUESTO articolo.
       Utile per Googlebot (che esegue JavaScript) e per il titolo/anteprima
       che l'utente vede nel proprio browser; i bot di anteprima di
       WhatsApp/Facebook/X non eseguono JavaScript e vedranno invece i meta
       tag generici già presenti nell'HTML — per un'anteprima social
       perfettamente specifica per ogni articolo servirebbe generare una
       pagina HTML statica per articolo, cosa che questo boilerplate
       volutamente evita per restare semplice da gestire. */
    var setMeta = function (selector, value) {
      var el = document.querySelector(selector);
      if (el && value) el.setAttribute("content", value);
    };
    setMeta('meta[property="og:title"]', article.title);
    setMeta('meta[property="og:description"]', article.excerpt);
    setMeta('meta[property="og:url"]', window.location.href);
    setMeta('meta[name="twitter:title"]', article.title);
    setMeta('meta[name="twitter:description"]', article.excerpt);
    if (article.image) {
      setMeta('meta[property="og:image"]', article.image);
      setMeta('meta[name="twitter:image"]', article.image);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("DOMContentLoaded", initRelatedCardNavigation);
})();
