// Initialize AOS (Animate On Scroll)
AOS.init({
    once: true, // whether animation should happen only once - while scrolling down
    offset: 100, // offset (in px) from the original trigger point
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Staggered animation for the process cards
gsap.from(".gsap-card", {
    scrollTrigger: {
        trigger: ".process-cards",
        start: "top 80%", // When top of .process-cards hits 80% down viewport
        toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2, // 0.2 seconds between each card
    ease: "power2.out"
});

// GSAP staggered animation for latest articles
gsap.from(".articles-grid .article-card", {
    scrollTrigger: {
        trigger: ".articles-grid",
        start: "top 85%", 
        toggleActions: "play none none none"
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
});

// Attractive GSAP animation for all Hero Headings
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
        const heroSelectors = ['.hero-text h1', '.gsap-hero-title', '.auth-huge-title', '.page-hero h1', 'header h1', '.hero h1'];
        let heroH1s = [];
        heroSelectors.forEach(sel => {
            const els = document.querySelectorAll(sel);
            els.forEach(el => {
                if(!heroH1s.includes(el)) heroH1s.push(el);
            });
        });
        
        if (heroH1s.length === 0) {
            const firstH1 = document.querySelector('h1');
            if (firstH1) heroH1s.push(firstH1);
        }

        heroH1s.forEach(h1 => {
            gsap.set(h1, { transformPerspective: 800 });
            gsap.from(h1, {
                duration: 1.8,
                y: 80,
                scale: 0.85,
                rotationX: -60,
                opacity: 0,
                transformOrigin: "50% 50% -50px",
                ease: "elastic.out(1, 0.4)",
                delay: 0
            });
        });

        // Retain the paragraph animation for page-hero
        if (document.querySelector(".page-hero p")) {
            gsap.from(".page-hero p", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.4
            });
        }
    }
});

// GSAP animation for Featured Article
if (document.querySelector(".featured-article-container")) {
    gsap.from(".featured-article-container > img", {
        scrollTrigger: {
            trigger: ".featured-article-container",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
    gsap.from(".featured-article-card", {
        scrollTrigger: {
            trigger: ".featured-article-container",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.3
    });
}

// GSAP animation for Newsletter Banner
if (document.querySelector(".newsletter-banner")) {
    gsap.from(".newsletter-banner", {
        scrollTrigger: {
            trigger: ".newsletter-banner",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
}

// GSAP animation for Contact Page FAQ Items
if (document.querySelector(".gsap-faq-item")) {
    gsap.from(".gsap-faq-item", {
        scrollTrigger: {
            trigger: ".faq-list",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
}

// GSAP animation for Contact Page Location Cards
if (document.querySelector(".gsap-location-card")) {
    gsap.from(".gsap-location-card", {
        scrollTrigger: {
            trigger: ".locations-grid",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if(hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}

// Form validation and redirection
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            if (form.id === 'loginForm') {
                const email = document.getElementById('loginEmail') ? document.getElementById('loginEmail').value : 'user@example.com';
                const username = email.split('@')[0];
                localStorage.setItem('dashboardUser', username);
                localStorage.setItem('dashboardEmail', email);
                
                const role = document.getElementById('loginAs').value;
                localStorage.setItem('dashboardRole', role);
                if (role === 'Admin') {
                    window.location.href = 'AdminDashboard.html';
                } else {
                    window.location.href = 'ClientDashboard.html';
                }
            } else if (form.id === 'signupForm') {
                // For signup, we just redirect to login for simplicity
                window.location.href = 'login.html';
            } else {
                window.location.href = '404.html';
            }
        } else {
            form.reportValidity();
        }
    });
});

// Add zoom animations to hero section backgrounds
const bgImages = document.querySelectorAll('.hero-bg img');
bgImages.forEach(img => {
    img.style.animation = 'zoomInOut 20s infinite alternate ease-in-out';
    img.style.transformOrigin = 'center center';
});

const inlineHeroes = document.querySelectorAll('.about-hero, .service-hero, .page-hero');
inlineHeroes.forEach(section => {
    const bgImage = section.style.backgroundImage;
    if (bgImage && bgImage !== 'none' && bgImage !== 'initial') {
        section.style.backgroundImage = 'none';
        section.style.position = 'relative';
        section.style.overflow = 'hidden';
        
        const bgWrap = document.createElement('div');
        bgWrap.style.position = 'absolute';
        bgWrap.style.top = '0';
        bgWrap.style.left = '0';
        bgWrap.style.width = '100%';
        bgWrap.style.height = '100%';
        bgWrap.style.zIndex = '0';
        bgWrap.style.overflow = 'hidden';
        
        const imgDiv = document.createElement('div');
        imgDiv.style.position = 'absolute';
        imgDiv.style.top = '0';
        imgDiv.style.left = '0';
        imgDiv.style.width = '100%';
        imgDiv.style.height = '100%';
        imgDiv.style.backgroundImage = bgImage;
        imgDiv.style.backgroundSize = section.style.backgroundSize || 'cover';
        imgDiv.style.backgroundPosition = section.style.backgroundPosition || 'center';
        imgDiv.style.animation = 'zoomInOut 20s infinite alternate ease-in-out';
        imgDiv.style.transformOrigin = 'center center';
        
        bgWrap.appendChild(imgDiv);
        
        Array.from(section.children).forEach(child => {
            if(window.getComputedStyle(child).position === 'static') {
                child.style.position = 'relative';
            }
            child.style.zIndex = '1';
        });
        
        section.insertBefore(bgWrap, section.firstChild);
    }
});

// Number Counting Animation
const counterSelectors = '.hero-stats .stat h3, .stat-block h2, .stats-grid-mobile h3, .stat-number';
const counters = document.querySelectorAll(counterSelectors);

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            if (!el.classList.contains('counted')) {
                el.classList.add('counted');
                const text = el.innerText.trim();
                const match = text.match(/^([\d\.]+)(.*)$/);
                if (match) {
                    const targetNum = parseFloat(match[1]);
                    const suffix = match[2];
                    const isFloat = match[1].includes('.');
                    
                    let startNum = 0;
                    const duration = 2000;
                    const startTime = performance.now();
                    
                    const updateCounter = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const currentNum = startNum + (targetNum - startNum) * easeProgress;
                        
                        if (isFloat) {
                            el.innerText = currentNum.toFixed(2) + suffix;
                        } else {
                            el.innerText = Math.floor(currentNum) + suffix;
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.innerText = text;
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                }
            }
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});
