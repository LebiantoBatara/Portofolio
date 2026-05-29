document.getElementById("themeToggle").addEventListener("click", function () {
    const html = document.documentElement;

    if (html.getAttribute("data-theme") === "dark") {
        html.removeAttribute("data-theme");
    } else {
        html.setAttribute("data-theme", "dark");
    }
});