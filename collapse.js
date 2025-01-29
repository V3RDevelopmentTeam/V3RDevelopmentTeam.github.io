document.addEventListener("DOMContentLoaded", function () {
    // Select all collapsible buttons
    const menuToggle = document.querySelector(".menu-toggle");
    const closeMenu = document.querySelector(".close-menu");
    const mobileNav = document.querySelector(".mobile-nav");
    const collapsibles = document.querySelectorAll(".collapsible");

  
    menuToggle.addEventListener("click", function () {
        mobileNav.classList.add("active");
    });

    closeMenu.addEventListener("click", function () {
        mobileNav.classList.remove("active");
    });

    collapsibles.forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;

            if (this.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
            } else {
                content.style.maxHeight = "0";
                content.style.opacity = "0";
            }
        });
    });
});
