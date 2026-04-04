/**
 * KNS Furnitech Hero Slider
 * Handles full-width cinematic hero transitions.
 */

const heroSlider = {
    slides: document.querySelectorAll('.slide'),
    dots: document.querySelectorAll('.pg-dot'),
    prevBtn: document.querySelector('.prev-btn'),
    nextBtn: document.querySelector('.next-btn'),
    currentIndex: 0,
    interval: null,
    autoplayDelay: 6000,

    init() {
        if (!this.slides.length) return;

        // Event Listeners
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
        });

        // Initialize Autoplay
        this.startAutoplay();

        // Pause on interaction
        const container = document.querySelector('.hero-slider-section');
        if (container) {
            container.addEventListener('mouseenter', () => this.stopAutoplay());
            container.addEventListener('mouseleave', () => this.startAutoplay());
        }
    },

    goToSlide(index) {
        // Remove active class from all
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        // Set current index
        this.currentIndex = index;
        if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
        if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;

        // Add active class to current
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
        
        // Reset animations
        const content = this.slides[this.currentIndex].querySelector('.slide-content');
        if (content) {
            content.style.animation = 'none';
            content.offsetHeight; // Trigger reflow
            content.style.animation = null;
        }
    },

    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    },

    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    },

    startAutoplay() {
        if (this.interval) return;
        this.interval = setInterval(() => this.nextSlide(), this.autoplayDelay);
    },

    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};

// Start the slider
document.addEventListener('DOMContentLoaded', () => {
    heroSlider.init();
});
