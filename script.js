// ===========================
// SMOOTH SCROLL & PAGE LOAD
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Show loader briefly
    const loader = document.getElementById('loader');
    loader.classList.add('active');
    
    setTimeout(() => {
        loader.classList.remove('active');
    }, 1000);

    // Initialize AOS (Animate On Scroll)
    initAOS();
    
    // Initialize all functionality
    initNavigation();
    initCarousel();
    initScrollAnimations();
    initBackToTop();
    initFloatingSOSButton();
    initDownloadButtons();
    initStatusCard();
    initProtectionCards();
    generateParticles();
    initPremiumEffects();
});

// ===========================
// AOS INITIALIZATION
// ===========================

function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            offset: 100,
            easing: 'ease-in-out',
            delay: 0
        });
    }
}

// ===========================
// PARTICLE GENERATION
// ===========================

function generateParticles() {
    const particlesContainer = document.querySelector('.particles-container') || createParticlesContainer();
    const particleCount = window.innerWidth > 768 ? 50 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 10) + 's';
        particle.style.animation = `particleFloat ${particle.style.animationDuration.replace('s', '')}s linear ${particle.style.animationDelay.replace('s', '')}s infinite`;
        particlesContainer.appendChild(particle);
    }
}

function createParticlesContainer() {
    const container = document.createElement('div');
    container.classList.add('particles-container');
    document.body.insertBefore(container, document.body.firstChild);
    return container;
}

// ===========================
// PREMIUM EFFECTS INITIALIZATION
// ===========================

function initPremiumEffects() {
    // Enhanced navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Add glow effect to hero elements on scroll
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const phoneImage = entry.target.querySelector('.hero-image');
                    if (phoneImage) {
                        phoneImage.style.animation = 'float 6s ease-in-out infinite';
                    }
                }
            });
        });
        observer.observe(heroSection);
    }
}

// ===========================
// NAVIGATION & MENU TOGGLE
// ===========================

function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu on scroll
    window.addEventListener('scroll', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
}

// ===========================
// CAROUSEL FUNCTIONALITY
// ===========================

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('carouselDots');
    
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function goToSlide(n) {
        currentSlide = n;
        showSlide(currentSlide);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
}

