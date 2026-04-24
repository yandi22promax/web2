/* ============================================================
   PORTFOLIO — RIZKY ARDIANSYAH
   script.js — Interactivity & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. LOADER ─────────────────────────────────────────────── */
  const loader     = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');

  // Animate the loading bar
  setTimeout(() => { loaderFill.style.width = '100%'; }, 100);

  // Hide loader after animation
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Trigger hero reveals after loader
    document.querySelectorAll('.hero .reveal, .hero .reveal-right').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 1600);

  // Prevent scroll during load
  document.body.style.overflow = 'hidden';


  /* ── 2. CUSTOM CURSOR ───────────────────────────────────────── */
  const cursor         = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Follower with lag
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects on interactive elements
  const hoverables = document.querySelectorAll(
    'a, button, .skill-card, .project-card, input, textarea'
  );
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      cursorFollower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      cursorFollower.classList.remove('hovered');
    });
  });


  /* ── 3. NAV SCROLL EFFECT ───────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });


  /* ── 4. HAMBURGER MENU ───────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow =
      mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });


  /* ── 5. SCROLL REVEAL ────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), Number(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-right').forEach(el => {
    // Don't re-observe hero (handled after loader)
    if (!el.closest('.hero')) revealObserver.observe(el);
  });


  /* ── 6. COUNTER ANIMATION ────────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1400;
        const step   = target / (duration / 16);
        let current  = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  /* ── 7. SMOOTH ANCHOR SCROLLING ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 8. ACTIVE NAV LINK ON SCROLL ───────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.style.color = '');
        const activeLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.style.color = 'var(--accent)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── 9. CONTACT FORM ──────────────────────────────────────────── */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('.btn-primary');
    btn.innerHTML = '<span class="btn-text">Mengirim...</span>';
    btn.disabled = true;

    // Simulate sending (replace with actual API)
    setTimeout(() => {
      form.reset();
      btn.innerHTML = '<span class="btn-text">Kirim Pesan</span><span class="btn-icon">→</span>';
      btn.disabled = false;
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1400);
  });


  /* ── 10. SKILL CARD TILT ─────────────────────────────────────── */
  document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `
        translateY(-8px)
        rotateX(${-y * 6}deg)
        rotateY(${x * 6}deg)
      `;
      card.style.transition = 'transform 0.1s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s var(--transition, ease)';
    });
  });


  /* ── 11. PARALLAX HERO ORB ────────────────────────────────────── */
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });


  /* ── 12. TYPING EFFECT - Hero Tag ────────────────────────────── */
  const tagTexts = [
    'Tersedia untuk Proyek Baru',
    'Open to Collaboration',
    'Let\'s Build Something Great'
  ];
  const tagEl = document.querySelector('.hero-tag');
  if (tagEl) {
    let tagIdx  = 0;
    let charIdx = 0;
    let deleting = false;
    const tagDot = tagEl.querySelector('.tag-dot');
    let tagSpan  = tagEl.childNodes[1]; // text node after dot

    // Rebuild with a span for typing
    tagEl.innerHTML = '';
    tagEl.appendChild(tagDot || Object.assign(document.createElement('span'), { className: 'tag-dot' }));
    const typeSpan = document.createElement('span');
    typeSpan.id = 'typed-tag';
    tagEl.appendChild(typeSpan);

    function typeTag() {
      const text = tagTexts[tagIdx];
      if (!deleting) {
        charIdx++;
        typeSpan.textContent = text.slice(0, charIdx);
        if (charIdx === text.length) {
          deleting = true;
          setTimeout(typeTag, 2200);
          return;
        }
      } else {
        charIdx--;
        typeSpan.textContent = text.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          tagIdx = (tagIdx + 1) % tagTexts.length;
        }
      }
      setTimeout(typeTag, deleting ? 40 : 70);
    }

    // Start after loader
    setTimeout(typeTag, 2000);
  }

});