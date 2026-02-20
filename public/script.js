// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to blog cards and other elements
const animatedElements = document.querySelectorAll('.blog-card, .contact-item, .stat');

animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
    fadeInObserver.observe(element);
});

// Add parallax effect to hero background
const hero = document.querySelector('.hero');
const wineStains = document.querySelectorAll('.wine-stain');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrollPosition < heroHeight) {
            wineStains.forEach((stain, index) => {
                const speed = 0.3 + (index * 0.1);
                stain.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
    });
}

// Blog card hover effect enhancement
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Smooth reveal for article content
const articleBody = document.querySelector('.article-body');

if (articleBody) {
    const paragraphs = articleBody.querySelectorAll('p, h2, h3, blockquote');

    const articleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    paragraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
        articleObserver.observe(p);
    });
}

// Add wine glass cursor effect on blog cards (optional enhancement)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.blog-card');

    cards.forEach(card => {
        const glass = card.querySelector('.wine-glass-silhouette');

        if (glass) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                glass.style.left = `${x - 100}px`;
                glass.style.top = `${y - 100}px`;
            });
        }
    });
});

// Add reading progress bar for article page
if (document.querySelector('.article')) {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--gold-accent), var(--gold-light));
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;

        progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
}

// Console greeting
console.log('%c🍷 Weinbar38 - Unser Weinblog ', 'background: #5c1f1f; color: #d4af37; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%cWillkommen! Entwickelt mit Leidenschaft für Wein und Wiesbaden.', 'color: #d4af37; font-size: 12px;');
