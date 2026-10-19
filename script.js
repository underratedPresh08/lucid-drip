/* =========================================
   LUCID DRIP
   WEBSITE INTERACTIONS
========================================= */


/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");


function closeMobileMenu() {
    if (!menuToggle || !navLinks) {
        return;
    }

    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    // Close the menu after clicking a navigation link.

    navItems.forEach(function (link) {

        link.addEventListener("click", closeMobileMenu);

    });


    // Close the menu when clicking outside it.

    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMobileMenu();
        }

    });


    // Close the mobile menu when returning to desktop width.

    window.addEventListener("resize", function () {

        if (window.innerWidth > 700) {
            closeMobileMenu();
        }

    });

}


/* =========================================
   2. HERO AUTOMATIC SLIDESHOW
========================================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

const heroSection = document.querySelector(".hero");

const slideInterval = 5000;

let currentHeroSlide = 0;
let heroSlideshowTimer = null;


function showHeroSlide(index) {

    if (heroSlides.length === 0) {
        return;
    }

    // Remove the active class from every image.

    heroSlides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    // Remove the active class from every indicator.

    heroDots.forEach(function (dot) {

        dot.classList.remove("active");

    });


    // Activate the selected image.

    heroSlides[index].classList.add("active");


    // Activate the matching indicator.

    if (heroDots[index]) {

        heroDots[index].classList.add("active");

    }

}


function nextHeroSlide() {

    if (heroSlides.length <= 1) {
        return;
    }

    currentHeroSlide =
        (currentHeroSlide + 1) % heroSlides.length;

    showHeroSlide(currentHeroSlide);

}


function stopHeroSlideshow() {

    if (heroSlideshowTimer !== null) {

        clearInterval(heroSlideshowTimer);

        heroSlideshowTimer = null;

    }

}


function startHeroSlideshow() {

    stopHeroSlideshow();

    if (heroSlides.length <= 1) {
        return;
    }

    heroSlideshowTimer = setInterval(
        nextHeroSlide,
        slideInterval
    );

}


// Start the slideshow only if the visitor hasn't requested
// reduced motion.

const reducedMotionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);


function handleMotionPreference() {

    stopHeroSlideshow();

    if (reducedMotionPreference.matches) {

        currentHeroSlide = 0;

        showHeroSlide(0);

        return;

    }

    startHeroSlideshow();

}


handleMotionPreference();


if (reducedMotionPreference.addEventListener) {

    reducedMotionPreference.addEventListener(
        "change",
        handleMotionPreference
    );

}


// Pause the slideshow while the browser tab is hidden.

document.addEventListener("visibilitychange", function () {

    if (document.hidden) {

        stopHeroSlideshow();

    } else if (!reducedMotionPreference.matches) {

        startHeroSlideshow();

    }

});


// Pause the slideshow when the visitor scrolls far away
// from the hero section.

if ("IntersectionObserver" in window && heroSection) {

    const heroObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    if (!reducedMotionPreference.matches) {
                        startHeroSlideshow();
                    }

                } else {

                    stopHeroSlideshow();

                }

            });

        },
        {
            threshold: 0.1
        }
    );

    heroObserver.observe(heroSection);

}


/* =========================================
   3. PRODUCT IMAGE GALLERIES
========================================= */

const galleryButtons = document.querySelectorAll(".gallery-thumb");


galleryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const newImage = button.dataset.image;
        const newAlt = button.dataset.alt;

        const productCard = button.closest(".product-card");

        if (!productCard || !newImage) {
            return;
        }

        const mainImage = productCard.querySelector(
            ".product-main-image"
        );

        const allThumbnails = productCard.querySelectorAll(
            ".gallery-thumb"
        );


        if (mainImage) {

            // Change the main product image.

            mainImage.src = newImage;

            mainImage.alt = newAlt || "LUCID DRIP product";

        }


        // Update the selected thumbnail.

        allThumbnails.forEach(function (thumbnail) {

            const isSelected = thumbnail === button;

            thumbnail.classList.toggle(
                "active",
                isSelected
            );

            thumbnail.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

        });

    });

});


/* =========================================
   4. AUTOMATIC FOOTER YEAR
========================================= */

const currentYearElement = document.getElementById("currentYear");

if (currentYearElement) {

    currentYearElement.textContent = new Date().getFullYear();

}