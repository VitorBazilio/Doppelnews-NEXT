(function () {
  var storageKey = "theme";
  var darkTheme = "dark";

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey) === darkTheme ? "dark" : "light";
    } catch {
      return "light";
    }
  }

  function applyTheme(theme) {
    var isDark = theme === darkTheme;

    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    document.body.classList.toggle("theme-black", isDark);
  }

  function scrollToTop() {
    var scroller = document.scrollingElement || document.documentElement;

    if (scroller && typeof scroller.scrollTo === "function") {
      scroller.scrollTo({ top: 0, behavior: "smooth" });
    } else if (scroller) {
      scroller.scrollTop = 0;
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function handleDocumentClick(event) {
    var target = event.target;

    if (!target || typeof target.closest !== "function") {
      return;
    }

    var topButton = target.closest("[data-back-to-top]");

    if (topButton) {
      event.preventDefault();
      scrollToTop();
    }
  }

  function initializeSiteScripts() {
    applyTheme(getStoredTheme());
    document.addEventListener("click", handleDocumentClick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSiteScripts, {
      once: true,
    });
  } else {
    initializeSiteScripts();
  }
})();
