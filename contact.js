window.addEventListener('DOMContentLoaded', () => {
  // 1. 3D Tilt Physics
  const tiltCard = document.getElementById('contactTiltCard');
  const tiltWrapper = document.getElementById('contactTiltWrapper');

  if (tiltCard && tiltWrapper) {
    tiltWrapper.addEventListener('mousemove', (e) => {
      const rect = tiltWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltWrapper.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // 2. Parallax Zoom on Photographic Background
  const bgImg = document.querySelector('.contact-bg-media-img');
  if (bgImg && typeof gsap !== 'undefined') {
    gsap.to(bgImg, {
      scale: 1.12,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // 3. GSAP Entrance Sequence
  if (typeof gsap !== 'undefined') {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.floating-announcement-pill', {
        y: -15,
        opacity: 0,
        duration: 0.6
      })
      .from('.contact-hero-heading', {
        y: 25,
        opacity: 0,
        duration: 0.8
      }, '-=0.4')
      .from('.contact-hero-sub', {
        y: 20,
        opacity: 0,
        duration: 0.7
      }, '-=0.5')
      .from('.contact-hero-actions .btn', {
        scale: 0.92,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'back.out(1.5)',
        clearProps: 'all'
      }, '-=0.4')
      .from('.contact-trust-metrics', {
        y: 15,
        opacity: 0,
        duration: 0.6
      }, '-=0.3')
      .from('#contactTiltCard', {
        y: 35,
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: 'power4.out',
        clearProps: 'opacity'
      }, '-=0.6');
  }
});








window.addEventListener('DOMContentLoaded', () => {
  const inquiryForm = document.getElementById('contactInquiryForm');

  if (inquiryForm) {
    const nameInput = document.getElementById('studentFullName');
    const idInput = document.getElementById('studentIdNumber');
    const emailInput = document.getElementById('studentEmail');
    const courseInput = document.getElementById('courseModuleRef');
    const detailsInput = document.getElementById('inquiryDetails');
    const submitBtn = document.getElementById('submitInquiryBtn');

    // Real-Time Alphabet Sanitizer on Name Input
    nameInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
      clearFieldError(nameInput);
    });

    // Clear errors on input
    [idInput, emailInput, courseInput, detailsInput].forEach((field) => {
      if (field) {
        field.addEventListener('input', () => clearFieldError(field));
      }
    });

    function setFieldError(field, isError) {
      const parentGroup = field.closest('.form-field-group');
      if (parentGroup) {
        if (isError) {
          parentGroup.classList.add('has-error');
        } else {
          parentGroup.classList.remove('has-error');
        }
      }
    }

    function clearFieldError(field) {
      const parentGroup = field.closest('.form-field-group');
      if (parentGroup) {
        parentGroup.classList.remove('has-error');
      }
    }

    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let formIsValid = true;

      // Rule A: Full Name
      const nameVal = nameInput.value.trim();
      const nameRegex = /^[A-Za-z\s]{2,60}$/;
      if (!nameVal || !nameRegex.test(nameVal)) {
        setFieldError(nameInput, true);
        formIsValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      // Rule B: Student ID
      const idVal = idInput.value.trim();
      const idRegex = /^[A-Za-z0-9\-_]{4,20}$/;
      if (!idVal || !idRegex.test(idVal)) {
        setFieldError(idInput, true);
        formIsValid = false;
      } else {
        setFieldError(idInput, false);
      }

      // Rule C: University Email
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        setFieldError(emailInput, true);
        formIsValid = false;
      } else {
        setFieldError(emailInput, false);
      }

      // Rule D: Course Reference
      const courseVal = courseInput.value.trim();
      const courseRegex = /^[A-Za-z0-9\s\-_/]{3,20}$/;
      if (!courseVal || !courseRegex.test(courseVal)) {
        setFieldError(courseInput, true);
        formIsValid = false;
      } else {
        setFieldError(courseInput, false);
      }

      // Rule E: Inquiry Details (Textarea)
      const detailsVal = detailsInput.value.trim();
      if (!detailsVal || detailsVal.length < 15) {
        setFieldError(detailsInput, true);
        formIsValid = false;
      } else {
        setFieldError(detailsInput, false);
      }

      if (!formIsValid) {
        const firstErrorField = inquiryForm.querySelector('.has-error .form-control-input, .has-error .form-control-textarea');
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Explicitly clear textarea and inputs
      inquiryForm.reset();
      detailsInput.value = '';

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Verifying Credentials...</span>';
      submitBtn.style.backgroundColor = '#059669';

      setTimeout(() => {
        window.location.href = 'error.html';
      }, 800);
    });
  }

  // Clear fields on page restoration (Back/Forward navigation)
  window.addEventListener('pageshow', () => {
    const form = document.getElementById('contactInquiryForm');
    const textarea = document.getElementById('inquiryDetails');
    if (form) form.reset();
    if (textarea) textarea.value = '';
  });
});








window.addEventListener('DOMContentLoaded', () => {
  // Check that GSAP & ScrollTrigger exist
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Pin only on screens 768px and wider
  ScrollTrigger.matchMedia({
    '(min-width: 768px)': function () {
      ScrollTrigger.create({
        trigger: '.pinned-section-layout',
        start: 'top 90px', // When section reaches 90px from top (below fixed header)
        end: () => `bottom bottom`, // Locks until the bottom of the right column is reached
        pin: '.pinned-sidebar-col', // Locks this left element in place
        pinSpacing: false, // Prevents layout shifts
        anticipatePin: 1,
        invalidateOnRefresh: true
      });
    }
  });

  // Smooth entrance for the cards on the right
  gsap.from('.desk-detail-card', {
    scrollTrigger: {
      trigger: '.pinned-scroll-content',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    y: 35,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    clearProps: 'all'
  });
});









window.addEventListener('DOMContentLoaded', () => {
  // GSAP ScrollTrigger Sequence for Team Cards
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.team-card', {
      scrollTrigger: {
        trigger: '#contact-team-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out',
      clearProps: 'all'
    });

    gsap.from('.team-support-strip', {
      scrollTrigger: {
        trigger: '.team-support-strip',
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }
});









window.addEventListener('DOMContentLoaded', () => {
  // 1. Campus Wayfinding Interactive Card & Pin Sync
  const venueCards = document.querySelectorAll('.campus-venue-card');
  const mapPins = document.querySelectorAll('.map-marker-pin');

  function setActiveVenue(targetKey) {
    venueCards.forEach((card) => {
      if (card.getAttribute('data-map-target') === targetKey) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    mapPins.forEach((pin) => {
      if (pin.getAttribute('data-marker') === targetKey) {
        pin.classList.add('active');
      } else {
        pin.classList.remove('active');
      }
    });
  }

  venueCards.forEach((card) => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-map-target');
      setActiveVenue(target);
    });
  });

  mapPins.forEach((pin) => {
    pin.addEventListener('click', () => {
      const target = pin.getAttribute('data-marker');
      setActiveVenue(target);
    });
  });

  // 2. GSAP Entrance Stagger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.campus-venue-card', {
      scrollTrigger: {
        trigger: '#contact-campus-map',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.14,
      duration: 0.85,
      ease: 'power3.out',
      clearProps: 'all'
    });

    gsap.from('.map-console-card', {
      scrollTrigger: {
        trigger: '#contact-campus-map',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }
});









window.addEventListener('DOMContentLoaded', () => {
  // GSAP ScrollTrigger Sequence for Contact Final CTA
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact-final-cta',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    ctaTl
      .from('.contact-cta-shell', {
        y: 45,
        scale: 0.96,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      })
      .from(['.contact-final-kicker', '.contact-final-title', '.contact-final-subtitle'], {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.hotline-card', {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.3')
      .from('.contact-cta-actions .btn', {
        scale: 0.92,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.5)',
        clearProps: 'all'
      }, '-=0.3')
      .from('.trust-matrix-item', {
        y: 10,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.2');
  }
});