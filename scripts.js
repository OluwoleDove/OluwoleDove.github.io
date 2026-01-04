/* ============================================
   OLUWOLE FASAKIN PORTFOLIO - SCRIPTS
   Version: 2.0
   Last Updated: 2026-01-04
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        navMenu.classList.toggle('nav-open');
        const icon = mobileNavToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-open')) {
                toggleMenu();
            }
        });
    });

    // --- 2. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Light/Dark Mode Theme Toggle ---
    // Default to dark mode, only switch if user explicitly chose light mode
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const preferredTheme = localStorage.getItem('theme');

    const setTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Set initial theme - DEFAULT TO DARK MODE
    // Only use light mode if explicitly saved in localStorage
    if (preferredTheme === 'light') {
        setTheme('light');
    } else {
        setTheme('dark');
    }

    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            setTheme(currentTheme === 'light' ? 'dark' : 'light');
        });
    }

    // --- 4. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 5. Pause Carousel on Hover ---
    const carouselTrack = document.querySelector('.logo-carousel-track');
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        carouselTrack.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
    }

    // --- 6. Navbar Background on Scroll ---
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.3)';
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // --- 7. Active Navigation Link Highlight ---
    const sections = document.querySelectorAll('section[id]');

    const highlightNavLink = () => {
        const scrollY = window.pageYOffset;
        const navHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // --- 8. Animate proficiency bars on visibility ---
    const proficiencyBars = document.querySelectorAll('.proficiency-fill');

    const animateProficiencyBars = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    proficiencyBars.forEach(bar => {
        animateProficiencyBars.observe(bar);
    });

    // --- 9. Subtle hover effects for cards ---
    const cards = document.querySelectorAll('.focus-card, .expertise-category, .project-card-new, .client-card, .research-item-new, .education-card-new, .language-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // --- 10. Lazy load images ---
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // --- 11. Console Easter Egg ---
    console.log('%c Oluwole Fasakin Portfolio ', 'background: #007aff; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('%c Application Architect & Data Engineering Lead ', 'color: #007aff; font-size: 12px;');
    console.log('%c Interested in working together? Email: oluwolefasakin007@gmail.com ', 'color: #a0a0a0; font-size: 11px;');

});

// --- Utility: Debounce function ---
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

// --- Utility: Throttle function ---
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
