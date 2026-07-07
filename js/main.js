// main.js - Vanilla JavaScript for LINEALIGN Static Website

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initAnimatedCounters();
  initBeforeAfterSlider();
  initSolutionsTabs();
  initPricingSwitcher();
  initFaqAccordion();
  initLightboxes();
  initContactForms();
  initTestimonials();
});

// 1. Header scroll effect and mobile menu toggler
function initHeader() {
  const header = document.querySelector("header");
  const glassNav = document.querySelector(".glass-nav-container");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const headerLogo = document.querySelector(".header-logo");

  if (!header) return;

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      glassNav?.classList.add("bg-white/90", "py-2", "px-6", "sm:px-8", "shadow-lg", "shadow-primary/5");
      glassNav?.classList.remove("bg-white/70", "py-3.5", "px-6", "sm:px-8", "shadow-sm");
      if (headerLogo) headerLogo.style.height = "54px";
    } else {
      glassNav?.classList.add("bg-white/70", "py-3.5", "px-6", "sm:px-8", "shadow-sm");
      glassNav?.classList.remove("bg-white/90", "py-2", "px-6", "sm:px-8", "shadow-lg", "shadow-primary/5");
      if (headerLogo) headerLogo.style.height = "64px";
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("hidden");
      if (isOpen) {
        mobileMenu.classList.remove("hidden");
        mobileToggle.innerHTML = `
          <svg class="w-5 h-5 animate-in fade-in zoom-in duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        `;
      } else {
        mobileMenu.classList.add("hidden");
        mobileToggle.innerHTML = `
          <svg class="w-5 h-5 animate-in fade-in zoom-in duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        `;
      }
    });
  }

  // Update header height custom property
  const updateHeaderHeight = () => {
    const height = header.offsetHeight;
    document.documentElement.style.setProperty("--header-height", `${height}px`);
  };
  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
  setTimeout(updateHeaderHeight, 150);
}

