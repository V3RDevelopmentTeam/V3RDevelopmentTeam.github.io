const navbar = document.querySelector(".navbar");
const indicator = navbar.querySelector(".nav-indicator");
const navButtons = navbar.querySelectorAll(".nav-btn");

let activeSection = null;
let navigationTarget = null;

function updateIndicator(button) {
    if (!button || !indicator) return;

    const navbarRect = navbar.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    indicator.style.left = `${buttonRect.left - navbarRect.left}px`;
    indicator.style.width = `${buttonRect.width}px`;
}

function setActive(button) {
    if (!button) return;

    navButtons.forEach(nav => {
        nav.classList.remove("active");
    });

    button.classList.add("active");
    updateIndicator(button);
}

const sections = Array.from(navButtons).map(button => {
    const section = document.querySelector(
        button.getAttribute("href")
    );

    return section ? { button, section } : null;
}).filter(Boolean);

function detectActiveSection() {
    const activationPoint = window.innerHeight * 0.30;

    let currentSection = sections[0];

    for (const item of sections) {
        const rect = item.section.getBoundingClientRect();

        if (rect.top <= activationPoint) {
            currentSection = item;
        } else {
            break;
        }
    }

    if (!currentSection) return;

    // Keep the clicked section active while scrolling toward it.
    if (navigationTarget) {
        if (currentSection.section !== navigationTarget) {
            return;
        }

        navigationTarget = null;
    }

    if (activeSection !== currentSection) {
        activeSection = currentSection;
        setActive(currentSection.button);
    }
}

// Click navigation
navButtons.forEach(button => {
    button.addEventListener("click", () => {
        const target = document.querySelector(
            button.getAttribute("href")
        );

        if (!target) return;

        navigationTarget = target;
        activeSection = sections.find(
            item => item.section === target
        );

        setActive(button);
    });
});

// Scroll detection
window.addEventListener("scroll", detectActiveSection, {
    passive: true
});

// Recalculate indicator position
window.addEventListener("resize", () => {
    updateIndicator(
        navbar.querySelector(".nav-btn.active")
    );

    detectActiveSection();
});

// Initial setup
detectActiveSection();

window.addEventListener("load", () => {
    updateIndicator(
        navbar.querySelector(".nav-btn.active")
    );

    detectActiveSection();
});