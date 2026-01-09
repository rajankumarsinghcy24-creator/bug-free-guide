// Tech Stack Decision Logic
class TechStackAnalyzer {
    constructor() {
        this.stacks = {
            mern: {
                name: 'MERN Stack',
                logo: '⚛️',
                description: 'MongoDB, Express.js, React, Node.js'
            },
            django: {
                name: 'Django',
                logo: '🐍',
                description: 'Python web framework with batteries included'
            },
            spring: {
                name: 'Spring Boot',
                logo: '🍃',
                description: 'Java framework for enterprise applications'
            }
        };

        this.criteria = {
            budget: { weight: 0.2 },
            projectSize: { weight: 0.25 },
            performance: { weight: 0.2 },
            teamExperience: { weight: 0.15 },
            timeline: { weight: 0.1 },
            maintenance: { weight: 0.1 }
        };
    }

    calculateScores(inputs) {
        const scores = {
            mern: 0,
            django: 0,
            spring: 0
        };

        // Budget scoring
        const budgetScores = {
            low: { mern: 9, django: 8, spring: 6 },
            medium: { mern: 8, django: 9, spring: 8 },
            high: { mern: 7, django: 8, spring: 9 }
        };

        // Project size scoring
        const sizeScores = {
            small: { mern: 9, django: 8, spring: 6 },
            medium: { mern: 8, django: 9, spring: 8 },
            large: { mern: 7, django: 8, spring: 9 }
        };

        // Performance scoring
        const performanceScores = {
            basic: { mern: 8, django: 8, spring: 7 },
            high: { mern: 7, django: 8, spring: 9 },
            enterprise: { mern: 6, django: 7, spring: 9 }
        };

        // Team experience scoring
        const experienceScores = {
            beginner: { mern: 7, django: 9, spring: 5 },
            intermediate: { mern: 8, django: 8, spring: 7 },
            expert: { mern: 8, django: 8, spring: 9 }
        };

        // Timeline scoring
        const timelineScores = {
            fast: { mern: 8, django: 9, spring: 6 },
            medium: { mern: 8, django: 8, spring: 8 },
            long: { mern: 7, django: 8, spring: 9 }
        };

        // Maintenance scoring
        const maintenanceScores = {
            minimal: { mern: 7, django: 8, spring: 9 },
            regular: { mern: 8, django: 8, spring: 8 },
            active: { mern: 9, django: 8, spring: 7 }
        };

        const allScores = {
            budget: budgetScores[inputs.budget],
            projectSize: sizeScores[inputs.projectSize],
            performance: performanceScores[inputs.performance],
            teamExperience: experienceScores[inputs.teamExperience],
            timeline: timelineScores[inputs.timeline],
            maintenance: maintenanceScores[inputs.maintenance]
        };

        // Calculate weighted scores
        Object.keys(scores).forEach(stack => {
            Object.keys(this.criteria).forEach(criterion => {
                scores[stack] += allScores[criterion][stack] * this.criteria[criterion].weight;
            });
            scores[stack] = Math.round(scores[stack] * 10) / 10;
        });

        return scores;
    }

    getStackDetails(stack, inputs) {
        const details = {
            mern: {
                pros: [
                    'Single language (JavaScript) across full stack',
                    'Large community and ecosystem',
                    'Fast development with React',
                    'Great for real-time applications',
                    'Flexible and lightweight'
                ],
                cons: [
                    'Rapid ecosystem changes',
                    'Callback complexity in Node.js',
                    'Less structured than frameworks',
                    'Security considerations with NoSQL',
                    'Performance limitations for CPU-intensive tasks'
                ],
                bestFor: [
                    'Startups and MVPs',
                    'Real-time applications (chat, collaboration)',
                    'Teams with strong JavaScript skills',
                    'Projects requiring rapid prototyping',
                    'Single-page applications (SPAs)'
                ]
            },
            django: {
                pros: [
                    'Batteries included philosophy',
                    'Excellent documentation',
                    'Built-in admin interface',
                    'Strong security features',
                    'Great for rapid development'
                ],
                cons: [
                    'Monolithic architecture can be limiting',
                    'ORM can be restrictive for complex queries',
                    'Less flexibility than micro-frameworks',
                    'Python GIL limitations for concurrency',
                    'Steeper learning curve for beginners'
                ],
                bestFor: [
                    'Content management systems',
                    'Data-driven applications',
                    'Teams with Python experience',
                    'Projects requiring quick development',
                    'Applications with complex business logic'
                ]
            },
            spring: {
                pros: [
                    'Enterprise-grade features',
                    'Excellent performance and scalability',
                    'Strong typing with Java',
                    'Comprehensive testing support',
                    'Mature ecosystem and tooling'
                ],
                cons: [
                    'Steep learning curve',
                    'Verbose configuration',
                    'Slower initial development',
                    'Higher resource requirements',
                    'Complex for simple applications'
                ],
                bestFor: [
                    'Enterprise applications',
                    'Microservices architecture',
                    'High-performance systems',
                    'Teams with Java expertise',
                    'Long-term, scalable projects'
                ]
            }
        };

        return details[stack];
    }

