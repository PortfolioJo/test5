// ===========================================
// Main Application - بورتفوليو مصممة جرافيك
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initThemeSwitcher();
    initLanguageSwitcher();
    initCurrentYear();
    initScrollAnimations();
    initHoverEffects();
    initProjectModal();
    initContactForm();
    initScrollProgress();
    initInstagramFeatures();
    initSmoothReveals();
    initTextAnimations();
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
            
            // إضافة أنيميشن للقائمة
            if (navMenu.classList.contains('active')) {
                navMenu.style.animation = 'slideInRight 0.3s ease-out';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // الانتقال السلس للقسم
                const targetId = href.substring(1);
                navigateToSection(targetId);
                
                // تحديث الرابط النشط مع أنيميشن
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    l.style.animation = 'none';
                });
                this.classList.add('active');
                this.style.animation = 'pulse 0.3s ease';
                
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // تحديث الروابط النشطة بناءً على التمرير
        updateActiveNavLink();
        lastScroll = currentScroll;
    });
    
    function navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || (href === '#hero' && currentSection === '')) {
                link.classList.add('active');
            }
        });
    }
}

// ===========================================
// Theme Switcher
// ===========================================

function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    // الحصول على الثيم المحفوظ أو استخدام الافتراضي
    const savedTheme = localStorage.getItem('aseel-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // تبديل الثيم مع أنيميشن
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // إضافة أنيميشن للتحديق
        this.style.animation = 'rotate 0.5s ease';
        
        // تحديث الثيم بعد تأخير بسيط للأنيميشن
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('aseel-theme', newTheme);
            updateThemeIcon(newTheme);
            this.style.animation = '';
            
            // إضافة تأثير انتقالي للنصوص
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transition = 'opacity 0.3s ease';
            }, 100);
        }, 250);
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
    const langTexts = document.querySelectorAll('.language-toggle__text');
    
    // الحصول على اللغة المحفوظة أو استخدام الافتراضي
    const savedLang = localStorage.getItem('aseel-lang') || 'ar';
    setLanguage(savedLang);
    updateLangToggle(savedLang);
    
    // تبديل اللغة مع أنيميشن
    langToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.getAttribute('lang') || 'ar';
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        
        // إضافة أنيميشن للزر
        this.style.animation = 'rotate 0.5s ease';
        
        setTimeout(() => {
            setLanguage(newLang);
            updateLangToggle(newLang);
            localStorage.setItem('aseel-lang', newLang);
            this.style.animation = '';
        }, 250);
    });
    
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        updateTexts(lang);
        
        // تحديث الخط حسب اللغة
        if (lang === 'ar') {
            document.documentElement.style.setProperty('--font-body', "'Noto Sans Arabic', sans-serif");
            document.documentElement.style.setProperty('--font-heading', "'Cormorant Garamond', serif");
        } else {
            document.documentElement.style.setProperty('--font-body', "'Inter', sans-serif");
            document.documentElement.style.setProperty('--font-heading', "'Cormorant Garamond', serif");
        }
        
        // إضافة أنيميشن لتغيير اللغة
        document.body.style.opacity = '0.8';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 300);
    }
    
    function updateLangToggle(lang) {
        langTexts.forEach(text => {
            text.classList.toggle('hidden');
        });
    }
}

// ===========================================
// Scroll Animations
// ===========================================

function initScrollAnimations() {
    // عناصر للمراقبة
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale, .scroll-observer'
    );
    
    // إنشاء مراقب IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // إضافة تأثير إضافي للعناصر
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.opacity = '1';
                }
                
                // إزالة المراقبة بعد الظهور
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // مراقبة جميع العناصر
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===========================================
// Hover Effects
// ===========================================

