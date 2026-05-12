// ═══════════════════════════════════════════
// LINGESH PORTFOLIO — script.js
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── LOADING SCREEN ──────────────────────
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 1200);
  });
  document.body.style.overflow = 'hidden';

  // ── CUSTOM CURSOR ───────────────────────
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (window.matchMedia('(hover:hover)').matches && dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animCursor);
    })();
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '56px'; ring.style.height = '56px';
        ring.style.borderColor = 'var(--cyan)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '36px'; ring.style.height = '36px';
        ring.style.borderColor = 'var(--purple)';
      });
    });
  }

  // ── LIVE CLOCK ──────────────────────────
  const clockEl = document.getElementById('liveClock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    let h = now.getHours(), m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    clockEl.textContent = `${h}:${String(m).padStart(2,'0')} ${ampm} IST`;
  }
  updateClock();
  setInterval(updateClock, 10000);

  // ── BANNER CLOSE ────────────────────────
  const bannerClose = document.getElementById('bannerClose');
  const banner = document.getElementById('availBanner');
  if (bannerClose && banner) {
    bannerClose.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  // ── NAVBAR SCROLL ───────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
  }, { passive: true });

  // ── MOBILE MENU ─────────────────────────
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.querySelector('i').className = isOpen ? 'ph ph-x' : 'ph ph-list';
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.querySelector('i').className = 'ph ph-list';
      });
    });
  }

  // ── ACTIVE NAV ON SCROLL ────────────────
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navItems.forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  }

  // ── TYPING EFFECT ───────────────────────
  const typingEl = document.getElementById('typingText');
  const words = ['Frontend Developer', 'UI Designer', 'Freelancer', 'React Developer'];
  let wi = 0, ci = 0, deleting = false;
  function typeLoop() {
    if (!typingEl) return;
    const word = words[wi];
    typingEl.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) {
      ci++; setTimeout(typeLoop, 90);
    } else if (!deleting && ci === word.length) {
      deleting = true; setTimeout(typeLoop, 1800);
    } else if (deleting && ci > 0) {
      ci--; setTimeout(typeLoop, 50);
    } else {
      deleting = false; wi = (wi + 1) % words.length; setTimeout(typeLoop, 200);
    }
  }
  setTimeout(typeLoop, 1400);

  // ── SCROLL REVEAL ───────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ── SKILLS TABS ─────────────────────────
  const skillsData = {
    tech: [
      { icon: 'ph-fill ph-file-html', label: 'HTML' },
      { icon: 'ph-fill ph-file-css', label: 'CSS' },
      { icon: 'ph-fill ph-file-code', label: 'JavaScript' },
      { icon: 'ph-fill ph-atom', label: 'React.js' },
      { icon: 'ph-fill ph-hexagon', label: 'Node.js' },
      { icon: 'ph-fill ph-database', label: 'MongoDB' },
      { icon: 'ph-fill ph-git-branch', label: 'Git & GitHub' },
      { icon: 'ph-fill ph-wind', label: 'Tailwind CSS' },
    ],
    design: [
      { icon: 'ph-fill ph-pen-nib', label: 'Canva' },
      { icon: 'ph-fill ph-figma-logo', label: 'Figma' },
      { icon: 'ph-fill ph-presentation-chart', label: 'PowerPoint' },
      { icon: 'ph-fill ph-graph', label: 'Draw.io' },
      { icon: 'ph-fill ph-palette', label: 'UI Design' },
      { icon: 'ph-fill ph-layout', label: 'UX Design' },
    ],
    other: [
      { icon: 'ph-fill ph-device-mobile', label: 'Responsive Design' },
      { icon: 'ph-fill ph-puzzle-piece', label: 'Problem Solving' },
      { icon: 'ph-fill ph-file-text', label: 'Documentation' },
      { icon: 'ph-fill ph-student', label: 'Academic Projects' },
      { icon: 'ph-fill ph-handshake', label: 'Freelancing' },
      { icon: 'ph-fill ph-clock', label: 'Fast Delivery' },
    ]
  };

  const skillsGrid = document.getElementById('skillsGrid');
  function renderSkills(tab) {
    if (!skillsGrid) return;
    skillsGrid.innerHTML = '';
    (skillsData[tab] || []).forEach((sk, i) => {
      const card = document.createElement('div');
      card.className = 'skill-card reveal';
      card.style.transitionDelay = (i * 0.05) + 's';
      card.innerHTML = `<i class="skill-icon ${sk.icon}"></i><span>${sk.label}</span>`;
      skillsGrid.appendChild(card);
    });
    // Re-observe new elements
    skillsGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSkills(btn.dataset.tab);
    });
  });
  renderSkills('tech');

  // ── 3D TILT ON SKILL CARDS ──────────────
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.skill-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.5) {
        card.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-6px)`;
      } else {
        card.style.transform = '';
      }
    });
  });

  // ── CONTACT FORM ────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const submitBtn = document.getElementById('formSubmit');
      const submitText = submitBtn.querySelector('.submit-text');
      const submitLoading = submitBtn.querySelector('.submit-loading');
      const successMsg = document.getElementById('formSuccess');

      submitText.style.display = 'none';
      submitLoading.style.display = 'flex';
      submitBtn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          successMsg.style.display = 'flex';
          setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
        }
      } catch (_) {
        // Show success anyway for offline/demo
        successMsg.style.display = 'flex';
        setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
      } finally {
        submitText.style.display = 'flex';
        submitLoading.style.display = 'none';
        submitBtn.disabled = false;
      }
    });
  }

  // ── SMOOTH SCROLL ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Initial reveal check
  setTimeout(() => {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('active');
    });
  }, 200);

});