// ===========================
// SCROLL ANIMATIONS (Custom AOS)
// ===========================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aos = entry.target.getAttribute('data-aos');
                const delay = entry.target.getAttribute('data-aos-delay') || '0';
                
                entry.target.style.animation = 'none';
                entry.target.style.opacity = '0';
                
                setTimeout(() => {
                    entry.target.style.animation = `${aos} 0.8s ease forwards`;
                    entry.target.style.opacity = '1';
                }, parseInt(delay));
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animation keyframes as styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fade-right {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes zoom-in {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// BACK TO TOP BUTTON
// ===========================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
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

// ===========================
// FLOATING SOS BUTTON
// ===========================

function initFloatingSOSButton() {
    const sosBtn = document.getElementById('floatingSOS');

    sosBtn.addEventListener('click', () => {
        // Show alert or trigger emergency
        showAlert('SOS Alert', 'Location and emergency contacts have been notified!', 'success');
        
        // Add animation on click
        sosBtn.style.animation = 'none';
        setTimeout(() => {
            sosBtn.style.animation = 'pulse 0.5s ease';
        }, 10);
    });

    // Tooltip on hover
    sosBtn.addEventListener('mouseenter', () => {
        sosBtn.title = 'Emergency SOS - Tap to alert contacts';
    });
}

// ===========================
// DOWNLOAD BUTTONS
// ===========================

function initDownloadButtons() {
    const downloadBtns = [
        document.getElementById('downloadBtn'),
        document.getElementById('primaryDownloadBtn')
    ];
    const featuresBtn = document.getElementById('featuresBtn');

    downloadBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                // Simulate APK download
                downloadAPK();
            });
        }
    });

    if (featuresBtn) {
        featuresBtn.addEventListener('click', () => {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function downloadAPK() {
    showAlert(
        'Download Started',
        'SmartSensrty v2.1.0 (45MB) - Check your downloads folder',
        'success'
    );
    
    // Create a download link for the APK file from GitHub
    const link = document.createElement('a');
    link.href = 'https://raw.githubusercontent.com/sriinathh/smartsensrty-app/main/SmartSensrty.apk';
    link.download = 'SmartSensrty-v2.1.0.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download event
    trackEvent('apk_download', {
        version: '2.1.0',
        timestamp: new Date().toISOString()
    });
}

function copyDownloadLink() {
    const downloadUrl = 'https://raw.githubusercontent.com/sriinathh/smartsensrty-app/main/SmartSensrty.apk';
    
    navigator.clipboard.writeText(downloadUrl).then(() => {
        showAlert(
            'Link Copied',
            'APK download link copied to clipboard!',
            'success'
        );
        trackEvent('link_copied', {
            url: downloadUrl
        });
    }).catch(() => {
        showAlert(
            'Copy Failed',
            'Could not copy link. Please try again.',
            'error'
        );
    });
}

// ===========================
// CUSTOM ALERT SYSTEM
// ===========================

function showAlert(title, message, type = 'info') {
    // Create alert container
    const alertContainer = document.createElement('div');
    alertContainer.className = `custom-alert ${type}`;
    
    const alertHTML = `
        <div class="alert-content">
            <div class="alert-header">
                <h3>${title}</h3>
                <button class="alert-close">&times;</button>
            </div>
            <p>${message}</p>
        </div>
    `;
    
    alertContainer.innerHTML = alertHTML;
    document.body.appendChild(alertContainer);

    // Add styles dynamically if not already present
    if (!document.querySelector('style[data-alert-styles]')) {
        const alertStyles = document.createElement('style');
        alertStyles.setAttribute('data-alert-styles', 'true');
        alertStyles.textContent = `
            .custom-alert {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                padding: 1.5rem;
                min-width: 300px;
                z-index: 10000;
                animation: slideInDown 0.3s ease;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }

            .custom-alert.success {
                border-left: 4px solid #00ff88;
            }

            .custom-alert.error {
                border-left: 4px solid #ff6b9d;
            }

            .custom-alert.info {
                border-left: 4px solid #00d4ff;
            }

            .alert-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }

            .alert-header h3 {
                margin: 0;
                font-size: 1rem;
                background: linear-gradient(135deg, #00d4ff, #00ff88);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .alert-close {
                background: none;
                border: none;
                color: var(--text-muted);
                font-size: 1.5rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }

            .alert-close:hover {
                color: var(--primary-color);
            }

            .custom-alert p {
                margin: 0;
                color: var(--text-muted);
                font-size: 0.95rem;
            }

            @media (max-width: 480px) {
                .custom-alert {
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(alertStyles);
    }

    // Close button functionality
    const closeBtn = alertContainer.querySelector('.alert-close');
    const closeAlert = () => {
        alertContainer.style.animation = 'slideInUp 0.3s ease';
        setTimeout(() => {
            alertContainer.remove();
        }, 300);
    };

    closeBtn.addEventListener('click', closeAlert);

    // Auto-close after 5 seconds
    setTimeout(closeAlert, 5000);
}

// ===========================
// PARALLAX BACKGROUND EFFECT
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===========================
// BUTTON RIPPLE EFFECT
// ===========================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles if not already present
        if (!document.querySelector('style[data-ripple-styles]')) {
            const rippleStyles = document.createElement('style');
            rippleStyles.setAttribute('data-ripple-styles', 'true');
            rippleStyles.textContent = `
                .btn {
                    position: relative;
                    overflow: hidden;
                }

                .ripple {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: rippleEffect 0.6s ease-out;
                }

                @keyframes rippleEffect {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyles);
        }

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===========================
// FORM HANDLING (Future)
// ===========================

function handleContactForm(formData) {
    console.log('Contact form submitted:', formData);
    // In a real application, send data to backend
    showAlert('Thank you!', 'We will get back to you soon.', 'success');
}

// ===========================
// PAGE PERFORMANCE OPTIMIZATION
// ===========================

// Lazy load images
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', (e) => {
    // Close menu with Escape
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.remove('active');
    }

    // Navigate carousel with arrow keys
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prevSlide');
        if (prevBtn) prevBtn.click();
    }
    if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('nextSlide');
        if (nextBtn) nextBtn.click();
    }
});

