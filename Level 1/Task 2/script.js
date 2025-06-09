// Professional Portfolio JavaScript
// ==================== THEME TOGGLE FUNCTIONALITY ====================

class ThemeToggle {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.theme);
    
    // Create toggle button
    this.createToggleButton();
    
    // Add event listeners
    this.bindEvents();
  }

  createToggleButton() {
    // Check if button already exists
    if (document.querySelector('.theme-toggle')) return;

    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle theme');
    toggleButton.innerHTML = `
      <i class="fas fa-sun theme-toggle-icon sun"></i>
      <i class="fas fa-moon theme-toggle-icon moon"></i>
    `;

    // Add to body
    document.body.appendChild(toggleButton);
    
    this.toggleButton = toggleButton;
  }

  bindEvents() {
    this.toggleButton.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Keyboard accessibility
    this.toggleButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(this.theme);
    
    // Add pulse animation to button
    this.toggleButton.style.transform = 'translateY(-50%) scale(0.9)';
    setTimeout(() => {
      this.toggleButton.style.transform = 'translateY(-50%) scale(1.1)';
    }, 100);
    setTimeout(() => {
      this.toggleButton.style.transform = 'translateY(-50%) scale(1)';
    }, 200);
  }

  setTheme(theme) {
    // Update document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
    
    // Trigger custom event for other components
    document.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
  }

  updateMetaThemeColor(theme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', 
        theme === 'dark' ? '#1a202c' : '#ffffff'
      );
    }
  }

  // Public method to get current theme
  getCurrentTheme() {
    return this.theme;
  }
}

// ==================== ENHANCED ANIMATIONS FOR THEME SWITCH ====================

function addThemeTransitions() {
  // Add special transition effects during theme switch
  document.addEventListener('themeChanged', (e) => {
    const { theme } = e.detail;
    
    // Add ripple effect
    createThemeRipple(theme);
    
    // Animate elements with stagger effect
    animateElementsOnThemeSwitch();
  });
}