function initHoverEffects() {
    // تأثيرات Hover للبطاقات
    const cards = document.querySelectorAll('.project-card, .service-card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(154, 123, 105, 0.15)';
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        });
    });
    
    // تأثيرات Hover للأزرار
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // تأثيرات Hover للروابط الاجتماعية
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.animation = '';
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
    
    // بيانات المشاريع
    const projects = {
        1: {
            category: 'الهوية البصرية',
            title: 'دار أزياء فاخرة',
            year: '2024',
            description: 'هوية بصرية كاملة لعلامة أزياء فاخرة تجمع بين التراث والحداثة. المشروع تضمن إنشاء نظام علامة تجارية شاملة يعمل عبر جميع نقاط الاتصال الرقمية والمادية.',
            tags: ['تصميم الشعار', 'الهوية البصرية', 'الخطوط', 'إرشادات العلامة التجارية'],
            imageClass: 'project-card__image--1'
        },
        2: {
            category: 'تصميم الويب',
            title: 'معرض فني تفاعلي',
            year: '2024',
            description: 'منصة رقمية لمعرض فني مع تجربة مستخدم غامرة. يركز التصميم على إنشاء رحلة سلسة عبر المعارض الافتراضية مع الحفاظ على السلامة الفنية لكل قطعة.',
            tags: ['تصميم واجهة المستخدم', 'التفاعلية', 'الفن الرقمي', 'تطوير الويب'],
            imageClass: 'project-card__image--2'
        },
        3: {
            category: 'إعلانات',
            title: 'حملة مشروبات متميزة',
            year: '2023',
            description: 'حملة إعلانية شاملة مع تصوير احترافي. نجحت الحملة في وضع العلامة التجارية كخيار نمط حياة متميز من خلال سرد القصص المرئي الاستراتيجي.',
            tags: ['الإعلان', 'التصوير', 'التسويق', 'إستراتيجية الحملة'],
            imageClass: 'project-card__image--3'
        }
    };
    
    // فتح المودال عند النقر على زر المشروع
    projectViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // إغلاق المودال
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal__overlay').addEventListener('click', closeModal);
    
    // إغلاق المودال بمفتاح Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function openProjectModal(projectId) {
        const project = projects[projectId];
        const currentLang = document.documentElement.getAttribute('lang') || 'ar';
        
        if (!project) return;
        
        // تحديث محتوى المودال
        document.getElementById('modalCategory').textContent = project.category;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalYear').textContent = project.year;
        document.getElementById('modalDescription').textContent = project.description;
        
        // تحديث الوسوم
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.style.animation = 'fadeInScale 0.3s ease backwards';
            tagElement.style.animationDelay = `${Math.random() * 0.3}s`;
            tagsContainer.appendChild(tagElement);
        });
        
        // تحديث الصورة
        const modalImage = document.getElementById('modalImage');
        modalImage.className = 'modal__image';
        modalImage.classList.add(project.imageClass);
        
        // عرض المودال
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
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
            
            // الحصول على بيانات النموذج
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // إضافة أنيميشن للإرسال
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('.btn__text').textContent;
            submitBtn.style.animation = 'pulse 0.5s ease';
            submitBtn.querySelector('.btn__text').textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            // محاكاة الإرسال
            setTimeout(() => {
                // عرض رسالة النجاح
                showNotification('تم إرسال رسالتك بنجاح! سأرد عليك قريباً.', 'success');
                this.reset();
                submitBtn.style.animation = '';
                submitBtn.querySelector('.btn__text').textContent = originalText;
                submitBtn.disabled = false;
                
                // إعادة تعيين التسميات
                const labels = this.querySelectorAll('label');
                labels.forEach(label => {
                    const input = this.querySelector(`#${label.getAttribute('for')}`);
                    if (input && !input.value) {
                        label.style.top = '0.75rem';
                        label.style.fontSize = '1rem';
                    }
                });
            }, 1500);
        });
    }
    
    // أنيميشن لتسميات النموذج
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', function() {
                label.style.top = '-0.5rem';
                label.style.fontSize = '0.875rem';
                label.style.color = 'var(--color-accent-primary)';
                label.style.animation = 'fadeInScale 0.2s ease';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.top = '0.75rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--color-text-tertiary)';
                }
            });
            
            // التحقق عند التحميل
            if (input.value) {
                label.style.top = '-0.5rem';
                label.style.fontSize = '0.875rem';
                label.style.color = 'var(--color-accent-primary)';
            }
        }
    });
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-bg-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 9999;
            animation: fadeInUp 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeInUp 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
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
// Scroll Progress Bar
// ===========================================

