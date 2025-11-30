// American Harvest Foods - JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // GSAP Timeline for page load animations
    const tl = gsap.timeline();
    
    // Animate navigation
    tl.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    })
    
    // Animate hero section
    .from('h1', {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)"
    }, "-=0.5")
    
    .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5");

    // Animate sections on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate cards
    gsap.utils.toArray('.card').forEach((card, index) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // GSAP smooth scroll
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 100
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Form validation and submission
    const form = document.querySelector('.contest-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.submit-btn');

    if (form) {
        // Real-time validation
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            
            if (isNameValid && isEmailValid) {
                submitForm();
            } else {
                // Shake animation for invalid form
                gsap.to(form, {
                    x: [-10, 10, -10, 10, 0],
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            }
        });
    }

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        const isValid = name.length >= 2;
        
        if (!isValid) {
            showValidationError(nameInput, 'Name must be at least 2 characters long');
        } else {
            clearValidationError(nameInput);
        }
        
        return isValid;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        if (!isValid) {
            showValidationError(emailInput, 'Please enter a valid email address');
        } else {
            clearValidationError(emailInput);
        }
        
        return isValid;
    }

    function showValidationError(input, message) {
        clearValidationError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.textAlign = 'center';
        errorElement.style.marginTop = '5px';
        
        input.parentNode.appendChild(errorElement);
        
        // Error animation
        gsap.from(errorElement, {
            opacity: 0,
            y: -10,
            duration: 0.3
        });
        
        // Input border animation
        gsap.to(input, {
            borderColor: '#e74c3c',
            boxShadow: '0 0 10px rgba(231, 76, 60, 0.3)',
            duration: 0.3
        });
    }

    function clearValidationError(input) {
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        // Reset input styling
        gsap.to(input, {
            borderColor: 'transparent',
            boxShadow: 'none',
            duration: 0.3
        });
    }

    function submitForm() {
        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Success animation
            gsap.to(form, {
                scale: 0.95,
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you! Your entry has been submitted.';
            successMessage.style.color = '#27ae60';
            successMessage.style.fontSize = '1.1rem';
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '20px';
            successMessage.style.backgroundColor = 'rgba(39, 174, 96, 0.1)';
            successMessage.style.borderRadius = '10px';
            successMessage.style.marginTop = '20px';
            
            form.appendChild(successMessage);
            
            // Animate success message
            gsap.from(successMessage, {
                opacity: 0,
                y: 20,
                duration: 0.5
            });
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                successMessage.remove();
                submitBtn.textContent = 'Submit';
                submitBtn.disabled = false;
            }, 3000);
            
        }, 1500);
    }

    // Parallax effect for background
    gsap.to('body', {
        backgroundPosition: '50% 100px',
        ease: "none",
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Hover animations for cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            gsap.from(img, {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        });
    });

    // Accessibility: Respect reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.clear();
        gsap.set('*', {clearProps: 'all'});
    }

    console.log('🦃 American Harvest Foods - JavaScript loaded successfully!');
});
