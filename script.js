document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initThemeToggle();
    initMobileNavigation();
    initSkillBarObserver();
    initProjectFilters();
    initModals();
    initFormValidation();
});

/* ==========================================================================
   1. Typing Effect for Subtitle
   ========================================================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    const words = ['Web Applications.', 'User Interfaces.', 'Modern Experiences.', 'Clean Code.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ==========================================================================
   2. Theme Toggle (Dark/Light Mode)
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlTag = document.documentElement;
    const icon = themeBtn.querySelector('i');

    // Check saved local storage preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlTag.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlTag.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlTag.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-moon';
        } else {
            icon.className = 'fa-solid fa-sun';
        }
    }
}

/* ==========================================================================
   3. Mobile Menu Navigation Toggle
   ========================================================================== */
function initMobileNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        mobileToggle.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
}

/* ==========================================================================
   4. Intersection Observer for Skill Progress Bars
   ========================================================================== */
function initSkillBarObserver() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-progress');
                progressBar.style.width = targetWidth;
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

/* ==========================================================================
   5. Interactive Project Filtering
   ========================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active Class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   6. Modal Dialog System
   ========================================================================== */
function initModals() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    const modalData = {
        'modal-1': {
            title: 'Analytics Dashboard',
            desc: 'Comprehensive web analytics portal featuring live metrics, chart visualizers, user behavior heatmaps, and customizable theme exports.',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js']
        },
        'modal-2': {
            title: 'E-Commerce Glass Interface',
            desc: 'Modern online store interface with filtering options, interactive shopping cart, instant total calculations, and custom checkout flows.',
            tech: ['CSS Grid', 'Flexbox', 'JavaScript DOM API']
        },
        'modal-3': {
            title: 'Task Workflow Manager',
            desc: 'Productivity application with drag-and-drop task organization, priority flags, tag filters, and persistent state management via local storage.',
            tech: ['JavaScript', 'LocalStorage', 'CSS3 Transitions']
        }
    };

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalKey = btn.getAttribute('data-modal');
            const data = modalData[modalKey];

            if (data) {
                modalContent.innerHTML = `
                    <h2>${data.title}</h2>
                    <p style="margin: 1rem 0; color: var(--text-secondary);">${data.desc}</p>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem;">
                        ${data.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
                    </div>
                `;
                modalOverlay.classList.add('active');
            }
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
    }
}

/* ==========================================================================
   7. Contact Form Live Validation
   ========================================================================== */
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput);
            isValid = false;
        } else {
            clearError(nameInput);
        }

        if (!validateEmail(emailInput.value)) {
            showError(emailInput);
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput);
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            formStatus.style.color = '#10b981';
            formStatus.textContent = 'Message sent successfully! Thank you.';
            form.reset();
            setTimeout(() => formStatus.textContent = '', 4000);
        }
    });

    function showError(input) {
        input.parentElement.classList.add('invalid');
    }

    function clearError(input) {
        input.parentElement.classList.remove('invalid');
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}


