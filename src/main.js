// Инициализация иконок Lucide
lucide.createIcons();

// Инициализация Lenis (Smooth Scroll)
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Анимация хедера при скролле
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(18, 18, 18, 0.9)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.padding = '12px 0';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.padding = '20px 0';
    }
    
    lastScroll = currentScroll;
});

// Мобильное меню (базовая логика)
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
    // Здесь будет развертывание меню для мобильных
    console.log('Menu clicked');
});

// Интерактивный Blob в Hero секции
const canvas = document.getElementById('canvas-webgl');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function init() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', init);
    init();

    // Создаем "энергетические сгустки"
    class BlobParticle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 100 + 50;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
        }
        update(mouseX, mouseY) {
            this.x += this.vx;
            this.y += this.vy;

            // Притяжение к мыши
            let dx = mouseX - this.x;
            let dy = mouseY - this.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 300) {
                this.x += dx * 0.01;
                this.y += dy * 0.01;
            }

            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00FFAB';
            ctx.fill();
        }
    }

    for (let i = 0; i < 5; i++) particles.push(new BlobParticle());

    let mouseX = w/2, mouseY = h/2;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update(mouseX, mouseY);
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// GSAP анимация для декоративной линии
gsap.from('.hero__line', {
    scaleX: 0,
    duration: 1.5,
    ease: "expo.out",
    delay: 0.5
});
// Инициализация Swiper
const swiper = new Swiper('.benefits-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    mousewheel: {
        forceToAxis: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// Обновляем иконки Lucide для новых элементов
lucide.createIcons();
// Логика аккордеона
const accordionItems = document.querySelectorAll('.accordion__item');
const innovationImg = document.getElementById('innovation-img');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion__header');
    
    header.addEventListener('click', () => {
        // Убираем активный класс у всех
        accordionItems.forEach(i => i.classList.remove('active'));
        
        // Добавляем текущему
        item.classList.add('active');
        
        // Эффект смены картинки (имитация)
        if (innovationImg) {
            innovationImg.style.opacity = '0';
            setTimeout(() => {
                // В реальном проекте здесь менялся бы src на item.dataset.img
                innovationImg.style.opacity = '1';
            }, 300);
        }
    });
});
// Эффект легкого наклона карточек обучения
const cards = document.querySelectorAll('.edu-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        const dx = (x - xc) / 20;
        const dy = (y - yc) / 20;
        
        card.style.transform = `translateY(-10px) rotateX(${-dy}deg) rotateY(${dx}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `translateY(0) rotateX(0) rotateY(0)`;
    });
});

// Переинициализация иконок
lucide.createIcons();
// ГЕНЕРАЦИЯ КАПЧИ
const captchaQuestion = document.getElementById('captcha-question');
let captchaResult;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaResult = a + b;
    if (captchaQuestion) captchaQuestion.innerText = `${a} + ${b}`;
}

generateCaptcha();

// ВАЛИДАЦИЯ ТЕЛЕФОНА (Только цифры)
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// AJAX ОТПРАВКА (Имитация)
const contactForm = document.getElementById('ai-contact-form');
const successMessage = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userAnswer = parseInt(document.getElementById('captcha-answer').value);

    if (userAnswer !== captchaResult) {
        alert('Ошибка капчи. Пожалуйста, решите пример правильно.');
        generateCaptcha();
        return;
    }

    // Имитация задержки сервера
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'ОТПРАВКА...';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Показываем сообщение об успехе
        successMessage.style.display = 'flex';
        gsap.from(successMessage, { opacity: 0, y: 20, duration: 0.5 });
        
        // Сбрасываем форму через время
        setTimeout(() => {
            successMessage.style.display = 'none';
            contactForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            generateCaptcha();
        }, 5000);
    }, 1500);
});

lucide.createIcons();