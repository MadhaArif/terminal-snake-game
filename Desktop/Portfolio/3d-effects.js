// 3D Effects and Animations
class ThreeDEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addMouseTracker();
        this.addScrollAnimations();
        this.addFloatingElements();
        this.addParallaxEffect();
        this.addTiltEffect();
    }

    addMouseTracker() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;

            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) perspective(1000px) rotateX(${moveY * 0.1}deg) rotateY(${moveX * 0.1}deg)`;
            }
        });

        hero.addEventListener('mouseleave', () => {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = 'translate3d(0, 0, 0) perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    }

    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add stagger effect for child elements
                    const children = entry.target.querySelectorAll('.card, .skill-item, .project-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    addFloatingElements() {
        // Create floating geometric shapes
        const shapes = ['circle', 'triangle', 'square', 'hexagon'];
        const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#a855f7'];

        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.className = `floating-shape floating-${shapes[Math.floor(Math.random() * shapes.length)]}`;
            shape.style.cssText = `
                position: fixed;
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                opacity: ${Math.random() * 0.3 + 0.1};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                pointer-events: none;
                z-index: 1;
                animation: float-${i} ${Math.random() * 20 + 10}s linear infinite;
                filter: blur(${Math.random() * 2}px);
                box-shadow: 0 0 20px currentColor;
            `;

            // Create unique animation for each shape
            const shapeStyle = document.createElement('style');
            shapeStyle.textContent = `
                @keyframes float-${i} {
                    0% {
                        transform: translateY(100vh) rotate(0deg) scale(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: ${Math.random() * 0.3 + 0.1};
                        transform: scale(1);
                    }
                    90% {
                        opacity: ${Math.random() * 0.3 + 0.1};
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(shapeStyle);
            document.body.appendChild(shape);
        }
    }

    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    addTiltEffect() {
        const cards = document.querySelectorAll('.card, .project-card, .skill-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.style.transformStyle = 'preserve-3d';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px)
                    scale3d(1.05, 1.05, 1.05)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
            });
        });
    }
}

// Magnetic Button Effect
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mouseenter', this.onMouseEnter.bind(this));
            button.addEventListener('mousemove', this.onMouseMove.bind(this));
            button.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        });
    }

    onMouseEnter(e) {
        e.target.style.transition = 'transform 0.1s ease';
    }

    onMouseMove(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        e.target.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
    }

    onMouseLeave(e) {
        e.target.style.transition = 'transform 0.3s ease';
        e.target.style.transform = 'translate(0, 0) scale(1)';
    }
}

// Glitch Effect for Text
class GlitchEffect {
    constructor() {
        this.addGlitchToTitle();
    }

    addGlitchToTitle() {
        const title = document.querySelector('.hero-title');
        if (!title) return;

        setInterval(() => {
            if (Math.random() > 0.95) {
                title.classList.add('glitch');
                setTimeout(() => {
                    title.classList.remove('glitch');
                }, 200);
            }
        }, 3000);
    }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeDEffects();
    new MagneticButtons();
    new GlitchEffect();
});

// Add CSS for animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .glitch {
        animation: glitch 0.2s ease-in-out;
    }

    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }

    .floating-shape {
        will-change: transform;
    }

    .card, .project-card, .skill-item {
        transition: transform 0.3s ease;
        will-change: transform;
    }
`;
document.head.appendChild(animationStyle);