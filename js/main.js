(function () {
  const WHATSAPP_NUMBER = "213XXXXXXXXX";
  const root = document.documentElement;
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const saved = localStorage.getItem("mya-lang");
  const startLang = saved === "en" || saved === "fr" ? saved : "fr";
  setLang(startLang);
  wireWhatsApp(startLang);

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-set-lang");
      setLang(lang);
      wireWhatsApp(lang);
    });
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

  function wireWhatsApp(lang) {
    const digits = String(WHATSAPP_NUMBER || "").replace(/\D/g, "");
    if (digits.length < 10) return;
    const text =
      lang === "en"
        ? "Hello Mahdi, I am contacting you from your portfolio."
        : "Bonjour Mahdi, je vous contacte depuis votre portfolio.";
    const href = `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
    document.querySelectorAll("[data-whatsapp]").forEach((link) => {
      link.setAttribute("href", href);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
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
