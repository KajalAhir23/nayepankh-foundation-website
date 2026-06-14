/* ==========================================================================
   NayePankh Foundation - Animations Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initButtonRipple();
    initCard3DTilt();
});

/* ==========================================================================
   1. AOS (Animate On Scroll) Library Setup
   ========================================================================== */
function initAOS() {
    // Check if AOS is loaded via CDN, otherwise log warning
    if (typeof AOS !== 'undefined') {
        AOS.init({
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
            
            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 100, // values from 0 to 3000, with step 50ms
            duration: 800, // values from 0 to 3000, with step 50ms
            easing: 'ease-out-cubic', // default easing for AOS animations
            once: true, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
        });
    } else {
        console.warn('AOS library not loaded yet. Make sure the script is properly loaded in HTML.');
    }
}

/* ==========================================================================
   2. Material Ripple Effect for Buttons
   ========================================================================== */
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn, .ripple-btn, .filter-btn, .slider-arrow');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Find coordinate inside button
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Add custom style directly (since styling is localized)
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.borderRadius = '50%';
            ripple.style.width = '150px';
            ripple.style.height = '150px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';
            
            // Append ripple
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Inject keyframes style dynamically if not defined in style.css
    if (!document.getElementById('ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.innerHTML = `
            @keyframes ripple-effect {
                to {
                    transform: translate(-50%, -50%) scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ==========================================================================
   3. Interactive 3D Card Parallax Tilt Effect
   ========================================================================== */
function initCard3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card, .glass-card, .story-card, .social-card');
    
    // Disable on touch devices to ensure smooth touch scrolling
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            
            // Coordinates relative to card center
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            const mouseX = e.clientX - cardRect.left - cardWidth / 2;
            const mouseY = e.clientY - cardRect.top - cardHeight / 2;
            
            // Calculate tilt angle (max 12 degrees)
            const angleX = -(mouseY / (cardHeight / 2)) * 10;
            const angleY = (mouseX / (cardWidth / 2)) * 10;
            
            // Apply translation values
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
            card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset transforms
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        });
    });
}
