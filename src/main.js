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