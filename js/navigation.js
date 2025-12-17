/**
 * Navigation Manager - Sticky navbar, smooth scroll, mobile menu
 */

class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('navMenu');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section, .hero');
        
        this.init();
    }

    /**
     * Initialize navigation manager
     */
    init() {
        // Sticky navbar on scroll
        window.addEventListener('scroll', () => this.handleScroll());

        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Mobile hamburger menu
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Update active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());

        // Set initial active link
        this.updateActiveLink();
    }

    /**
     * Handle scroll event for sticky navbar
     */
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    /**
     * Handle navigation link click
     */
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = this.navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking
                this.closeMobileMenu();
            }
        }
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Handle click outside mobile menu
     */
    handleOutsideClick(e) {
        if (this.navMenu.classList.contains('active') && 
            !this.navMenu.contains(e.target) && 
            !this.hamburger.contains(e.target)) {
            this.closeMobileMenu();
        }
    }

    /**
     * Update active navigation link based on scroll position
     */
    updateActiveLink() {
        const scrollPosition = window.scrollY + this.navbar.offsetHeight + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Initialize navigation manager
export default NavigationManager;