function initScrollProgress() {
    // إنشاء شريط التقدم إذا لم يكن موجوداً
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    // تحديث شريط التقدم
    window.addEventListener('scroll', function() {
        const progressBar = document.querySelector('.scroll-progress');
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
}

// ===========================================
// Instagram Features
// ===========================================

function initInstagramFeatures() {
    const shareBtn = document.getElementById('instagramShare');
    const instagramModal = document.getElementById('instagramModal');
    const instagramClose = document.getElementById('instagramClose');
    const downloadBtn = document.getElementById('downloadPreview');
    const copyHashtagsBtn = document.getElementById('copyHashtags');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            createInstagramPreview();
        });
    }
    
    if (instagramClose) {
        instagramClose.addEventListener('click', function() {
            instagramModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        instagramModal.querySelector('.modal__overlay').addEventListener('click', function() {
            instagramModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadInstagramPreview);
    }
    
    if (copyHashtagsBtn) {
        copyHashtagsBtn.addEventListener('click', copyInstagramHashtags);
    }
    
    function createInstagramPreview() {
        const previewImage = document.getElementById('previewImage');
        previewImage.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #9A7B69 0%, #8A9EA7 100%);
                color: white;
                text-align: center;
                padding: 2rem;
            ">
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">أسيل</h3>
                <p style="font-size: 1rem; margin-bottom: 1rem;">مصممة جرافيك رقمي</p>
                <div style="font-size: 0.875rem; opacity: 0.9;">
                    📍 متاح عالمياً<br>
                    ✉️ hello@aseel.design
                </div>
            </div>
        `;
        
        instagramModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function downloadInstagramPreview() {
        const previewImage = document.getElementById('previewImage');
        
        html2canvas(previewImage).then(canvas => {
            const link = document.createElement('a');
            link.download = 'portfolio-preview.jpg';
            link.href = canvas.toDataURL('image/jpeg', 0.9);
            link.click();
            
            showNotification('تم تحميل الصورة بنجاح!', 'success');
        });
    }
    
    function copyInstagramHashtags() {
        const hashtags = '#تصميم_جرافيك #هوية_بصرية #مصممة_عربية #تصميم_ويب #فن_رقمي #بورتفوليو #تصميم_حديث #إبداع_رقمي';
        
        navigator.clipboard.writeText(hashtags).then(() => {
            showNotification('تم نسخ الهاشتاقات بنجاح!', 'success');
        });
    }
}

// ===========================================
// Smooth Reveals
// ===========================================

function initSmoothReveals() {
    const images = document.querySelectorAll('.image-placeholder, .gallery-item__image');
    
    images.forEach((image, index) => {
        image.style.opacity = '0';
        image.style.transform = 'scale(0.95)';
        image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        image.style.transitionDelay = `${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(image);
    });
}

// ===========================================
// Text Animations
// ===========================================

function initTextAnimations() {
    const texts = document.querySelectorAll('.hero__title-line, .hero__subtitle, .section__title-text, .section__subtitle');
    
    texts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
}

// ===========================================
// Translations
// ===========================================

const translations = {
    en: {
        'nav.designer': 'Digital Designer',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.work': 'Work',
        'nav.services': 'Services',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'Digital Artistry',
        'hero.title': 'Graphic & Digital Designer',
        'hero.description': 'Crafting visual identities that blend minimalism, modern aesthetics, and emotional storytelling.',
        'hero.viewPortfolio': 'View Portfolio',
        'hero.startProject': 'Start a Project',
        'hero.explore': 'Explore',
        'about.title': 'Creative Philosophy',
        'about.subtitle': 'Where art meets purpose in digital form',
        'about.imageText': 'Visual Storyteller',
        'about.heading': 'Design with Intention',
        'about.description1': 'I specialize in transforming abstract concepts into compelling visual experiences that resonate with audiences. My approach combines artistic sensibility with strategic thinking.',
        'about.description2': 'With over 5 years of experience in digital design, I\'ve collaborated with brands worldwide to build distinctive visual identities and memorable user experiences.',
        'about.designerTitle': 'Digital Designer',
        'projects.title': 'Featured Work',
        'projects.subtitle': 'Selected projects showcasing design excellence',
        'projects.project1.category': 'Brand Identity',
        'projects.project1.title': 'Luxury Fashion House',
        'projects.project1.description': 'Complete visual identity for a high-end fashion brand blending heritage with modernity',
        'projects.project2.category': 'Web Design',
        'projects.project2.title': 'Interactive Art Gallery',
        'projects.project2.description': 'Digital platform for art exhibition with immersive user experience',
        'projects.project3.category': 'Advertising',
        'projects.project3.title': 'Premium Beverage Campaign',
        'projects.project3.description': 'Comprehensive advertising campaign with professional photography',
        'projects.tags.logo': 'Logo Design',
        'projects.tags.identity': 'Visual Identity',
        'projects.tags.typography': 'Typography',
        'projects.tags.uiux': 'UI/UX Design',
        'projects.tags.interaction': 'Interaction',
        'projects.tags.digitalArt': 'Digital Art',
        'projects.tags.advertising': 'Advertising',
        'projects.tags.photography': 'Photography',
        'projects.tags.marketing': 'Marketing',
        'projects.viewCase': 'View Case Study',
        'services.title': 'Design Services',
        'services.subtitle': 'Transforming visions into visual realities',
        'services.service1.title': 'Web Design',
        'services.service1.description': 'Contemporary website designs that marry aesthetics with functionality, focusing on user experience and performance.',
        'services.service2.title': 'Brand Identity',
        'services.service2.description': 'Complete visual identity systems that express brand values and create memorable impressions.',
        'services.service3.title': 'Digital Art',
        'services.service3.description': 'Engaging visual content for social media that enhances brand presence and follows modern trends.',
        'gallery.title': 'Visual Gallery',
        'gallery.subtitle': 'A curated collection of artistic expressions',
        'gallery.item1': 'Abstract Design',
        'gallery.item2': 'Digital Print',
        'gallery.item3': 'Calligraphy Art',
        'gallery.item4': 'Digital Coloring',
        'gallery.item5': 'Geometric Design',
        'gallery.item6': 'Cinematic Art',
        'contact.title': 'Let\'s Connect',
        'contact.subtitle': 'Ready to bring your vision to life?',
        'contact.heading': 'Get in Touch',
        'contact.description': 'Have a project in mind? I\'d love to hear about it. Let\'s discuss how we can transform your vision into reality.',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Phone',
        'contact.locationTitle': 'Location',
        'contact.location': 'Available Worldwide',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Email Address',
        'contact.form.message': 'Project Details',
        'contact.form.submit': 'Send Message',
        'contact.socialTitle': 'Follow My Work',
        'modal.overview': 'Project Overview',
        'modal.services': 'Services Provided',
        'modal.startProject': 'Start a Similar Project',
        'footer.rights': 'All rights reserved'
    },
    ar: {
        'nav.designer': 'مصممة جرافيك رقمي',
        'nav.home': 'الرئيسية',
        'nav.about': 'عنّي',
        'nav.work': 'أعمالي',
        'nav.services': 'خدماتي',
        'nav.gallery': 'المعرض',
        'nav.contact': 'اتصل بي',
        'lang.en': 'EN',
        'lang.ar': 'AR',
        'hero.subtitle': 'فنون رقمية',
        'hero.title': 'مصممة جرافيك ورقمي',
        'hero.description': 'أصمم هويات بصرية تجمع بين البساطة والجمال المعاصر وسرد القصص العاطفية.',
        'hero.viewPortfolio': 'عرض الأعمال',
        'hero.startProject': 'ابدأ مشروع',
        'hero.explore': 'استكشف',
        'about.title': 'الفلسفة الإبداعية',
        'about.subtitle': 'حيث يلتقي الفن بالغرض في الشكل الرقمي',
        'about.imageText': 'راوي قصص بصري',
        'about.heading': 'تصميم بقصد',
        'about.description1': 'أتخصص في تحويل المفاهيم المجردة إلى تجارب بصرية مؤثرة تلقى صدى لدى الجمهور. يجمع أسلوبي بين الحس الفني والتفكير الاستراتيجي.',
        'about.description2': 'مع أكثر من 5 سنوات من الخبرة في التصميم الرقمي، تعاونت مع علامات تجارية عالمية لبناء هويات بصرية مميزة وتجارب مستخدم لا تنسى.',
        'about.designerTitle': 'مصممة جرافيك رقمي',
        'projects.title': 'أعمال مميزة',
        'projects.subtitle': 'مشاريع مختارة تعرض التميز في التصميم',
        'projects.project1.category': 'الهوية البصرية',
        'projects.project1.title': 'دار أزياء فاخرة',
        'projects.project1.description': 'هوية بصرية كاملة لعلامة أزياء فاخرة تجمع بين التراث والحداثة',
        'projects.project2.category': 'تصميم الويب',
        'projects.project2.title': 'معرض فني تفاعلي',
        'projects.project2.description': 'منصة رقمية لمعرض فني مع تجربة مستخدم غامرة',
        'projects.project3.category': 'إعلانات',
        'projects.project3.title': 'حملة مشروبات متميزة',
        'projects.project3.description': 'حملة إعلانية شاملة مع تصوير احترافي',
        'projects.tags.logo': 'تصميم الشعار',
        'projects.tags.identity': 'الهوية البصرية',
        'projects.tags.typography': 'الخطوط',
        'projects.tags.uiux': 'تصميم واجهة المستخدم',
        'projects.tags.interaction': 'تفاعلية',
        'projects.tags.digitalArt': 'فن رقمي',
        'projects.tags.advertising': 'إعلان',
        'projects.tags.photography': 'تصوير',
        'projects.tags.marketing': 'تسويق',
        'projects.viewCase': 'عرض دراسة الحالة',
        'services.title': 'خدمات التصميم',
        'services.subtitle': 'تحويل الرؤى إلى واقع بصري',
        'services.service1.title': 'تصميم الويب',
        'services.service1.description': 'تصاميم مواقع ويب معاصرة تجمع بين الجمالية والوظيفة، مع التركيز على تجربة المستخدم والأداء.',
        'services.service2.title': 'الهوية البصرية',
        'services.service2.description': 'أنظمة هوية بصرية كاملة تعبر عن قيم العلامة التجارية وتخلق انطباعات لا تنسى.',
        'services.service3.title': 'الفن الرقمي',
        'services.service3.description': 'محتوى بصري جذاب لوسائل التواصل الاجتماعي يعزز حضور العلامة التجارية ويواكب الاتجاهات الحديثة.',
        'gallery.title': 'المعرض البصري',
        'gallery.subtitle': 'مجموعة مختارة من التعبيرات الفنية',
        'gallery.item1': 'تصميم تجريدي',
        'gallery.item2': 'طباعة رقمية',
        'gallery.item3': 'فن الخط العربي',
        'gallery.item4': 'تلوين رقمي',
        'gallery.item5': 'تصميم هندسي',
        'gallery.item6': 'فن سينمائي',
        'contact.title': 'لنتواصل',
        'contact.subtitle': 'مستعد لتحويل رؤيتك إلى واقع؟',
        'contact.heading': 'تواصل معي',
        'contact.description': 'هل لديك مشروع في ذهنك؟ يسعدني سماع أفكارك. لنتناقش حول كيفية تحويل رؤيتك إلى واقع.',
        'contact.emailTitle': 'البريد الإلكتروني',
        'contact.phoneTitle': 'الهاتف',
        'contact.locationTitle': 'الموقع',
        'contact.location': 'متاح عالمياً',
        'contact.form.name': 'اسمك',
        'contact.form.email': 'البريد الإلكتروني',
        'contact.form.message': 'تفاصيل المشروع',
        'contact.form.submit': 'إرسال الرسالة',
        'contact.socialTitle': 'تابع أعمالي',
        'modal.overview': 'نظرة عامة على المشروع',
        'modal.services': 'الخدمات المقدمة',
        'modal.startProject': 'ابدأ مشروعاً مماثلاً',
        'footer.rights': 'جميع الحقوق محفوظة'
    }
};

function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// دالة مساعدة لإضافة تأثيرات CSS
function addGlobalStyles() {
    const styles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-bg-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 9999;
            animation: fadeInUp 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        
        .notification--success {
            border-color: rgba(76, 175, 80, 0.3);
            color: #4CAF50;
        }
        
        .notification i {
            font-size: 1.25rem;
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                top: 80px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// إضافة الأنماط العامة عند التحميل
addGlobalStyles();