function createThemeRipple(theme) {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: fixed;
    top: 50%;
    right: 50px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${theme === 'dark' ? 
      'radial-gradient(circle, #4299e1 0%, transparent 70%)' : 
      'radial-gradient(circle, #f6e05e 0%, transparent 70%)'};
    transform: translate(50%, -50%) scale(0);
    pointer-events: none;
    z-index: 9999;
    animation: themeRipple 0.8s ease-out forwards;
  `;

  document.body.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 800);
}

// Add CSS for ripple animation
const rippleCSS = `
  @keyframes themeRipple {
    0% {
      transform: translate(50%, -50%) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(50%, -50%) scale(100);
      opacity: 0;
    }
  }
`;

function animateElementsOnThemeSwitch() {
  const elements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .timeline-content');
  
  elements.forEach((el, index) => {
    el.style.transform = 'translateY(10px)';
    el.style.opacity = '0.7';
    
    setTimeout(() => {
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    }, index * 50);
  });
}

// ==================== INITIALIZE ON DOM LOAD ====================

document.addEventListener('DOMContentLoaded', () => {
  // Add ripple CSS to head
  const style = document.createElement('style');
  style.textContent = rippleCSS;
  document.head.appendChild(style);
  
  // Initialize theme toggle
  window.themeToggle = new ThemeToggle();
  
  // Add enhanced animations
  addThemeTransitions();
  
  // Optional: Auto-detect system theme preference
  if (!localStorage.getItem('theme')) {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    window.themeToggle.setTheme(systemTheme);
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      window.themeToggle.setTheme(e.matches ? 'dark' : 'light');
    }
  });
});

// ==================== UTILITY FUNCTIONS ====================

// Function to manually set theme (for external use)
function setTheme(theme) {
  if (window.themeToggle) {
    window.themeToggle.setTheme(theme);
  }
}

// Function to get current theme (for external use)
function getCurrentTheme() {
  return window.themeToggle ? window.themeToggle.getCurrentTheme() : 'light';
}
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
    initBackToTop();
    initTypewriter();
    initScrollSpy();
    initParallax();
    initCertificateModal();
    initSkillCardAnimations();
    initLoadingAnimation();
    initProjectImageHandling();
    initContactInfo();
    initWorkExperienceCertificates();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effects
function initScrollEffects() {
    const header = document.getElementById('header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    let ticking = false;
    
    function updateScrollElements() {
        const scrolled = window.scrollY;
        
        // Header background change
        if (scrolled > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide scroll indicator after scrolling
        if (scrollIndicator) {
            if (scrolled > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    });
}

// Animation on scroll (AOS-like functionality)
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Add staggered animation delays for grid items
    const skillCards = document.querySelectorAll('.skill-card');
    const certCards = document.querySelectorAll('.cert-card');
    const projectCards = document.querySelectorAll('.project-card');
    const contactItems = document.querySelectorAll('.contact-item');
    
    [skillCards, certCards, projectCards, contactItems].forEach(cardGroup => {
        cardGroup.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Typewriter effect for hero title
function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(function() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                // Add cursor blink effect
                heroTitle.innerHTML += '<span class="cursor">|</span>';
                
                // Remove cursor after animation
                setTimeout(() => {
                    const cursor = heroTitle.querySelector('.cursor');
                    if (cursor) cursor.remove();
                }, 3000);
            }
        }, 100);
    }
}

// Active navigation link highlighting
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        });
    }
}

// Certificate image modal functionality
// function initCertificateModal() {
//     const certImages = document.querySelectorAll('.cert-image img');
//     const viewCertBtns = document.querySelectorAll('.view-cert-btn');
    
//     // Handle certificate images
//     certImages.forEach(img => {
//         img.addEventListener('click', function() {
//             createImageModal(this.src, this.alt);
//         });
//     });
    
//     // Handle view certificate buttons
//     viewCertBtns.forEach(btn => {
//         btn.addEventListener('click', function(e) {
//             e.preventDefault();
//             const img = this.closest('.cert-card').querySelector('img');
//             if (img && img.src && !img.src.includes('placeholder')) {
//                 createImageModal(img.src, img.alt);
//             } else {
//                 // Handle placeholder certificates
//                 alert('Certificate will be available soon!');
//             }
//         });
//     });
// }

// function createImageModal(src, alt) {
//     const modal = document.createElement('div');
//     modal.className = 'image-modal';
//     modal.innerHTML = `
//         <div class="modal-overlay">
//             <div class="modal-content">
//                 <button class="modal-close">&times;</button>
//                 <img src="${src}" alt="${alt}" class="modal-image">
//             </div>
//         </div>
//     `;
    
//     document.body.appendChild(modal);
//     document.body.style.overflow = 'hidden';
    
//     // Close modal functionality
//     const closeBtn = modal.querySelector('.modal-close');
//     const overlay = modal.querySelector('.modal-overlay');
    
//     [closeBtn, overlay].forEach(element => {
//         element.addEventListener('click', function(e) {
//             if (e.target === this) {
//                 document.body.removeChild(modal);
//                 document.body.style.overflow = 'auto';
//             }
//         });
//     });
    
//     // Close with Escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && document.querySelector('.image-modal')) {
//             document.body.removeChild(modal);
//             document.body.style.overflow = 'auto';
//         }
//     });
// }
const certificateData = {
    infosys: [
        { title: "Beginning Java Data Structures and Algorithms", date: "February 2023", type: "pdf", file: "assets/infosys/Beginning Java Data Structures and Algorithms.pdf" },
        { title: "Cloud Computing", date: "February 2024", type: "pdf", file: "assets/infosys/Cloud Computing.pdf" },
        { title: "Cyber Security Foundation", date: "February 2023", type: "pdf", file: "assets/infosys/Cyber Security Foundation.pdf" },
        { title: "Data Science for Marketing Analytics", date: "February 2024", type: "pdf", file: "assets/infosys/Data Science for Marketing Analytics.pdf" },
        { title: "Fundamentals of Cryptography", date: "February 2023", type: "pdf", file: "assets/infosys/Fundamentals of Cryptography.pdf" },
        { title: "Fundamentals of Information Security", date: "February 2023", type: "pdf", file: "assets/infosys/Fundamentals of Information Security.pdf" },
        { title: "Identity and Access Management IAM", date: "February 2023", type: "pdf", file: "assets/infosys/Identity and Access Management IAM.pdf" },
        { title: "Internet of Things 101", date: "February 2024", type: "pdf", file: "assets/infosys/Internet of Things 101.pdf" },
        { title: "Internet of Things 201", date: "February 2024", type: "pdf", file: "assets/infosys/Internet of Things 101.pdf" },
        { title: "IoT Platforms Overview", date: "February 2024", type: "pdf", file: "assets/infosys/IoT Platforms Overview.pdf" },
        { title: "JavaScript by Example", date: "February 2023", type: "pdf", file: "assets/infosys/JavaScript by Example.pdf" },
        { title: "Learn To Build Apps Using NodeJS and Angular", date: "February 2023", type: "pdf", file: "assets/infosys/Learn To Build Apps Using NodeJS and Angular.pdf" },
        { title: "Learning Python", date: "February 2023", type: "pdf", file: "assets/infosys/Learning Python.pdf" },
        { title: "Machine Learning Beginner", date: "February 2024", type: "pdf", file: "assets/infosys/Machine Learning Beginner.pdf" },
        { title: "Next Gen Technologies", date: "February 2024", type: "pdf", file: "assets/infosys/Next Gen Technologies.pdf" },
        { title: "Pandas with Python Tutorial", date: "September 2023", type: "pdf", file: "assets/infosys/Pandas with Python Tutorial.pdf" },
        { title: "Projects In Java", date: "February 2023", type: "pdf", file: "assets/infosys/Projects In Java.pdf" },
        { title: "Python By Example", date: "February 2023", type: "pdf", file: "assets/infosys/Python By Example.pdf" },
        { title: "Python Data Structures and Algorithms", date: "February 2023", type: "pdf", file: "assets/infosys/Python Data Structures and Algorithms.pdf" },
        { title: "Python Fundamentals", date: "February 2023", type: "pdf", file: "assets/infosys/Python Fundamentals.pdf" },
        { title: "Threat Modeling", date: "February 2023", type: "pdf", file: "assets/infosys/Threat Modeling.pdf" }
        
        // Add your 23 certificates here
    ],
    nptel: [
        { title: "Big Data Computing", date: "2024", type: "pdf", file: "assets/NPTEL Swayam/Big Data Computing.pdf" },
        { title: "Cloud Computing", date: "2024", type: "pdf", file: "assets/NPTEL Swayam/Cloud Computing.pdf" },
        { title: "Compiler Design", date: "2024", type: "pdf", file: "assets/NPTEL Swayam/Compiler Design.pdf" },
        { title: "Computer Networks And Internet Protocol", date: " 2024", type: "pdf", file: "assets/NPTEL Swayam/Computer Networks And Internet Protocol.pdf" },
    ],
    coursera: [
        { title: "Web Development", date: "July 2024", type: "pdf", file: "assets/Coursera/Coursera_5UCWPAGGZCFA.pdf" },
        { title: "Data Science", date: "August 2024", type: "pdf", file: "assets/Coursera/Coursera_WNDN5MM8QH8D.pdf" },
    ],
    dataflair: [
        { title: " Introduction-to-Advanced-Java", date: " 2024", type: "pdf", file: "assets/Data-flair/Introduction-to-Advanced-Java.pdf" },
        { title: "Introduction-to-Machine-Learning", date: " 2024", type: "pdf", file: "assets/Data-flair/Introduction-to-Machine-Learning.pdf" },
        { title: "Introduction-to-Pandas", date: "2024", type: "pdf", file: "assets/Data-flair/Introduction-to-Pandas.pdf" },
        { title: "Introduction-to-Python", date: " 2024", type: "pdf", file: "assets/Data-flair/Introduction-to-Python.pdf" },
        { title: "Introduction-to-SQL", date: "2025", type: "pdf", file: "assets/Data-flair/Introduction-to-SQL.pdf" },
        { title: "Java", date: "2025", type: "pdf", file: "assets/Data-flair/Java.pdf" }
    ],
    // huawei: [
    //     { title: "Cloud Computing", date: "February 2025", type: "image", file: "assets/huawei-cloud.png" },
    //     { title: "Network Security", date: "March 2025", type: "image", file: "assets/huawei-security.png" },
    //     { title: "5G Technology", date: "April 2025", type: "image", file: "assets/huawei-5g.png" },
    // ]
};

// Initialize certificate modal system
function initCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const modalClose = document.querySelector('.cert-modal-close');
    const modalOverlay = document.querySelector('.cert-modal-overlay');
    const orgButtons = document.querySelectorAll('.view-org-certs');

    // Open modal for organization
    orgButtons.forEach(button => {
        button.addEventListener('click', function() {
            const org = this.getAttribute('data-org');
            openCertificateModal(org);
        });
    });

    // Close modal
    [modalClose, modalOverlay].forEach(element => {
        element.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCertificateModal();
            }
        });
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeCertificateModal();
        }
    });
}

