document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────
  // 1. THEME INITIALIZATION & TOGGLE
  // ─────────────────────────────────────────
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Default to light theme; check if user previously selected dark theme
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let theme = 'light';
    if (document.body.classList.contains('dark-theme')) {
      theme = 'dark';
    }
    localStorage.setItem('theme', theme);
  });

  // ─────────────────────────────────────────
  // 2. MOBILE NAVIGATION HAMBURGER
  // ─────────────────────────────────────────
  const menuBtn = document.getElementById('menu-btn');
  const navbar = document.querySelector('.navbar');

  menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // Close nav on link click in mobile view
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  });

  // ─────────────────────────────────────────
  // 3. TYPEWRITER EFFECT
  // ─────────────────────────────────────────
  const typewriterElement = document.querySelector('.typing-text');
  const words = [
    "Full-Stack Software Engineer",
    "Applied AI Developer",
    "ServiceNow Admin",
    "Observability Enthusiast"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let erasingDelay = 40;
  let newWordDelay = 1500;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = erasingDelay;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingDelay = newWordDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingDelay = 200;
    }

    setTimeout(type, typingDelay);
  }
  
  if (typewriterElement) {
    setTimeout(type, 1000);
  }

  // ─────────────────────────────────────────
  // 4. SCROLL INTERSECTION OBSERVER
  // ─────────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // ─────────────────────────────────────────
  // 5. SCROLL SPY ACTIVE NAVBAR LINK
  // ─────────────────────────────────────────
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar ul li a');

  window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 250)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // ─────────────────────────────────────────
  // 6. PROJECTS IN-MEMORY DATABASE & FILTERING
  // ─────────────────────────────────────────
  const projectsData = [
    {
      id: "careplus",
      title: "Care++ Unified Health Support",
      category: "ai-ml",
      tech: ["Spring Boot", "React.js", "Flask", "PostgreSQL", "PyTorch"],
      desc: "Multimodal deep-learning clinical decision-support system integrating CNN-based medical image analysis, BioBERT drug-interaction, and LLM-powered clinical summarization.",
      bullets: [
        "Achieved 96.85% classification accuracy on clinical diagnostic image sets.",
        "Engineered hybrid Python + Spring Boot microservices pipeline using REST communication.",
        "Published in IEEE RMKMATE 2026 conference proceedings.",
        "Integrated BioBERT neural models to predict and flag critical drug-to-drug interactions."
      ],
      github: "https://github.com/kailashkiradu"
    },
    {
      id: "acquirerx-ai",
      title: "AcquirerX Compliance Assistant",
      category: "ai-ml",
      tech: ["FastAPI", "LangChain", "FAISS", "sentence-transformers", "Ollama"],
      desc: "Fully local RAG-powered intelligent compliance assistant designed as an AI extension to the AcquirerX merchant switch platform.",
      bullets: [
        "Parses and reasons over PCI-DSS & RBI payment compliance guidelines locally.",
        "Leverages recursive character splitting and FAISS embedding database vector stores.",
        "Uses offline sentence-transformers for vector embeddings and local Ollama model engines.",
        "Provides context-aware compliance answers to payment engineers, preventing audit violations."
      ],
      github: "https://github.com/kailashkiradu"
    },
    {
      id: "acquirerx-core",
      title: "AcquirerX POS SWITCH Platform",
      category: "fullstack",
      tech: ["Spring Boot 3.x", "Spring Cloud", "React", "Resilience4J", "JWT"],
      desc: "A distributed microservices-based POS Switch & Merchant Acquiring system managing full life-cycles from merchant onboarding to settlement.",
      bullets: [
        "Architected and separated functionalities across 12 spring microservices and 27 JPA entities.",
        "Implemented secure state-management switches for onboarding, routing, reconciliation, and settlement.",
        "Designed JWT-based role authorization protocols, circuit breakers via Resilience4J, and PAN masking.",
        "Exposed spring actuators and custom Swagger endpoints to monitor switch reliability."
      ],
      github: "https://github.com/kailashkiradu"
    },
    {
      id: "server-observability",
      title: "Server Observability Setup",
      category: "devops",
      tech: ["Node.js", "Express", "Prometheus", "Loki", "Grafana", "Docker"],
      desc: "An end-to-end containerized monitoring suite tracking Express application metrics, performance counters, and Winston logger streams.",
      bullets: [
        "Configured custom Winston transports directing server logs directly to Grafana Loki containers.",
        "Exposed performance metric counters on Node.js utilizing prom-client packages.",
        "Designed Prometheus scraping rules to pull and store metrics at periodic intervals.",
        "Assembled beautiful unified Grafana dashboards visualizing log errors and memory footprints."
      ],
      github: "https://github.com/kailashkiradu/server-monitoring-with-prometheus-loki"
    },
    {
      id: "uyirpathai",
      title: "Uyirpathai (Path of Life)",
      category: "mobile",
      tech: ["React Native", "TypeScript", "Expo Router", "Expo Go"],
      desc: "A universal emergency assistance mobile app designed with file-based routing and offline-first data capabilities.",
      bullets: [
        "Implemented navigation routing paths utilizing clean React Native UI elements.",
        "Organized project workspace supporting Android, iOS, and Web deployment builds.",
        "Configured TypeScript schemas to prevent type failures and handle device locations.",
        "Leverages Expo routing capabilities for seamless app navigations."
      ],
      github: "https://github.com/kailashkiradu/uyirpathai"
    },
    {
      id: "itc-monitoring",
      title: "Real-time Operations Logging",
      category: "fullstack",
      tech: ["SQL Server", "Grafana", "Alerting", "Database Triggers"],
      desc: "An end-to-end industrial log monitoring solution integrated directly with production SQL Server databases.",
      bullets: [
        "Enabled simultaneously monitored operations logs across 5+ live production servers.",
        "Constructed plant-specific filters to isolate operational anomalies dynamically.",
        "Configured customized role-based dashboards restricting sensitive operational data.",
        "Developed automated alerting triggers for immediate response to critical server events."
      ],
      github: "https://github.com/kailashkiradu"
    }
  ];

  const projectsGrid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('project-search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let activeCategory = "*";
  let searchPhrase = "";

  function renderProjects() {
    if (!projectsGrid) return;
    
    // Filter matching data
    const filtered = projectsData.filter(proj => {
      const categoryMatch = activeCategory === "*" || proj.category === activeCategory;
      const textMatch = proj.title.toLowerCase().includes(searchPhrase) || 
                        proj.desc.toLowerCase().includes(searchPhrase) ||
                        proj.tech.some(t => t.toLowerCase().includes(searchPhrase));
      return categoryMatch && textMatch;
    });

    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
          <p>No projects found matching your search.</p>
        </div>`;
      return;
    }

    projectsGrid.innerHTML = filtered.map(proj => `
      <div class="project-card reveal active">
        <div class="project-header">
          <div class="project-folder">
            <svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
          </div>
          <div class="project-links">
            <a href="${proj.github}" target="_blank" aria-label="GitHub Repository">
              <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>
          </div>
        </div>
        <div class="project-body">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.desc}</p>
          <div class="project-tech">
            ${proj.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>
        </div>
        <div class="project-footer">
          <button class="btn-details" data-id="${proj.id}">
            View Project Details
            <svg viewBox="0 0 24 24"><path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21 12l-8.15-8.15-1.42 1.42L16.86 11H5v2z"/></svg>
          </button>
        </div>
      </div>`).join('');

    // Attach details click handlers
    document.querySelectorAll('.btn-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pId = e.currentTarget.getAttribute('data-id');
        openModal(pId);
      });
    });
  }

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchPhrase = e.target.value.toLowerCase().trim();
      renderProjects();
    });
  }

  // Filter button handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeCategory = e.currentTarget.getAttribute('data-filter');
      renderProjects();
    });
  });

  // Render projects initially
  renderProjects();

  // ─────────────────────────────────────────
  // 7. PROJECT MODAL POPUP DIALOGS
  // ─────────────────────────────────────────
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalTechContainer = document.getElementById('modal-tech');
  const modalDescText = document.getElementById('modal-desc-text');
  const modalBulletsContainer = document.getElementById('modal-bullets');
  const modalGitBtn = document.getElementById('modal-git-btn');

  function openModal(projectId) {
    const proj = projectsData.find(p => p.id === projectId);
    if (!proj || !modalOverlay) return;

    modalTag.textContent = proj.category.replace('-', ' ');
    modalTitle.textContent = proj.title;
    
    // Tech pills
    modalTechContainer.innerHTML = proj.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');
    
    // Description
    modalDescText.textContent = proj.desc;
    
    // Bullet points
    modalBulletsContainer.innerHTML = proj.bullets.map(bullet => `<li>${bullet}</li>`).join('');
    
    // GitHub link
    modalGitBtn.setAttribute('href', proj.github);

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Resume scrolling
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // ─────────────────────────────────────────
  // 8. EMAILJS CONTACT FORM INTEGRATION
  // ─────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple visual loader
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `Sending...`;
      submitBtn.disabled = true;

      // Extract form values
      const templateParams = {
        from_name: contactForm.elements['name'].value,
        reply_to: contactForm.elements['email'].value,
        phone_number: contactForm.elements['phone'].value,
        message: contactForm.elements['message'].value
      };

      // EmailJS standard call. Initializes with user's service and templates.
      emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
      
      emailjs.send('contact_service', 'template_contact', templateParams)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert("Message sent successfully! I will reach out to you shortly.");
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, (error) => {
          console.log('FAILED...', error);
          alert("Message delivery failed. Please email directly at kailashkiradu@gmail.com.");
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});
