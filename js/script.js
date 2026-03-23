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
       2. 3D Tilt Hover Effect Logic
       ========================================================================= */
    const tiltBox = document.getElementById('tilt-image');
    if (tiltBox) {
        tiltBox.addEventListener('mousemove', (e) => {
            const rect = tiltBox.getBoundingClientRect();
            // Calculate mouse position relative to the center of the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // The further the mouse is from the center, the higher the rotation (max 15deg)
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;

            tiltBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset transform on mouse leave
        tiltBox.addEventListener('mouseleave', () => {
            tiltBox.style.transform = `rotateX(0deg) rotateY(0deg)`;
            tiltBox.style.transition = `transform 0.5s ease-out`; // smooth return back
        });

        // Remove the transition while moving so it doesn't drag/lag
        tiltBox.addEventListener('mouseenter', () => {
            tiltBox.style.transition = `transform 0.1s ease-out`;
        });
    }

});