function openCertificateModal(org) {
    const modal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalOrgName');
    const certificateGrid = document.getElementById('certificateGrid');
    
    // Set organization name
    modalTitle.textContent = `${org.charAt(0).toUpperCase() + org.slice(1)} Certificates`;
    
    // Clear previous certificates
    certificateGrid.innerHTML = '';
    
    // Load certificates for this organization
    if (certificateData[org]) {
        certificateData[org].forEach(cert => {
            const certElement = createCertificateElement(cert);
            certificateGrid.appendChild(certElement);
        });
    }
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function createCertificateElement(cert) {
    const certDiv = document.createElement('div');
    certDiv.className = 'certificate-item';
    
    certDiv.innerHTML = `
        <div class="cert-title">${cert.title}</div>
        <div class="cert-date">${cert.date}</div>
        <div class="cert-actions">
            <button class="cert-btn view" onclick="viewCertificate('${cert.file}', '${cert.type}')">
                <i class="fas fa-eye"></i>
                View
            </button>
            <button class="cert-btn download" onclick="downloadCertificate('${cert.file}', '${cert.title}')">
                <i class="fas fa-download"></i>
                Download
            </button>
        </div>
    `;
    
    return certDiv;
}

function viewCertificate(file, type) {
    if (type === 'image') {
        // Create image modal
        createImageModal(file, 'Certificate');
    } else if (type === 'pdf') {
        // Open PDF in new tab
        window.open(file, '_blank');
    }
}

function downloadCertificate(file, title) {
    const link = document.createElement('a');
    link.href = file;
    link.download = `${title}.${file.split('.').pop()}`;
    link.click();
}

function createImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay" style="background: rgba(0,0,0,0.9); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; z-index: 1001;">
            <div class="modal-content" style="position: relative; max-width: 90%; max-height: 90%;">
                <button class="modal-close" style="position: absolute; top: -40px; right: 0; background: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.5rem;">&times;</button>
                <img src="${src}" alt="${alt}" style="max-width: 100%; max-height: 90vh; border-radius: 10px; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    [closeBtn, overlay].forEach(element => {
        element.addEventListener('click', function(e) {
            if (e.target === this) {
                document.body.removeChild(modal);
            }
        });
    });
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCertificateModal();
});
// Skill cards animation on hover
function initSkillCardAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });
}

