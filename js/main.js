/* ============================================================
   Snipe Outbound — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ---- Mobile menu toggle ----
  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      const cta = document.querySelector('.nav-cta');
      if (links) links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      if (cta) cta.style.display = cta.style.display === 'inline-flex' ? 'none' : 'inline-flex';
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Intersection Observer: fade-up animations ----
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

  // ---- Counter animation for stats ----
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const isDecimal = String(target).includes('.');
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;

          if (isDecimal) {
            el.textContent = current.toFixed(1);
          } else {
            el.textContent = Math.round(current).toLocaleString();
          }

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ---- Project/Case Study tabs ----
  const tabs = document.querySelectorAll('.project-tab');
  const panels = document.querySelectorAll('.project-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === `panel-${target}`) {
          p.classList.add('active');

          // Animate progress fill if present
          const fill = p.querySelector('.pv-progress-fill');
          if (fill) {
            fill.style.width = '0%';
            setTimeout(() => { fill.style.width = '100%'; }, 100);
          }
        }
      });
    });
  });

  // ---- FAQ accordion ----
  document.querySelectorAll('[data-faq]').forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('[data-faq]').forEach(i => i.classList.remove('open'));
      // Toggle
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---- Progress bar animation for 7thGear panel ----
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.pv-progress-fill');
        if (fill) {
          setTimeout(() => { fill.style.width = '100%'; }, 500);
        }
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.project-visual').forEach(el => progressObserver.observe(el));
});
