// ============================================
// BestChildCare.org - JavaScript
// Premium interactions and functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    initHeroSlider();
    
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Smooth Scrolling
    initSmoothScroll();
    
    // Donation Amount Selection
    initDonationAmounts();
    
    // Navbar Scroll Effect
    initNavbarScroll();
    
    // Animation on Scroll
    initScrollAnimations();
});

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Auto-advance slides
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % totalSlides;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // Set interval for auto-slide (5 seconds)
    setInterval(nextSlide, 5000);
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Donation Amount Selection
function initDonationAmounts() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount-input');
    const proceedButton = document.getElementById('proceed-donation');
    
    let selectedAmount = null;
    
    // Amount button handlers
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Get amount from data attribute
            selectedAmount = this.getAttribute('data-amount');
            
            // Clear custom input
            if (customAmountInput) {
                customAmountInput.value = '';
            }
        });
    });
    
    // Custom amount input handler
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            // Remove selected from all buttons
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Set selected amount from input
            selectedAmount = this.value;
        });
    }
    
    // Proceed to donation handler
    if (proceedButton) {
        proceedButton.addEventListener('click', function() {
            const amount = selectedAmount || customAmountInput?.value;
            
            if (!amount || amount < 100) {
                alert('Please select or enter a donation amount (minimum ₹100).');
                return;
            }
            
            // Here you would integrate with your payment gateway
            // For now, we'll show an alert
            alert(`Thank you for your generous donation of ₹${amount}! You will be redirected to the secure payment page.`);
            
            // In production, redirect to payment gateway:
            // window.location.href = `payment-gateway-url?amount=${amount}`;
        });
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.mission-card, .help-card, .trust-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Social Share Functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Help save lives of underprivileged children who cannot afford medical treatment. Every child deserves a chance to live.');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Help save lives of underprivileged children who cannot afford medical treatment. Every child deserves a chance to live. #SaveChildren #MedicalCharity');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Help save lives of underprivileged children who cannot afford medical treatment. Every child deserves a chance to live.');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
}

// Make share functions globally available
window.shareOnFacebook = shareOnFacebook;
window.shareOnTwitter = shareOnTwitter;
window.shareOnWhatsApp = shareOnWhatsApp;
window.shareOnLinkedIn = shareOnLinkedIn;

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility: Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Any scroll-based functionality can go here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
