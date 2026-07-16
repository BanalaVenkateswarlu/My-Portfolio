/**
 * Banala Venkateswarlu - Portfolio Script Architecture
 * Includes: System/Manual Theme Sync, Active Section Observers, 
 * Responsive Menu Management, Scroll Performance Progress, and Keyboard Accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initMobileNavigation();
  initActiveSectionObserver();
  initScrollProgress();
  initKeyboardAccessibility();
});

/* ==========================================================================
   1. SYSTEM & MANUAL LIGHT/DARK THEME ENGINE
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('.theme-icon');
  const metaThemeColor = document.getElementById('meta-theme-color');

  // Define values based on style.css design tokens
  const themeMetaColors = {
    dark: '#0b0f19',
    light: '#f9fafb'
  };

  const getSavedTheme = () => localStorage.getItem('theme');
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

  // Apply theme to DOM
  const setTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      themeIcon.textContent = '☀️';
      metaThemeColor.setAttribute('content', themeMetaColors.light);
    } else {
      document.body.classList.remove('light-theme');
      themeIcon.textContent = '🌙';
      metaThemeColor.setAttribute('content', themeMetaColors.dark);
    }
    localStorage.setItem('theme', theme);
  };

  // Initial Load: Check local storage or system preference
  const currentTheme = getSavedTheme() || getSystemTheme();
  setTheme(currentTheme);

  // Toggle Action Listener
  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(activeTheme);
  });

  // Listen for system preference changes (runs unless user chose a specific preference overrides)
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!getSavedTheme()) {
      setTheme(e.matches ? 'light' : 'dark');
    }
  });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER SYSTEM
   ========================================================================== */
function initMobileNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const primaryNavigation = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');

  const openMenu = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    primaryNavigation.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNavigation.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
  };

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Handle closing menu when clicking outside the panel
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = primaryNavigation.contains(event.target);
    const isClickInsideToggle = navToggle.contains(event.target);
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';

    if (isOpen && !isClickInsideMenu && !isClickInsideToggle) {
      closeMenu();
    }
  });

  // Handle closing menu when selecting target section links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Dynamic keyboard escape support to close navigation panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      navToggle.focus();
    }
  });
}

/* ==========================================================================
   3. HIGH-PERFORMANCE INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
   ========================================================================== */
function initActiveSectionObserver() {
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null, // Viewport standard
    rootMargin: '-20% 0px -60% 0px', // Strict intersection window focused near upper middle
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. SCROLL PROGRESS INDICATOR BAR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  // Passive event listener for high rendering FPS during scrolls
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    } else {
      progressBar.style.width = '0%';
    }
  }, { passive: true });
}

/* ==========================================================================
   5. KEYBOARD ACCESSIBILITY STABILIZERS
   ========================================================================== */
function initKeyboardAccessibility() {
  const projectCards = document.querySelectorAll('.project-card');

  // Ensure keyboard users can interactively read project metrics or execute click behavior on focus select
  projectCards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const primaryLink = card.querySelector('.project-link');
        if (primaryLink) {
          primaryLink.click();
        }
      }
    });
  });
}
