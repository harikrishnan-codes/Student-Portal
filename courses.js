window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const parallaxSection = document.getElementById('courses-parallax-hero');
  const parallaxBg = document.querySelector('.courses-parallax-bg');

  if (parallaxSection && parallaxBg) {
    gsap.to(parallaxBg, {
      scrollTrigger: {
        trigger: parallaxSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      yPercent: 25,
      ease: 'none'
    });
  }

  const coursesHeroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  coursesHeroTl
    .from('.courses-hero-badge', {
      duration: 0.7,
      y: 25,
      opacity: 0
    })
    .from('.courses-hero-title', {
      duration: 0.85,
      y: 35,
      opacity: 0
    }, '-=0.5')
    .from('.courses-hero-subtitle', {
      duration: 0.75,
      y: 25,
      opacity: 0
    }, '-=0.5')
    .from('.courses-search-bar', {
      duration: 0.85,
      scale: 0.92,
      opacity: 0,
      ease: 'back.out(1.4)'
    }, '-=0.4')
    .from('.course-stat-pill', {
      duration: 0.6,
      y: 20,
      opacity: 0,
      stagger: 0.12
    }, '-=0.3');
});

const courseSearchForm = document.getElementById('courseSearchForm');
const courseSearchInput = document.getElementById('courseSearchInput');
const courseSearchError = document.getElementById('courseSearchError');

if (courseSearchForm && courseSearchInput && courseSearchError) {
  courseSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const query = courseSearchInput.value.trim();

    if (query.length >= 2) {
      courseSearchForm.classList.remove('has-error');
      courseSearchError.classList.remove('visible');
      courseSearchError.textContent = '';
      courseSearchInput.value = '';
      window.location.href = 'error.html';
    } else {
      courseSearchForm.classList.add('has-error');
      courseSearchError.textContent = 'Please enter at least 2 characters to search.';
      courseSearchError.classList.add('visible');
      courseSearchInput.focus();
    }
  });

  courseSearchInput.addEventListener('input', () => {
    if (courseSearchForm.classList.contains('has-error')) {
      courseSearchForm.classList.remove('has-error');
      courseSearchError.classList.remove('visible');
    }
  });
}







window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const splitSection = document.getElementById('courses-split-section');

  if (splitSection) {
    gsap.from('.courses-ide-card', {
      scrollTrigger: {
        trigger: splitSection,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 40,
      scale: 0.94,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out'
    });

    gsap.from('.courses-floating-glass-pill', {
      scrollTrigger: {
        trigger: '.courses-split-visual-col',
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      scale: 0.75,
      y: 20,
      opacity: 0,
      stagger: 0.25,
      duration: 0.8,
      ease: 'back.out(1.8)'
    });

    gsap.from('.courses-split-content-col > *', {
      scrollTrigger: {
        trigger: '.courses-split-content-col',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });
  }
});








window.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.catalog-tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  if (filterBtns.length && courseCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        courseCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          const isMatch = filterValue === 'all' || category === filterValue;

          if (isMatch) {
            card.style.display = 'flex';
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(card, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
            }
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('.catalog-header-bar', {
      scrollTrigger: {
        trigger: '#course-catalog-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.course-card', {
      scrollTrigger: {
        trigger: '.course-cards-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      stagger: 0.16,
      duration: 0.9,
      ease: 'power3.out'
    });
  }
});








window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('comparisonContainer');
  const beforeLayer = document.getElementById('comparisonBeforeLayer');
  const handle = document.getElementById('comparisonHandle');

  if (container && beforeLayer && handle) {
    let isDragging = false;

    function syncSlider(clientX) {
      const rect = container.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;

      beforeLayer.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      syncSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      syncSlider(e.clientX);
    });

    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      syncSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      syncSlider(e.touches[0].clientX);
    }, { passive: true });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.from('.comparison-slider-wrapper', {
        scrollTrigger: {
          trigger: '#courses-comparison-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      });
    }
  }
});







window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const feedbackSection = document.getElementById('courses-feedback-section');

  if (feedbackSection) {
    gsap.from('.feedback-header > *', {
      scrollTrigger: {
        trigger: feedbackSection,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 25,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.feedback-card', {
      scrollTrigger: {
        trigger: '.feedback-cards-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      stagger: 0.16,
      duration: 0.9,
      ease: 'power3.out'
    });
  }
});







window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const ctaSection = document.getElementById('portal-cta-showcase');

  if (ctaSection) {
    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top 78%',
        toggleActions: 'play none none none'
      }
    });

    ctaTl
      .from('.cta-showcase-card', {
        y: 45,
        scale: 0.95,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      })
      .from('.cta-showcase-badge', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.6')
      .from('.cta-showcase-title', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.cta-showcase-desc', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.cta-showcase-actions .btn', {
        y: 15,
        scale: 0.94,
        opacity: 0,
        stagger: 0.14,
        duration: 0.6,
        ease: 'back.out(1.5)'
      }, '-=0.4')
      .from('.cta-trust-bar', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');
  }
});