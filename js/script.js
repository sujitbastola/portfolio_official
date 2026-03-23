document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. Intersection Observer for Scroll Animations
       ========================================================================= */
    const faders = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

    const appearOptions = {
        threshold: 0.15, // 15% of the element must be visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the bottom
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* =========================================================================
       2. 3D Card Flip Animation
       ========================================================================= */
    const flipContainer = document.getElementById('tilt-image');
    if (flipContainer) {
        flipContainer.addEventListener('click', () => {
            flipContainer.classList.toggle('flipped');
        });

        // Optional: Auto flip back after 5 seconds
        flipContainer.addEventListener('click', function handleFlip() {
            const timeout = setTimeout(() => {
                flipContainer.classList.remove('flipped');
            }, 5000);

            // Clear previous timeout if user clicks again
            if (this.flipTimeout) clearTimeout(this.flipTimeout);
            this.flipTimeout = timeout;
        });
    }

});
