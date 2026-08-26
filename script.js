/* =========================================================
   RIVAL CAFE & RESTAURANT
   SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, .menu-category, .highlight-card, .hours-card, .location-card, .thank-you-content"
    );

    revealElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";
    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       MENU ITEM STAGGER ANIMATION
       ===================================================== */

    const menuCategories =
        document.querySelectorAll(".menu-category");


    menuCategories.forEach((category) => {

        const items =
            category.querySelectorAll(".menu-item");


        items.forEach((item, index) => {

            item.style.opacity = "0";
            item.style.transform = "translateX(-15px)";

            item.style.transition =
                `opacity 0.45s ease ${index * 0.05}s,
                 transform 0.45s ease ${index * 0.05}s`;

        });

    });


    const menuObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const items =
                    entry.target.querySelectorAll(".menu-item");


                items.forEach((item) => {

                    item.style.opacity = "1";
                    item.style.transform = "translateX(0)";

                });


                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.08
        }
    );


    menuCategories.forEach((category) => {
        menuObserver.observe(category);
    });


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
       ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       BUTTON LIGHT EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach((button) => {

        button.addEventListener("mousemove", (event) => {

            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            button.style.setProperty(
                "--mouse-x",
                `${x}px`
            );


            button.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        });

    });


    /* =====================================================
       PARALLAX HERO EFFECT
       Desktop only
       ===================================================== */

    const heroContent =
        document.querySelector(".hero-content");


    if (heroContent) {

        window.addEventListener("scroll", () => {

            if (window.innerWidth < 700) {
                return;
            }


            const scrollY =
                window.scrollY;


            if (scrollY < window.innerHeight) {

                heroContent.style.transform =
                    `translateY(${scrollY * 0.12}px)`;

                heroContent.style.opacity =
                    Math.max(
                        0,
                        1 - scrollY / 700
                    );

            }

        });

    }


    /* =====================================================
       ACTIVE SECTION TRACKING
       ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const currentSection =
                            entry.target.id;


                        document.body.dataset.section =
                            currentSection;

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       EXTERNAL LINKS
       ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       PREVENT ACCIDENTAL HORIZONTAL MOVEMENT
       ===================================================== */

    document.documentElement.style.overflowX =
        "hidden";

    document.body.style.overflowX =
        "hidden";


    /* =====================================================
       PAGE LOADED
       ===================================================== */

    document.body.classList.add("page-loaded");

});