document.getElementById("themeToggle").addEventListener("click", function () {
    const html = document.documentElement;
    const moonIcon = document.querySelector(".moon");
    const sunIcons = document.querySelectorAll(".sun");

    if (html.getAttribute("data-theme") === "dark") {
        html.removeAttribute("data-theme");
        // Show sun icon, hide moon icon
        moonIcon.style.display = "none";
        sunIcons.forEach(icon => icon.style.display = "block");
    } else {
        html.setAttribute("data-theme", "dark");
        // Show moon icon, hide sun icons
        moonIcon.style.display = "block";
        sunIcons.forEach(icon => icon.style.display = "none");
    }
});
