(function(){
  const script = document.currentScript;
  const ROOT = new URL("./", script.src);

  function url(path=""){ return new URL(path, ROOT).href; }
  window.snikiUrl = url;

  const headerHost = document.getElementById("site-header");
  if(headerHost){
    headerHost.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="${url("index.html")}">
            <span class="brand-mark">S</span>
            <span class="brand-text"><strong>Snikipedia</strong><small>den frie feltencyklopedien</small></span>
          </a>
          <form class="top-search" id="global-search">
            <input type="search" id="global-search-input" placeholder="Søk i Snikipedia">
            <button type="submit">Søk</button>
          </form>
          <nav class="top-nav">
            <a href="${url("index.html")}">Forside</a>
            <a href="${url("articles/index.html")}">Alle artikler</a>
            <a href="${url("articles/om-snikipedia.html")}">Om</a>
          </nav>
        </div>
      </header>`;
    const form = document.getElementById("global-search");
    form?.addEventListener("submit", e => {
      e.preventDefault();
      const q = document.getElementById("global-search-input").value.trim();
      location.href = url("articles/index.html") + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  }

  const footerHost = document.getElementById("site-footer");
  if(footerHost){
    footerHost.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div><strong>Snikipedia</strong> · intern humor, feltmytologi og enkelte faktiske fakta.</div>
          <div>Ikke tilknyttet Wikipedia eller Wikimedia Foundation.</div>
        </div>
      </footer>`;
  }

  function matches(article, q){
    const hay = [article.title, article.category, article.excerpt, ...(article.tags||[])].join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function articleCard(article){
    return `
      <article class="card">
        <div class="card-meta">${article.category} · oppdatert ${article.updated}</div>
        <h3><a href="${url(article.path)}">${article.title}</a></h3>
        <p>${article.excerpt}</p>
        <div>${(article.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}</div>
      </article>`;
  }

  document.querySelectorAll("[data-article-list]").forEach(host => {
    let list = window.SNIKI_ARTICLES || [];
    const limit = Number(host.dataset.limit || 0);
    const category = host.dataset.category;
    const featured = host.dataset.featured;
    if(category) list = list.filter(a => a.category === category);
    if(featured === "true") list = list.filter(a => a.featured);
    if(limit) list = list.slice(0, limit);
    host.innerHTML = list.map(articleCard).join("");
  });

  const indexHost = document.getElementById("article-index");
  if(indexHost){
    const input = document.getElementById("article-filter");
    const count = document.getElementById("article-count");
    const empty = document.getElementById("empty-state");
    const params = new URLSearchParams(location.search);
    if(params.get("q")) input.value = params.get("q");

    function render(){
      const q = input.value.trim();
      let list = window.SNIKI_ARTICLES || [];
      if(q) list = list.filter(a => matches(a,q));
      indexHost.innerHTML = list.map(articleCard).join("");
      count.textContent = `${list.length} artikkel${list.length === 1 ? "" : "er"}`;
      empty.style.display = list.length ? "none" : "block";
    }
    input.addEventListener("input", render);
    render();
  }

  const randomBtn = document.getElementById("random-article");
  if(randomBtn){
    randomBtn.addEventListener("click", () => {
      const list = window.SNIKI_ARTICLES || [];
      if(!list.length) return;
      const pick = list[Math.floor(Math.random()*list.length)];
      location.href = url(pick.path);
    });
  }
})();
