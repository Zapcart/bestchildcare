(function () {
  "use strict";

  /* Loading screen */
  var loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        loader.classList.add("is-hidden");
      }, 2500);
    });
  }

  /* Live donation feed ticker */
  var feedText = document.getElementById("live-feed-text");
  var feedMessages = [
    "₹500 donated just now from Mumbai",
    "₹1000 donated by Rahul from Delhi",
    "₹2000 donated by Priya from Bangalore",
    "₹501 donated by Amit from Pune",
    "₹5000 donated by Sunita from Hyderabad",
    "₹1500 donated by Vikram from Chennai",
    "₹750 donated by Neha from Kolkata",
    "₹3000 donated by Arjun from Jaipur",
    "₹1000 donated by Kavita from Lucknow",
    "₹2500 donated by Deepak from Ahmedabad"
  ];
  var feedIndex = 0;

  if (feedText) {
    setInterval(function () {
      feedText.classList.add("is-switching");
      setTimeout(function () {
        feedIndex = (feedIndex + 1) % feedMessages.length;
        feedText.textContent = feedMessages[feedIndex];
        feedText.classList.remove("is-switching");
      }, 350);
    }, 3500);
  }

  /* FAQ accordion — only one open at a time */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.querySelector(".faq-q").addEventListener("click", function () {
      faqItems.forEach(function (other) {
        if (other !== item && other.hasAttribute("open")) {
          other.removeAttribute("open");
        }
      });
    });
  });

  /* Campaign modal */
  var knowMoreBtn = document.getElementById("btn-know-more");
  var campaignModal = document.getElementById("campaign-modal");
  var modalClose = document.getElementById("modal-close");
  var modalBackdrop = document.getElementById("modal-backdrop");
  var modalDonateBtn = document.querySelector(".modal-donate-btn");

  function openModal() {
    if (campaignModal) {
      campaignModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (campaignModal) {
      campaignModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  if (knowMoreBtn) {
    knowMoreBtn.addEventListener("click", openModal);
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
  }

  if (modalDonateBtn) {
    modalDonateBtn.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && campaignModal && campaignModal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  /* Donation popup */
  var donatePopup = document.getElementById("donate-popup");
  var popupBackdrop = document.getElementById("popup-backdrop");
  var popupCancel = document.getElementById("popup-cancel");
  var donateTriggers = document.querySelectorAll(".donate-trigger");
  var popupContinueBtn = document.querySelector(".popup-continue-btn");

  function openDonatePopup() {
    if (donatePopup) {
      donatePopup.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      // Track donation popup open
      if (typeof gtag !== 'undefined') {
        gtag('event', 'donation_popup_open', {
          event_category: 'engagement'
        });
      }
    }
  }

  function closeDonatePopup() {
    if (donatePopup) {
      donatePopup.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  donateTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openDonatePopup();
      // Track donate button click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'donate_click', {
          event_category: 'engagement',
          event_label: 'donate_button'
        });
      }
    });
  });

  if (popupCancel) {
    popupCancel.addEventListener("click", closeDonatePopup);
  }

  if (popupBackdrop) {
    popupBackdrop.addEventListener("click", closeDonatePopup);
  }

  if (popupContinueBtn) {
    popupContinueBtn.addEventListener("click", function() {
      closeDonatePopup();
      // Track payment redirect
      if (typeof gtag !== 'undefined') {
        gtag('event', 'payment_redirect', {
          event_category: 'conversion'
        });
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && donatePopup && donatePopup.getAttribute("aria-hidden") === "false") {
      closeDonatePopup();
    }
  });

  /* Floating donation popup */
  var floatingPopup = document.getElementById("floating-popup");
  var floatingReady = document.getElementById("floating-ready");
  var floatingClose = document.getElementById("floating-close");

  function showFloatingPopup() {
    if (floatingPopup) {
      floatingPopup.classList.add("show");
    }
  }

  function hideFloatingPopup() {
    if (floatingPopup) {
      floatingPopup.classList.remove("show");
    }
  }

  // Show popup after 5 seconds
  setTimeout(showFloatingPopup, 5000);

  if (floatingReady) {
    floatingReady.addEventListener("click", function () {
      hideFloatingPopup();
      openDonatePopup();
    });
  }

  if (floatingClose) {
    floatingClose.addEventListener("click", hideFloatingPopup);
  }

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".nav");
  var menuToggle = document.querySelector(".menu-toggle");
  var yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  function setHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }

  setHeaderShadow();
  window.addEventListener("scroll", setHeaderShadow, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - offset - 8;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  function initCampaignGalleries() {
    document.querySelectorAll(".campaign-card").forEach(function (card) {
      var slides = card.querySelectorAll(".campaign-slide");
      var dotsWrap = card.querySelector(".gallery-dots");
      var prev = card.querySelector(".gallery-nav.prev");
      var next = card.querySelector(".gallery-nav.next");
      if (!slides.length || !dotsWrap) return;

      var index = 0;

      slides.forEach(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Show image " + (i + 1));
        b.setAttribute("aria-selected", i === 0 ? "true" : "false");
        b.addEventListener("click", function () {
          go(i);
        });
        dotsWrap.appendChild(b);
      });

      var dotButtons = dotsWrap.querySelectorAll("button");

      function go(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach(function (s, j) {
          s.classList.toggle("active", j === index);
        });
        dotButtons.forEach(function (d, j) {
          d.setAttribute("aria-selected", j === index ? "true" : "false");
        });
      }

      if (prev) prev.addEventListener("click", function () { go(index - 1); });
      if (next) next.addEventListener("click", function () { go(index + 1); });
    });
  }

  initCampaignGalleries();

  var PRODUCT_LABELS = {
    groceries: "Groceries Kit",
    hygiene: "Hygiene Kit",
    school: "School Kit",
    meal: "Meal Kit"
  };

  var cart = {};

  function formatRupee(n) {
    return "₹" + n.toLocaleString("en-IN");
  }

  function cartTotal() {
    var total = 0;
    Object.keys(cart).forEach(function (id) {
      var line = cart[id];
      total += line.price * line.qty;
    });
    return total;
  }

  function renderCart() {
    var empty = document.getElementById("cart-empty");
    var linesEl = document.getElementById("cart-lines");
    var footer = document.getElementById("cart-footer");
    var totalEl = document.getElementById("cart-total");
    if (!empty || !linesEl || !footer || !totalEl) return;

    var ids = Object.keys(cart);
    if (ids.length === 0) {
      empty.hidden = false;
      linesEl.hidden = true;
      footer.hidden = true;
      linesEl.innerHTML = "";
      totalEl.textContent = formatRupee(0);
      return;
    }

    empty.hidden = true;
    linesEl.hidden = false;
    footer.hidden = false;
    linesEl.innerHTML = "";

    ids.forEach(function (id) {
      var line = cart[id];
      var li = document.createElement("li");
      li.className = "cart-line";
      li.innerHTML =
        '<div class="cart-line-info">' +
        "<strong>" +
        escapeHtml(line.name) +
        "</strong>" +
        '<span class="cart-line-meta">' +
        formatRupee(line.price) +
        " × " +
        line.qty +
        "</span></div>" +
        '<div class="cart-line-actions">' +
        '<button type="button" class="qty-btn" data-act="dec" data-id="' +
        id +
        '" aria-label="Decrease">−</button>' +
        '<button type="button" class="qty-btn" data-act="inc" data-id="' +
        id +
        '" aria-label="Increase">+</button>' +
        "</div>";
      linesEl.appendChild(li);
    });

    totalEl.textContent = formatRupee(cartTotal());

    linesEl.querySelectorAll(".qty-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var act = btn.getAttribute("data-act");
        if (!cart[id]) return;
        if (act === "inc") cart[id].qty += 1;
        if (act === "dec") {
          cart[id].qty -= 1;
          if (cart[id].qty <= 0) delete cart[id];
        }
        renderCart();
      });
    });
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  document.querySelectorAll(".add-to-cart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".product-card");
      if (!card) return;
      var id = card.getAttribute("data-product-id");
      var price = parseInt(card.getAttribute("data-price"), 10);
      if (!id || !price) return;
      var name = PRODUCT_LABELS[id] || id;
      if (!cart[id]) cart[id] = { name: name, price: price, qty: 0 };
      cart[id].qty += 1;
      renderCart();
      btn.textContent = "Added ✓";
      setTimeout(function () {
        btn.textContent = "Add";
      }, 1200);
      // Track add to cart
      if (typeof gtag !== 'undefined') {
        gtag('event', 'add_to_cart', {
          event_category: 'ecommerce'
        });
      }
    });
  });

  var clearBtn = document.getElementById("cart-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      cart = {};
      renderCart();
    });
  }

  var checkoutBtn = document.getElementById("cart-checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      var t = cartTotal();
      if (t <= 0) {
        window.alert("Your cart is empty. Add a kit to continue.");
        return;
      }
      window.alert(
        "Thank you. Kits total " +
          formatRupee(t) +
          ". Connect your payment or logistics provider here to complete checkout."
      );
    });
  }

  renderCart();

  var amountButtons = document.querySelectorAll(".amount-btn");
  var customInput = document.getElementById("custom-amount");
  var selectedLabel = document.getElementById("selected-amount-label");
  var donateMoneyBtn = document.getElementById("btn-donate-money");

  var selectedAmount = 501;

  function updateAmountLabel() {
    if (!selectedLabel) return;
    selectedLabel.textContent = formatRupee(selectedAmount);
  }

  function selectPreset(amt) {
    selectedAmount = amt;
    amountButtons.forEach(function (b) {
      b.classList.toggle("selected", parseInt(b.getAttribute("data-amount"), 10) === amt);
    });
    if (customInput) customInput.value = "";
    updateAmountLabel();
  }

  amountButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      var amt = parseInt(b.getAttribute("data-amount"), 10);
      selectPreset(amt);
    });
  });

  if (customInput) {
    customInput.addEventListener("input", function () {
      amountButtons.forEach(function (btn) {
        btn.classList.remove("selected");
      });
      var v = parseInt(customInput.value, 10);
      if (!isNaN(v) && v > 0) {
        selectedAmount = v;
        updateAmountLabel();
      }
    });
    customInput.addEventListener("focus", function () {
      amountButtons.forEach(function (btn) {
        btn.classList.remove("selected");
      });
    });
  }

  selectPreset(501);

  // Track contact form submission
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'lead'
        });
      }
    });
  }

  // Track page scroll (50%)
  var scrollTracked = false;
  window.addEventListener('scroll', function() {
    if (scrollTracked) return;
    var scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 50) {
      scrollTracked = true;
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_50', {
          event_category: 'engagement'
        });
      }
    }
  });

  if (donateMoneyBtn) {
    donateMoneyBtn.addEventListener("click", function () {
      if (customInput && customInput.value) {
        var v = parseInt(customInput.value, 10);
        if (!isNaN(v) && v > 0) selectedAmount = v;
      }
      if (!selectedAmount || selectedAmount < 101) {
        window.alert("Please enter at least ₹101 to proceed.");
        return;
      }
      window.alert(
        "Thank you for choosing to donate " +
          formatRupee(selectedAmount) +
          ". Wire this to your payment gateway (Razorpay, Stripe, etc.) in production."
      );
    });
  }
})();
