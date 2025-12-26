/**
 * Animation Manager - Intersection Observer for scroll reveals
 */

class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }

    /**
     * Initialize animation manager
     */
    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        // Observe all sections and cards
        this.observeElements();

        // Add ripple effect to buttons
        this.addRippleEffect();
    }

    /**
     * Observe elements for scroll animations
     */
    observeElements() {
        const elementsToObserve = document.querySelectorAll(`
            .section,
            .skill-card,
            .timeline-item,
            .achievement-card,
            .about-content,
            .contact-content
        `);

        elementsToObserve.forEach(element => {
            element.classList.add('reveal');
            this.observer.observe(element);
        });

        // Don't auto-observe project cards as they're dynamically loaded
        // They will be observed by the ProjectCards component
    }

    /**
     * Handle intersection observer callback
     */
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-card')) {
                    this.animateSkillBar(entry.target);
                }

                // Unobserve after animation to improve performance
                this.observer.unobserve(entry.target);
            }
        });
    }

    /**
     * Animate skill bars when visible
     */
    animateSkillBar(skillCard) {
        const progressBar = skillCard.querySelector('.skill-progress');
        if (progressBar) {
            const level = progressBar.getAttribute('data-level');
            setTimeout(() => {
                progressBar.style.width = level + '%';
            }, 100);
        }
    }

    /**
     * Add ripple effect to buttons
     */
    addRippleEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .submit-btn');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = button.querySelector('.ripple');
                
                if (ripple) {
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('active');

                    setTimeout(() => {
                        ripple.classList.remove('active');
                    }, 600);
                }
            });
        });
    }

    /**
     * Animate element with custom animation
     */
    animateElement(element, animationClass) {
        element.classList.add(animationClass);
        element.addEventListener('animationend', () => {
            element.classList.remove(animationClass);
        }, { once: true });
    }
}

// Initialize animation manager
export default AnimationManager;
