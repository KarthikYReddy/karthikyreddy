// Portfolio Website JavaScript Functionality

// Ensure DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
    }

    // Smooth Scrolling for Navigation Links - Fixed Implementation
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Navigation link clicked:', this.getAttribute('href'));
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                console.log('Target section:', targetId, targetSection);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navToggle && navMenu) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                    
                    // Calculate position
                    const headerHeight = 80; // Fixed header height
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    console.log('Scrolling to position:', targetPosition);
                    
                    // Perform smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(targetId);
                } else {
                    console.warn('Target section not found:', targetId);
                }
            }
        });
    });

    // Function to update active navigation link
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
                console.log('Active nav updated to:', activeId);
            }
        });
    }

    // Active Navigation Link Highlighting on Scroll
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150; // Offset for header

        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        if (currentSection) {
            updateActiveNavLink(currentSection);
        }
    }

    // Add scroll event listener for active navigation
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Contact Form Submission - Enhanced Implementation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Contact form submitted');
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (!nameInput || !emailInput || !messageInput) {
                console.error('Form inputs not found');
                return;
            }
            
            // Get values and trim whitespace
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            
            console.log('Form data:', { name, email, message: message.substring(0, 50) + '...' });
            
            // Basic form validation
            if (!name) {
                showNotification('Please enter your name.', 'error');
                nameInput.focus();
                return;
            }
            
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                emailInput.focus();
                return;
            }
            
            if (!message) {
                showNotification('Please enter a message.', 'error');
                messageInput.focus();
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
                return;
            }
            
            // Get submit button and show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            console.log('Form submission starting...');
            
            // Simulate form submission with timeout
            setTimeout(() => {
                console.log('Form submission completed');
                
                // Show success notification
                showNotification(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                
            }, 1200); // Longer delay for better UX
        });
    } else {
        console.warn('Contact form not found');
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Enhanced Notification System
    function showNotification(message, type = 'info') {
        console.log('Showing notification:', message, type);
        
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification container
        const notification = document.createElement('div');
        notification.className = `custom-notification custom-notification--${type}`;
        
        // Create message content
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        messageSpan.style.flex = '1';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.setAttribute('aria-label', 'Close notification');
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            padding: 0;
            margin-left: 12px;
            line-height: 1;
            opacity: 0.8;
            transition: opacity 0.2s ease;
        `;
        
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.opacity = '1';
        });
        
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.opacity = '0.8';
        });
        
        // Assemble notification
        notification.appendChild(messageSpan);
        notification.appendChild(closeButton);
        
        // Determine notification color
        let backgroundColor;
        let borderColor;
        
        switch(type) {
            case 'success':
                backgroundColor = '#059669';
                borderColor = '#10b981';
                break;
            case 'error':
                backgroundColor = '#dc2626';
                borderColor = '#ef4444';
                break;
            default:
                backgroundColor = '#2563eb';
                borderColor = '#3b82f6';
        }
        
        // Apply styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${backgroundColor};
            border: 2px solid ${borderColor};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            max-width: 400px;
            min-width: 300px;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            transform: translateX(120%);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            backdrop-filter: blur(8px);
            font-family: var(--font-family-base, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Force reflow and animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        console.log('Notification displayed');
        
        // Auto-remove after 5 seconds
        const autoRemoveTimer = setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Close button functionality
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            clearTimeout(autoRemoveTimer);
            removeNotification(notification);
        });
        
        // Click outside to close (optional)
        const outsideClickHandler = (e) => {
            if (!notification.contains(e.target)) {
                clearTimeout(autoRemoveTimer);
                removeNotification(notification);
                document.removeEventListener('click', outsideClickHandler);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', outsideClickHandler);
        }, 500);
    }
    
    function removeNotification(notification) {
        if (!notification || !notification.parentNode) return;
        
        console.log('Removing notification');
        
        notification.style.transform = 'translateX(120%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
                console.log('Notification removed');
            }
        }, 300);
    }

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        header.style.transition = 'transform 0.3s ease';
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show header
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Initialize active nav link on page load
    setTimeout(() => {
        highlightActiveNavLink();
        console.log('Initial active nav highlighting completed');
    }, 500);

    console.log('All event listeners initialized');
});

// Page loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    console.log('Page fully loaded');
});

// Handle clicks outside mobile menu to close it
document.addEventListener('click', function(e) {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu && 
        navMenu.classList.contains('active') &&
        !navToggle.contains(e.target) && 
        !navMenu.contains(e.target)) {
        
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add CSS for active nav links and loading animation
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .nav-link.active {
        color: var(--portfolio-accent) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .custom-notification {
        font-family: var(--font-family-base, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }
`;
document.head.appendChild(additionalStyles);