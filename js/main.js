/* ==========================================================================
   NayePankh Foundation - Main JavaScript Controller
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPreloader();
    initStickyHeader();
    initMobileNav();
    initThemeToggle();
    initScrollToTop();
    initStatsCounter();
    initTestimonialSlider();
    initFaqAccordion();
    initGalleryFilterAndLightbox();
    initFormValidations();
    initNavbarDropdowns();
    initSearchOverlay();
    initFloatingCTAs();
    initSocialShare();
    initBeforeAfterSlider();
    initModalControls();
});

/* ==========================================================================
   1. Page Preloader
   ========================================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 600); // Wait for the transition to finish before removing
        });
        
        // Safety timeout to ensure loader disappears even if assets take too long
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => preloader.remove(), 600);
            }
        }, 3000);
    }
}

/* ==========================================================================
   2. Sticky Header & Scroll Progress
   ========================================================================== */
function initStickyHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        // Sticky Header toggle
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Scroll Progress Bar Update
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (windowHeight > 0) {
            const scrollPercentage = (window.scrollY / windowHeight) * 100;
            document.documentElement.style.setProperty('--scroll-progress', `${scrollPercentage}%`);
        }
    });
}

/* ==========================================================================
   3. Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        // Toggle mobile drawer
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Adjust ARIA labels
            const isOpen = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
        
        // Close menu on navigation link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside the menu drawer
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Accessibility Esc key support to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }
}

/* ==========================================================================
   4. Dark & Light Theme State Management
   ========================================================================== */
