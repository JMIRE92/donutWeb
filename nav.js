// Shared mobile navigation toggle
(function () {
    document.documentElement.classList.add("js");

    var toggle = document.querySelector(".nav-toggle");
    var navLinks = document.getElementById("primaryNav");
    if (!toggle || !navLinks) return;

    var mobileQuery = window.matchMedia("(max-width: 760px)");

    function closeMenu() {
        navLinks.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    }

    function syncMenuState() {
        if (!mobileQuery.matches) {
            closeMenu();
        }
    }

    toggle.addEventListener("click", function () {
        var expanded = toggle.getAttribute("aria-expanded") === "true";
        var nextExpanded = !expanded;
        toggle.setAttribute("aria-expanded", String(nextExpanded));
        navLinks.classList.toggle("is-open", nextExpanded);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (mobileQuery.matches) {
                closeMenu();
            }
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", syncMenuState);
    } else if (typeof mobileQuery.addListener === "function") {
        mobileQuery.addListener(syncMenuState);
    }
})();
