
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".background-slider");

    if (!slider) {
        console.error("Background slider was not found.");
        return;
    }

    const slides = slider.querySelectorAll(".background-slide");

    const prevButton = slider.querySelector("#backgroundPrev");
    const nextButton = slider.querySelector("#backgroundNext");
    const pauseButton = slider.querySelector("#backgroundPause");

    const indicatorsContainer = slider.querySelector(
        ".background-indicators"
    );

    if (!slides.length) {
        console.error("No background slides detected.");
        return;
    }

    if (!prevButton || !nextButton || !pauseButton) {
        console.error("Background controls are missing.");
        return;
    }

    // Icons
    const PLAY_ICON =
        "https://img.icons8.com/?size=100&id=LVtMPps1ASuP&format=png&color=FFFFFF";

    const PAUSE_ICON =
        "https://img.icons8.com/?size=100&id=AibrGCLNeCYz&format=png&color=FFFFFF";

    // Settings
    const SLIDE_DURATION = 6000;

    // State
    let currentIndex = 0;
    let autoplay = true;
    let timer = null;

    // Hover pause state
    let hovering = false;

    // Automatically create indicators
    if (indicatorsContainer) {

        indicatorsContainer.innerHTML = "";

        slides.forEach(function (slide, index) {

            const indicator = document.createElement("button");

            indicator.type = "button";

            indicator.setAttribute(
                "aria-label",
                "Show background " + (index + 1)
            );

            indicator.addEventListener("click", function () {

                showSlide(index);

                restartAutoplay();

            });

            indicatorsContainer.appendChild(indicator);

        });

    }

    const indicators = indicatorsContainer
        ? indicatorsContainer.querySelectorAll("button")
        : [];

    // Update Play / Pause icon
    function updatePauseButton() {

        const icon = pauseButton.querySelector("img");

        if (!icon) return;

        icon.src = autoplay ? PAUSE_ICON : PLAY_ICON;

        pauseButton.setAttribute(
            "aria-label",
            autoplay ? "Pause slideshow" : "Play slideshow"
        );

    }

    // Display selected background
    function showSlide(index) {

        currentIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === currentIndex
            );

        });

        indicators.forEach(function (indicator, i) {

            indicator.classList.toggle(
                "active",
                i === currentIndex
            );

        });

    }

    // Next background
    function nextSlide() {

        showSlide(currentIndex + 1);

    }

    // Previous background
    function previousSlide() {

        showSlide(currentIndex - 1);

    }

    // Stop timer
    function stopAutoplay() {

        if (timer !== null) {

            clearInterval(timer);

            timer = null;

        }

    }

    // Start timer
    function startAutoplay() {

        stopAutoplay();

        if (!autoplay) return;

        if (hovering) return;

        if (slides.length <= 1) return;

        timer = setInterval(function () {

            nextSlide();

        }, SLIDE_DURATION);

    }

    // Reset timer
    function restartAutoplay() {

        startAutoplay();

    }

    // Previous button
    prevButton.addEventListener("click", function () {

        previousSlide();

        restartAutoplay();

    });

    // Next button
    nextButton.addEventListener("click", function () {

        nextSlide();

        restartAutoplay();

    });

    // Play / Pause button
    pauseButton.addEventListener("click", function () {

        autoplay = !autoplay;

        updatePauseButton();

        if (autoplay) {

            startAutoplay();

        } else {

            stopAutoplay();

        }

    });

    // Pause when hovering over slider
    slider.addEventListener("mouseenter", function () {

        hovering = true;

        stopAutoplay();

    });

    // Resume when leaving slider
    slider.addEventListener("mouseleave", function () {

        hovering = false;

        startAutoplay();

    });

    // Keyboard accessibility
    slider.addEventListener("keydown", function (event) {

        if (event.key === "ArrowRight") {

            nextSlide();

            restartAutoplay();

        }

        if (event.key === "ArrowLeft") {

            previousSlide();

            restartAutoplay();

        }

    });

    // Respect system reduced-motion preference
    const motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (motionPreference.matches) {

        autoplay = false;

    }

    // Initialize
    showSlide(0);

    updatePauseButton();

    startAutoplay();

    console.log(
        "Background slider initialized:",
        slides.length,
        "backgrounds detected."
    );

});
