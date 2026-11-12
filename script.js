
/* ==========================================
   JAVASCRIPT - PROFIL & CV AJENG PARAMITHA
   ========================================== */

// Menjalankan JavaScript setelah HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // 1. MENAMPILKAN TAHUN OTOMATIS
    // ==========================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 2. MENUTUP NAVBAR SETELAH MENU DIKLIK
    // ==========================================

    const navbarMenu = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                navbarMenu &&
                navbarMenu.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {
                const collapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu);
                collapse.hide();
            }

        });

    });


    // ==========================================
    // 3. ACTIVE NAVIGATION BERDASARKAN SECTION
    // ==========================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const navigationObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        navLinks.forEach(function (link) {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                "#" + entry.target.id
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },

            {
                rootMargin: "-25% 0px -65% 0px"
            }

        );

        sections.forEach(function (section) {
            navigationObserver.observe(section);
        });

    }


    // ==========================================
    // 4. ANIMASI KONTEN SAAT HALAMAN DI-SCROLL
    // ==========================================

    const revealElements = document.querySelectorAll(

        ".section-heading, " +
        ".content-card, " +
        ".highlight-card, " +
        ".skill-card, " +
        ".timeline-item, " +
        ".contact-panel"

    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.15
            }

        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }


    // ==========================================
    // 5. TOMBOL KEMBALI KE ATAS
    // ==========================================

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {

                backToTop.classList.add("show-button");

            } else {

                backToTop.classList.remove("show-button");

            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }


    // ==========================================
    // 6. EFEK HOVER KARTU KEAHLIAN
    // ==========================================

    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.style.transform = "translateY(-5px)";

        });

        card.addEventListener("mouseleave", function () {

            card.style.transform = "translateY(0)";

        });

    });


});
