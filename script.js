// ===========================================
// Main Application
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initThemeSwitcher();
    initLanguageSwitcher();
    initAnimations();
    initCurrentYear();
    initScrollEffects();
    initHoverEffects();
    initProjectModal();
});

// ===========================================
// Navigation
// ===========================================

function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initial update
    updateActiveNavLink();
}

// ===========================================
// Theme Switcher
// ===========================================

function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('aseel-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('aseel-theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation
        this.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}

// ===========================================
// Language Switcher
// ===========================================

function initLanguageSwitcher() {
    const languageToggle = document.getElementById('languageToggle');
    
    // Get saved language or default to Arabic
    const savedLanguage = localStorage.getItem('aseel-language') || 'ar';
    setLanguage(savedLanguage);
    
    // Toggle language
    languageToggle.addEventListener('click', function() {
        const currentLanguage = document.documentElement.getAttribute('lang');
        const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        
        setLanguage(newLanguage);
        localStorage.setItem('aseel-language', newLanguage);
        
        // Add animation
        this.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    
    function setLanguage(lang) {
        // Update HTML lang and dir attributes
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Show/hide language-specific elements
        const arElements = document.querySelectorAll('[data-lang="ar"]');
        const enElements = document.querySelectorAll('[data-lang="en"]');
        
        if (lang === 'ar') {
            arElements.forEach(el => el.style.display = '');
            enElements.forEach(el => el.style.display = 'none');
            
            // Update toggle button text
            document.querySelectorAll('.language-toggle__text[data-lang="ar"]').forEach(el => {
                el.textContent = 'EN';
            });
            document.querySelectorAll('.language-toggle__text[data-lang="en"]').forEach(el => {
                el.textContent = 'AR';
            });
        } else {
            arElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => el.style.display = '');
            
            // Update toggle button text
            document.querySelectorAll('.language-toggle__text[data-lang="ar"]').forEach(el => {
                el.textContent = 'AR';
            });
            document.querySelectorAll('.language-toggle__text[data-lang="en"]').forEach(el => {
                el.textContent = 'EN';
            });
        }
        
        // Update navigation menu position based on direction
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            if (lang === 'ar') {
                navMenu.style.right = '-100%';
                navMenu.style.left = 'auto';
            } else {
                navMenu.style.left = '-100%';
                navMenu.style.right = 'auto';
            }
        }
        
        // Refresh animations
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }
}

// ===========================================
// Animations
// ===========================================

function initAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero__label', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero__title-line--1', {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.hero__title-line--2', {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.hero__subtitle', {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero__actions', {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.4');
    
    // Hero scroll line animation
    gsap.to('.hero__scroll-line', {
        height: 0,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
    });
    
    // Floating ornaments
    gsap.to('.hero__ornament--1', {
        y: 20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to('.hero__ornament--2', {
        y: -20,
        rotation: -5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
    });
    
    // Fade up animations for sections
    gsap.utils.toArray('.section').forEach(section => {
        const title = section.querySelector('.section__title');
        const subtitle = section.querySelector('.section__subtitle');
        
        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
        
        if (subtitle) {
            gsap.from(subtitle, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.2,
                ease: 'power3.out'
            });
        }
    });
    
    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    gsap.from(projectCards, {
        scrollTrigger: {
            trigger: '.projects__grid',
            start: 'top 80%'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    gsap.from(serviceCards, {
        scrollTrigger: {
            trigger: '.services__grid',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Gallery items animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    gsap.from(galleryItems, {
        scrollTrigger: {
            trigger: '.gallery__grid',
            start: 'top 80%'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.7)'
    });
}

// ===========================================
// Current Year
// ===========================================

function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===========================================
// Scroll Effects
// ===========================================

function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Animate scroll
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
                
                // Add click animation
                gsap.to(this, {
                    scale: 0.9,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary));
        z-index: var(--z-tooltip);
        transition: width 0.1s ease;
        pointer-events: none;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===========================================
// Hover Effects
// ===========================================

function initHoverEffects() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const link = this.querySelector('.project-card__link');
            if (link) {
                const currentLang = document.documentElement.getAttribute('lang');
                if (currentLang === 'ar') {
                    gsap.to(link.querySelector('i'), {
                        x: -5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(link.querySelector('i'), {
                        x: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
            
            const link = this.querySelector('.project-card__link');
            if (link) {
                gsap.to(link.querySelector('i'), {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
        });
    });
    
    // Gallery items hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.gallery-item__image'), {
                scale: 1.1,
                duration: 0.6,
                ease: 'power2.out'
            });
            
            gsap.to(this.querySelector('.gallery-item__overlay'), {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(this.querySelector('.gallery-item__title'), {
                y: 0,
                duration: 0.4,
                delay: 0.1,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.gallery-item__image'), {
                scale: 1,
                duration: 0.6,
                ease: 'power2.in'
            });
            
            gsap.to(this.querySelector('.gallery-item__overlay'), {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
            
            gsap.to(this.querySelector('.gallery-item__title'), {
                y: 20,
                duration: 0.3,
                ease: 'power2.in'
            });
        });
    });
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -4,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const icon = this.querySelector('.service-card__icon');
            if (icon) {
                gsap.to(icon, {
                    rotation: 10,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
            
            const icon = this.querySelector('.service-card__icon');
            if (icon) {
                gsap.to(icon, {
                    rotation: 0,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });
    });
    
    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
        });
    });
}

// ===========================================
// Project Modal
// ===========================================

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const projectViewBtns = document.querySelectorAll('.project-view-btn');
    
    // Project data
    const projects = {
        1: {
            category: { ar: 'هوية بصرية', en: 'Brand Identity' },
            title: { ar: 'دار أزياء فاخرة', en: 'Luxury Fashion House' },
            year: '2024',
            description: {
                ar: 'هوية بصرية متكاملة لدار أزياء تهدف إلى الجمع بين التراث والحداثة. تضمن المشروع إنشاء نظام علامة تجارية شامل يعمل عبر نقاط اللمس الرقمية والمادية.',
                en: 'Complete visual identity for a high-end fashion brand blending heritage with modernity. The project involved creating a comprehensive brand system that works across digital and physical touchpoints.'
            },
            tags: {
                ar: ['تصميم الشعار', 'الهوية البصرية', 'الطباعة', 'دليل العلامة'],
                en: ['Logo Design', 'Visual Identity', 'Typography', 'Brand Guidelines']
            },
            imageClass: 'project-card__image--1'
        },
        2: {
            category: { ar: 'تصميم ويب', en: 'Web Design' },
            title: { ar: 'معرض فني تفاعلي', en: 'Interactive Art Gallery' },
            year: '2024',
            description: {
                ar: 'منصة رقمية لعرض الأعمال الفنية بتجربة مستخدم غامرة. يركز التصميم على إنشاء رحلة سلسة عبر المعارض الافتراضية مع الحفاظ على السلامة الفنية لكل قطعة.',
                en: 'Digital platform for art exhibition with immersive user experience. The design focuses on creating a seamless journey through virtual exhibitions while maintaining the artistic integrity of each piece.'
            },
            tags: {
                ar: ['تصميم UI/UX', 'التفاعل', 'الفن الرقمي', 'تطوير الويب'],
                en: ['UI/UX Design', 'Interaction', 'Digital Art', 'Web Development']
            },
            imageClass: 'project-card__image--2'
        },
        3: {
            category: { ar: 'إعلان', en: 'Advertising' },
            title: { ar: 'حملة مشروب فاخر', en: 'Premium Beverage Campaign' },
            year: '2023',
            description: {
                ar: 'حملة إعلانية شاملة مع تصوير احترافي وهوية بصرية متماسكة. نجحت الحملة في ترسيخ العلامة التجارية كخيار نمط حياة فاخر من خلال سرد القصص البصرية الاستراتيجية.',
                en: 'Comprehensive advertising campaign with professional photography. The campaign successfully positioned the brand as a premium lifestyle choice through strategic visual storytelling.'
            },
            tags: {
                ar: ['الإعلان', 'التصوير', 'التسويق', 'إستراتيجية الحملة'],
                en: ['Advertising', 'Photography', 'Marketing', 'Campaign Strategy']
            },
            imageClass: 'project-card__image--3'
        }
    };
    
    // Open modal when clicking project view button
    projectViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal__overlay').addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function openProjectModal(projectId) {
        const project = projects[projectId];
        const currentLang = document.documentElement.getAttribute('lang');
        
        if (!project) return;
        
        // Update modal content based on current language
        document.getElementById('modalCategory').textContent = project.category[currentLang];
        document.getElementById('modalTitle').textContent = project.title[currentLang];
        document.getElementById('modalYear').textContent = project.year;
        
        // Update description
        if (currentLang === 'ar') {
            document.getElementById('modalDescription').textContent = project.description.ar;
            document.getElementById('modalDescription').style.display = '';
            document.getElementById('modalDescriptionEn').style.display = 'none';
        } else {
            document.getElementById('modalDescriptionEn').textContent = project.description.en;
            document.getElementById('modalDescriptionEn').style.display = '';
            document.getElementById('modalDescription').style.display = 'none';
        }
        
        // Update tags
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = '';
        const tags = project.tags[currentLang];
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            if (currentLang === 'ar') {
                tagElement.setAttribute('data-lang', 'ar');
            } else {
                tagElement.setAttribute('data-lang', 'en');
            }
            tagsContainer.appendChild(tagElement);
        });
        
        // Update image
        const modalImage = document.getElementById('modalImage');
        modalImage.className = 'modal__image';
        modalImage.classList.add(project.imageClass);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate modal in
        gsap.fromTo(modal.querySelector('.modal__content'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
        );
    }
    
    function closeModal() {
        // Animate modal out
        gsap.to(modal.querySelector('.modal__content'), {
            opacity: 0,
            y: 20,
            duration: 0.2,
            ease: 'power3.in',
            onComplete: () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===========================================
// Utility Functions
// ===========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handle window resize
window.addEventListener('resize', throttle(function() {
    // Refresh animations on resize
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}, 100));

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

// Handle scroll animations for fade-up elements
function initScrollAnimations() {
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeUpElements.forEach(el => observer.observe(el));
}

// Initialize scroll animations
initScrollAnimations();

// Handle language change in modal
document.documentElement.addEventListener('langchange', function() {
    // This event is triggered when language changes
    const modal = document.getElementById('projectModal');
    if (modal.classList.contains('active')) {
        // Close and reopen modal to update language
        const activeProject = document.querySelector('.project-view-btn:hover')?.getAttribute('data-project') || '1';
        closeModal();
        setTimeout(() => openProjectModal(activeProject), 300);
    }
});

// Custom event for language change
const originalSetLanguage = window.setLanguage;
window.setLanguage = function(lang) {
    const event = new CustomEvent('langchange', { detail: { language: lang } });
    document.documentElement.dispatchEvent(event);
    return originalSetLanguage ? originalSetLanguage(lang) : null;
};