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

console.log('Delta-Mint Core Loaded');