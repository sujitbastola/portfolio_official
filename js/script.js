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
       2. 3D Tilt Hover Effect Logic with Smooth Animations
       ========================================================================= */
    const tiltBox = document.getElementById('tilt-image');
    if (tiltBox) {
        let currentRotateX = 0;
        let currentRotateY = 0;
        let targetRotateX = 0;
        let targetRotateY = 0;
        let isMouseOver = false;

        const smoothTilt = () => {
            // Smooth lerp towards target rotation
            currentRotateX += (targetRotateX - currentRotateX) * 0.1;
            currentRotateY += (targetRotateY - currentRotateY) * 0.1;

            tiltBox.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
            
            if (isMouseOver || Math.abs(targetRotateX) > 0.1 || Math.abs(targetRotateY) > 0.1) {
                requestAnimationFrame(smoothTilt);
            }
        };

        tiltBox.addEventListener('mousemove', (e) => {
            if (!isMouseOver) return;

            const rect = tiltBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate target rotations (max 20deg for more pronounced effect)
            targetRotateX = ((y - centerY) / centerY) * -20; 
            targetRotateY = ((x - centerX) / centerX) * 20;

            tiltBox.style.transition = 'none';
            smoothTilt();
        });

        tiltBox.addEventListener('mouseenter', () => {
            isMouseOver = true;
            tiltBox.style.transition = 'none';
        });

        // Reset transform on mouse leave with smooth animation
        tiltBox.addEventListener('mouseleave', () => {
            isMouseOver = false;
            tiltBox.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            targetRotateX = 0;
            targetRotateY = 0;
            tiltBox.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

});
