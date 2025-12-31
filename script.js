// Main Application
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    console.log('Portfolio App Initializing...');
    
    // Initialize all components
    this.initLoading();
    this.initNavigation();
    this.initHeroCanvas();
    this.initProfileCard();
    this.initProgressBars();
    this.initProjects();
    this.initCounters();
    this.initContactForm();
    this.initBackToTop();
    this.initRevealAnimations();
    this.initScrollEffects();
    this.initModal();
    this.initTheme();
    
    // Show content after initialization
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 500);
  }

  // Loading Screen
  initLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
          loading.style.display = 'none';
        }, 500);
      }, 1000);
    }
  }

  // Navigation
  initNavigation() {
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    
    if (burger && navLinks) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
      });
      
      // Close mobile menu when clicking links
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          burger.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
    
    // Navbar scroll effect
    if (nav) {
      let lastScroll = 0;
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
          nav.classList.add('scrolled');
          if (currentScroll > lastScroll && currentScroll > 200) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
          } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
          }
        } else {
          nav.classList.remove('scrolled');
          nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
      });
    }
  }

  // Hero Canvas Background
  initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 60;
    
    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    
    // Particle class
    class Particle {
      constructor() {
        this.reset();
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(99, 102, 241, ${Math.random() * 0.2 + 0.1})`;
        this.originalColor = this.color;
        this.targetSize = this.size;
      }
      
      update(mouse) {
        // Move particle
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse interaction
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            this.speedX -= dx * force * 0.001;
            this.speedY -= dy * force * 0.001;
            this.color = `rgba(245, 158, 11, ${0.3 * force})`; // Change to accent color
            this.targetSize = this.size * (1 + force);
          } else {
            this.color = this.originalColor;
            this.targetSize = this.size;
          }
        }
        
        // Bounce off edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
        
        // Smooth size transition
        this.size += (this.targetSize - this.size) * 0.1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    function createParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    // Connect particles with lines
    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Mouse position
    const mouse = { x: null, y: null };
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(mouse);
        particle.draw();
      });
      
      connectParticles();
      requestAnimationFrame(animate);
    }
    
    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    animate();
  }

  // 3D Profile Card
  initProfileCard() {
    const profileContainer = document.getElementById('profile-container');
    const flipBtn = document.getElementById('flip-btn');
    
    if (profileContainer && flipBtn) {
      let isFlipped = false;
      
      flipBtn.addEventListener('click', () => {
        isFlipped = !isFlipped;
        profileContainer.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        flipBtn.innerHTML = isFlipped ? 
          '<i class="fas fa-undo"></i>' : 
          '<i class="fas fa-sync-alt"></i>';
      });
      
      // Auto-rotate on hover
      profileContainer.addEventListener('mouseenter', () => {
        if (!isFlipped) {
          profileContainer.style.transform = 'rotateY(10deg) rotateX(5deg)';
        }
      });
      
      profileContainer.addEventListener('mouseleave', () => {
        if (!isFlipped) {
          profileContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
      });
    }
  }

  // Animated Progress Bars
  initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute('data-width') || progressBar.style.getPropertyValue('--width');
          progressBar.style.width = width;
          observer.unobserve(progressBar);
        }
      });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
  }

  // Projects Management
  initProjects() {
    const projects = [
      {
        id: 1,
        title: "AI Movie Recommender",
        description: "A .NET-based AI movie recommendation system using collaborative filtering on Microsoft Studio.",
        icon: "🤖",
        tags: [".NET", "AI", "C#", "Python", "TensorFlow"],
        longDescription: `
          <div class="modal-project">
            <div class="modal-header">
              <h2>AI Movie Recommender</h2>
              <div class="modal-tags">
                <span>.NET</span>
                <span>OpenAI API</span>
                <span>YOTUBE API</span>
                <span>TMDB API</span>
                <span>C#</span>
                <span>Python</span>
                <span>TensorFlow</span>
              </div>
            </div>
            
            <div class="modal-content">
              <div class="project-image-placeholder" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <span style="font-size: 4rem;">🤖</span>
              </div>
              
              <h3>Project Overview</h3>
              <p>A sophisticated recommendation engine built with .NET and Python that analyzes user preferences and viewing history to provide personalized movie suggestions.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Collaborative filtering algorithm</li>
                <li>Real-time recommendations</li>
                <li>User rating system</li>
                <li>Movie database integration</li>
                <li>Personalized watchlists</li>
              </ul>
              
              <h3>Technologies Used</h3>
              <div class="tech-stack">
                <span>.NET Core</span>
                <span>C#</span>
                <span>Python</span>
                <span>TensorFlow</span>
                <span>PostgreSQL</span>
                <span>React.js</span>
              </div>
              
              <h3>Achievements</h3>
              <p>Won 3rd place in poster presentation competition at spark Tank 1.0 organized by cluster (club of CSE discipline).</p>
              
              <div class="modal-actions">
                <a href="#" class="btn primary">View Live Demo</a>
                <a href="https://github.com/Mukeshkumarmandal/AI-movie-recommender-app" class="btn ghost">GitHub Repository</a>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 2,
        title: "Mobile Showroom Management System ",
        description: "Complete databaes management system project of 4th sem .",
        icon: "📱",
        tags: ["HTML", "CSS", "JAVASCRIPT", "PHP","sql"],
        longDescription: `
          <div class="modal-project">
            <div class="modal-header">
              <h2>Mobile Showroom Management System</h2>
              <div class="modal-tags">
                <span>HTML/span>
                <span>CSS</span>
                <span>JAVASCRIPT</span>
                <span>PHP</span>
                <span>sql</span>
              </div>
            </div>
            
            <div class="modal-content">
              <div class="project-image-placeholder" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <span style="font-size: 4rem;">📱</span>
              </div>
              
              <h3>Project Overview</h3>
              <p>A complete databse web app for mobile showroom operations including inventory, sales, customers, and employee management.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Inventory management with stock tracking</li>
                <li>Sales and invoice generation</li>
                <li>Customer relationship management</li>
                <li>Employee management system</li>
                <li>Reporting and analytics dashboard</li>
                <li>Barcode scanning integration</li>
              </ul>
              
              <h3>Technologies Used</h3>
              <div class="tech-stack">
                <span>Java</span>
                <span>Java Swing</span>
                <span>MySQL</span>
                <span>JDBC</span>
                <span>iTextPDF</span>
              </div>
              
              <h3>Functionalities</h3>
              <p>The system handles complete showroom operations from product entry to final sales with automated billing and reporting.</p>
              
              <div class="modal-actions">
                <a href="#" class="btn primary">View Source Code</a>
                <a href="#" class="btn ghost">Documentation</a>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 3,
        title: "Portfolio Website",
        description: "Responsive personal portfolio with interactive animations and modern design.",
        icon: "🌐",
        tags: ["HTML", "CSS", "JavaScript", "Responsive"],
        longDescription: `
          <div class="modal-project">
            <div class="modal-header">
              <h2>Personal Portfolio Website</h2>
              <div class="modal-tags">
                <span>HTML5</span>
                <span>CSS3</span>
                <span>JavaScript</span>
                <span>Responsive</span>
              </div>
            </div>
            
            <div class="modal-content">
              <div class="project-image-placeholder" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                <span style="font-size: 4rem;">🌐</span>
              </div>
              
              <h3>Project Overview</h3>
              <p>A fully responsive and interactive portfolio website showcasing projects, skills, and experience with modern animations and design.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Fully responsive design (mobile-first)</li>
                <li>Smooth scroll animations and transitions</li>
                <li>Interactive project showcase with modals</li>
                <li>Contact form with validation</li>
                <li>Dark/light theme ready</li>
                <li>Accessible design (WCAG guidelines)</li>
                <li>Performance optimized</li>
              </ul>
              
              <h3>Technologies Used</h3>
              <div class="tech-stack">
                <span>HTML5</span>
                <span>CSS3</span>
                <span>JavaScript (ES6+)</span>
                <span>Canvas API</span>
                <span>Intersection Observer API</span>
              </div>
              
              <h3>Design Highlights</h3>
              <p>Features an animated 3D profile card, particle background, scroll reveal animations, smooth navigation, and modern UI/UX principles.</p>
              
              <div class="modal-actions">
                <a href="#" class="btn primary">View Live</a>
                <a href="#" class="btn ghost">Source Code</a>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 4,
        title: "Robotics Control System",
        description: "Control system for robotics competition with sensor integration.",
        icon: "⚙️",
        tags: ["C++", "Arduino", "Robotics", "Sensors"],
        longDescription: `
          <div class="modal-project">
            <div class="modal-header">
              <h2>Robotics Control System</h2>
              <div class="modal-tags">
                <span>C++</span>
                <span>Arduino</span>
                <span>Robotics</span>
                <span>Sensors</span>
              </div>
            </div>
            
            <div class="modal-content">
              <div class="project-image-placeholder" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                <span style="font-size: 4rem;">⚙️</span>
              </div>
              
              <h3>Project Overview</h3>
              <p>A comprehensive control system developed for university robotics competition featuring autonomous navigation and sensor integration.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Real-time sensor data processing</li>
                <li>Autonomous navigation algorithms</li>
                <li>Obstacle avoidance system</li>
                <li>Wireless control interface</li>
                <li>Battery monitoring system</li>
                <li>Path optimization</li>
              </ul>
              
              <h3>Technologies Used</h3>
              <div class="tech-stack">
                <span>C++</span>
                <span>Arduino</span>
                <span>Python</span>
                <span>ROS</span>
                <span>OpenCV</span>
                <span>Ultrasonic Sensors</span>
              </div>
              
              <h3>Competition Details</h3>
              <p>Participated in AIUB Robotics Competition 2023 with this system, achieving top 10 placement among 50+ teams.</p>
              
              <div class="modal-actions">
                <a href="#" class="btn ghost">View Documentation</a>
              </div>
            </div>
          </div>
        `
      }
    ];

    const projectGrid = document.getElementById('projects-grid');
    if (!projectGrid) return;

    // Render projects
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card reveal';
      projectCard.dataset.id = project.id;

      const imageColors = {
        1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
      };

      projectCard.innerHTML = `
        <div class="project-image" style="background: ${imageColors[project.id] || imageColors[3]}">
          <span style="font-size: 4rem;">${project.icon}</span>
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
        </div>
      `;

      projectCard.addEventListener('click', () => this.openProjectModal(project.id, projects));
      projectGrid.appendChild(projectCard);
    });
  }

  // Animated Counters
  initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;
          
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  }

  // Contact Form
  initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        this.showToast('Please fill in all fields.', 'error');
        return;
      }
      
      if (!this.isValidEmail(data.email)) {
        this.showToast('Please enter a valid email address.', 'error');
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        this.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Send notification (in real app, this would be an API call)
        console.log('Contact form submitted:', data);
      }, 1500);
    });
  }
  
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add styles
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--success)' : 
                   type === 'error' ? 'var(--danger)' : 
                   'var(--primary)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      z-index: 10000;
      box-shadow: var(--shadow);
      animation: slideIn 0.3s ease;
      max-width: 400px;
    `;
    
    // Add keyframes for animation
    if (!document.querySelector('#toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .toast-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .toast-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .toast-close:hover {
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
    
    document.body.appendChild(toast);
  }

  // Back to Top Button
  initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Reveal Animations
  initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  // Scroll Effects
  initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      
      if (hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
      }
    });
  }

  // Modal Management
  initModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalClose) return;
    
    modalClose.addEventListener('click', () => this.closeModal());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closeModal();
      }
    });
    
    // Store modal elements in class properties
    this.modal = modal;
    this.modalContent = modalContent;
  }
  
  openProjectModal(projectId, projects) {
    const project = projects.find(p => p.id === projectId);
    if (!project || !this.modalContent) return;
    
    this.modalContent.innerHTML = project.longDescription;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add modal-specific styles
    if (!document.querySelector('#modal-styles')) {
      const style = document.createElement('style');
      style.id = 'modal-styles';
      style.textContent = `
        .modal-project .modal-header {
          margin-bottom: 2rem;
        }
        .modal-project .modal-header h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--text);
        }
        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .modal-tags span {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .project-image-placeholder {
          height: 200px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          color: white;
        }
        .modal-content h3 {
          color: var(--text);
          margin: 1.5rem 0 1rem;
          font-size: 1.5rem;
        }
        .modal-content p {
          color: var(--text-muted);
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .modal-content ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 1.5rem;
        }
        .modal-content li {
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;
          color: var(--text-muted);
        }
        .modal-content li::before {
          content: '▸';
          color: var(--primary);
          position: absolute;
          left: 0;
        }
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }
        .tech-stack span {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          font-size: 0.875rem;
          font-weight: 600;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .modal-actions .btn {
          flex: 1;
          min-width: 150px;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add event listeners to modal buttons
    setTimeout(() => {
      const modalButtons = this.modalContent.querySelectorAll('.btn');
      modalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showToast(`Opening ${button.textContent} for ${project.title}`, 'info');
        });
      });
    }, 100);
  }
  
  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Theme Management (for future dark/light theme toggle)
  initTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = savedTheme;
    
    // You can add a theme toggle button in the future
    // const themeToggle = document.createElement('button');
    // themeToggle.className = 'theme-toggle';
    // themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    // document.body.appendChild(themeToggle);
    
    // themeToggle.addEventListener('click', () => {
    //   const isDark = document.body.classList.contains('dark');
    //   document.body.className = isDark ? 'light' : 'dark';
    //   localStorage.setItem('theme', isDark ? 'light' : 'dark');
    //   themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    // });
  }
}

// Initialize the application
const app = new PortfolioApp();

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}