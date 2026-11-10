document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const tooltip = document.querySelector(".nav-tooltip");

    if (!navbar || !tooltip) {
        console.error("Navbar or tooltip element was not found.");
        return;
    }

    const buttons = navbar.querySelectorAll(".nav-btn");

    buttons.forEach(button => {
        function showTooltip() {
            const label = button.dataset.label;

            if (!label) {
                console.warn("Missing data-label:", button);
                return;
            }

            const rect = button.getBoundingClientRect();

            tooltip.textContent = label;
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.classList.add("show");
        }

        button.addEventListener("mouseenter", showTooltip);
        button.addEventListener("focus", showTooltip);

        button.addEventListener("mouseleave", () => {
            tooltip.classList.remove("show");
        });

        button.addEventListener("blur", () => {
            tooltip.classList.remove("show");
        });
    });
});