function initThemeToggle() {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (!toggleBtn) return;
    
    // Check saved local storage theme or media preferences
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        toggleBtn.setAttribute('aria-label', `Switch to ${savedTheme === 'dark' ? 'light' : 'dark'} mode`);
    } else if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
    
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme === 'light') {
            newTheme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleBtn.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
        
        // Show a brief theme transition notification toast
        showToast(`Theme switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'success');
    });
}

/* ==========================================================================
   5. Back to Top Button
   ========================================================================== */
function initScrollToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   6. Statistics Counter Animation
   ========================================================================== */
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statsSection || statNumbers.length === 0) return;
    
    let animated = false;
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let current = 0;
        
        // Higher step for larger numbers to fit duration
        const increment = target > 5000 ? Math.ceil(target / 100) : 1;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('en-IN') + (element.getAttribute('data-suffix') || '');
                clearInterval(timer);
            } else {
                element.textContent = current.toLocaleString('en-IN') + (element.getAttribute('data-suffix') || '');
            }
        }, stepTime);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                statNumbers.forEach(num => countUp(num));
                animated = true;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(statsSection);
}

/* ==========================================================================
   7. Testimonials Slider
   ========================================================================== */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!slider || slides.length === 0) return;
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Create navigation dots dynamically
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    const updateDots = () => {
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
    
    const goToSlide = (index) => {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
        resetAutoPlay();
    };
    
    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto Play Slides
    const startAutoPlay = () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    };
    
    const resetAutoPlay = () => {
        clearInterval(autoSlideInterval);
        startAutoPlay();
    };
    
    // Touch support (swipe) for slider
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            nextSlide(); // Swiped Left, show next
        } else if (touchEndX - touchStartX > threshold) {
            prevSlide(); // Swiped Right, show prev
        }
    };
    
    // Pause auto slide on hover
    const testimonialBox = document.querySelector('.slider-container');
    if (testimonialBox) {
        testimonialBox.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        testimonialBox.addEventListener('mouseleave', startAutoPlay);
    }
    
    startAutoPlay();
}

/* ==========================================================================
   8. FAQ Accordion (Donate Page)
   ========================================================================== */
function initFaqAccordion() {
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isOpen = currentItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-content').style.maxHeight = null;
                item.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked item if it was closed
            if (!isOpen) {
                currentItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                
                const content = currentItem.querySelector('.faq-content');
                // Set max-height to scrollHeight to animate open
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/* ==========================================================================
   9. Gallery Filtering and Lightbox Preview
   ========================================================================== */
function initGalleryFilterAndLightbox() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    if (galleryItems.length === 0) return;
    
    // Grid Filter Logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Trigger dynamic reveal entry
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox Logic
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-arrow.prev');
    const lightboxNext = document.querySelector('.lightbox-arrow.next');
    
    if (!lightbox) return;
    
    let visibleItemsArray = [];
    let currentLightboxIdx = 0;
    
    // Open Lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Build current visible items array
            visibleItemsArray = Array.from(galleryItems).filter(i => i.style.display !== 'none');
            currentLightboxIdx = visibleItemsArray.indexOf(item);
            
            updateLightboxContent();
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden'; // Lock scrolling
        });
    });
    
    const updateLightboxContent = () => {
        if (visibleItemsArray.length === 0) return;
        const currentItem = visibleItemsArray[currentLightboxIdx];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('h3').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
        lightboxCaption.textContent = title;
    };
    
    const nextLightboxItem = () => {
        currentLightboxIdx = (currentLightboxIdx + 1) % visibleItemsArray.length;
        updateLightboxContent();
    };
    
    const prevLightboxItem = () => {
        currentLightboxIdx = (currentLightboxIdx - 1 + visibleItemsArray.length) % visibleItemsArray.length;
        updateLightboxContent();
    };
    
    if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxItem);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxItem);
    
    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = 'auto'; // Restore scroll
    };
    
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation in lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('open')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextLightboxItem();
            if (e.key === 'ArrowLeft') prevLightboxItem();
        }
    });
}

/* ==========================================================================
   10. Form Validations (Volunteer, Contact, Newsletter, and Tier auto-fill)
   ========================================================================== */
function initFormValidations() {
    // 10a. Toast Notifications Builder
    window.showToast = function(message, type = 'success') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast glass-card ${type}`;
        
        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Automatically remove toast after animations complete (4.5 seconds)
        setTimeout(() => {
            toast.remove();
        }, 4500);
    };
    
    // 10b. Helper for marking input elements
    const setError = (element, message) => {
        const group = element.closest('.form-group');
        if (group) {
            group.classList.add('error');
            group.classList.remove('success');
            let errorMsg = group.querySelector('.form-error-msg');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'form-error-msg';
                group.appendChild(errorMsg);
            }
            errorMsg.textContent = message;
        }
    };
    
    const setSuccess = (element) => {
        const group = element.closest('.form-group');
        if (group) {
            group.classList.remove('error');
            group.classList.add('success');
        }
    };
    
    // 10c. Validation RegExes
    const isValidEmail = (email) => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
    };
    
    const isValidPhone = (phone) => {
        return /^[6-9]\d{9}$/.test(phone.trim()); // 10 digit Indian Phone Format
    };
    
    // 10d. Volunteer Registration Form
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            const name = document.getElementById('vol-name');
            const email = document.getElementById('vol-email');
            const phone = document.getElementById('vol-phone');
            const city = document.getElementById('vol-city');
            const skills = document.getElementById('vol-skills');
            const message = document.getElementById('vol-message');
            
            // Name Check
            if (name.value.trim() === '') {
                setError(name, 'Full Name is required');
                isFormValid = false;
            } else {
                setSuccess(name);
            }
            
            // Email Check
            if (email.value.trim() === '') {
                setError(email, 'Email address is required');
                isFormValid = false;
            } else if (!isValidEmail(email.value)) {
                setError(email, 'Please provide a valid email format');
                isFormValid = false;
            } else {
                setSuccess(email);
            }
            
            // Phone Check
            if (phone.value.trim() === '') {
                setError(phone, 'Phone number is required');
                isFormValid = false;
            } else if (!isValidPhone(phone.value)) {
                setError(phone, 'Please provide a valid 10-digit number (starting with 6-9)');
                isFormValid = false;
            } else {
                setSuccess(phone);
            }
            
            // City Check
            if (city.value.trim() === '') {
                setError(city, 'City name is required');
                isFormValid = false;
            } else {
                setSuccess(city);
            }
            
            // Skills Selector Check
            if (skills.value === '') {
                setError(skills, 'Please select your skill area');
                isFormValid = false;
            } else {
                setSuccess(skills);
            }
            
            if (isFormValid) {
                showToast('Registration submitted successfully! Our team will contact you soon.', 'success');
                volunteerForm.reset();
                // Clear validation classes
                volunteerForm.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('success'));
            } else {
                showToast('Please fix the errors in the registration form.', 'error');
            }
        });
    }
    
    // 10e. Contact Page Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            const name = document.getElementById('contact-name');
            const email = document.getElementById('contact-email');
            const subject = document.getElementById('contact-subject');
            const message = document.getElementById('contact-message');
            
            if (name.value.trim() === '') {
                setError(name, 'Name is required');
                isFormValid = false;
            } else {
                setSuccess(name);
            }
            
            if (email.value.trim() === '') {
                setError(email, 'Email is required');
                isFormValid = false;
            } else if (!isValidEmail(email.value)) {
                setError(email, 'Please enter a valid email format');
                isFormValid = false;
            } else {
                setSuccess(email);
            }
            
            if (subject.value.trim() === '') {
                setError(subject, 'Subject is required');
                isFormValid = false;
            } else {
                setSuccess(subject);
            }
            
            if (message.value.trim() === '') {
                setError(message, 'Message content cannot be blank');
                isFormValid = false;
            } else {
                setSuccess(message);
            }
            
            if (isFormValid) {
                showToast('Thank you for contacting us! We will get back to you shortly.', 'success');
                contactForm.reset();
                contactForm.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('success'));
            } else {
                showToast('Please fill out the contact form fields correctly.', 'error');
            }
        });
    }
    
    // 10f. Footer & CTA Newsletter Subscription
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (input && isValidEmail(input.value)) {
                showToast('Successfully subscribed to our newsletter! Thank you.', 'success');
                input.value = '';
            } else {
                showToast('Please enter a valid email address.', 'error');
            }
        });
    });
    
    // 10g. Donate Page Custom Form and Tier Selection
    const tierCards = document.querySelectorAll('.tier-card');
    const amountInput = document.getElementById('donate-amount');
    
    if (tierCards.length > 0 && amountInput) {
        tierCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove selected state
                tierCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                const amt = card.getAttribute('data-amount');
                amountInput.value = amt;
                setSuccess(amountInput);
            });
        });
        
        // Remove tier card selection on typing custom amount
        amountInput.addEventListener('input', () => {
            tierCards.forEach(c => c.classList.remove('selected'));
        });
    }
    
    const donateForm = document.getElementById('donation-form');
    if (donateForm) {
        // Payment methods selection
        const payMethods = document.querySelectorAll('.pay-method-btn');
        let selectedMethod = 'upi';
        
        payMethods.forEach(method => {
            method.addEventListener('click', () => {
                payMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
                selectedMethod = method.getAttribute('data-method');
            });
        });
        
        donateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            const name = document.getElementById('donate-name');
            const email = document.getElementById('donate-email');
            const amount = document.getElementById('donate-amount');
            
            if (name.value.trim() === '') {
                setError(name, 'Name is required');
                isFormValid = false;
            } else {
                setSuccess(name);
            }
            
            if (email.value.trim() === '') {
                setError(email, 'Email is required');
                isFormValid = false;
            } else if (!isValidEmail(email.value)) {
                setError(email, 'Please enter a valid email address');
                isFormValid = false;
            } else {
                setSuccess(email);
            }
            
            if (amount.value.trim() === '' || isNaN(amount.value) || parseFloat(amount.value) <= 0) {
                setError(amount, 'Please enter a valid donation amount greater than 0');
                isFormValid = false;
            } else {
                setSuccess(amount);
            }
            
            if (isFormValid) {
                showToast(`Donation of ₹${amount.value} received via ${selectedMethod.toUpperCase()}! Thank you for your support.`, 'success');
                donateForm.reset();
                tierCards.forEach(c => c.classList.remove('selected'));
                donateForm.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('success'));
            } else {
                showToast('Please fill out the donation details correctly.', 'error');
            }
        });
    }

    // 10h. Event Registration Form in Modal validation
    const eventForm = document.getElementById('event-register-form');
    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;
            const name = document.getElementById('event-user-name');
            const email = document.getElementById('event-user-email');
            const phone = document.getElementById('event-user-phone');
            
            if (name.value.trim() === '') {
                setError(name, 'Name is required');
                isFormValid = false;
            } else {
                setSuccess(name);
            }
            
            if (email.value.trim() === '') {
                setError(email, 'Email is required');
                isFormValid = false;
            } else if (!isValidEmail(email.value)) {
                setError(email, 'Please enter a valid email address');
                isFormValid = false;
            } else {
                setSuccess(email);
            }
            
            if (phone.value.trim() === '') {
                setError(phone, 'Phone number is required');
                isFormValid = false;
            } else if (!isValidPhone(phone.value)) {
                setError(phone, 'Please enter a valid 10-digit phone number');
                isFormValid = false;
            } else {
                setSuccess(phone);
            }
            
            if (isFormValid) {
                const eventSelected = document.getElementById('event-selected-name').value;
                showToast(`Successfully registered for ${eventSelected}! We will contact you details.`, 'success');
                eventForm.reset();
                eventForm.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('success'));
                const eventModal = document.getElementById('event-register-modal');
                if (eventModal) {
                    eventModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            } else {
                showToast('Please fill out all registration fields correctly.', 'error');
            }
        });
    }

    // 10i. Career Application Form validation
    const careerForm = document.getElementById('career-apply-form');
    if (careerForm) {
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;
            const name = document.getElementById('career-user-name');
            const email = document.getElementById('career-user-email');
            const phone = document.getElementById('career-user-phone');
            const resume = document.getElementById('career-resume-link');
            const sop = document.getElementById('career-sop');
            
            if (name.value.trim() === '') {
                setError(name, 'Full Name is required');
                isFormValid = false;
            } else {
                setSuccess(name);
            }
            
            if (email.value.trim() === '') {
                setError(email, 'Email address is required');
                isFormValid = false;
            } else if (!isValidEmail(email.value)) {
                setError(email, 'Please enter a valid email address');
                isFormValid = false;
            } else {
                setSuccess(email);
            }
            
            if (phone.value.trim() === '') {
                setError(phone, 'Phone number is required');
                isFormValid = false;
            } else if (!isValidPhone(phone.value)) {
                setError(phone, 'Please enter a valid 10-digit phone number');
                isFormValid = false;
            } else {
                setSuccess(phone);
            }
            
            if (resume.value.trim() === '') {
                setError(resume, 'Resume drive link is required');
                isFormValid = false;
            } else {
                setSuccess(resume);
            }
            
            if (sop.value.trim() === '') {
                setError(sop, 'Statement of purpose is required');
                isFormValid = false;
            } else {
                setSuccess(sop);
            }
            
            if (isFormValid) {
                const roleSelected = document.getElementById('career-selected-role').value;
                showToast(`Application for ${roleSelected} submitted successfully! Our HR team will reach out.`, 'success');
                careerForm.reset();
                careerForm.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('success'));
                const careerModal = document.getElementById('career-apply-modal');
                if (careerModal) {
                    careerModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            } else {
                showToast('Please fill out all application fields correctly.', 'error');
            }
        });
    }
}

