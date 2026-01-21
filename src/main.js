/**
 * DELTA-MINT.FIT — Главный файл скриптов
 * Дата: 2026 год
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ИНИЦИАЛИЗАЦИЯ БИБЛИОТЕК ---
    
    // Иконки Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Плавный скролл Lenis
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 2. ХЕДЕР: СКРОЛЛ-ЭФФЕКТЫ ---
    
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
            header.style.padding = '12px 0';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'transparent';
            header.style.padding = '20px 0';
            header.style.backdropFilter = 'none';
        }
    });

    // --- 3. HERO: ИНТЕРАКТИВНЫЙ CANAVAS (BLOB) ---
    
    const canvas = document.getElementById('canvas-webgl');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h, particles = [];
        let mouseX = 0, mouseY = 0;

        function initCanvas() {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
            mouseX = w / 2;
            mouseY = h / 2;
        }

        window.addEventListener('resize', initCanvas);
        initCanvas();

        class BlobParticle {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 120 + 60;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                let dx = mouseX - this.x;
                let dy = mouseY - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 400) {
                    this.x += dx * 0.005;
                    this.y += dy * 0.005;
                }

                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 171, 0.4)';
                ctx.fill();
            }
        }

        for (let i = 0; i < 6; i++) particles.push(new BlobParticle());

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        function animateCanvas() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    // --- 4. МОБИЛЬНОЕ МЕНЮ (ФИКС ОШИБКИ ПРОЗРАЧНОСТИ) ---
    
    const menuBtn = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    function toggleMenu() {
        const isActive = mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        if (isActive) {
            document.body.style.overflow = 'hidden';
            // Используем fromTo чтобы избежать "залипания" opacity
            gsap.fromTo(mobileLinks, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.2 }
            );
        } else {
            document.body.style.overflow = '';
            gsap.to(mobileLinks, { opacity: 0, y: 20, duration: 0.3 });
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- 5. BENEFITS: СЛАЙДЕР SWIPER ---
    
    if (document.querySelector('.benefits-slider')) {
        new Swiper('.benefits-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // --- 6. INNOVATIONS: АККОРДЕОН ---
    
    const accordionItems = document.querySelectorAll('.accordion__item');
    accordionItems.forEach(item => {
        item.querySelector('.accordion__header').addEventListener('click', () => {
            accordionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Имитация смены изображения
            const img = document.getElementById('innovation-img');
            if (img) {
                gsap.to(img, { opacity: 0, duration: 0.3, onComplete: () => {
                    gsap.to(img, { opacity: 1, duration: 0.3 });
                }});
            }
        });
    });

    // --- 7. EDUCATION: ТИЛТ-ЭФФЕКТ (3D НАКЛОН) ---
    
    const eduCards = document.querySelectorAll('.edu-card');
    eduCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
                rotationY: x * 15,
                rotationX: -y * 15,
                transformPerspective: 1000,
                ease: "power1.out",
                duration: 0.5
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5 });
        });
    });

    // --- 8. КОНТАКТНАЯ ФОРМА: ВАЛИДАЦИЯ И КАПЧА ---
    
    const captchaLabel = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('captcha-answer');
    const phoneInput = document.getElementById('phone');
    const contactForm = document.getElementById('ai-contact-form');
    let correctSum;

    function refreshCaptcha() {
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        correctSum = a + b;
        if (captchaLabel) captchaLabel.innerText = `${a} + ${b}`;
    }

    if (captchaLabel) refreshCaptcha();

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== correctSum) {
                alert('Неверный ответ капчи!');
                refreshCaptcha();
                return;
            }

            const btn = contactForm.querySelector('button');
            btn.innerText = 'ОТПРАВЛЯЕМ...';
            btn.disabled = true;

            setTimeout(() => {
                document.getElementById('form-success').style.display = 'flex';
                contactForm.reset();
                refreshCaptcha();
                btn.disabled = false;
                btn.innerText = 'НАЧАТЬ СЕЙЧАС';
                
                setTimeout(() => {
                    document.getElementById('form-success').style.display = 'none';
                }, 4000);
            }, 1500);
        });
    }

    // --- 9. COOKIE POPUP ---
    
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptCookies = document.getElementById('accept-cookies');

    if (cookiePopup && !localStorage.getItem('cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 3000);
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookies_accepted', 'true');
            cookiePopup.classList.remove('active');
        });
    }
});