// Loading animation
function initLoadingAnimation() {
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // Trigger initial animations
        document.body.classList.add('loaded');
    });
}

// Handle project images
// function initProjectImageHandling() {
//     const projectCards = document.querySelectorAll('.project-card');
    
//     projectCards.forEach(card => {
//         const img = card.querySelector('img');
//         const overlay = card.querySelector('.project-overlay');
        
//         if (img) {
//             // Handle broken images
//             img.addEventListener('error', function() {
//                 this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE1MCAyMDBIMjUwVjIyNUgxNTBWMjAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
//                 this.alt = 'Project Image Placeholder';
//             });
            
//             // Add hover effect
//             card.addEventListener('mouseenter', function() {
//                 overlay.style.opacity = '1';
//                 img.style.transform = 'scale(1.05)';
//             });
            
//             card.addEventListener('mouseleave', function() {
//                 overlay.style.opacity = '0';
//                 img.style.transform = 'scale(1)';
//             });
//         }
//     });
// }
 class ProjectCarousel {
    constructor() {
        this.currentProject = 0;
        this.currentImages = [0, 0]; // Track current image for each project
        this.totalProjects = 2;
        this.imageCarousels = [];
        this.autoSlideInterval = null;
        this.imageSlideIntervals = []; // Store intervals for each project's images
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupImageCarousels();
        this.startAutoSlide();
    }

    setupEventListeners() {
        // Image dots
        document.querySelectorAll('.image-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const projectIndex = parseInt(e.target.dataset.project);
                const imageIndex = parseInt(e.target.dataset.image);
                this.goToImage(projectIndex, imageIndex);
            });
        });

        // Pause auto-slide on hover
        const carousel = document.querySelector('.projects-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
            carousel.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }

    setupImageCarousels() {
        document.querySelectorAll('.image-carousel').forEach((carousel, projectIndex) => {
            const images = carousel.querySelectorAll('.project-image');
            this.imageCarousels[projectIndex] = {
                element: carousel,
                totalImages: images.length,
                currentImage: 0
            };

            // Initialize the carousel position
            this.updateImageCarousel(projectIndex);
            this.updateImageDots(projectIndex);
             this.updateBackgroundImage(projectIndex);

            // Auto-slide images within each project - store the interval
            this.imageSlideIntervals[projectIndex] = setInterval(() => {
                this.nextImage(projectIndex);
            }, 4000);
        });
    }

    nextImage(projectIndex) {
        const carousel = this.imageCarousels[projectIndex];
        if (carousel) {
            carousel.currentImage = (carousel.currentImage + 1) % carousel.totalImages;
            this.updateImageCarousel(projectIndex);
            this.updateImageDots(projectIndex);
        }
    }

    goToImage(projectIndex, imageIndex) {
        const carousel = this.imageCarousels[projectIndex];
        if (carousel && imageIndex >= 0 && imageIndex < carousel.totalImages) {
            carousel.currentImage = imageIndex;
            this.updateImageCarousel(projectIndex);
            this.updateImageDots(projectIndex);
        }
    }

    updateImageCarousel(projectIndex) {
        const carousel = this.imageCarousels[projectIndex];
        if (carousel) {
            const translateX = -carousel.currentImage * 100;
            carousel.element.style.transform = `translateX(${translateX}%)`;
             this.updateBackgroundImage(projectIndex); // Add this line
        }
    }

    updateImageDots(projectIndex) {
        const carousel = this.imageCarousels[projectIndex];
        if (carousel) {
            document.querySelectorAll(`.image-dot[data-project="${projectIndex}"]`).forEach((dot, index) => {
                dot.classList.toggle('active', index === carousel.currentImage);
            });
        }
    }
