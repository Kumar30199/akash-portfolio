/* 
 * Portfolio Main JavaScript
 * Author: Akash Kumar
 * Year: 2025
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. Theme Toggle (Light/Dark Mode)
    // =========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.setAttribute('data-feather', 'sun');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeIcon.setAttribute('data-feather', 'moon');
    }

    // Refresh icons after initial set
    if (window.feather) feather.replace();

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update Icon
        if (newTheme === 'dark') {
            themeIcon.setAttribute('data-feather', 'sun');
        } else {
            themeIcon.setAttribute('data-feather', 'moon');
        }

        if (window.feather) feather.replace();
    });

    // =========================================
    // 2. Smooth Scrolling
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // 3. Gallery Drag-to-Scroll
    // =========================================
    // =========================================
    // 3. Gallery Auto-Scroll & Drag
    // =========================================
    const gallery = document.querySelector('.gallery-scroll');

    if (gallery) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let animationId;
        const autoScrollSpeed = 0.5; // Adjust speed here

        // Auto Scroll Function
        const startAutoScroll = () => {
            stopAutoScroll(); // Prevent multiple loops
            const loop = () => {
                gallery.scrollLeft += autoScrollSpeed;

                // Infinite Loop Logic (Assuming content is duplicated)
                if (gallery.scrollLeft >= (gallery.scrollWidth / 2)) {
                    gallery.scrollLeft = 0;
                }

                animationId = requestAnimationFrame(loop);
            };
            animationId = requestAnimationFrame(loop);
        };

        const stopAutoScroll = () => {
            cancelAnimationFrame(animationId);
        };

        // Start Auto Scroll initially
        startAutoScroll();

        // Pause on Hover
        gallery.addEventListener('mouseenter', stopAutoScroll);
        gallery.addEventListener('mouseleave', () => {
            if (!isDown) startAutoScroll();
        });

        // Drag Functionality
        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            stopAutoScroll(); // Pause while dragging
            gallery.classList.add('active');
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
            gallery.style.cursor = 'grabbing';
        });

        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.classList.remove('active');
            gallery.style.cursor = 'grab';
            startAutoScroll(); // Resume after drag
        });

        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.classList.remove('active');
            gallery.style.cursor = 'grab';
            // Resume handled by mouseleave event above
        });

        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            gallery.scrollLeft = scrollLeft - walk;
        });

        // Touch support for mobile
        gallery.addEventListener('touchstart', () => {
            stopAutoScroll();
        });

        gallery.addEventListener('touchend', () => {
            startAutoScroll();
        });
    }

});