// 2. Animated Numerical Counters (IntersectionObserver + requestAnimationFrame)
function initAnimatedCounters() {
  const counters = document.querySelectorAll(".animated-counter");

  const animate = (counter) => {
    const val = counter.getAttribute("data-value");
    const duration = 1500;
    const isSlash = val.includes("/");
    let target = 0;
    let target2 = 0;
    let suffix = "";

    if (isSlash) {
      const parts = val.split("/");
      target = parseInt(parts[0].replace(/[^0-9]/g, "")) || 0;
      target2 = parseInt(parts[1].replace(/[^0-9]/g, "")) || 0;
    } else {
      const numericString = val.replace(/[^0-9]/g, "");
      target = parseInt(numericString) || 0;
      suffix = val.replace(/[0-9]/g, "");
    }

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress); // outQuad easing

      const currentCount = Math.floor(easeProgress * target);
      if (isSlash) {
        const currentCount2 = Math.floor(easeProgress * target2);
        counter.textContent = `${currentCount}/${currentCount2}`;
      } else {
        counter.textContent = `${currentCount.toLocaleString()}${suffix}`;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// 3. Before/After Visual Image Split Slider
function initBeforeAfterSlider() {
  const sliders = document.querySelectorAll(".before-after-slider");
  sliders.forEach((slider) => {
    const rangeInput = slider.querySelector(".range-slider");
    const afterImg = slider.querySelector(".after-img-container");
    const bar = slider.querySelector(".slider-bar");

    if (!rangeInput || !afterImg || !bar) return;

    rangeInput.addEventListener("input", (e) => {
      const value = e.target.value;
      afterImg.style.width = `${value}%`;
      bar.style.left = `${value}%`;
    });
  });
}

// 4. Solutions Tab Selector (Solutions Page)
function initSolutionsTabs() {
  const container = document.querySelector(".solutions-container");
  if (!container) return;

  const buttons = container.querySelectorAll(".solution-tab-btn");
  const details = container.querySelectorAll(".solution-detail-card");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");

      // Reset all buttons to inactive state
      buttons.forEach((b) => {
        b.classList.remove("bg-white", "border-primary", "shadow-md", "ring-1", "ring-primary/20");
        b.classList.add("bg-white/60", "border-slate-150/50");
        const iconDiv = b.querySelector(".tab-icon-div");
        iconDiv?.classList.remove("bg-gradient-to-tr", "from-primary", "to-secondary", "text-white", "shadow-sm");
        iconDiv?.classList.add("bg-slate-100", "text-slate-500");
      });

      // Set clicked button to active state
      btn.classList.add("bg-white", "border-primary", "shadow-md", "ring-1", "ring-primary/20");
      btn.classList.remove("bg-white/60", "border-slate-150/50");
      const activeIconDiv = btn.querySelector(".tab-icon-div");
      activeIconDiv?.classList.add("bg-gradient-to-tr", "from-primary", "to-secondary", "text-white", "shadow-sm");
      activeIconDiv?.classList.remove("bg-slate-100", "text-slate-500");

      // Toggle details visibility
      details.forEach((card) => {
        if (card.id === targetId) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// 5. Currency pricing switch (Pricing Page)
function initPricingSwitcher() {
  const switcher = document.querySelector(".currency-switcher");
  if (!switcher) return;

  const usdBtn = switcher.querySelector(".btn-usd");
  const inrBtn = switcher.querySelector(".btn-inr");
  const usdPrices = document.querySelectorAll(".price-usd");
  const inrPrices = document.querySelectorAll(".price-inr");
  const curSymbols = document.querySelectorAll(".currency-symbol");

  if (!usdBtn || !inrBtn) return;

  const setCurrency = (cur) => {
    if (cur === "usd") {
      usdBtn.classList.add("bg-primary", "text-white", "shadow-sm");
      usdBtn.classList.remove("text-slate-600");
      inrBtn.classList.remove("bg-secondary", "text-white", "shadow-sm");
      inrBtn.classList.add("text-slate-600");

      usdPrices.forEach((el) => el.classList.remove("hidden"));
      inrPrices.forEach((el) => el.classList.add("hidden"));
      curSymbols.forEach((el) => (el.textContent = "$"));
    } else {
      inrBtn.classList.add("bg-secondary", "text-white", "shadow-sm");
      inrBtn.classList.remove("text-slate-600");
      usdBtn.classList.remove("bg-primary", "text-white", "shadow-sm");
      usdBtn.classList.add("text-slate-600");

      inrPrices.forEach((el) => el.classList.remove("hidden"));
      usdPrices.forEach((el) => el.classList.add("hidden"));
      curSymbols.forEach((el) => (el.textContent = "₹"));
    }
  };

  usdBtn.addEventListener("click", () => setCurrency("usd"));
  inrBtn.addEventListener("click", () => setCurrency("inr"));
}

// 6. FAQ Accordion list toggler
function initFaqAccordion() {
  const accordions = document.querySelectorAll(".faq-accordion-item");
  accordions.forEach((item) => {
    const button = item.querySelector(".faq-btn");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const isOpen = !answer.classList.contains("hidden");
      
      // Close all FAQs first (optional, but clean accordion look)
      accordions.forEach((other) => {
        other.querySelector(".faq-answer")?.classList.add("hidden");
        other.querySelector(".faq-icon")?.classList.remove("rotate-180");
        other.querySelector(".faq-btn")?.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        answer.classList.remove("hidden");
        icon?.classList.add("rotate-180");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// 7. Lightbox fullscreen overlays
function initLightboxes() {
  // ISO modal triggers
  const isoTrigger = document.querySelector(".iso-cert-trigger");
  const isoModal = document.getElementById("iso-modal");
  const isoClose = document.getElementById("iso-close");

  if (isoTrigger && isoModal) {
    isoTrigger.addEventListener("click", () => {
      isoModal.classList.remove("hidden");
    });
    isoModal.addEventListener("click", (e) => {
      if (e.target === isoModal || e.target === isoClose) {
        isoModal.classList.add("hidden");
      }
    });
  }

  // General image lightboxes
  const zoomImages = document.querySelectorAll(".zoom-image");
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  if (zoomImages.length > 0 && lightbox && lightboxImg) {
    zoomImages.forEach((img) => {
      img.addEventListener("click", () => {
        const src = img.getAttribute("data-src") || img.src || "";
        const alt = img.alt || "";
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.remove("hidden");
      });
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target === lightboxClose) {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
      }
    });
  }
}

// 8. Contact forms mock submit transitions
function initContactForms() {
  const form = document.querySelector(".contact-form");
  const formSuccess = document.querySelector(".form-success-banner");
  const submitBtn = form?.querySelector("button[type='submit']");

  if (form && submitBtn) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Clear previous errors
      const errorSpans = form.querySelectorAll(".error-msg");
      errorSpans.forEach((span) => span.remove());
      const errorInputs = form.querySelectorAll(".border-red-400");
      errorInputs.forEach((input) => input.classList.remove("border-red-400"));

      // Simple validation
      let hasErrors = false;
      const firstName = form.querySelector("input[name='firstName']");
      const email = form.querySelector("input[name='email']");
      const phone = form.querySelector("input[name='phone']");

      if (firstName && !firstName.value.trim()) {
        showError(firstName, "First Name is required");
        hasErrors = true;
      }
      if (email && !email.value.trim()) {
        showError(email, "Email address is required");
        hasErrors = true;
      }
      if (phone && !phone.value.trim()) {
        showError(phone, "Phone number is required");
        hasErrors = true;
      }

      if (hasErrors) return;

      // Loading state
      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;

        if (formSuccess) {
          formSuccess.classList.remove("hidden");
          form.reset();
          setTimeout(() => {
            formSuccess.classList.add("hidden");
          }, 5000);
        } else {
          alert("Thanks for subscribing! We will contact you shortly.");
          form.reset();
        }
      }, 1200);
    });
  }

  function showError(input, msg) {
    input.classList.add("border-red-400");
    const span = document.createElement("span");
    span.className = "text-red-500 text-xs mt-1 block error-msg";
    span.textContent = msg;
    input.parentNode.appendChild(span);
  }
}

// 9. Testimonials Carousel Slider
function initTestimonials() {
  const testimonials = document.querySelectorAll(".testimonial-item");
  const dots = document.querySelectorAll(".testimonial-dot");

  if (testimonials.length === 0 || dots.length === 0) return;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      // Deactivate all testimonials & dots
      testimonials.forEach((t) => t.classList.add("hidden"));
      dots.forEach((d) => {
        d.classList.remove("bg-primary", "scale-125", "shadow-sm", "shadow-primary/30");
        d.classList.add("bg-slate-200");
      });

      // Activate selected testimonial & dot
      testimonials[index]?.classList.remove("hidden");
      dot.classList.add("bg-primary", "scale-125", "shadow-sm", "shadow-primary/30");
      dot.classList.remove("bg-slate-200");
    });
  });
}