updateBackgroundImage(projectIndex) {
    const carousel = this.imageCarousels[projectIndex];
    if (carousel) {
        const projectImagesContainer = carousel.element.closest('.project-images');
        const currentImg = carousel.element.querySelectorAll('.project-image img')[carousel.currentImage];
        
        if (currentImg && projectImagesContainer) {
            // Set the CSS custom property
            projectImagesContainer.style.setProperty('--bg-image', `url(${currentImg.src})`);
        }
    }
}

    startAutoSlide() {
        this.stopAutoSlide();
        // Only start main carousel auto-slide if needed
        // For now, we'll focus on image carousels
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    // Method to stop all image intervals (useful for cleanup)
    stopAllImageSlides() {
        this.imageSlideIntervals.forEach(interval => {
            if (interval) {
                clearInterval(interval);
            }
        });
        this.imageSlideIntervals = [];
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel();
});

// Add smooth scrolling and intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-slide, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Modal functions
function openModal(img) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    // Get project index and image index from the clicked image
const projectCard = img.closest('.project-card');
const projectIndex = Array.from(document.querySelectorAll('.project-card')).indexOf(projectCard);
const imageIndex = Array.from(projectCard.querySelectorAll('.project-image img')).indexOf(img);

modal.innerHTML = `
    <div class="modal-content">
        <button class="modal-close" onclick="closeModal(this)">&times;</button>
        <button class="modal-nav modal-prev" onclick="navigateModal(-1)" data-project="${projectIndex}">‹</button>
        <button class="modal-nav modal-next" onclick="navigateModal(1)" data-project="${projectIndex}">›</button>
        <img src="${img.src}" alt="${img.alt}" class="modal-image" data-project="${projectIndex}" data-image="${imageIndex}">
        <div class="modal-info">
            <h3 class="modal-title">${img.alt}</h3>
        </div>
    </div>
`;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.querySelector('.modal-close'));
        }
    });
}

function closeModal(btn) {
    const modal = btn.closest('.modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        modal.remove();
    }, 300);
}
function navigateModal(direction) {
    const modalImage = document.querySelector('.modal-image');
    const projectIndex = parseInt(modalImage.dataset.project);
    const currentImageIndex = parseInt(modalImage.dataset.image);
    
    const projectCard = document.querySelectorAll('.project-card')[projectIndex];
    const allImages = projectCard.querySelectorAll('.project-image img');
    const totalImages = allImages.length;
    
    let newImageIndex = currentImageIndex + direction;
    
    // Loop around
    if (newImageIndex >= totalImages) newImageIndex = 0;
    if (newImageIndex < 0) newImageIndex = totalImages - 1;
    
    const newImage = allImages[newImageIndex];
    
    // Update modal image
    modalImage.src = newImage.src;
    modalImage.alt = newImage.alt;
    modalImage.dataset.image = newImageIndex;
    
    // Update modal title
    document.querySelector('.modal-title').textContent = newImage.alt;
}
// Close modal on Escape key
// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay.active');
        if (modal) {
            closeModal(modal.querySelector('.modal-close'));
        }
    }
    // Add arrow key navigation
    else if (e.key === 'ArrowLeft') {
        const modal = document.querySelector('.modal-overlay.active');
        if (modal) navigateModal(-1);
    }
    else if (e.key === 'ArrowRight') {
        const modal = document.querySelector('.modal-overlay.active');
        if (modal) navigateModal(1);
    }
});

