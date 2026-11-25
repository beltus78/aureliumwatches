/* Aurelium Watches — bag, filters, checkout and forms. No dependencies. */
(function () {
  var KEY = "aw-bag";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var D = window.__D || {};
  var usd = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };
  var escH = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  function read() { try { var v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v.filter(function (x) { return typeof x === "string"; }) : []; } catch (e) { return []; } }
  function write(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} count(); }
  function count() { var n = read().length; $$("[data-bagcount]").forEach(function (b) { b.textContent = n || ""; }); }
  count();

  var toastEl;
  function toast(html) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.innerHTML = html; toastEl.classList.add("on");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("on"); }, 3800);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-add]");
    if (b) {
      var slug = b.getAttribute("data-add"), bag = read();
      if (bag.indexOf(slug) < 0) { bag.push(slug); write(bag); }
      if (b.hasAttribute("data-go")) { location.href = "/bag"; return; }
      b.classList.add("done"); b.textContent = "In your bag";
      toast('Added to your bag. <a href="/bag">Checkout →</a>');
      return;
    }
    var bur = e.target.closest && e.target.closest("[data-burger]");
    if (bur) { var open = document.body.classList.toggle("nav-open"); bur.setAttribute("aria-expanded", open ? "true" : "false"); }
  });
  $$("[data-add]").forEach(function (b) { if (read().indexOf(b.getAttribute("data-add")) >= 0 && !b.hasAttribute("data-go")) { b.classList.add("done"); b.textContent = "In your bag"; } });

  // ---------- listing filters ----------
  var f = $("[data-filters]"), list = $("[data-list]");
  if (f && list) {
    var cards = $$("[data-w]", list), out = $("[data-count-out]", f), empty = $("[data-empty]");
    var qs = new URLSearchParams(location.search);
    ["brand", "cond", "sort", "q"].forEach(function (k) { if (qs.get(k) && f.elements[k]) f.elements[k].value = qs.get(k); });
    var apply = function () {
      var br = f.elements.brand ? f.elements.brand.value : "", co = f.elements.cond ? f.elements.cond.value : "", so = f.elements.sort.value, q = (f.elements.q.value || "").toLowerCase().trim();
      var shown = cards.filter(function (c) {
        var ok = (!br || c.dataset.brand === br) && (!co || c.dataset.cond === co) && (!q || c.dataset.q.indexOf(q) >= 0);
        c.hidden = !ok; return ok;
      });
      var sorted = cards.slice();
      if (so) sorted.sort(function (a, b) {
        if (so === "price-asc") return a.dataset.price - b.dataset.price;
        if (so === "price-desc") return b.dataset.price - a.dataset.price;
        return b.dataset.year - a.dataset.year;
      });
      sorted.forEach(function (c) { list.appendChild(c); });
      out.textContent = shown.length + (shown.length === 1 ? " watch" : " watches");
      if (empty) empty.hidden = shown.length > 0;
    };
    f.addEventListener("input", apply); f.addEventListener("change", apply); apply();
  }

  // ---------- bag + checkout ----------
  var bagEl = $("[data-bag]");
  if (bagEl && D.catalog) {
    var render = function () {
      var items = read().filter(function (s) { return D.catalog[s] && !D.catalog[s].s; });
      if (items.length !== read().length) write(items);
      if (!items.length) { bagEl.innerHTML = '<p class="lead" style="margin-top:0">Your bag is empty.</p><p><a class="btn btn-line" href="/watches">Browse watches</a></p>'; $("[data-checkout]").hidden = true; return; }
      $("[data-checkout]").hidden = false;
      var total = 0;
      bagEl.innerHTML = '<h2 class="h3" style="margin-top:0">' + items.length + (items.length === 1 ? " watch" : " watches") + "</h2>" + items.map(function (s) {
        var w = D.catalog[s]; total += w.p;
        return '<div class="bag-row"><img src="' + escH(w.i) + '" alt=""><div><h3>' + escH(w.n) + "</h3><p>Ref. " + escH(w.r) + " · " + escH(w.c) + '</p><button type="button" data-remove="' + escH(s) + '">Remove</button></div><b>' + usd(w.p) + "</b></div>";
      }).join("") + '<p class="bag-tot"><span>Shipping — insured overnight</span><span>Free</span></p><p class="bag-tot big"><span>Total</span><span>' + usd(total) + ' <small style="font-size:.7rem;color:var(--muted)">USD</small></span></p>';
    };
    bagEl.addEventListener("click", function (e) { var r = e.target.closest("[data-remove]"); if (r) { write(read().filter(function (x) { return x !== r.getAttribute("data-remove"); })); render(); } });
    render();

    var form = $("[data-checkout]"), ctry = $("[data-country]", form), reg = $("[data-region]", form);
    var setRegions = function () {
      var ca = ctry.value === "CA", arr = ca ? D.ca : D.us;
      $("[data-region-label]", form).textContent = ca ? "Province / territory" : "State";
      $("[data-postal-label]", form).textContent = ca ? "Postal code" : "ZIP code";
      reg.innerHTML = '<option value="">Choose…</option>' + arr.map(function (x) { return "<option>" + x + "</option>"; }).join("");
    };
    ctry.addEventListener("change", setRegions);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = $("[data-err]", form), btn = $("[data-submit]", form);
      if (!form.checkValidity()) { err.textContent = "Please fill in all required fields and accept the terms."; err.hidden = false; form.reportValidity(); return; }
      var data = Object.fromEntries(new FormData(form).entries());
      data.agree = !!form.elements.agree.checked; data.items = read();
      btn.disabled = true; btn.textContent = "Placing order…"; err.hidden = true;
      fetch("/api/order", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (!r.ok) throw new Error(r.error || "Error");
          write([]); location.href = "/thanks?n=" + encodeURIComponent(r.orderNumber);
        })
        .catch(function (x) { err.textContent = x.message || "Something went wrong. Please try again."; err.hidden = false; btn.disabled = false; btn.textContent = "Place order"; });
    });
  }

  // ---------- simple forms (contact, wholesale) ----------
  $$("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = $("[data-err]", form), ok = $("[data-ok]", form), btn = $("button[type=submit]", form);
      if (!form.checkValidity()) { form.reportValidity(); return; }
      btn.disabled = true; err.hidden = true; var label = btn.textContent; btn.textContent = "Sending…";
      fetch(form.getAttribute("data-form"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) })
        .then(function (r) { return r.json(); })
        .then(function (r) { if (!r.ok) throw new Error(r.error || "Error"); form.reset(); ok.hidden = false; btn.textContent = "Sent"; })
        .catch(function (x) { err.textContent = x.message || "Something went wrong."; err.hidden = false; btn.disabled = false; btn.textContent = label; });
    });
  });
})();
