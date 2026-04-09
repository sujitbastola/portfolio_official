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
       2. Typewriter Effect for Hero Subtitle
       ========================================================================= */
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const textToType = typewriterElement.innerText || "Software Engineering & BIT Student";
        typewriterElement.innerHTML = '';
        let charIndex = 0;

        function typeText() {
            if (charIndex < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 70); // typing speed
            }
        }
        
        // Slight delay to sync with CSS fade-in
        setTimeout(typeText, 800);
    }

    /* =========================================================================
       3. Dynamic 3D Hover & Tilt Effect - REMOVED
       ========================================================================= */
    // const tiltBox = document.getElementById('tilt-image');
    // if (tiltBox) {
    //     const pic = tiltBox.querySelector('.profile-pic');
        
    //     tiltBox.addEventListener('mousemove', (e) => {
    //         const rect = tiltBox.getBoundingClientRect();
    //         const x = e.clientX - rect.left; 
    //         const y = e.clientY - rect.top;  
            
    //         const centerX = rect.width / 2;
    //         const centerY = rect.height / 2;
            
    //         // Adjust sensitivity
    //         const rotateX = ((y - centerY) / centerY) * -20; 
    //         const rotateY = ((x - centerX) / centerX) * 20;
            
    //         pic.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    //         pic.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05) translateZ(30px)`;
            
    //         // Dynamic shadow effect based on tilt
    //         pic.style.boxShadow = `
    //             ${-rotateY * 0.8}px ${rotateX * 0.8 + 25}px 45px rgba(0,0,0,0.5), 
    //             0 0 50px rgba(76,114,115,0.6),
    //             inset 0 0 25px rgba(255, 255, 255, 0.3)
    //         `;
    //     });
        
    //     tiltBox.addEventListener('mouseleave', () => {
    //         pic.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    //         pic.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)';
    //         pic.style.boxShadow = ''; // Reverts to CSS default
    //     });
    // }

    /* =========================================================================
       4. Mobile Navbar Toggle
       ========================================================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
        });

        // Close menu when clicking on overlay
        mobileOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            mobileOverlay.classList.remove('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                mobileOverlay.classList.remove('active');
            });
        });
    }

});
