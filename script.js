document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation Drawer & Backdrop Handling ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navBackdrop = document.getElementById('navBackdrop');
  const body = document.body;

  function openDrawer() {
    mobileDrawer.classList.add('open');
    navBackdrop.classList.add('open');
    body.classList.add('no-scroll');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    navBackdrop.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    navBackdrop.classList.remove('open');
    body.classList.remove('no-scroll');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    navBackdrop.setAttribute('aria-hidden', 'true');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (navBackdrop) navBackdrop.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // --- Active Nav Link Detection ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const trackedLinks = document.querySelectorAll(
    '.nav-menu .nav-link, .drawer-nav-menu .drawer-nav-link, .footer-links .footer-link'
  );

  trackedLinks.forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- Custom Select Dropdowns ---
  const customSelects = document.querySelectorAll('.custom-select-box');

  customSelects.forEach((selectBox) => {
    const trigger = selectBox.querySelector('.custom-select-trigger');
    const options = selectBox.querySelectorAll('.custom-option');
    const labelSpan = trigger.querySelector('.selected-label');
    const hiddenInput = selectBox.querySelector('input[type="hidden"]');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      customSelects.forEach((other) => {
        if (other !== selectBox) other.classList.remove('active');
      });
      selectBox.classList.toggle('active');
    });

    options.forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        options.forEach((o) => o.classList.remove('selected'));
        opt.classList.add('selected');
        labelSpan.textContent = opt.textContent.trim();
        if (hiddenInput) {
          hiddenInput.value = opt.getAttribute('data-value') || '';
        }
        selectBox.classList.remove('active');
      });
    });
  });

  document.addEventListener('click', () => {
    customSelects.forEach((box) => box.classList.remove('active'));
  });

  // --- Generic Auto-Clear Forms ---
  const validatedForms = document.querySelectorAll('form[data-auto-clear="true"]');

  validatedForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputs = form.querySelectorAll('input:not([type="submit"]):not([type="button"]), textarea');
      let isValid = true;

      inputs.forEach((input) => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.focus();
        }
      });

      if (isValid) {
        inputs.forEach((input) => {
          input.value = '';
        });

        const selectsInForm = form.querySelectorAll('.custom-select-box');
        selectsInForm.forEach((box) => {
          const labelSpan = box.querySelector('.selected-label');
          const placeholder = box.getAttribute('data-placeholder') || 'Select Option';
          const hiddenInput = box.querySelector('input[type="hidden"]');
          const options = box.querySelectorAll('.custom-option');
          if (labelSpan) labelSpan.textContent = placeholder;
          if (hiddenInput) hiddenInput.value = '';
          options.forEach((opt) => opt.classList.remove('selected'));
        });
      }
    });
  });

  // --- Single Unified Footer Newsletter Handler ---
  const newsletterForm = document.getElementById('footerNewsletterForm');
  const newsletterEmail = document.getElementById('footerNewsletterEmail');
  const statusMsg = document.getElementById('newsletterStatusMsg');

  if (newsletterForm && newsletterEmail) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Clear previous error messages when typing starts
    newsletterEmail.addEventListener('input', () => {
      newsletterForm.classList.remove('has-error');
      if (statusMsg) {
        statusMsg.className = 'newsletter-status-msg';
        statusMsg.textContent = '';
      }
    });

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailVal = newsletterEmail.value.trim();

      // Case 1: Empty input
      if (!emailVal) {
        newsletterForm.classList.add('has-error');
        newsletterForm.classList.remove('has-success');
        if (statusMsg) {
          statusMsg.className = 'newsletter-status-msg error';
          statusMsg.textContent = 'Please enter your email address.';
        }
        newsletterEmail.focus();
        return;
      }

      // Case 2: Invalid format
      if (!emailRegex.test(emailVal)) {
        newsletterForm.classList.add('has-error');
        newsletterForm.classList.remove('has-success');
        if (statusMsg) {
          statusMsg.className = 'newsletter-status-msg error';
          statusMsg.textContent = 'Please enter a valid email format (e.g., student@university.edu).';
        }
        newsletterEmail.focus();
        return;
      }

      // Case 3: Valid -> Show message, clear field, disable button, wait 1s, redirect
      newsletterForm.classList.remove('has-error');
      newsletterForm.classList.add('has-success');

      if (statusMsg) {
        statusMsg.className = 'newsletter-status-msg success';
        statusMsg.textContent = '✓ Subscribed successfully!';
      }

      newsletterEmail.value = '';

      const submitBtn = newsletterForm.querySelector('.newsletter-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        window.location.href = 'error.html';
      }, 5000); // 1000ms = exactly 1 second
    });
  }
});






