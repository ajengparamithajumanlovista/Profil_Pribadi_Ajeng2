/* ==========================================
   JAVASCRIPT - PROFIL & CV AJENG PARAMITHA
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Tahun footer otomatis
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. Light mode / dark mode
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle?.querySelector(".theme-icon");
    const themeLabel = themeToggle?.querySelector(".theme-label");
    const savedTheme = localStorage.getItem("ajeng-portfolio-theme");
    const prefersLight = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        const isDark = theme === "dark";

        if (themeIcon) themeIcon.textContent = isDark ? "☀" : "☾";
        if (themeLabel) themeLabel.textContent = isDark ? "Mode terang" : "Mode gelap";

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
            );
            themeToggle.setAttribute(
                "title",
                isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"
            );
        }
    }

    applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
            localStorage.setItem("ajeng-portfolio-theme", nextTheme);
        });
    }

    // 3. Tutup navbar mobile setelah menu dipilih
    const navbarMenu = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (
                navbarMenu &&
                navbarMenu.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {
                bootstrap.Collapse.getOrCreateInstance(navbarMenu).hide();
            }
        });
    });

    // 4. Navigasi aktif sesuai section yang terlihat
    const sections = document.querySelectorAll("main section[id]");
    if ("IntersectionObserver" in window) {
        const navigationObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        }, { rootMargin: "-25% 0px -65% 0px" });

        sections.forEach(section => navigationObserver.observe(section));
    }

    // 5. Reveal animation saat konten masuk viewport
    const revealElements = document.querySelectorAll(
        ".hero-section .col-lg-7, .hero-section .col-lg-5, " +
        ".section-heading, .content-card, .highlight-card, " +
        ".skill-card, .timeline-item, .contact-panel, .custom-table-wrap"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(function (element, index) {
            element.classList.add("reveal");
            element.style.setProperty("--reveal-delay", (index % 4) * 90 + "ms");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => element.classList.add("show"));
    }

    // 6. Tombol kembali ke atas
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", function () {
            backToTop.classList.toggle("show-button", window.scrollY > 300);
        }, { passive: true });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 7. Efek interaksi pada kartu keahlian
    document.querySelectorAll(".skill-card").forEach(function (card) {
        card.addEventListener("pointerenter", function () {
            card.classList.add("is-hovered");
        });
        card.addEventListener("pointerleave", function () {
            card.classList.remove("is-hovered");
        });
    });
});
