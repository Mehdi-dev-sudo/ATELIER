// ATELIER - Enhanced Portfolio System

// ====================
// DATA MANAGEMENT
// ====================

const portfolioData = {
  projects: [
    {
      id: 1,
      title: 'Luxury Brand Identity',
      category: 'branding',
      description:
        'Complete brand redesign for a premium fashion house, including logo, typography, color palette, and brand guidelines.',
      client: 'Fashion House Co.',
      year: '2024',
      services: 'Branding, Strategy, Print',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
      tags: ['Branding', 'Luxury', 'Fashion'],
      featured: true,
    },
    {
      id: 2,
      title: 'Editorial Design',
      category: 'editorial',
      description:
        'Art direction and layout design for a contemporary art and culture magazine.',
      client: 'Culture Magazine',
      year: '2024',
      services: 'Editorial, Typography, Print',
      image:
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      tags: ['Editorial', 'Print', 'Typography'],
    },
    {
      id: 3,
      title: 'Digital Art Installation',
      category: 'digital',
      description:
        'Interactive digital experience for a modern art gallery exhibition.',
      client: 'Modern Gallery',
      year: '2023',
      services: 'Digital Art, UX/UI, Development',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
      tags: ['Digital', 'Interactive', 'Art'],
    },
    {
      id: 4,
      title: 'Architectural Portfolio',
      category: 'web',
      description:
        'Clean, minimal website showcase for a renowned architectural firm.',
      client: 'Architecture Studio',
      year: '2023',
      services: 'Web Design, Development, Photography',
      image:
        'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800',
      tags: ['Web Design', 'Architecture', 'Minimal'],
    },
    {
      id: 5,
      title: 'Restaurant Branding',
      category: 'branding',
      description:
        'Complete brand identity for an upscale dining establishment.',
      client: 'Fine Dining Restaurant',
      year: '2023',
      services: 'Branding, Packaging, Interior',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      tags: ['Branding', 'Restaurant', 'Packaging'],
    },
    {
      id: 6,
      title: 'Tech Startup Website',
      category: 'web',
      description: 'Modern web platform for an innovative technology company.',
      client: 'Tech Innovations Inc.',
      year: '2023',
      services: 'Web Design, UX/UI, Development',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      tags: ['Web', 'Tech', 'UX/UI'],
    },
  ],

  journal: [
    {
      id: 1,
      title: 'The Art of Negative Space',
      date: 'December 2024',
      excerpt:
        'Exploring how emptiness can be more powerful than content, and why less truly is more in contemporary design.',
      content: 'Full article content would go here...',
      featured: true,
    },
    {
      id: 2,
      title: 'Typography as Voice',
      date: 'November 2024',
      excerpt:
        'How choosing the right typeface can completely transform the personality of your brand.',
      content: 'Full article content...',
    },
    {
      id: 3,
      title: 'Minimalism vs. Simplicity',
      date: 'October 2024',
      excerpt:
        'Understanding the subtle but important difference between these two design philosophies.',
      content: 'Full article content...',
    },
  ],
};

// ====================
// MAIN APPLICATION
// ====================

class AtelierPortfolio {
  constructor() {
    this.currentFilter = 'all';
    this.projectsPerPage = 6;
    this.currentPage = 1;
    this.init();
  }

  init() {
    this.initLoadingScreen();
    this.initCursor();
    this.initThemeToggle();
    this.initMobileMenu();
    this.initScrollEffects();
    this.initSmoothScrolling();
    this.initAnimations();
    this.initBackToTop();
    this.loadProjects();
    this.loadJournal();
    this.initWorkFilters();
    this.initProjectModal();
    this.initContactForm();
    this.initStatsCounter();
  }