const heroSlides = document.querySelectorAll('.hero-slider-backdrop .hero-slide');
let activeSlideIndex = 0;
const slideIntervalTime = 5000;

if (heroSlides.length > 1) {
  setInterval(() => {
    heroSlides[activeSlideIndex].classList.remove('active');
    activeSlideIndex = (activeSlideIndex + 1) % heroSlides.length;
    heroSlides[activeSlideIndex].classList.add('active');
  }, slideIntervalTime);
}








if (typeof gsap !== 'undefined') {
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-overlay-card', {
      duration: 1.1,
      x: -40,
      opacity: 0,
      clearProps: 'all'
    })
    .from('.hero-kicker', {
      duration: 0.6,
      y: 15,
      opacity: 0
    }, '-=0.7')
    .from('.hero-title', {
      duration: 0.7,
      y: 20,
      opacity: 0
    }, '-=0.5')
    .from('.hero-description', {
      duration: 0.7,
      y: 15,
      opacity: 0
    }, '-=0.5')
    .from('.hero-actions .btn', {
      duration: 0.6,
      scale: 0.92,
      opacity: 0,
      stagger: 0.12
    }, '-=0.4')
    .from('.hero-perks-list .perk-item', {
      duration: 0.5,
      y: 10,
      opacity: 0,
      stagger: 0.08
    }, '-=0.3')
    .from('.hero-rating-badge', {
      duration: 0.9,
      scale: 0.8,
      y: 25,
      opacity: 0,
      ease: 'back.out(1.7)',
      clearProps: 'all'
    }, '-=0.6');

  if (document.getElementById('portal-split-section')) {
    gsap.from('.split-col-content > *', {
      scrollTrigger: {
        trigger: '#portal-split-section',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.14,
      ease: 'power3.out',
      clearProps: 'all'
    });

    gsap.from('.split-feature-card', {
      scrollTrigger: {
        trigger: '.split-cards-stack',
        start: 'top 85%'
      },
      duration: 0.7,
      x: -25,
      opacity: 0,
      stagger: 0.15,
      ease: 'power2.out',
      clearProps: 'all'
    });

    gsap.from('.split-main-image', {
      scrollTrigger: {
        trigger: '.split-col-visual',
        start: 'top 80%'
      },
      duration: 1.1,
      scale: 0.9,
      opacity: 0,
      ease: 'power3.out',
      clearProps: 'all'
    });

    gsap.from('.split-floating-pill', {
      scrollTrigger: {
        trigger: '.split-col-visual',
        start: 'top 75%'
      },
      duration: 0.9,
      y: 20,
      opacity: 0,
      stagger: 0.25,
      ease: 'back.out(1.7)',
      clearProps: 'all'
    });
  }
}







window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const overlapSection = document.getElementById('portal-overlap-section');

  if (overlapSection) {
    gsap.from('.overlap-card', {
      scrollTrigger: {
        trigger: overlapSection,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      stagger: 0.18,
      duration: 1,
      ease: 'power3.out'
    });
  }
});








