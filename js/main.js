(function () {
  const root = document.documentElement;
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const saved = localStorage.getItem("mya-lang");
  const startLang = saved === "en" || saved === "fr" ? saved : "fr";
  setLang(startLang);

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-set-lang")));
  });

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const filters = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-cat]");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.getAttribute("data-filter");
      cards.forEach((card) => {
        const cats = (card.getAttribute("data-cat") || "").split(" ");
        card.classList.toggle("hidden", key !== "all" && !cats.includes(key));
      });
    });
  });

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const org = String(data.get("org") || "").trim();
      const message = String(data.get("message") || "").trim();
      const subject = encodeURIComponent(
        org ? `Contact portfolio — ${org}` : "Contact portfolio — Mahdi Yahia Abderrahmane"
      );
      const body = encodeURIComponent(
        `${message}\n\n— ${name}${org ? " · " + org : ""}`
      );
      window.location.href = `mailto:abdouyahya1414@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  function setLang(lang) {
    root.setAttribute("lang", lang);
    localStorage.setItem("mya-lang", lang);
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-set-lang") === lang);
    });
    document.querySelectorAll("[data-cv-lang]").forEach((link) => {
      const isEn = lang === "en";
      if (link.getAttribute("data-cv-lang") === "pdf") {
        link.setAttribute(
          "href",
          isEn ? "assets/Mahdi-Yahia-Abderrahmane-CV-EN.pdf" : "assets/Mahdi-Yahia-Abderrahmane-CV-FR.pdf"
        );
      }
    });
  }
})();
