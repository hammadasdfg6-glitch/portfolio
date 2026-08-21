/**
 * Muhammad Hammad - Portfolio Scripts
 * Vanilla JavaScript implementation for high performance & zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initScrollReveal();
  initStaggerReveal();
  initNavbarScroll();
  initActiveNavHighlight();
  initMobileMenu();
  initClipboardButtons();
  initContactForm();
  initBackToTop();
  initCurrentYear();
  initScrollProgress();
  initTiltCards();
  initMagneticButtons();
  initParallaxHero();
  initCounterAnimations();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  
  const savedTheme = localStorage.getItem('mh_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme ? savedTheme : (prefersDark !== false ? 'dark' : 'dark');
  applyTheme(currentTheme, false);

  function applyTheme(theme, animate = true) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      updateThemeIcons('dark', animate);
      localStorage.setItem('mh_portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      updateThemeIcons('light', animate);
      localStorage.setItem('mh_portfolio_theme', 'light');
    }
  }

  function updateThemeIcons(theme, animate) {
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    
    if (theme === 'dark') {
      sunIcons.forEach(icon => {
        icon.classList.remove('hidden');
        if (animate) { icon.classList.add('theme-icon-animate'); setTimeout(() => icon.classList.remove('theme-icon-animate'), 500); }
      });
      moonIcons.forEach(icon => icon.classList.add('hidden'));
    } else {
      sunIcons.forEach(icon => icon.classList.add('hidden'));
      moonIcons.forEach(icon => {
        icon.classList.remove('hidden');
        if (animate) { icon.classList.add('theme-icon-animate'); setTimeout(() => icon.classList.remove('theme-icon-animate'), 500); }
      });
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark', true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
  }
}

/* ==========================================================================
   2. Terminal-Style Typing Animation in Hero
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Backend Developer',
    'Node.js & Express.js Engineer',
    'RESTful API Architect',
    'Distributed Systems & Redis Specialist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85 + Math.random() * 30;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
}

/* ==========================================================================
   3. Native IntersectionObserver Scroll Reveal
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-init, .reveal-init-left, .reveal-init-right, .reveal-init-scale, .section-divider');
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('reveal-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   3b. Stagger Reveal (child stagger animations)
   ========================================================================== */
function initStaggerReveal() {
  const staggerContainers = document.querySelectorAll('.stagger-fade');

  if (!('IntersectionObserver' in window)) {
    staggerContainers.forEach(el => el.classList.add('stagger-visible'));
    return;
  }

  const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('stagger-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  staggerContainers.forEach(el => staggerObserver.observe(el));
}

/* ==========================================================================
   4. Sticky Navbar Shrink on Scroll
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('py-3', 'shadow-md');
      navbar.classList.remove('py-5');
    } else {
      navbar.classList.add('py-5');
      navbar.classList.remove('py-3', 'shadow-md');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   5. Active Nav Link Indicator
   ========================================================================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  function highlightNav() {
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-brand-600', 'dark:text-brand-400', 'font-semibold');
            link.classList.remove('text-slate-600', 'dark:text-slate-400');
          } else {
            link.classList.remove('text-brand-600', 'dark:text-brand-400', 'font-semibold');
            link.classList.add('text-slate-600', 'dark:text-slate-400');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
}

/* ==========================================================================
   6. Mobile Menu Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!menuBtn || !mobileDrawer) return;

  function toggleMenu() {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    
    if (isExpanded) {
      mobileDrawer.classList.add('hidden');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.remove('hidden');
      menuIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.add('hidden');
    menuIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', toggleMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileDrawer.classList.contains('hidden')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   7. Clipboard Copy & Toast Notifications
   ========================================================================== */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  
  if (type === 'success') {
    toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border border-brand-500/40 bg-white dark:bg-slate-900/95 text-brand-600 dark:text-brand-400 shadow-2xl backdrop-blur-md show';
  } else {
    toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-2xl backdrop-blur-md show';
  }

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy-text]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-text');
      const label = btn.getAttribute('data-copy-label') || 'Text';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.left = '-999999px';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          textarea.remove();
        }
        showToast(`${label} copied to clipboard!`, 'success');
      } catch (err) {
        showToast(`Failed to copy: ${textToCopy}`, 'error');
      }
    });
  });
}

/* ==========================================================================
   8. Contact Form Handler (Mailto builder with zero friction)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Contact from Website';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    const emailRecipient = 'hammadasdfg6@gmail.com';
    const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
    const emailBody = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}\n\n` +
      `---\nSent from Muhammad Hammad's Portfolio Website`
    );

    const mailtoUrl = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;

    window.location.href = mailtoUrl;

    showToast('Opening your email client to send message...', 'success');
    form.reset();
  });
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. Dynamic Current Year
   ========================================================================== */
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   11. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   12. 3D Tilt Cards (Project cards)
   ========================================================================== */
function initTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

/* ==========================================================================
   13. Magnetic Buttons
   ========================================================================== */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
    });
  });
}

/* ==========================================================================
   14. Parallax Hero (subtle background movement)
   ========================================================================== */
function initParallaxHero() {
  const heroSection = document.querySelector('.hero-glow');
  if (!heroSection) return;

  const particles = heroSection.querySelectorAll('.hero-particle');
  if (!particles.length) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    particles.forEach((p, i) => {
      const speed = (i + 1) * 8;
      p.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  }, { passive: true });
}

/* ==========================================================================
   15. Counter Animations (Animated CGPA / Stats)
   ========================================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count-to'));
        const decimals = (target.toString().split('.')[1] || '').length;
        const duration = 1500;
        const start = performance.now();

        function animate(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          
          el.textContent = current.toFixed(decimals);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target.toFixed(decimals);
            el.classList.add('count-animate');
          }
        }
        
        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
}