window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const whyUsSection = document.getElementById('portal-why-us-section');

  if (whyUsSection) {
    gsap.from('.why-us-featured-frame', {
      scrollTrigger: {
        trigger: whyUsSection,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      x: -40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from(['.why-us-kicker', '.why-us-heading'], {
      scrollTrigger: {
        trigger: whyUsSection,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.why-us-green-panel', {
      scrollTrigger: {
        trigger: '.why-us-info-col',
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.why-us-perk-card', {
      scrollTrigger: {
        trigger: '.why-us-cards-row',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      stagger: 0.18,
      duration: 0.85,
      ease: 'power3.out'
    });
  }
});








window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const milestoneSection = document.getElementById('portal-milestone-section');
  const progressFill = document.getElementById('timelineProgressFill');

  if (milestoneSection && progressFill) {
    gsap.to(progressFill, {
      scrollTrigger: {
        trigger: '.milestone-timeline',
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: 0.5
      },
      height: '100%',
      ease: 'none'
    });

    const milestoneItems = document.querySelectorAll('.milestone-item');

    milestoneItems.forEach((item) => {
      const card = item.querySelector('.milestone-card');
      const node = item.querySelector('.milestone-node');
      const isLeft = item.classList.contains('left');

      gsap.from(card, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => item.classList.add('is-active')
        },
        x: window.innerWidth >= 768 ? (isLeft ? -50 : 50) : 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });

      gsap.from(node, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        scale: 0.3,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(2)'
      });
    });
  }
});








window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const maskSection = document.getElementById('portal-mask-section');
  const maskViewport = document.querySelector('.mask-reveal-viewport');
  const curtain = document.querySelector('.mask-curtain-layer');
  const zoomImg = document.querySelector('.mask-zoom-img');
  const overlayElements = document.querySelectorAll('.mask-caption-pill, .mask-mini-badge');

  if (maskSection && maskViewport && curtain && zoomImg) {
    const maskTl = gsap.timeline({
      scrollTrigger: {
        trigger: maskSection,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    maskTl
      .to(maskViewport, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.1,
        ease: 'power4.inOut'
      })
      .to(curtain, {
        y: '-100%',
        duration: 0.9,
        ease: 'power3.inOut'
      }, '-=0.5')
      .to(zoomImg, {
        scale: 1,
        duration: 1.4,
        ease: 'power2.out'
      }, '-=0.9')
      .from(overlayElements, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.6');
  }
});








window.addEventListener('DOMContentLoaded', () => {
  const accordionCards = document.querySelectorAll('.accordion-card');

  accordionCards.forEach((card) => {
    const trigger = card.querySelector('.accordion-trigger');

    trigger.addEventListener('click', () => {
      const isAlreadyActive = card.classList.contains('active');

      accordionCards.forEach((otherCard) => {
        otherCard.classList.remove('active');
        const otherTrigger = otherCard.querySelector('.accordion-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isAlreadyActive) {
        card.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('.accordion-card', {
      scrollTrigger: {
        trigger: '#portal-accordion-section',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out'
    });
  }
});








window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const ctaSection = document.getElementById('portal-cta-section');
  const backdrop = document.querySelector('.banner-cta-backdrop');

  if (ctaSection && backdrop) {
    gsap.to(backdrop, {
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      yPercent: 18,
      ease: 'none'
    });

    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    ctaTl
      .from('.banner-cta-card', {
        y: 45,
        scale: 0.96,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      })
      .from('.banner-cta-badge', {
        y: 15,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.7')
      .from('.banner-cta-title', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.banner-cta-desc', {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .from('.banner-cta-actions .btn', {
        scale: 0.9,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'back.out(1.5)'
      }, '-=0.3')
      .from('.banner-stat-box', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: animateCounters
      }, '-=0.2');

    function animateCounters() {
      const counters = document.querySelectorAll('.counter-num');
      counters.forEach((counter) => {
        const target = +counter.getAttribute('data-target');
        gsap.to(counter, {
          innerText: target,
          duration: 1.8,
          snap: { innerText: 1 },
          ease: 'power2.out'
        });
      });
    }
  }
});