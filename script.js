// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileOptimizations();
    initCountdownTimer();
    initParallaxScrolling();
    initMobileMenu();
    initMemberFilters();
    initGalleryFilters();
    initSponsorCarousel();
    initContactForm();
    initSmoothScrolling();
    initScrollAnimations();
    initImagePopup();
});

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Prevent zoom on double tap for buttons
    const buttons = document.querySelectorAll('button, .btn, .cta-button, .nomination-btn, .ticket-btn, .tier-btn, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
    });
    
    // Improve touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
        
        // Add loading state
        img.classList.add('loading');
        
        // Handle successful load
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = '<i class="fas fa-image"></i><p>Image not available</p>';
            this.parentNode.insertBefore(placeholder, this);
        });
    });
    
    // Add touch feedback for interactive elements
    const interactiveElements = document.querySelectorAll('.announcement-card, .founder-card, .ticket-card, .sponsor-tier, .gallery-item');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Optimize viewport for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
    
    // Lazy load iframes (Google Maps)
    const iframes = document.querySelectorAll('iframe[data-src]');
    const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                iframe.removeAttribute('data-src');
                iframeObserver.unobserve(iframe);
            }
        });
    });
    
    iframes.forEach(iframe => iframeObserver.observe(iframe));
}

// Countdown Timer Functionality
function initCountdownTimer() {
    // Set the target date to November 1st, 2025
    const targetDate = new Date('November 1, 2025 00:00:00');
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Timer expired
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update timer immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Parallax Scrolling Effect
function initParallaxScrolling() {
    const layers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.1;
            layer.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Member Filter Functionality
function initMemberFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const memberCards = document.querySelectorAll('.member-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            memberCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Gallery Filter Functionality
function initGalleryFilters() {
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            galleryFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');
            
            const filterValue = filter.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Sponsor Carousel Auto-scroll
function initSponsorCarousel() {
    const carousel = document.querySelector('.sponsors-carousel');
    const logos = document.querySelectorAll('.sponsor-logo');
    
    if (carousel && logos.length > 0) {
        let currentIndex = 0;
        const logoWidth = 200 + 48; // width + gap
        
        function scrollCarousel() {
            currentIndex = (currentIndex + 1) % logos.length;
            carousel.scrollTo({
                left: currentIndex * logoWidth,
                behavior: 'smooth'
            });
        }
        
        // Auto-scroll every 3 seconds
        setInterval(scrollCarousel, 3000);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
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
    const animatedElements = document.querySelectorAll('.announcement-card, .founder-card, .ticket-card, .sponsor-tier, .contact-card, .gallery-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Nomination Button Functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nomination-btn')) {
        showNotification('Redirecting to nominations page...', 'success');
        
        // Simulate redirect after 2 seconds
        setTimeout(() => {
            // In a real application, this would redirect to a nominations page
            console.log('Redirecting to nominations page');
            // window.location.href = 'nominations.html';
        }, 2000);
    }
});

// Ticket Selection Functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('ticket-btn')) {
        const ticketType = e.target.textContent.replace('Select ', '');
        showNotification(`You selected ${ticketType} ticket! Redirecting to checkout...`, 'success');
        
        // Simulate redirect after 2 seconds
        setTimeout(() => {
            // In a real application, this would redirect to a checkout page
            console.log(`Redirecting to checkout for ${ticketType} ticket`);
        }, 2000);
    }
});

// Sponsor Package Selection
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tier-btn')) {
        const packageType = e.target.textContent.replace('Choose ', '');
        showNotification(`You selected ${packageType} package! We will contact you soon.`, 'success');
    }
});

// Gallery Lightbox Effect
document.addEventListener('click', function(e) {
    if (e.target.closest('.gallery-item')) {
        const galleryItem = e.target.closest('.gallery-item');
        const img = galleryItem.querySelector('img');
        const overlay = galleryItem.querySelector('.gallery-overlay');
        
        if (img && overlay) {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <div class="lightbox-info">
                        <h3>${overlay.querySelector('h3').textContent}</h3>
                        <p>${overlay.querySelector('p').textContent}</p>
                    </div>
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            // Add lightbox styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            lightbox.querySelector('.lightbox-content').style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            `;
            
            lightbox.querySelector('img').style.cssText = `
                width: 100%;
                height: auto;
                max-height: 70vh;
                object-fit: contain;
            `;
            
            lightbox.querySelector('.lightbox-info').style.cssText = `
                padding: 1.5rem;
                text-align: center;
            `;
            
            lightbox.querySelector('.lightbox-close').style.cssText = `
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 2rem;
                color: white;
                cursor: pointer;
                z-index: 10001;
            `;
            
            document.body.appendChild(lightbox);
            
            // Animate in
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close functionality
            function closeLightbox() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
            }
            
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        }
    }
});

// Newsletter Subscription
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('newsletter-form')) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            e.target.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .ticket-btn, .tier-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Popup image loading functions
function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    const image = document.getElementById('popupImage');
    if (spinner) spinner.style.display = 'none';
    if (image) image.classList.add('loaded');
    console.log('Image loaded successfully');
}

function showError() {
    const spinner = document.getElementById('loadingSpinner');
    const image = document.getElementById('popupImage');
    
    // Try fallback images
    const fallbackImages = [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80'
    ];
    
    let currentIndex = 0;
    
    function tryNextImage() {
        if (currentIndex < fallbackImages.length) {
            console.log(`Trying fallback image ${currentIndex + 1}`);
            image.src = fallbackImages[currentIndex];
            currentIndex++;
        } else {
            if (spinner) {
                spinner.textContent = 'Image failed to load';
                spinner.style.color = '#ff6b6b';
            }
            console.log('All images failed to load');
        }
    }
    
    // Try next fallback image
    tryNextImage();
}

// Image Popup Functionality
function initImagePopup() {
    const popup = document.getElementById('imagePopup');
    const closeBtn = popup.querySelector('.popup-close');
    const popupImage = popup.querySelector('.popup-image');
    
    console.log('Initializing popup...');
    
    // Show popup every time the page loads
    function showPopup() {
        console.log('Showing popup...');
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Show popup after a short delay to ensure page is loaded
    setTimeout(showPopup, 1000);
    
    // Also try to show immediately if image is already loaded
    if (popupImage.complete && popupImage.naturalHeight !== 0) {
        console.log('Image already loaded, showing popup immediately');
        showPopup();
    }
    
    // Show popup when image loads
    popupImage.addEventListener('load', function() {
        console.log('Image loaded, showing popup');
        showPopup();
    });
    
    // Close popup functionality
    function closePopup() {
        console.log('Closing popup...');
        popup.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Close button click
    closeBtn.addEventListener('click', closePopup);
    
    // Close on background click
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            closePopup();
        }
    });
}