  // Loading Screen
  initLoadingScreen() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
      }, 1000);
    });
  }

  // Custom Cursor
  initCursor() {
    if (window.innerWidth <= 768) return;

    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    let mouseX = 0,
      mouseY = 0;
    let followerX = 0,
      followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const animateFollower = () => {
      const distX = mouseX - followerX;
      const distY = mouseY - followerY;
      followerX += distX * 0.1;
      followerY += distY * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    document.querySelectorAll('a, button, .work-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // Theme Toggle
  initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const newTheme = theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Mobile Menu
  initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      document.body.style.overflow = menuOverlay.classList.contains('active')
        ? 'hidden'
        : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll Effects
  initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      }

      if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });
  }

  // Smooth Scrolling
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      });
    });
  }

  // Animations
  initAnimations() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document
      .querySelectorAll('.work-item, .journal-item, .stat-item')
      .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
      });
  }

  // Back to Top
  initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Load Projects
  loadProjects() {
    const grid = document.getElementById('worksGrid');
    const filteredProjects =
      this.currentFilter === 'all'
        ? portfolioData.projects
        : portfolioData.projects.filter(p => p.category === this.currentFilter);

    const projectsToShow = filteredProjects.slice(
      0,
      this.currentPage * this.projectsPerPage
    );

    grid.innerHTML = projectsToShow
      .map(
        (project, index) => `
      <article class="work-item ${
        index === 0 ? 'large' : ''
      }" data-project-id="${project.id}">
        <div class="work-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </div>
        <div class="work-info">
          <h3 class="work-title">${project.title}</h3>
          <p class="work-description">${project.description}</p>
          <span class="work-year">${project.year}</span>
        </div>
      </article>
    `
      )
      .join('');

    // Add click events
    document.querySelectorAll('.work-item').forEach(item => {
      item.addEventListener('click', () => {
        const projectId = parseInt(item.dataset.projectId);
        this.openProjectModal(projectId);
      });
    });

    // Show/hide load more button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (projectsToShow.length >= filteredProjects.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
      loadMoreBtn.onclick = () => {
        this.currentPage++;
        this.loadProjects();
      };
    }
  }

  // Work Filters
  initWorkFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document
          .querySelectorAll('.filter-btn')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.currentFilter = btn.dataset.filter;
        this.currentPage = 1;
        this.loadProjects();
      });
    });
  }

  // Project Modal
  initProjectModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    [closeBtn, overlay].forEach(el => {
      el.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  openProjectModal(projectId) {
    const project = portfolioData.projects.find(p => p.id === projectId);
    const modal = document.getElementById('projectModal');

    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalCategory').textContent =
      project.category.toUpperCase();
    document.getElementById('modalDescription').textContent =
      project.description;
    document.getElementById('modalClient').textContent = project.client;
    document.getElementById('modalYear').textContent = project.year;
    document.getElementById('modalServices').textContent = project.services;

    const tagsHTML = project.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');
    document.getElementById('modalTags').innerHTML = tagsHTML;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Load Journal
  loadJournal() {
    const grid = document.getElementById('journalGrid');

    grid.innerHTML = portfolioData.journal
      .map(
        post => `
      <article class="journal-item ${post.featured ? 'featured' : ''}">
        <div class="journal-date">${post.date}</div>
        <h3 class="journal-title">${post.title}</h3>
        <p class="journal-excerpt">${post.excerpt}</p>
        <a href="#" class="read-more">Read ${
          post.featured ? 'Full Article' : 'More'
        }</a>
      </article>
    `
      )
      .join('');
  }

  // Contact Form
  initContactForm() {
    const form = document.getElementById('contactForm');
    const message = document.getElementById('formMessage');

    form.addEventListener('submit', async e => {
      e.preventDefault();

      const submitBtn = form.querySelector('.submit-btn');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      message.textContent =
        'Thank you! Your message has been sent successfully.';
      message.className = 'form-message success show';

      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      form.reset();

      setTimeout(() => {
        message.classList.remove('show');
      }, 5000);
    });
  }

  // Stats Counter Animation
  initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            this.animateCounter(entry.target, target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach(stat => observer.observe(stat));
  }

  animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AtelierPortfolio();
});

// Service Worker for PWA capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed
    });
  });
}
