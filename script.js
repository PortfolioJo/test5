// ===========================================
// Main Application - تصميم جديد كامل
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initThemeSwitcher();
    initLanguageSwitcher();
    initCurrentYear();
    initScrollAnimations();
    initProjectFilter();
    initProjectModal();
    initContactForm();
    initScrollProgress();
    initFloatingElements();
    initSmoothScrolling();
    initPageAnimations();
    initConfettiEffect();
});

// ===========================================
// Loading Screen
// ===========================================

function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader">
            <div class="loader-circle"></div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
                // Show welcome animation
                showWelcomeAnimation();
            }, 500);
        }, 1000);
    });
}

function showWelcomeAnimation() {
    // Create welcome message
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'welcome-message';
    welcomeMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            padding: 2rem 3rem;
            border-radius: var(--card-radius);
            text-align: center;
            z-index: 9999;
            animation: fadeIn 0.5s ease;
            box-shadow: var(--shadow-xl);
        ">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">مرحباً بك في عالم الإبداع</h3>
            <p style="color: var(--text-secondary);">استمتع بتجربة تصميم فريدة</p>
        </div>
    `;
    
    document.body.appendChild(welcomeMsg);
    
    // Remove after 2 seconds
    setTimeout(() => {
        welcomeMsg.style.animation = 'fadeIn 0.5s ease reverse';
        setTimeout(() => welcomeMsg.remove(), 500);
        
        // Show confetti
        triggerConfetti();
    }, 2000);
}

// ===========================================
// Navigation
// ===========================================

function initNavigation() {
    const nav = document.getElementById('nav');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        nav.classList.toggle('scrolled', scrolled);
        
        // Update active nav link based on scroll position
        updateActiveNavLink(sections, navLinks);
    });

    // Update active nav link function
    function updateActiveNavLink(sections, links) {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            const section = link.getAttribute('data-section');
            if (section === current || (current === '' && section === 'hero')) {
                link.classList.add('active');
                link.style.animation = 'none';
                setTimeout(() => {
                    link.style.animation = 'badgePulse 0.3s ease';
                }, 10);
            }
        });
    }
}

// ===========================================
// Theme Switcher
// ===========================================

function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Get saved theme or use default
    const savedTheme = localStorage.getItem('aseel-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme with animation
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add flip animation
        this.style.animation = 'flip 0.6s ease';
        
        // Update theme after animation
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('aseel-theme', newTheme);
            updateThemeIcon(newTheme);
            this.style.animation = '';
            
            // Add page transition effect
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transition = 'opacity 0.3s ease';
            }, 100);
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
    const langToggle = document.getElementById('languageToggle');
    const langText = langToggle.querySelector('.lang-text');
    
    // Get saved language or use default
    const savedLang = localStorage.getItem('aseel-lang') || 'ar';
    setLanguage(savedLang);
    updateLangText(savedLang);
    
    // Toggle language
    langToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.getAttribute('lang') || 'ar';
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        
        this.style.animation = 'flip 0.6s ease';
        
        setTimeout(() => {
            setLanguage(newLang);
            updateLangText(newLang);
            localStorage.setItem('aseel-lang', newLang);
            this.style.animation = '';
        }, 300);
    });
    
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Add page transition
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.3s ease';
        }, 100);
    }
    
    function updateLangText(lang) {
        langText.textContent = lang === 'ar' ? 'عربي' : 'English';
    }
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
// Scroll Animations
// ===========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===========================================
// Project Filter
// ===========================================

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
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
    const viewProjectBtns = document.querySelectorAll('.view-project');
    
    // Project data
    const projects = {
        1: {
            category: 'هوية بصرية',
            title: 'علامة تجارية فاخرة',
            description: 'تصميم هوية متكاملة لعلامة أزياء فاخرة مع التركيز على الفخامة والبساطة. العمل تضمن إنشاء نظام هوية كامل يعبر عن قيم العلامة التجارية ويجذب العملاء المستهدفين.',
            tags: ['تصميم شعار', 'ألوان ماركة', 'مواد دعائية', 'دليل الهوية'],
            results: [
                'زيادة الوعي بالعلامة بنسبة 40%',
                'تحسين تجربة العملاء',
                'تعزيز الهوية البصرية'
            ]
        },
        2: {
            category: 'تصميم ويب',
            title: 'منصة فنية تفاعلية',
            description: 'واجهة مستخدم حديثة لمنصة فنية مع تجربة تصفح سلسة وجذابة. التصميم يركز على سهولة الاستخدام والتجربة المرئية المميزة.',
            tags: ['UI/UX', 'تفاعلية', 'تصميم متجاوب', 'تجربة مستخدم'],
            results: [
                'زيادة وقت التصفح بنسبة 60%',
                'تحسين معدل التحويل',
                'تجربة مستخدم محسنة'
            ]
        },
        3: {
            category: 'رسم رقمي',
            title: 'سلسلة فن تجريدي',
            description: 'مجموعة من الأعمال الفنية الرقمية المستوحاة من الثقافة العربية المعاصرة. كل قطعة تحمل رسالة فنية خاصة وتجمع بين التراث والحداثة.',
            tags: ['فن رقمي', 'تلوين رقمي', 'فن تجريدي', 'ثقافة عربية'],
            results: [
                'معرض فني ناجح',
                'بيع جميع القطع الفنية',
                'تغطية إعلامية واسعة'
            ]
        },
        4: {
            category: 'هوية بصرية',
            title: 'مقهى ثقافي',
            description: 'هوية بصرية دافئة لمقهى يجمع بين التراث العربي والحداثة. التصميم يعكس جو المقهى الدافئ والثقافي بطريقة معاصرة.',
            tags: ['تصميم شعار', 'مواد مطبوعة', 'تصميم داخلي', 'هوية مكان'],
            results: [
                'تعزيز هوية المكان',
                'جذب جمهور متنوع',
                'نجاح تجاري كبير'
            ]
        }
    };
    
    // Open modal on project click
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function openProjectModal(projectId) {
        const project = projects[projectId];
        if (!project) return;
        
        // Update modal content
        document.getElementById('modalCategory').textContent = project.category;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        
        // Update tags
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
        
        // Update results
        const resultsContainer = document.getElementById('modalResults');
        resultsContainer.innerHTML = '';
        project.results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result;
            resultsContainer.appendChild(li);
        });
        
        // Update image based on project
        const modalImage = document.getElementById('modalImage');
        modalImage.style.background = getProjectGradient(projectId);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function getProjectGradient(id) {
        const gradients = [
            'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            'linear-gradient(135deg, var(--accent-color), var(--primary-light))',
            'linear-gradient(135deg, var(--secondary-color), var(--accent-light))',
            'linear-gradient(135deg, var(--primary-light), var(--secondary-dark))'
        ];
        return gradients[id - 1] || gradients[0];
    }
}

// ===========================================
// Contact Form
// ===========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            const originalIcon = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalIcon;
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                
                // Trigger confetti
                triggerConfetti();
            }, 1500);
        });
    }
    
    // Form input animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', function() {
                label.style.top = '-1.5rem';
                label.style.fontSize = '0.875rem';
                label.style.color = 'var(--primary-color)';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-tertiary)';
                }
            });
        }
    });
}

// ===========================================
// Scroll Progress
// ===========================================

function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-1);
        z-index: 9998;
        transition: width 0.1s ease;
        pointer-events: none;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===========================================
// Floating Elements Animation
// ===========================================

function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
        // Randomize initial position
        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 80 + 10;
        element.style.right = randomX + '%';
        element.style.top = randomY + '%';
        
        // Add mouse interaction
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.opacity = '0.2';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.1';
        });
    });
}

// ===========================================
// Smooth Scrolling
// ===========================================

function initSmoothScrolling() {
    // Add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================================
// Page Animations
// ===========================================

function initPageAnimations() {
    // Add animation to elements on load
    const animatedElements = [
        '.hero-title .title-line',
        '.hero-description',
        '.hero-actions',
        '.hero-badge',
        '.section-header',
        '.service-card',
        '.project-card'
    ];
    
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
            element.classList.add('scroll-animate');
        });
    });
    
    // Initialize scroll animations
    initScrollAnimations();
}

// ===========================================
// Confetti Effect
// ===========================================

function initConfettiEffect() {
    // Add confetti button to hero section
    const confettiBtn = document.createElement('button');
    confettiBtn.className = 'confetti-btn';
    confettiBtn.innerHTML = '<i class="fas fa-sparkles"></i>';
    confettiBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-1);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-md);
        transition: all var(--transition-normal);
    `;
    
    confettiBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(15deg)';
    });
    
    confettiBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
    
    confettiBtn.addEventListener('click', triggerConfetti);
    
    document.body.appendChild(confettiBtn);
}

function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#8A6B5E', '#7A8B9A', '#D4A574', '#B89B8D']
        });
    }
}

// ===========================================
// Notification System
// ===========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--element-radius)',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '400px'
    });
    
    if (type === 'success') {
        notification.style.borderLeft = '4px solid var(--primary-color)';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================================
// Add Custom Animations
// ===========================================

function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flip {
            0% { transform: rotateY(0); }
            50% { transform: rotateY(90deg); }
            100% { transform: rotateY(0); }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .notification-success {
            border-color: rgba(138, 107, 94, 0.3);
            color: var(--primary-color);
        }
        
        .notification-success i {
            color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
            .confetti-btn {
                bottom: 1rem;
                left: 1rem;
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize custom animations
addCustomAnimations();