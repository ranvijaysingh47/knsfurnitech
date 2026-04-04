/* ================================================================
   hero.js — KNS Furnitech | Brand-Matched Hero Slider
   Auto-play · Ken Burns · Progress bar · Dot nav · Arrow nav
   Keyboard · Touch swipe support
   ================================================================ */

(function () {
    'use strict';

    const INTERVAL  = 5000;  // ms per slide
    const TOTAL     = 4;

    let current  = 0;
    let timer    = null;
    let progTimer= null;
    let isAnimating = false;

    /* ── Element refs ── */
    const slides    = document.querySelectorAll('.kns-slide');
    const dots      = document.querySelectorAll('.kns-dot');
    const progress  = document.getElementById('knsProgress');
    const curLabel  = document.getElementById('knsCur');

    if (!slides.length) return;

    /* ── Go to slide ── */
    function goTo(index, direction) {
        if (isAnimating || index === current) return;
        isAnimating = true;

        slides[current].classList.remove('is-active');
        dots[current].classList.remove('is-active');

        current = (index + TOTAL) % TOTAL;

        slides[current].classList.add('is-active');
        dots[current].classList.add('is-active');

        if (curLabel) curLabel.textContent = String(current + 1).padStart(2, '0');

        /* Restart progress bar */
        restartProgress();

        setTimeout(() => { isAnimating = false; }, 800);
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    /* ── Progress Bar ── */
    function restartProgress() {
        if (!progress) return;
        progress.classList.remove('running');
        progress.style.transition = 'none';
        progress.style.width = '0%';

        /* Force reflow */
        void progress.offsetWidth;

        setTimeout(() => {
            progress.style.transition = `width ${INTERVAL}ms linear`;
            progress.style.width = '100%';
        }, 30);
    }

    /* ── Auto-play ── */
    function startAuto() {
        stopAuto();
        timer = setInterval(next, INTERVAL);
    }

    function stopAuto() {
        clearInterval(timer);
        timer = null;
    }

    /* ── Event Listeners ── */

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.dataset.goto, 10);
            stopAuto();
            goTo(idx);
            startAuto();
        });
    });

    /* Keyboard navigation */
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
        if (e.key === 'ArrowLeft')  { stopAuto(); prev(); startAuto(); }
    });

    /* Touch / swipe support */
    let touchStartX = 0;
    const hero = document.getElementById('hero');
    if (hero) {
        hero.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        hero.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 50) {
                stopAuto();
                dx < 0 ? next() : prev();
                startAuto();
            }
        }, { passive: true });
    }

    /* Pause on hover */
    if (hero) {
        hero.addEventListener('mouseenter', stopAuto);
        hero.addEventListener('mouseleave', startAuto);
    }

    /* ── Boot ── */
    restartProgress();
    startAuto();

})();
