/**
 * Skill Bars Component - Animated progress bars
 */

class SkillBars {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.skills = [];
    }

    /**
     * Load skills data
     */
    async loadSkills() {
        try {
            const response = await fetch('data/content.json');
            const data = await response.json();
            this.skills = data.skills;
            this.render();
        } catch (error) {
            console.error('Error loading skills:', error);
        }
    }

    /**
     * Render skill cards
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = this.skills.map(skill => `
            <div class="skill-card">
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-level="${skill.level}" style="--skill-width: ${skill.level}%"></div>
                </div>
            </div>
        `).join('');

        // Observe skill cards for animation
        this.observeSkills();
    }

    /**
     * Observe skill cards for scroll animation
     */
    observeSkills() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBar = entry.target.querySelector('.skill-progress');
                        if (progressBar) {
                            const level = progressBar.getAttribute('data-level');
                            setTimeout(() => {
                                progressBar.style.width = level + '%';
                            }, 100);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        this.container.querySelectorAll('.skill-card').forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Initialize skill bars
     */
    init() {
        this.loadSkills();
    }
}

export default SkillBars;
