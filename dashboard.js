
// Set default Chart.js configuration for new theme
try {
    if (typeof Chart !== 'undefined') {
        Chart.defaults.color = '#a4b2b1';
        Chart.defaults.font.family = "'Outfit', sans-serif";
    }
} catch(e) { console.error("Chart.js error:", e); }

Chart.defaults.font.family = "'Outfit', sans-serif";

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false }
    },
    scales: {
        x: {
            grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            beginAtZero: true
        }
    }
};

// Admin: Market Growth Chart (Bar Chart to match screenshot cash flow)
const marketCanvas = document.getElementById('marketGrowthChart');
if (marketCanvas) {
    const ctx = marketCanvas.getContext('2d');
    
    // Gradient matching the olive aesthetic for bars
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#94a864');
    gradient.addColorStop(1, 'rgba(148, 168, 100, 0.1)');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
            datasets: [{
                label: 'Market Growth ($M)',
                data: [150, 250, 290, 380, 450, 520, 560],
                backgroundColor: gradient,
                borderRadius: 4,
                barPercentage: 0.5
            }]
        },
        options: commonOptions
    });
}

// Client: Portfolio Chart
const portfolioCanvas = document.getElementById('portfolioChart');
if (portfolioCanvas) {
    const ctx = portfolioCanvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(148, 168, 100, 0.4)');
    gradient.addColorStop(1, 'rgba(148, 168, 100, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Portfolio Value',
                data: [35000, 36200, 35800, 39000, 41500, 42500],
                borderColor: '#94a864',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: commonOptions
    });
}

// Admin Industries: Distribution Donut Chart
const industryCanvas = document.getElementById('industryDistributionChart');
if (industryCanvas) {
    const ctx = industryCanvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Artificial Intelligence', 'Electric Vehicles', 'Clean Energy', 'Biotechnology', 'Aerospace', 'Others'],
            datasets: [{
                data: [28, 22, 18, 17, 10, 5],
                backgroundColor: [
                    '#94a864', /* Main olive green */
                    '#a3b872',
                    '#b3c981',
                    '#c2d991',
                    '#d2eaa1',
                    'rgba(255,255,255,0.05)'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#a4b2b1', padding: 20, font: { family: "'Outfit', sans-serif" } }
                }
            }
        }
    });
}

// Load Dynamic Username
document.addEventListener('DOMContentLoaded', () => {
    let email = 'yukeshyuki18@gmail.com';
    let user = 'yukeshyuki18';
    try { user = localStorage.getItem('dashboardUser') || user; } catch(e){} try { email = localStorage.getItem('dashboardEmail') || email; } catch(e){}
    let username = 'yukeshyuki18'; try { username = localStorage.getItem('dashboardUser') || email.split('@')[0]; } catch(e){}
    let role = window.location.href.includes('Admin') ? 'System Admin' : 'Client'; try { role = localStorage.getItem('dashboardRole') || role; } catch(e){}
    
    const avatarEl = document.getElementById('userAvatar');
    const emailEl = document.getElementById('userEmailDisplay');
    const roleEl = document.getElementById('userRoleDisplay');
    
    if(avatarEl) avatarEl.textContent = email.charAt(0).toUpperCase();
    if(emailEl) emailEl.textContent = username;
    if(roleEl) {
        if (role === 'Admin' || role === 'System Admin') {
            roleEl.textContent = 'System Admin';
        } else {
            roleEl.textContent = 'Client';
        }
    }
    
    // Handle close button visibility on mobile
    const closeBtns = document.querySelectorAll('.close-sidebar-btn');
    if (window.innerWidth <= 768) {
        closeBtns.forEach(btn => btn.style.display = 'block');
    }
    window.addEventListener('resize', () => {
        closeBtns.forEach(btn => btn.style.display = window.innerWidth <= 768 ? 'block' : 'none');
    });

    // Handle all forms in dashboards to validate and redirect to 404.html
    const dashboardForms = document.querySelectorAll('form');
    dashboardForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                window.location.href = '404.html';
            } else {
                form.reportValidity();
            }
        });
    });

});

// Initialize Animations
document.addEventListener('DOMContentLoaded', () => {
    // FIX: Remove data-aos from elements that also have gsap-stagger to prevent opacity conflicts.
    // AOS sets opacity:0 in CSS, which tricks GSAP into animating from 0 to 0.
    document.querySelectorAll('.gsap-stagger[data-aos]').forEach(el => {
        el.removeAttribute('data-aos');
    });

    // AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }

    // GSAP Stagger Animation
    if (typeof gsap !== 'undefined') {
        gsap.from(".gsap-stagger", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Attractive GSAP animation for Dashboard Hero Headings
        const heroSelectors = ['.dashboard-header h1', 'h1'];
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
                delay: 0.1
            });
        });
    }
});


// 404 Interception Logic
document.addEventListener('DOMContentLoaded', () => {
    // Intercept all <a> tags in main-content
    const links = document.querySelectorAll('.main-content a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '404.html';
        });
    });

    // Intercept mock forms
    const mockForms = document.querySelectorAll('.mock-form');
    mockForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                window.location.href = '404.html';
            } else {
                form.reportValidity();
            }
        });
    });

    // Intercept specific buttons acting as links (e.g. Generate Report, filter buttons)
    const buttons = document.querySelectorAll('.main-content button:not(.mobile-menu-btn)');
    buttons.forEach(btn => {
        if (!btn.closest('.mock-form')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '404.html';
            });
        }
    });
});
