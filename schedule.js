window.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive 3D Physics Tilt with Mouse Coordinates
  const tiltCard = document.getElementById('heroTiltCard');
  const tiltWrapper = document.getElementById('heroTiltWrapper');

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

  // 2. Parallax Drift on the Background Image
  const bgImg = document.querySelector('.hero-bg-media-img');
  if (bgImg && typeof gsap !== 'undefined') {
    gsap.to(bgImg, {
      scale: 1.12,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // 3. GSAP Entrance Stagger Timeline
  if (typeof gsap !== 'undefined') {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.floating-announcement-pill', {
        y: -15,
        opacity: 0,
        duration: 0.6
      })
      .from('.classy-hero-heading', {
        y: 30,
        opacity: 0,
        duration: 0.85
      }, '-=0.4')
      .from('.classy-hero-sub', {
        y: 20,
        opacity: 0,
        duration: 0.7
      }, '-=0.5')
      .from('.classy-hero-actions .btn', {
        scale: 0.92,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'back.out(1.5)',
        clearProps: 'all'
      }, '-=0.4')
      .from('.hero-trust-metrics', {
        y: 15,
        opacity: 0,
        duration: 0.6
      }, '-=0.3')
      .from('#heroTiltCard', {
        y: 40,
        scale: 0.92,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        clearProps: 'opacity'
      }, '-=0.7');
  }
});










window.addEventListener('DOMContentLoaded', () => {
  // GSAP Entrance Stagger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.deadlines-terminal-card', {
      scrollTrigger: {
        trigger: '#schedule-deadlines-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all'
    });

    gsap.from('.deadline-item-card', {
      scrollTrigger: {
        trigger: '.deadlines-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }
});









window.addEventListener('DOMContentLoaded', () => {
  // 1. Facility Category Filter
  const locFilterChips = document.querySelectorAll('.loc-filter-chip');
  const facilityCards = document.querySelectorAll('.facility-card');

  if (locFilterChips.length > 0 && facilityCards.length > 0) {
    locFilterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        locFilterChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        const selectedFilter = chip.getAttribute('data-filter');

        facilityCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');

          if (selectedFilter === 'all' || cardCategory === selectedFilter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 2. GSAP Entrance Stagger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.facility-card', {
      scrollTrigger: {
        trigger: '#schedule-locations-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.16,
      duration: 0.85,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }
});









window.addEventListener('DOMContentLoaded', () => {
  // Entrance Stagger Animation for Split Screen
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const splitTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#schedule-split-sync',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    splitTl
      .from('.split-col-content', {
        x: -30,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      })
      .from('.split-mockup-card', {
        x: 30,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.mockup-toast-card', {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.3');
  }
});









window.addEventListener('DOMContentLoaded', () => {
  // 1. Accordion Toggle Logic (Single Open Accordion Pattern)
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove('active');
        const otherTrigger = otherItem.querySelector('.accordion-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 2. GSAP Entrance Scroll Trigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.accordion-item', {
      scrollTrigger: {
        trigger: '#schedule-faq',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }
});








window.addEventListener('DOMContentLoaded', () => {
  // GSAP ScrollTrigger Entrance for Final CTA
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#schedule-final-cta',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    ctaTl
      .from('.final-cta-card', {
        y: 45,
        scale: 0.96,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      })
      .from(['.final-cta-kicker', '.final-cta-title', '.final-cta-subtitle'], {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.final-cta-action-group .btn', {
        scale: 0.92,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.5)',
        clearProps: 'all'
      }, '-=0.3')
      .from('.audit-matrix-item', {
        y: 10,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.2');
  }
});