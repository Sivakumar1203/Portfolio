/* ==========================================================================
   MAIN JAVASCRIPT CONTROLLER
   Theme toggle, navigation, skills filter, project modals & resume action
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initSkillsFilter();
  initProjectModals();
  initResumeModal();
});

/* Dark / Light Theme Toggle with LocalStorage */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
  });
}

function updateToggleIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  if (theme === 'light') {
    // Show Moon icon for switching to dark
    toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>`;
    toggleBtn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    // Show Sun icon for switching to light
    toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>`;
    toggleBtn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* Mobile Navigation Menu */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    const isOpen = navLinks.classList.contains('mobile-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking link
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Active Scroll Spy */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar compact state
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll spy active indicator
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* Interactive Skills Category Filter */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-tab-btn');
  const skillCards = document.querySelectorAll('.skills-group-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* Project Modal Showcase */
const projectData = {
  project1: {
    title: 'LLM-Based Personalized Adaptive AI Quiz Generator',
    category: 'AI | Generative AI | Content Automation',
    duration: 'January 2026 – March 2026',
    description:
      'Built an intelligent, automated MCQ generator that analyzes input learning material and context using state-of-the-art Large Language Models to produce topic-adaptive questions with multi-tier difficulty scoring and explanations.',
    features: [
      'Large Language Model (LLM) pipeline integration for automated evaluation',
      'Advanced prompt engineering for contextual & adaptive quiz generation',
      'Topic parsing with structured JSON / markdown formatted schema',
      'Adaptive difficulty grading based on student feedback and proficiency',
      'Automated quiz generation workflow reducing question creation time by 85%'
    ],
    techStack: ['Python', 'Large Language Models (LLMs)', 'Prompt Engineering', 'NLP', 'REST APIs', 'Flask']
  },
  project2: {
    title: 'Financial Fraud Detection System',
    category: 'Machine Learning | Data Analytics',
    duration: 'Academic & Practical Coursework',
    description:
      'Explored fraud pattern detection in financial transaction datasets as part of applied Machine Learning coursework, addressing class imbalance, anomaly identification, and predictive classification.',
    features: [
      'Comprehensive data preprocessing and handling of high-dimensional transactions',
      'Exploratory Data Analysis (EDA) uncovering key anomalous spending behaviors',
      'Supervised ML classification models with precision/recall tuning for skewed data',
      'Fraud pattern analysis reducing false positive rates in simulated pipelines'
    ],
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'Matplotlib', 'Seaborn']
  },
  project3: {
    title: 'Intelligent NLP Conversational Chatbot',
    category: 'Python | NLP | AI & Automation',
    duration: 'CODTECH IT Solutions Project',
    description:
      'Engineered an interactive conversational assistant utilizing natural language processing techniques, intent recognition, and entity extraction to answer user inquiries accurately.',
    features: [
      'Text tokenization, lemmatization, and stop-word filtering using NLTK',
      'Intent classification engine mapped to structured response intents',
      'Lightweight web server deployment via Flask API',
      'Real-time interaction with REST API integration capabilities'
    ],
    techStack: ['Python', 'NLTK', 'Flask', 'REST APIs', 'JSON Data Structures']
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalBackdrop) return;

  document.querySelectorAll('[data-project-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project-id');
      const data = projectData[pId];
      if (!data) return;

      modalContent.innerHTML = `
        <span class="project-category">${data.category}</span>
        <h3 class="section-title" style="font-size: 1.6rem; margin-bottom: 8px;">${data.title}</h3>
        <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-bottom: 18px;">Duration: ${data.duration}</p>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px;">${data.description}</p>
        
        <h4 style="font-size: 1.1rem; color: var(--text-bright); margin-bottom: 12px;">Key Architectural Highlights:</h4>
        <ul style="margin-bottom: 24px;">
          ${data.features.map(f => `<li style="position: relative; padding-left: 20px; color: var(--text-secondary); margin-bottom: 8px; font-size: 0.92rem;"><span style="position: absolute; left:0; color: var(--accent-cyan);">✦</span> ${f}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1.1rem; color: var(--text-bright); margin-bottom: 12px;">Technologies Used:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;">
          ${data.techStack.map(t => `<span class="focus-tag">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 12px;">
          <a href="https://github.com/Sivakumar1203" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            GitHub Repository
          </a>
          <a href="#contact" class="btn btn-secondary btn-sm" onclick="closeModal()">Discuss Project</a>
        </div>
      `;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function closeModal() {
  const modalBackdrop = document.getElementById('project-modal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* Resume Modal / Printable Resume Handler */
function initResumeModal() {
  const resumeBtns = document.querySelectorAll('.resume-btn-trigger');

  resumeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });
}

function openResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