/* ==========================================================================
   11. Navbar Dropdown Toggles (Mobile & Keyboard accessibility)
   ========================================================================== */
function initNavbarDropdowns() {
    const dropdownToggle = document.querySelector('.dropdown-toggle-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownToggle.classList.toggle('active');
            dropdownMenu.classList.toggle('active');
            
            const isOpen = dropdownMenu.classList.contains('active');
            dropdownToggle.setAttribute('aria-expanded', isOpen);
        });
        
        // Handle keyboard escape inside dropdown
        dropdownMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdownToggle.classList.remove('active');
                dropdownMenu.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
                dropdownToggle.focus();
            }
        });
    }
}

/* ==========================================================================
   12. Static Search System
   ========================================================================== */
function initSearchOverlay() {
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchOverlay || !searchBtn) return;
    
    // Static Page Index for Search
    const searchIndex = [
        { title: "Home Page - Empowering Communities", desc: "Join NayePankh in creating meaningful social impact through youth education, food drives, and hygiene.", url: "index.html" },
        { title: "About Us - Who We Are", desc: "Understand our organization story, timeline, core values (integrity, compassion), mission, and vision.", url: "about.html" },
        { title: "Programs - Core Initiatives", desc: "Explore our programs: Education, Food Distribution, Hygiene, Clothing, Women Empowerment, and Animal Welfare.", url: "programs.html" },
        { title: "Volunteer Opportunity", desc: "Become a volunteer! Learn about open areas: web dev, graphic design, social media, teaching, and event management.", url: "volunteer.html" },
        { title: "Donate to NayePankh - Tax Benefits", desc: "Make a contribution to support children's schooling, buy hygiene kits, or serve food. Includes tax receipts.", url: "donate.html" },
        { title: "Photo & Video Gallery", desc: "A collection of frames documenting food drives, school supplies distribution, and active youth coordinators.", url: "gallery.html" },
        { title: "Events - Upcoming & Past Projects", desc: "Find details on upcoming campaigns (slum teaching, cleanliness) and view our active projects timeline.", url: "events.html" },
        { title: "Success Stories - Before / After Cases", desc: "Read real stories of change, from Rahul's flight to school to slums transitioning to clean sanitary hygiene.", url: "success-stories.html" },
        { title: "Media Coverage & Newspapers", desc: "See newspaper clippings, TV broadcasts, awards, and our public recognition timeline.", url: "media-coverage.html" },
        { title: "Careers / Internships - Open Positions", desc: "Apply for virtual and in-person internships with certifications and letter of recommendations.", url: "careers.html" },
        { title: "Contact Us - Offices & Channels", desc: "Find our official email, address, and interactive OpenStreetMap links. Direct connections to social networks.", url: "contact.html" }
    ];
    
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 100);
    });
    
    const closeSearch = () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        searchInput.value = '';
        searchResults.innerHTML = '';
    };
    
    searchClose.addEventListener('click', closeSearch);
    
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay || e.target.classList.contains('search-overlay-container') || e.target.classList.contains('search-overlay')) {
            closeSearch();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });
    
    // Live Search Trigger
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        
        if (query.length < 2) return;
        
        const matches = searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query)
        );
        
        if (matches.length === 0) {
            searchResults.innerHTML = `<div class="search-empty">No matching results found for "${e.target.value}"</div>`;
            return;
        }
        
        matches.forEach(match => {
            const item = document.createElement('a');
            item.href = match.url;
            item.className = 'search-item';
            item.innerHTML = `
                <h4>${match.title}</h4>
                <p>${match.desc}</p>
            `;
            searchResults.appendChild(item);
        });
    });
}