// Initialize contact information
function initContactInfo() {
    // Replace placeholder contact information
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const title = item.querySelector('h3').textContent;
        const link = item.querySelector('.contact-link');
        
        if (title === 'Email') {
            const emailP = item.querySelector('p');
            emailP.textContent = 'prajakta.chinawalkar@example.com';
            link.href = 'mailto:prajakta.chinawalkar@example.com';
        } else if (title === 'Phone') {
            const phoneP = item.querySelector('p');
            phoneP.textContent = '+91 98765 43210';
            link.href = 'tel:+919876543210';
        } else if (title === 'LinkedIn') {
            link.href = 'https://linkedin.com/in/prajakta-chinawalkar';
        } else if (title === 'GitHub') {
            link.href = 'https://github.com/prajakta-chinawalkar';
        }
    });
}

// Initialize work experience certificates
// function initWorkExperienceCertificates() {
//     // Add view certificate buttons to work experience timeline
//     const timelineItems = document.querySelectorAll('.timeline-item');
    
//     timelineItems.forEach((item, index) => {
//         const content = item.querySelector('.timeline-content');
//         const title = item.querySelector('h3').textContent;
        
//         // Create view certificate button
//         const certButton = document.createElement('button');
//         certButton.className = 'view-experience-cert-btn';
//         certButton.innerHTML = '<i class="fas fa-certificate"></i> View Certificate';
        
//         certButton.addEventListener('click', function() {
//             // You can replace these with actual certificate paths
//             const certificates = {
//                 'Graphic Design Intern': 'assets/inamigo-cert.pdf',
//                 'Java Development Intern': 'assets/appdroid-cert.pdf',
//                 'Web Development Intern': 'assets/Internship_Certificate/YLAXSYB109-WBB4W PRAJAKTA UJWAL CHINAWALKAR (1).pdf'
//             };
            
//             if (certificates[title]) {
//                 // For now, show alert - replace with actual certificate viewing
//                 alert(`Opening ${title} certificate...`);
//                 // window.open(certificates[title], '_blank');
//             } else {
//                 alert('Certificate will be available soon!');
//             }
//         });
        
//         content.appendChild(certButton);
//     });
// }

function initWorkExperienceCertificates() {
    // Remove manually added buttons first to avoid duplicates
    const existingButtons = document.querySelectorAll('.view-experience-cert-btn');
    existingButtons.forEach(btn => btn.remove());
    
    // Add view certificate buttons to work experience timeline
    const timelineItems = document.querySelectorAll('#workexperience .timeline-item');
    
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const title = item.querySelector('h3').textContent.trim();
        
        // Create view certificate button
        const certButton = document.createElement('button');
        certButton.className = 'view-experience-cert-btn';
        certButton.innerHTML = '<i class="fas fa-certificate"></i> View Certificate';
        
        certButton.addEventListener('click', function() {
            // Certificate paths mapped to exact titles from HTML
            const certificates = {
                'Graphic Design Intern': 'assets/Internship_Certificate/Completion_20250520_224041_0000 (1).pdf',
                'Graphic Design Intern LOR': 'assets/Internship_Certificate/Appreciation_20250520_230642_0000 (1).pdf',
                'Java Development Intern': 'assets/Internship_Certificate/appdroid-cert.pdf',
                'Web Development Intern': 'assets/Internship_Certificate/YLAXSYB109-WBB4W PRAJAKTA UJWAL CHINAWALKAR (1).pdf'
            };
            
            console.log('Clicked title:', title); // Debug log
            
            if (certificates[title]) {
                // Try to open the certificate
                try {
                    window.open(certificates[title], '_blank');
                } catch (error) {
                    console.error('Error opening certificate:', error);
                    alert(`Could not open ${title} certificate. Please check the file path.`);
                }
            } else {
                alert('Certificate will be available soon!');
            }
        });
        
        content.appendChild(certButton);
    });
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other animations to initialize
    setTimeout(initWorkExperienceCertificates, 1000);
});


// Additional animations for better user experience
function initAdditionalAnimations() {
    // Animate skill tags on hover
    const skillTags = document.querySelectorAll('.tag, .tech-tag, .skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animate buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize additional animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initAdditionalAnimations, 1000);
});

// Smooth reveal animations for sections
function initSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize section reveals
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initSectionReveals, 500);
});