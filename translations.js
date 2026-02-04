// Expert Bridge - Enhanced JavaScript
// Handles loading screen, language switching, navigation, and university ticker

(function() {
    'use strict';
    
    // Current language state
    let currentLanguage = 'en';
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        initLoadingScreen();
        initLanguageSwitcher();
        initNavigation();
        initSmoothScroll();
        initUniversityTicker();
        loadSavedLanguage();
    });
    
    // Loading Screen
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Hide loading screen after minimum display time
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                document.body.classList.remove('loading');
                
                // Remove from DOM after animation
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000); // Show for at least 2 seconds
        });
    }
    
    // Language Switcher
    function initLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
            });
        });
    }
    
    // Switch Language Function
    function switchLanguage(lang) {
        if (!translations[lang]) {
            console.error('Language not found:', lang);
            return;
        }
        
        currentLanguage = lang;
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Save language preference
        localStorage.setItem('expertBridgeLanguage', lang);
        
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', lang);
    }
    
    // Load saved language preference
    function loadSavedLanguage() {
        const savedLang = localStorage.getItem('expertBridgeLanguage');
        
        if (savedLang && translations[savedLang]) {
            switchLanguage(savedLang);
        }
    }
    
    // Navigation scroll effect
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class when scrolling down
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // University Ticker Animation
    function initUniversityTicker() {
        const tickerTrack = document.getElementById('tickerTrack');
        
        if (!tickerTrack) return;
        
        // Clone the ticker items for infinite scroll effect
        const tickerItems = tickerTrack.innerHTML;
        tickerTrack.innerHTML = tickerItems + tickerItems + tickerItems;
        
        // Pause animation on hover
        tickerTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        tickerTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Video autoplay on load
    window.addEventListener('load', function() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.play().catch(function(error) {
                console.log('Video autoplay prevented:', error);
            });
        });
    });
    
    // Intersection Observer for animations (optional enhancement)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        window.addEventListener('load', function() {
            document.querySelectorAll('.solution-card, .process-step, .pricing-card, .stat-item').forEach(el => {
                observer.observe(el);
            });
        });
    }
    
})();