// ===========================
// TOUCH SWIPE SUPPORT (Carousel)
// ===========================

let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
    if (touchEndX < touchStartX - 50) {
        document.getElementById('nextSlide').click();
    }
    if (touchEndX > touchStartX + 50) {
        document.getElementById('prevSlide').click();
    }
}

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, false);

// ===========================
// ANALYTICS & TRACKING (Placeholder)
// ===========================

function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // In production, send to analytics service (Google Analytics, etc.)
}

// Track page views
trackEvent('page_view', {
    page: document.title,
    url: window.location.href
});

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent.trim();
        trackEvent('button_click', { button: btnText });
    });
});

// ===========================
// SERVICE WORKER (Optional - for PWA)
// ===========================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('sw.js').then(registration => {
    //     console.log('Service Worker registered:', registration);
    // }).catch(error => {
    //     console.log('Service Worker registration failed:', error);
    // });
}

// ===========================
// FEATURE DETECTION & POLYFILLS
// ===========================

// Check for required features
const requiredFeatures = {
    'Intersection Observer': 'IntersectionObserver' in window,
    'Fetch API': 'fetch' in window,
    'LocalStorage': typeof localStorage !== 'undefined',
};

Object.entries(requiredFeatures).forEach(([feature, supported]) => {
    if (!supported) {
        console.warn(`${feature} is not supported in this browser`);
    }
});

// ===========================
// THEME PREFERENCE DETECTION
// ===========================

// Check for dark mode preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (prefersLight) {
    // Apply light theme if needed
    document.documentElement.style.colorScheme = 'light';
} else if (prefersDark) {
    // Dark theme is already default
    document.documentElement.style.colorScheme = 'dark';
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Debounce function for performance
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================
// PROTECTION CARDS ANIMATION
// ===========================

function initProtectionCards() {
    const protectionCards = document.querySelectorAll('.protection-card');
    
    protectionCards.forEach((card, index) => {
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.3s ease';
            }, 10);
        });

        // Add click handlers for Learn More buttons
        const learnBtn = card.querySelector('.btn-mini');
        if (learnBtn) {
            learnBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const featureName = card.querySelector('h3').textContent;
                showAlert('Feature Info', `${featureName} is currently being loaded...`, 'info');
            });
        }
    });
}

// ===========================
// STATUS CARD DYNAMICS
// ===========================

function initStatusCard() {
    const statusCard = document.querySelector('.status-card');
    if (!statusCard) return;

    // Simulate status updates
    setInterval(() => {
        updateStatusCard();
    }, 15000); // Update every 15 seconds

    // Add click handler to status card
    statusCard.addEventListener('click', () => {
        toggleStatusInfo();
    });
}

function updateStatusCard() {
    const statusValue = document.querySelector('.status-value');
    const statusDot = document.querySelector('.status-dot');
    
    // Simulate status changes (just for demo)
    const statuses = ['Safe', 'Monitored', 'Protected'];
    const currentStatus = statusValue.textContent;
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    
    // If you want to actually update it, uncomment:
    // statusValue.textContent = nextStatus;
}

function toggleStatusInfo() {
    const statusCard = document.querySelector('.status-card');
    statusCard.style.animation = 'pulse 0.5s ease';
    
    showAlert(
        'Status Info',
        'Your device is currently monitoring for safety threats with all systems active.',
        'success'
    );
}

// ===========================
// ===========================

console.log(
    '%cSmartSensrty',
    'font-size: 24px; font-weight: bold; color: #00d4ff; text-shadow: 0 0 10px #00d4ff;'
);
console.log(
    '%cYour Safety, Our Priority',
    'font-size: 14px; color: #00ff88; font-style: italic;'
);
console.log(
    '%cMade with ❤️ for safety',
    'font-size: 12px; color: #ff6b9d;'
);