/* ==========================================================================
   13. Floating CTAs
   ========================================================================== */
function initFloatingCTAs() {
    const ctasContainer = document.querySelector('.floating-ctas-container');
    if (!ctasContainer) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            ctasContainer.classList.add('active');
        } else {
            ctasContainer.classList.remove('active');
        }
    });
}

/* ==========================================================================
   14. Social Share Buttons & Main Float Share
   ========================================================================== */
function initSocialShare() {
    const shareBtnMain = document.querySelector('.share-btn-main');
    const shareModalOverlay = document.querySelector('.share-modal-overlay');
    const stickyWidget = document.querySelector('.social-share-widget');
    
    if (stickyWidget) {
        if (window.scrollY > 400) {
            stickyWidget.classList.add('active');
        }
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                stickyWidget.classList.add('active');
            } else {
                stickyWidget.classList.remove('active');
            }
        });
    }
    
    if (shareBtnMain && shareModalOverlay) {
        const shareModalClose = shareModalOverlay.querySelector('.search-close') || shareModalOverlay;
        shareBtnMain.addEventListener('click', (e) => {
            e.preventDefault();
            // If native Web Share API is available (primarily mobile)
            if (navigator.share) {
                navigator.share({
                    title: 'NayePankh Foundation',
                    text: 'Giving Wings to Dreams - Check out NayePankh Foundation website.',
                    url: window.location.href
                }).catch(err => console.log('Error sharing:', err));
            } else {
                // Open custom share modal
                shareModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        if (shareModalClose) {
            shareModalClose.addEventListener('click', (e) => {
                if (e.target === shareModalOverlay || e.target.classList.contains('share-modal-overlay') || e.target.classList.contains('search-close') || e.target.closest('.search-close')) {
                    shareModalOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
    
    // Connect share actions inside widgets/modals
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('NayePankh Foundation - Giving Wings to Dreams. Support youth welfare and education!');
            
            let shareUrl = '';
            
            if (platform === 'facebook') {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (platform === 'linkedin') {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            } else if (platform === 'twitter') {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            } else if (platform === 'whatsapp') {
                shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
            } else if (platform === 'copy') {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showToast('Link copied to clipboard!', 'success');
                }).catch(err => {
                    showToast('Failed to copy link.', 'error');
                });
                return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=450,noopener,noreferrer');
            }
        });
    });
}

/* ==========================================================================
   15. Interactive Before/After Image Comparison Slider
   ========================================================================== */
function initBeforeAfterSlider() {
    const container = document.querySelector('.ba-slider-container');
    if (!container) return;
    
    const afterImg = container.querySelector('.ba-after');
    const handle = container.querySelector('.ba-handle');
    
    let active = false;
    
    // Desktop and laptop mouse actions
    const slideMove = (clientX) => {
        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        
        afterImg.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    };
    
    container.addEventListener('mousedown', () => { active = true; });
    window.addEventListener('mouseup', () => { active = false; });
    
    container.addEventListener('mousemove', (e) => {
        if (!active) return;
        slideMove(e.clientX);
    });
    
    // Mobile touch actions
    container.addEventListener('touchstart', () => { active = true; }, { passive: true });
    window.addEventListener('touchend', () => { active = false; });
    
    container.addEventListener('touchmove', (e) => {
        if (!active) return;
        slideMove(e.touches[0].clientX);
    }, { passive: true });
}

/* ==========================================================================
   16. Career Application & Event Registration Modal Toggles
   ========================================================================== */
function initModalControls() {
    // 16a. Event Registration Modal
    const registerButtons = document.querySelectorAll('.register-event-btn');
    const eventModal = document.getElementById('event-register-modal');
    const eventClose = document.querySelector('.event-modal-close');
    const selectedEventInput = document.getElementById('event-selected-name');
    
    if (eventModal) {
        registerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const eventName = btn.getAttribute('data-event');
                if (selectedEventInput && eventName) {
                    selectedEventInput.value = eventName;
                }
                eventModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        const closeEventModal = () => {
            eventModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        
        if (eventClose) eventClose.addEventListener('click', closeEventModal);
        
        eventModal.addEventListener('click', (e) => {
            if (e.target === eventModal) closeEventModal();
        });
    }
    
    // 16b. Career Application Modal
    const applyButtons = document.querySelectorAll('.apply-role-btn');
    const careerModal = document.getElementById('career-apply-modal');
    const careerClose = document.querySelector('.career-close') || document.querySelector('.career-modal-close');
    const selectedRoleInput = document.getElementById('career-selected-role');
    
    if (careerModal) {
        applyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const roleName = btn.getAttribute('data-role');
                if (selectedRoleInput && roleName) {
                    selectedRoleInput.value = roleName;
                }
                careerModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        const closeCareerModal = () => {
            careerModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        
        if (careerClose) careerClose.addEventListener('click', closeCareerModal);
        
        careerModal.addEventListener('click', (e) => {
            if (e.target === careerModal) closeCareerModal();
        });
    }
}

