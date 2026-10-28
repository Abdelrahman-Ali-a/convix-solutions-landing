/* EN/AR switch shared by the landing variants.
   Translatable elements carry their Arabic in data-ar (text) and
   data-ar-<attr> (attributes such as aria-label or alt); the English
   original is cached on first switch so it can be restored. */
(function () {
  "use strict";

  var root = document.documentElement;
  var KEY = "qcore-lang";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function initial() {
    var q = /[?&]lang=(en|ar)\b/.exec(location.search);
    if (q) return q[1];
    var s = stored();
    if (s === "en" || s === "ar") return s;
    var nav = (navigator.language || "").toLowerCase();
    return nav.indexOf("ar") === 0 ? "ar" : "en";
  }

  function swapText(el, lang) {
    if (!el.hasAttribute("data-en")) el.setAttribute("data-en", el.textContent);
    el.textContent = el.getAttribute(lang === "ar" ? "data-ar" : "data-en");
  }

  function swapAttrs(el, lang) {
    var attrs = el.attributes;
    for (var i = 0; i < attrs.length; i++) {
      var name = attrs[i].name;
      if (name.indexOf("data-ar-") !== 0) continue;
      var target = name.slice(8);
      var enKey = "data-en-" + target;
      if (!el.hasAttribute(enKey)) el.setAttribute(enKey, el.getAttribute(target) || "");
      el.setAttribute(target, el.getAttribute(lang === "ar" ? name : enKey));
    }
  }

  function apply(lang) {
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    var texts = document.querySelectorAll("[data-ar]");
    for (var i = 0; i < texts.length; i++) swapText(texts[i], lang);
    var all = document.querySelectorAll("*");
    for (var j = 0; j < all.length; j++) {
      if (all[j].attributes.length) swapAttrs(all[j], lang);
    }
    var t = root.getAttribute(lang === "ar" ? "data-title-ar" : "data-title-en");
    if (t) document.title = t;
    var btns = document.querySelectorAll("[data-lang-toggle]");
    for (var k = 0; k < btns.length; k++) {
      btns[k].textContent = lang === "ar" ? "English" : "عربي";
      btns[k].setAttribute("lang", lang === "ar" ? "en" : "ar");
      btns[k].setAttribute("aria-label", lang === "ar" ? "View this page in English" : "اعرض الصفحة بالعربية");
    }
    document.dispatchEvent(new CustomEvent("qcore:lang", { detail: lang }));
  }

  if (!root.getAttribute("data-title-en")) root.setAttribute("data-title-en", document.title);
  var current = initial();
  apply(current);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-lang-toggle]");
    if (!btn) return;
    current = current === "ar" ? "en" : "ar";
    try { localStorage.setItem(KEY, current); } catch (err) {}
    apply(current);
  });
})();
