// بورتفوليو خبير تسويق رقمي - إدارة حملات
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة المتغيرات
    let currentPage = 'home';
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const languageBtn = document.getElementById('languageBtn');
    
    // وظيفة تغيير الصفحة
    function changePage(pageId) {
        if (pageId === currentPage) return;
        
        // إخفاء جميع الصفحات
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // إزالة النشاط من جميع روابط التنقل
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // إظهار الصفحة المحددة
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // إضافة النشاط للرابط المحدد
            const targetLink = document.querySelector(`.navbar-link[data-page="${pageId}"]`);
            if (targetLink) {
                targetLink.classList.add('active');
            }
            
            // تحديث المتغير الحالي
            currentPage = pageId;
            
            // إغلاق القائمة على الأجهزة المحمولة
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
                navbarToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // تفعيل تأثيرات الصفحة
            setTimeout(() => {
                animatePageElements();
            }, 300);
            
            // التمرير إلى أعلى الصفحة
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // تبديل القائمة على الأجهزة المحمولة
    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        this.innerHTML = navbarMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // التنقل عبر روابط القائمة
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
        });
    });
    
    // التنقل عبر بطاقات الخدمات
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
        });
    });
    
    // التنقل عبر الأزرار
    document.querySelectorAll('.btn[data-page]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
        });
    });
    
    // تأثير عداد الإحصائيات
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // تأثيرات العناصر عند التمرير
    function animatePageElements() {
        const cards = document.querySelectorAll('.feature-card, .service-card, .stat-card, .campaign-card, .service-detail-card, .stat-large-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // تفعيل عداد الإحصائيات إذا كانت الصفحة الرئيسية
        if (currentPage === 'home') {
            setTimeout(animateStats, 500);
        }
    }
    
    // تفعيل تأثيرات المخططات
    function animateCharts() {
        const chartBars = document.querySelectorAll('.chart-bar-item .bar');
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.height = bar.style.height;
            }, index * 200);
        });
    }
    
    // إرسال نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // رسالة نجاح
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 30px;
                background: linear-gradient(135deg, #7C3AED, #2563EB);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(124, 58, 237, 0.3);
                z-index: 9999;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 12px;
                transform: translateX(150%);
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border: 2px solid rgba(124, 58, 237, 0.3);
            `;
            
            notification.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 20px;"></i>
                <span>شكراً لك! سنتواصل معك خلال 24 ساعة</span>
            `;
            
            document.body.appendChild(notification);
            
            // عرض الإشعار
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // إخفاء الإشعار بعد 4 ثواني
            setTimeout(() => {
                notification.style.transform = 'translateX(150%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 400);
            }, 4000);
            
            // إعادة تعيين النموذج
            contactForm.reset();
        });
    }
    
    // تأثيرات عند التمرير
    window.addEventListener('scroll', function() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .campaign-card');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // تأثيرات عند التحميل
    setTimeout(() => {
        animateStats();
        animatePageElements();
        animateCharts();
    }, 500);
    
    // تفعيل تأثيرات المخططات عند عرض صفحة الإحصائيات
    if (currentPage === 'stats') {
        setTimeout(animateCharts, 300);
    }
    
    // تفعيل تأثير التلاعب بالشكل
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // تأثيرات تفاعلية للأزرار
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
