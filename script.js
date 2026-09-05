/* ==========================================================================
   Shaik Salma Samreen - Interactive Portfolio Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('samreen-portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('samreen-portfolio-theme', newTheme);
  });

  // --------------------------------------------------------------------------
  // 2. Typewriter Effect
  // --------------------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'Computer Science Engineer',
    'Full-Stack MERN Developer',
    'Machine Learning Enthusiast',
    'Certified Problem Solver & Leader'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const delayBetweenRoles = 1800;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetweenRoles);
        return;
      }
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
  }

  if (typewriterElement) {
    typeEffect();
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Menu
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Active Navigation State On Scroll
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 50;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // --------------------------------------------------------------------------
  // 5. Project Filtering
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. Project Modal Details
  // --------------------------------------------------------------------------
  const projectData = {
    'job-connect': {
      title: 'Job Connect Hub',
      badge: 'Full-Stack MERN Application',
      badgeClass: 'mern-badge',
      subtitle: 'End-to-End Talent Acquisition & Job Placement Portal',
      description: 'Job Connect Hub is an intuitive, enterprise-ready web platform developed with the MERN stack (MongoDB, Express.js, React.js, Node.js). It bridges the communication divide between ambitious candidates and modern recruiting teams, streamlining recruitment workflows from listing to onboarding.',
      challenges: [
        'Role-Based Authorization: Designed dedicated interfaces and distinct permission tiers for Job Seekers vs. Company Recruiters.',
        'Real-Time Application Status: Integrated dynamic status trackers (Under Review, Shortlisted, Interview Scheduled, Offer Extended).',
        'Advanced Query Filtering: Built multi-criteria search for job roles, experience requirements, salary expectations, and locations.',
        'Database Optimization: Structured MongoDB schema indexing to efficiently query postings, applicant profiles, and resumes.'
      ],
      stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'JWT Authentication', 'HTML5/CSS3', 'Git'],
      outcomes: 'Delivered an intuitive single-page application with responsive UI, secure credential hashing with bcrypt, stateless JWT token validation, and instant candidate filtering.'
    },
    'yoga-pose': {
      title: 'Ensemble-Aided Yoga Pose Classification',
      badge: 'Machine Learning & Computer Vision',
      badgeClass: 'ml-badge',
      subtitle: 'Stacking-Based Human Posture Recognition & Wellness System',
      description: 'A cutting-edge machine learning system that harnesses an ensemble stacking architecture to recognize and classify complex human body postures and yoga asanas with high fidelity.',
      challenges: [
        'Postural Variability: Addressed challenges in camera angles, occlusion, varied body proportions, and background distractions.',
        'Ensemble Stacking Architecture: Combined heterogeneous base classifiers (Random Forest, Support Vector Machines, Gradient Boosting) into a meta-learner classifier.',
        'Feature Representation: Extracted geometric angles, skeletal landmark vectors, and joint distance ratios to ensure invariance to spatial shifts.',
        'Generalization: Minimized overfitting and variance through K-Fold stratified cross-validation.'
      ],
      stack: ['Python', 'Scikit-Learn', 'Ensemble Stacking', 'Computer Vision', 'Posture Estimation', 'NumPy & Pandas', 'Matplotlib'],
      outcomes: 'Achieved superior classification accuracy and noise tolerance compared to individual standalone models, creating an intelligent foundation for digital fitness tracking and physical therapy posture feedback.'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <span class="modal-header-badge ${data.badgeClass}">${data.badge}</span>
      <h2 class="modal-title" id="modal-title">${data.title}</h2>
      <p class="modal-subtitle">${data.subtitle}</p>

      <h3 class="modal-section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <span>Project Overview</span>
      </h3>
      <p class="modal-desc">${data.description}</p>

      <h3 class="modal-section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
        <span>Architectural Highlights & Engineering Solutions</span>
      </h3>
      <div class="modal-list">
        ${data.challenges.map(item => `
          <div class="modal-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${item}</span>
          </div>
        `).join('')}
      </div>

      <h3 class="modal-section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span>Key Impact & Takeaway</span>
      </h3>
      <p class="modal-desc">${data.outcomes}</p>

      <h3 class="modal-section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        <span>Technology Stack</span>
      </h3>
      <div class="modal-tags">
        ${data.stack.map(s => `<span class="tech-tag">${s}</span>`).join('')}
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind modal triggers
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-modal');
      openModal(projectId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 7. Toast Notification & Copy to Clipboard
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        // Fallback
        showToast(`Copied to clipboard!`);
      });
    });
  });

  // --------------------------------------------------------------------------
  // 8. Contact Form Handling
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      const mailtoUrl = `mailto:salmasamreen1910@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Hi Salma,\n\nMy name is ${name} (${email}).\n\n${message}`
      )}`;

      window.location.href = mailtoUrl;
      showToast('Opening your email client to send message...');
      contactForm.reset();
    });
  }
});
