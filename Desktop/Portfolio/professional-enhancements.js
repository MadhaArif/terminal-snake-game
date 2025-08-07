// Professional Enhancement Effects
class ProfessionalEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addSmoothScrolling();
        this.addLoadingAnimation();
        this.addScrollProgress();
        this.addTypingEffect();
        this.addCounterAnimation();
        this.addIntersectionObserver();
    }

    // Smooth scrolling for navigation
    addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Loading animation
    addLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading Portfolio...</div>
            </div>
        `;
        document.body.appendChild(loader);

        const loaderStyles = document.createElement('style');
        loaderStyles.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0a0a0f, #1a1a2e);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }

            .loader-content {
                text-align: center;
                color: #d0d0e0;
            }

            .loader-spinner {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(139, 92, 246, 0.3);
                border-top: 3px solid #8B5CF6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }

            .loader-text {
                font-family: 'Inter', sans-serif;
                font-size: 1.2rem;
                font-weight: 500;
                color: rgba(208, 208, 224, 0.8);
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .page-loader.hidden {
                opacity: 0;
                visibility: hidden;
            }
        `;
        document.head.appendChild(loaderStyles);

        // Hide loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }

    // Scroll progress indicator
    addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        const progressStyles = document.createElement('style');
        progressStyles.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 4px;
                background: linear-gradient(90deg, #8B5CF6, #A855F7, #C084FC);
                z-index: 1000;
                transition: width 0.1s ease;
                box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
            }
        `;
        document.head.appendChild(progressStyles);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Typing effect for hero title
    addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '3px solid #8B5CF6';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        heroTitle.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            setTimeout(typeWriter, 1500);
        }
    }

    // Counter animation for stats
    addCounterAnimation() {
        const createCounter = (element, target, duration = 2000) => {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                element.textContent = Math.floor(start);
                
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        };

        // Add stats section if it doesn't exist
        const aboutSection = document.querySelector('#about .container');
        if (aboutSection && !document.querySelector('.stats-grid')) {
            const statsHTML = `
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number" data-target="50">0</div>
                        <div class="stat-label">Projects Completed</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="3">0</div>
                        <div class="stat-label">Years Experience</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="100">0</div>
                        <div class="stat-label">Happy Clients</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="24">0</div>
                        <div class="stat-label">Technologies</div>
                    </div>
                </div>
            `;
            
            aboutSection.insertAdjacentHTML('beforeend', statsHTML);

            const statsStyles = document.createElement('style');
            statsStyles.textContent = `
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    margin-top: 4rem;
                    padding: 3rem 0;
                }

                .stat-item {
                    text-align: center;
                    padding: 2rem;
                    background: rgba(139, 92, 246, 0.1);
                    border-radius: 20px;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }

                .stat-item:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
                }

                .stat-number {
                    font-size: 3rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #8B5CF6, #A855F7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    font-size: 1.1rem;
                    color: rgba(208, 208, 224, 0.8);
                    font-weight: 500;
                }
            `;
            document.head.appendChild(statsStyles);
        }
    }

    // Intersection Observer for animations
    addIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger counter animation for stats
                    if (entry.target.classList.contains('stats-grid')) {
                        const counters = entry.target.querySelectorAll('.stat-number');
                        counters.forEach(counter => {
                            const target = parseInt(counter.getAttribute('data-target'));
                            this.createCounter(counter, target);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .project-card, .skill-item, .stats-grid').forEach(el => {
            observer.observe(el);
        });

        // Add animation styles
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            section, .project-card, .skill-item, .stats-grid {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }

            section.animate-in, .project-card.animate-in, .skill-item.animate-in, .stats-grid.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .project-card.animate-in {
                transition-delay: 0.1s;
            }

            .skill-item.animate-in {
                transition-delay: 0.2s;
            }
        `;
        document.head.appendChild(animationStyles);
    }

    createCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Initialize professional enhancements
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalEnhancements();
});