    generateRecommendation(inputs) {
        const scores = this.calculateScores(inputs);
        const sortedStacks = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .map(([stack, score]) => ({ stack, score }));

        return {
            scores,
            ranking: sortedStacks,
            analysis: this.generateAnalysis(inputs, scores)
        };
    }

    generateAnalysis(inputs, scores) {
        const analysis = [];
        
        // Budget analysis
        if (inputs.budget === 'low') {
            analysis.push('💰 For low budgets, MERN Stack offers the most cost-effective solution with minimal hosting requirements.');
        } else if (inputs.budget === 'high') {
            analysis.push('💰 With a higher budget, Spring Boot provides enterprise-grade features that justify the investment.');
        }

        // Project size analysis
        if (inputs.projectSize === 'small') {
            analysis.push('📏 For small projects, MERN Stack provides the fastest time-to-market with minimal overhead.');
        } else if (inputs.projectSize === 'large') {
            analysis.push('📏 Large projects benefit from Spring Boot\'s robust architecture and enterprise patterns.');
        }

        // Performance analysis
        if (inputs.performance === 'enterprise') {
            analysis.push('⚡ Enterprise performance requirements strongly favor Spring Boot\'s JVM optimizations.');
        }

        // Experience analysis
        if (inputs.teamExperience === 'beginner') {
            analysis.push('👥 Django\'s excellent documentation and "batteries included" approach is ideal for beginners.');
        }

        return analysis;
    }
}

// DOM Management
class UIManager {
    constructor() {
        this.analyzer = new TechStackAnalyzer();
        this.form = document.getElementById('decision-form');
        this.results = document.getElementById('results');
        this.recommendations = document.getElementById('recommendations');
        
        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    handleFormSubmit() {
        const formData = new FormData(this.form);
        const inputs = Object.fromEntries(formData.entries());
        
        const recommendation = this.analyzer.generateRecommendation(inputs);
        this.displayResults(recommendation, inputs);
        
        this.results.style.display = 'block';
        this.results.scrollIntoView({ behavior: 'smooth' });
    }

    displayResults(recommendation, inputs) {
        const { scores, ranking, analysis } = recommendation;
        
        let html = '<div class="stack-comparison">';
        
        // Generate cards for each stack
        Object.keys(this.analyzer.stacks).forEach(stackKey => {
            const stack = this.analyzer.stacks[stackKey];
            const score = scores[stackKey];
            const details = this.analyzer.getStackDetails(stackKey, inputs);
            
            html += `
                <div class="stack-card ${stackKey}">
                    <div class="stack-header">
                        <span class="stack-logo">${stack.logo}</span>
                        <div>
                            <div class="stack-name">${stack.name}</div>
                            <div style="color: #666; font-size: 0.9rem;">${stack.description}</div>
                        </div>
                        <div class="score">${score}/10</div>
                    </div>
                    
                    <div class="pros-cons">
                        <div class="pros">
                            <h4>Pros</h4>
                            <ul>
                                ${details.pros.map(pro => `<li>${pro}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="cons">
                            <h4>Cons</h4>
                            <ul>
                                ${details.cons.map(con => `<li>${con}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="best-for">
                        <h4>Best For</h4>
                        <ul>
                            ${details.bestFor.map(use => `<li>${use}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        // Add analysis summary
        if (analysis.length > 0) {
            html += `
                <div class="summary">
                    <h3>📋 Key Insights for Your Project</h3>
                    ${analysis.map(insight => `<p>${insight}</p>`).join('')}
                    
                    <h3>🏆 Ranking Summary</h3>
                    <ol>
                        ${ranking.map(({stack, score}) => 
                            `<li><strong>${this.analyzer.stacks[stack].name}</strong> - ${score}/10</li>`
                        ).join('')}
                    </ol>
                    
                    <p style="margin-top: 20px; font-style: italic; color: #666;">
                        Remember: The "best" choice depends on your specific context. Consider team expertise, 
                        long-term maintenance, and project evolution when making your final decision.
                    </p>
                </div>
            `;
        }
        
        this.recommendations.innerHTML = html;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new UIManager();
});