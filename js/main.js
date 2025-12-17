/**
 * Main JS - Initialize all modules
 */

import ThemeManager from './theme.js';
import NavigationManager from './navigation.js';
import AnimationManager from './animations.js';
import SkillBars from './components/skillBars.js';
import ProjectCards from './components/projectCards.js';
import Typewriter from './components/typewriter.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    const themeManager = new ThemeManager();

    // Initialize navigation manager
    const navigationManager = new NavigationManager();

    // Initialize animation manager
    const animationManager = new AnimationManager();

    // Initialize typewriter effect
    const typewriter = new Typewriter('typewriter', [
        'Software & Cloud Engineer',
        'Problem Solver',
        'Full-Stack Developer',
        'AWS Enthusiast',
        'Lifelong Learner'
    ], {
        typeSpeed: 100,
        deleteSpeed: 50,
        delayBetweenTexts: 2000,
        loop: true
    });
    typewriter.init();

    // Initialize skill bars
    const skillBars = new SkillBars('skillsGrid');
    skillBars.init();

    // Initialize project cards
    const projectCards = new ProjectCards('projectsGrid', 'projectFilters');
    projectCards.init();

    // Load experience timeline
    loadTimeline('experienceTimeline', 'experience');

    // Load education timeline
    loadTimeline('educationTimeline', 'education');

    // Load achievements
    loadAchievements();

    // Initialize contact form
    initContactForm();
});

/**
 * Load timeline data (experience or education)
 */
async function loadTimeline(containerId, dataKey) {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();
        const items = data[dataKey];
        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = items.map(item => `
            <div class="timeline-item reveal">
                <span class="timeline-date">${item.period}</span>
                <h3 class="timeline-title">${item.degree || item.title}</h3>
                <p class="timeline-subtitle">${item.institution || item.company}</p>
                <p class="timeline-description">${item.description}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error(`Error loading ${dataKey}:`, error);
    }
}

/**
 * Load achievements data
 */
async function loadAchievements() {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();
        const achievements = data.achievements;
        const container = document.getElementById('achievementsGrid');

        if (!container) return;

        container.innerHTML = achievements.map(achievement => `
            <div class="achievement-card reveal">
                <div class="achievement-icon">${achievement.icon}</div>
                <h3 class="achievement-title">${achievement.title}</h3>
                <p class="achievement-description">${achievement.description}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

/**
 * Initialize contact form with validation and submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        showFormMessage('success', 'Thank you for your message! I\'ll get back to you soon.');
        form.reset();
    });
}

/**
 * Validate contact form
 */
function validateForm(data) {
    let isValid = true;

    // Name validation
    if (data.name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Subject validation
    if (data.subject.trim().length < 3) {
        showFieldError('subject', 'Please enter a subject');
        isValid = false;
    }

    // Message validation
    if (data.message.trim().length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }

    return isValid;
}

/**
 * Show field error
 */
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
        setTimeout(() => field.classList.remove('error'), 3000);
    }
}

/**
 * Show form message
 */
function showFormMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--color-lime)' : 'var(--color-coral)'};
        color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: var(--z-tooltip);
        animation: slide-in-right 0.3s ease-out;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'slide-in-right 0.3s ease-out reverse';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}
