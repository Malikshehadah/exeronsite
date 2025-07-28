document.addEventListener('DOMContentLoaded', function () {
    // Language Toggle Functionality
    const langSwitch = document.getElementById('langSwitch');
    let currentLang = document.documentElement.lang;

    // Set initial language based on browser preference
    const userLang = navigator.language || navigator.userLanguage;
    const isArabic = userLang.startsWith('ar');
    currentLang = isArabic ? 'ar' : 'en';

    // If not Arabic, switch to English (since HTML defaults to Arabic)
    if (!isArabic) {
        switchLanguage('en');
    }

    langSwitch.addEventListener('click', function () {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        switchLanguage(currentLang);
    });

    function switchLanguage(lang) {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;

        // Update all elements with data attributes
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute(`data-${lang}`);
            } else if (element.tagName === 'SELECT') {
                const options = element.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].hasAttribute(`data-${lang}`)) {
                        options[i].textContent = options[i].getAttribute(`data-${lang}`);
                    }
                }
            } else {
                element.textContent = element.getAttribute(`data-${lang}`);
            }
        });

        // Update button text
        langSwitch.textContent = lang === 'ar' ? 'EN | English' : 'AR | العربية';
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Services Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Portfolio Filtering
    const portfolioTabs = document.querySelectorAll('.portfolio-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Update active tab
            portfolioTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize Testimonials Slider
    const testimonialSwiper = new Swiper('.testimonials-slider', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // Animate stats counter
    const animateStats = () => {
        const stats = document.querySelectorAll('[data-count]');
        const speed = 200;

        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = parseInt(stat.textContent);
            const increment = target / speed;

            if (count < target) {
                stat.textContent = Math.ceil(count + increment);
                setTimeout(animateStats, 1);
            } else {
                stat.textContent = target;
            }
        });
    };

    // Trigger stats animation when section is in view
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Here you would typically send the form data to a server
            // For this static example, we'll just show an alert
            alert(currentLang === 'ar'
                ? 'شكراً على رسالتك! سنتواصل معك قريباً.'
                : 'Thank you for your message! We will contact you soon.');

            this.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            alert(currentLang === 'ar'
                ? 'شكراً على اشتراكك في نشرتنا البريدية!'
                : 'Thank you for subscribing to our newsletter!');

            this.reset();
        });
    }
});