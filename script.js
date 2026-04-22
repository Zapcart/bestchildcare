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
        gtag('event', 'click', {
          event_category: 'button',
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
        gtag('event', 'click', {
          event_category: 'button',
          event_label: 'add_to_cart_button'
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
      window.location.href = "https://cosmofeed.com/vp/69db6228da78960013f13e18?amount=" + t;
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

  // Donor Activity Card Rotation
  var donorCards = document.querySelectorAll(".donor-card");
  if (donorCards.length > 0) {
    var currentIndex = 0;
    var rotationInterval = 5000; // 5 seconds

    function rotateDonorCards() {
      donorCards.forEach(function (card) {
        card.classList.remove("active");
      });
      donorCards[currentIndex].classList.add("active");
      currentIndex = (currentIndex + 1) % donorCards.length;
    }

    // Initialize first card
    rotateDonorCards();

    // Set up rotation interval
    setInterval(rotateDonorCards, rotationInterval);
  }

  // Share Campaign Function
  window.shareCampaign = function(title, text, url) {
    // Track share button click
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'button',
        event_label: 'share_button'
      });
    }

    var shareData = {
      title: title || "HelpCharityFoundation",
      text: text || "🙏 Support this urgent case and save a life",
      url: url || "https://helpcharityfoundation.in"
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback for desktop - show popup with platform options
      showSharePopup(shareData);
    }
  };

  // Show Share Popup for Desktop
  window.showSharePopup = function(shareData) {
    var popup = document.createElement('div');
    popup.className = 'share-popup';
    popup.innerHTML = `
      <div class="share-popup-overlay" onclick="closeSharePopup()"></div>
      <div class="share-popup-content">
        <h3>Share this campaign</h3>
        <div class="share-popup-options">
          <a href="https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}" target="_blank" class="share-popup-option">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a href="https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}" target="_blank" class="share-popup-option">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            Telegram
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}" target="_blank" class="share-popup-option">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}" target="_blank" class="share-popup-option">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            Twitter
          </a>
          <button onclick="copyLink('${shareData.url}')" class="share-popup-option">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            Copy Link
          </button>
        </div>
        <button onclick="closeSharePopup()" class="share-popup-close">Close</button>
      </div>
    `;
    document.body.appendChild(popup);
    setTimeout(function() {
      popup.classList.add('active');
    }, 10);
  };

  // Close Share Popup
  window.closeSharePopup = function() {
    var popup = document.querySelector('.share-popup');
    if (popup) {
      popup.classList.remove('active');
      setTimeout(function() {
        popup.remove();
      }, 300);
    }
  };

  // Copy Link Function
  window.copyLink = function(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function() {
        showToast('Link Copied ✅');
      }).catch(function() {
        // Fallback for older browsers
        var textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          showToast('Link Copied ✅');
        } catch (err) {
          showToast('Failed to copy link');
        }
        document.body.removeChild(textArea);
      });
    } else {
      // Fallback for older browsers
      var textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast('Link Copied ✅');
      } catch (err) {
        showToast('Failed to copy link');
      }
      document.body.removeChild(textArea);
    }
  };

  // Show Toast Notification
  window.showToast = function(message) {
    var toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.classList.add('active');
    }, 10);
    setTimeout(function() {
      toast.classList.remove('active');
      setTimeout(function() {
        toast.remove();
      }, 300);
    }, 2000);
  };
})();
