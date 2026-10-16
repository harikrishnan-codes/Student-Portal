window.addEventListener('DOMContentLoaded', () => {
  // 1. Radial Dial SVG Progress Drawing
  const gpaRing = document.getElementById('bentoGpaRing');
  const targetGpa = 3.88;
  const maxGpa = 4.0;
  const radius = 58;
  const circumference = 2 * Math.PI * radius; // 364.42

  if (gpaRing) {
    const strokeDashOffset = circumference - (targetGpa / maxGpa) * circumference;
    setTimeout(() => {
      gpaRing.style.strokeDashoffset = strokeDashOffset;
    }, 450);
  }

  // 2. GSAP Entrance Timeline with clearProps Guard
  if (typeof gsap !== 'undefined') {
    const bentoTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    bentoTl
      .from('.bento-header-row', {
        y: -15,
        opacity: 0,
        duration: 0.6
      })
      .from('.bento-cell', {
        y: 35,
        scale: 0.96,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power4.out',
        clearProps: 'all' // Ensures opacity and scale never stay frozen at 0
      }, '-=0.3');
  }
});







window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  const floatingSection = document.getElementById('floating-grades-section');
  const cards = document.querySelectorAll('.floating-card');

  if (floatingSection && cards.length) {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Section scroll entrance
      gsap.from(cards, {
        scrollTrigger: {
          trigger: floatingSection,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        stagger: 0.18,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'opacity',
        onComplete: enableContinuousFloating
      });
    } else {
      enableContinuousFloating();
    }

    // Ambient floating physics only on desktop (>=768px)
    function enableContinuousFloating() {
      if (window.innerWidth < 768) return;

      gsap.to('.float-card-1', {
        y: '-=12',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.float-card-2', {
        y: '+=14',
        duration: 4.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4
      });

      gsap.to('.float-card-3', {
        y: '-=10',
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8
      });
    }
  }
});








window.addEventListener('DOMContentLoaded', () => {
  const tiltWrappers = document.querySelectorAll('.tilt-card-wrapper');

  // Mousemove 3D perspective calculation
  tiltWrappers.forEach((wrapper) => {
    const card = wrapper.querySelector('.tilt-card');
    const glow = wrapper.querySelector('.tilt-card-glow');
    const intensity = parseFloat(wrapper.getAttribute('data-tilt-intensity')) || 15;

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles around X and Y axes
      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.25,
          ease: 'power2.out'
        });
      } else {
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      // Sync radial light position with mouse coordinates
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.2) 0%, transparent 65%)`;
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)'
        });
      } else {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      }
    });
  });

  // Entrance scroll reveal
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('.tilt-card', {
      scrollTrigger: {
        trigger: '#tilt-cards-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      stagger: 0.16,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'opacity'
    });
  }
});








window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const angledSection = document.getElementById('angled-showcase-section');
  const backdropImg = document.querySelector('.angled-backdrop-img');

  if (angledSection) {
    // Parallax background movement on scroll
    if (backdropImg && typeof ScrollTrigger !== 'undefined') {
      gsap.to(backdropImg, {
        scrollTrigger: {
          trigger: angledSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        yPercent: -12,
        scale: 1,
        ease: 'none'
      });
    }

    // Scroll-triggered entry animation
    const showcaseTl = gsap.timeline({
      scrollTrigger: {
        trigger: angledSection,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    showcaseTl
      .from('.angled-polygon-wing', {
        xPercent: -20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from(['.angled-kicker', '.angled-heading', '.angled-description'], {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from(['.angled-outline-btn', '.angled-contact-node'], {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'back.out(1.4)',
        clearProps: 'all'
      }, '-=0.4')
      .from('.angled-carousel-indicators', {
        opacity: 0,
        x: 20,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');
  }
});








window.addEventListener('DOMContentLoaded', () => {
  const expandableCards = document.querySelectorAll('.expandable-card');

  // Initialize drawers based on initial open state
  expandableCards.forEach((card) => {
    const drawer = card.querySelector('.expandable-card-drawer');
    if (card.classList.contains('is-expanded')) {
      drawer.style.height = `${drawer.scrollHeight}px`;
    } else {
      drawer.style.height = '0px';
    }
  });

  // Click toggle handler on bar trigger
  expandableCards.forEach((card) => {
    const bar = card.querySelector('.expandable-card-bar');
    const drawer = card.querySelector('.expandable-card-drawer');

    bar.addEventListener('click', () => {
      const isCurrentlyExpanded = card.classList.contains('is-expanded');

      // Optional: Collapse all other cards for clean single accordion mode
      expandableCards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains('is-expanded')) {
          otherCard.classList.remove('is-expanded');
          const otherDrawer = otherCard.querySelector('.expandable-card-drawer');
          otherDrawer.style.height = '0px';
        }
      });

      // Toggle current card
      if (isCurrentlyExpanded) {
        card.classList.remove('is-expanded');
        drawer.style.height = '0px';
      } else {
        card.classList.add('is-expanded');
        drawer.style.height = `${drawer.scrollHeight}px`;
      }
    });
  });

  // Entrance scroll reveal with GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('.expandable-card', {
      scrollTrigger: {
        trigger: '#expandable-grades-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out',
      clearProps: 'opacity'
    });
  }
});









window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const overlaySection = document.getElementById('grades-cta-overlay');
  const parallaxImg = document.querySelector('.cta-overlay-parallax-img');

  if (overlaySection && parallaxImg) {
    // Scrubbed Parallax Background Float
    gsap.to(parallaxImg, {
      scrollTrigger: {
        trigger: overlaySection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      yPercent: 18,
      ease: 'none'
    });

    // Staggered Glass Card Reveal
    const overlayTl = gsap.timeline({
      scrollTrigger: {
        trigger: overlaySection,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    overlayTl
      .from('.cta-overlay-glass-card', {
        y: 50,
        scale: 0.94,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      })
      .from('.cta-overlay-tag', {
        y: 15,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.6')
      .from('.cta-overlay-title', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.cta-overlay-desc', {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .from(['.btn-overlay-solid', '.btn-overlay-glass'], {
        scale: 0.92,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'back.out(1.5)',
        clearProps: 'all'
      }, '-=0.3')
      .from('.audit-node', {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.2');
  }
});