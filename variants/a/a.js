(function () {
  "use strict";

  /* ---------------- theme (same behaviour as the live site) ---------------- */
  var root = document.documentElement;
  var THEME_KEY = "qcore-theme";
  var themeBtn = document.getElementById("themeToggle");

  function storedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function systemDark() {
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function isDark() {
    var s = storedTheme();
    return s ? s === "dark" : systemDark();
  }
  function label() {
    var ar = root.getAttribute("lang") === "ar";
    if (isDark()) return ar ? "فاتح" : "Light";
    return ar ? "داكن" : "Dark";
  }
  function applyTheme() {
    var s = storedTheme();
    if (s) root.setAttribute("data-theme", s);
    else root.removeAttribute("data-theme");
    if (themeBtn) themeBtn.textContent = label();
  }
  applyTheme();
  document.addEventListener("qcore:lang", applyTheme);
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      try { localStorage.setItem(THEME_KEY, isDark() ? "light" : "dark"); } catch (e) {}
      applyTheme();
    });
  }
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onSystemChange = function () { if (!storedTheme()) applyTheme(); };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }
})();
