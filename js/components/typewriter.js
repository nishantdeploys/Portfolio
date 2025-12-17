/**
 * Typewriter Component - Typing animation effect
 */

class Typewriter {
    constructor(elementId, texts, options = {}) {
        this.element = document.getElementById(elementId);
        this.texts = texts;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        // Options with defaults
        this.options = {
            typeSpeed: options.typeSpeed || 100,
            deleteSpeed: options.deleteSpeed || 50,
            delayBetweenTexts: options.delayBetweenTexts || 2000,
            loop: options.loop !== undefined ? options.loop : true
        };
    }

    /**
     * Type text character by character
     */
    type() {
        if (!this.element) return;

        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            // Delete character
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Type character
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        // Determine typing speed
        let speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

        // Check if word is complete
        if (!this.isDeleting && this.charIndex === currentText.length) {
            // Pause at end of text
            speed = this.options.delayBetweenTexts;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Move to next text
            this.isDeleting = false;
            this.textIndex++;

            // Loop back to start or stop
            if (this.textIndex >= this.texts.length) {
                if (this.options.loop) {
                    this.textIndex = 0;
                } else {
                    return; // Stop animation
                }
            }

            speed = 500; // Pause before starting next text
        }

        setTimeout(() => this.type(), speed);
    }

    /**
     * Initialize typewriter
     */
    init() {
        // Start typing after a short delay
        setTimeout(() => this.type(), 500);
    }
}

export default Typewriter;
