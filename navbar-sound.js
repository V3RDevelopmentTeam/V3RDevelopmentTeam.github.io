document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");

    if (!navbar) {
        console.error("Navbar not found.");
        return;
    }

    const hoverSound = new Audio("resources/audio/navbar-hover.mp3");

    hoverSound.volume = 0.8;
    hoverSound.preload = "auto";

    hoverSound.addEventListener("canplaythrough", () => {
        console.log("Navbar hover sound loaded successfully!");
    });

    hoverSound.addEventListener("error", () => {
        console.error("Failed to load navbar-hover.mp3", hoverSound.error);
    });

    navbar.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("mouseenter", async () => {
            try {
                hoverSound.currentTime = 0;
                await hoverSound.play();
            } catch (error) {
                console.error("Audio playback failed:", error);
            }
        });
    });
});