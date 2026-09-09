(function () {
  "use strict";

  /* ---------------- theme ---------------- */
  var root = document.documentElement;
  var THEME_KEY = "corvix-theme";
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
  function applyTheme() {
    var s = storedTheme();
    if (s) root.setAttribute("data-theme", s);
    else root.removeAttribute("data-theme");
    if (themeBtn) themeBtn.textContent = isDark() ? "Light" : "Dark";
  }
  applyTheme();
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

  /* ---------------- module explorer data ---------------- */
  var NAV = ["Home", "Accounting", "Stock", "Manufacturing", "Selling", "Buying", "HR", "Projects"];

  var SCREENS = {
    accounts: {
      nav: "Accounting", title: "Sales Invoice", cols: ["Invoice", "Customer", "Due", "Status"],
      rows: [
        ["SINV-02418", "Nandini Metals", "12 Sep", "Paid"],
        ["SINV-02417", "Shakti Traders", "14 Sep", "Unpaid"],
        ["SINV-02416", "Vega Polymers", "18 Sep", "Unpaid"],
        ["SINV-02415", "Orion Castings", "21 Sep", "Paid"],
        ["SINV-02414", "Bhagwati Steel", "26 Sep", "Draft"],
      ],
      filters: ["This month", "All cost centres"],
    },
    stock: {
      nav: "Stock", title: "Stock Balance", cols: ["Item", "Warehouse", "Qty", "UOM"],
      rows: [
        ["FG-1042", "Finished goods", "1,240", "Nos"],
        ["FG-1043", "Finished goods", "860", "Nos"],
        ["RM-2201", "Raw material", "4,500", "Kg"],
        ["RM-2208", "Raw material", "1,180", "Kg"],
        ["FG-1051", "Depot — Nashik", "320", "Nos"],
      ],
      filters: ["Plant — Pune", "Live valuation"],
    },
    manufacturing: {
      nav: "Manufacturing", title: "Work Order", cols: ["Work order", "Item", "Qty", "Status"],
      rows: [
        ["WO-00841", "FG-1042", "500", "In process"],
        ["WO-00840", "FG-1043", "250", "In process"],
        ["WO-00839", "FG-1051", "120", "Completed"],
        ["WO-00838", "FG-1042", "400", "Completed"],
        ["WO-00837", "RM-2208", "—", "Stopped"],
      ],
      filters: ["Open", "Plant — Pune"],
    },
    selling: {
      nav: "Selling", title: "Sales Order", cols: ["Order", "Customer", "Delivery", "Status"],
      rows: [
        ["SO-01920", "Nandini Metals", "15 Sep", "To deliver"],
        ["SO-01919", "Orion Castings", "17 Sep", "To deliver"],
        ["SO-01918", "Shakti Traders", "19 Sep", "Completed"],
        ["SO-01917", "Vega Polymers", "24 Sep", "To bill"],
        ["SO-01916", "Bhagwati Steel", "30 Sep", "Draft"],
      ],
      filters: ["Open", "All territories"],
    },
    hr: {
      nav: "HR", title: "Attendance", cols: ["Employee", "Shift", "Date", "Status"],
      rows: [
        ["HR-EMP-0114", "General", "08 Sep", "Present"],
        ["HR-EMP-0115", "Shift A", "08 Sep", "Present"],
        ["HR-EMP-0116", "Shift B", "08 Sep", "On leave"],
        ["HR-EMP-0117", "General", "08 Sep", "Present"],
        ["HR-EMP-0118", "Shift A", "08 Sep", "Half day"],
      ],
      filters: ["September", "All departments"],
    },
    "app/custom": {
      nav: "Projects", title: "Site Visit Report", cols: ["Report", "Engineer", "Site", "Status"],
      rows: [
        ["SVR-00312", "R. Kulkarni", "Pune — Plant 2", "Submitted"],
        ["SVR-00311", "A. Sheikh", "Nashik depot", "Approved"],
        ["SVR-00310", "M. Iyer", "Surat depot", "Submitted"],
        ["SVR-00309", "R. Kulkarni", "Pune — Plant 1", "Approved"],
        ["SVR-00308", "A. Sheikh", "Client site", "Draft"],
      ],
      filters: ["Custom doctype", "Mobile capture"],
    },
  };

  var MODULES = [
    { name: "Accounting", tag: "Common start", slug: "accounts",
      blurb: "Multi-company chart of accounts, tax templates, e-invoicing and bank reconciliation — a month-end close you can finish on time.",
      chips: ["Multi-company COA", "GST / VAT", "E-invoice", "Bank reconciliation", "Cost centres"] },
    { name: "Inventory", tag: "Warehouse", slug: "stock",
      blurb: "Batch and serial tracking across every warehouse, barcode picking, and valuation your finance team and your storekeeper both trust.",
      chips: ["Batch / serial", "Multi-warehouse", "Barcode picking", "Reorder levels", "Stock ageing"] },
    { name: "Manufacturing", tag: "Shop floor", slug: "manufacturing",
      blurb: "Multi-level BOMs, subcontracting, job cards and capacity planning — production status without chasing updates on WhatsApp.",
      chips: ["Multi-level BOM", "Subcontracting", "Job cards", "Capacity planning", "Scrap tracking"] },
    { name: "Buying & selling", tag: "Quote to cash", slug: "selling",
      blurb: "Approval matrices, customer and supplier price lists, and a clean path from quotation to invoice to collection.",
      chips: ["Approval matrix", "Price lists", "Partial shipments", "Credit limits", "Collections"] },
    { name: "HR & payroll", tag: "Statutory", slug: "hr",
      blurb: "Attendance and shifts, leave policy, statutory payroll and a self-service portal your team will actually log into.",
      chips: ["Shifts & attendance", "Leave policy", "Statutory payroll", "Self-service", "Expense claims"] },
    { name: "Custom & mobile", tag: "Built on Frappe", slug: "app/custom",
      blurb: "Where the standard modules stop, we build — bespoke doctypes, customer portals and mobile front-ends that survive every upgrade.",
      chips: ["Custom doctypes", "Customer portal", "Mobile app", "API integrations", "Scheduled jobs"] },
  ];

  var modList = document.getElementById("modList");
  var modDetail = document.getElementById("modDetail");
  var activeIndex = 0;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderNavList(activeName) {
    return NAV.map(function (n) {
      var on = n === activeName;
      return '<div class="shot-nav-item' + (on ? " is-active" : "") + '">' +
        '<span class="item-dot"></span>' + escapeHtml(n) + "</div>";
    }).join("");
  }

  function renderScreen(slug) {
    var s = SCREENS[slug];
    var colsHtml = s.cols.map(function (c) {
      return '<div class="shot-col">' + escapeHtml(c) + "</div>";
    }).join("");
    var rowsHtml = s.rows.map(function (r) {
      return '<div class="shot-row">' +
        '<div class="cell a">' + escapeHtml(r[0]) + "</div>" +
        '<div class="cell b">' + escapeHtml(r[1]) + "</div>" +
        '<div class="cell c">' + escapeHtml(r[2]) + "</div>" +
        '<div class="cell d"><span class="pill">' + escapeHtml(r[3]) + "</span></div>" +
        "</div>";
    }).join("");
    var filtersHtml = s.filters.map(function (f) {
      return '<span class="shot-filter">' + escapeHtml(f) + "</span>";
    }).join("");
    return { title: s.title, colsHtml: colsHtml, rowsHtml: rowsHtml, filtersHtml: filtersHtml, navHtml: renderNavList(s.nav) };
  }

  function renderModList() {
    if (!modList) return;
    modList.innerHTML = MODULES.map(function (m, i) {
      var active = i === activeIndex;
      return '<button type="button" class="mod-item' + (active ? " is-active" : "") +
        '" role="tab" aria-selected="' + active + '" data-index="' + i + '">' +
        '<span class="mod-num">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="mod-name">' + escapeHtml(m.name) + "</span>" +
        "</button>";
    }).join("");
    Array.prototype.forEach.call(modList.querySelectorAll(".mod-item"), function (btn) {
      btn.addEventListener("click", function () {
        activeIndex = parseInt(btn.getAttribute("data-index"), 10);
        renderModList();
        renderModDetail();
      });
    });
  }

  function renderModDetail() {
    if (!modDetail) return;
    var m = MODULES[activeIndex];
    var screen = renderScreen(m.slug);
    var chipsHtml = m.chips.map(function (c) {
      return '<span class="chip">' + escapeHtml(c) + "</span>";
    }).join("");
    modDetail.innerHTML =
      '<div class="mod-detail-head">' +
        "<h3>" + escapeHtml(m.name) + "</h3>" +
        '<span class="mod-tag">' + escapeHtml(m.tag) + "</span>" +
      "</div>" +
      '<p class="mod-blurb">' + escapeHtml(m.blurb) + "</p>" +
      '<div class="chip-row">' + chipsHtml + "</div>" +
      '<div class="mod-shot">' +
        '<div class="shot-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span>' +
          '<span class="shot-url">erp.yourcompany.com/' + escapeHtml(m.slug) + "</span></div>" +
        '<div class="shot-body">' +
          '<div class="shot-nav">' +
            '<div class="shot-brand"><span class="brand-dot"></span><span>ERPNext</span></div>' +
            screen.navHtml +
          "</div>" +
          '<div class="shot-main">' +
            '<div class="shot-titlebar"><span class="shot-title">' + escapeHtml(screen.title) + "</span>" + screen.filtersHtml + "</div>" +
            '<div class="shot-cols">' + screen.colsHtml + "</div>" +
            screen.rowsHtml +
          "</div>" +
        "</div>" +
      "</div>";
  }

  if (modList && modDetail) {
    renderModList();
    renderModDetail();
  }

  /* ---------------- contact form -> mailto ---------------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var defaultLabel = submitBtn ? submitBtn.textContent : "";
    var resetTimer = null;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = ((form.elements["name"] && form.elements["name"].value) || "").trim();
      var email = ((form.elements["email"] && form.elements["email"].value) || "").trim();
      var message = ((form.elements["message"] && form.elements["message"].value) || "").trim();

      var subject = "New enquiry" + (name ? " from " + name : "");
      var bodyLines = [];
      if (name) bodyLines.push("Name: " + name);
      if (email) bodyLines.push("Email: " + email);
      bodyLines.push("");
      bodyLines.push(message || "(no message entered)");

      var mailto = "mailto:business.abdelrahmanalisaleh@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;

      if (submitBtn) {
        submitBtn.textContent = "Opening your email app…";
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          submitBtn.textContent = defaultLabel;
        }, 4000);
      }
    });
  }
})();
