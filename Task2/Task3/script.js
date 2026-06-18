// Default data for portfolio
const defaultSkills = [
    { name: 'HTML5', level: 90, icon: 'fab fa-html5' },
    { name: 'CSS3', level: 85, icon: 'fab fa-css3-alt' },
    { name: 'JavaScript', level: 75, icon: 'fab fa-js' },
    { name: 'Responsive Design', level: 80, icon: 'fas fa-mobile-alt' },
    { name: 'Web Development', level: 70, icon: 'fas fa-code' },
    { name: 'Problem Solving', level: 75, icon: 'fas fa-lightbulb' }
];

const defaultProjects = [
    {
        name: 'Portfolio Website',
        description: 'A personal portfolio website showcasing skills and projects.',
        technologies: 'HTML, CSS, JavaScript',
        link: '#',
        image: ''
    }
];

// Initialize portfolio data
function initializeData() {
    if (!localStorage.getItem('skills')) {
        localStorage.setItem('skills', JSON.stringify(defaultSkills));
    }
    if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify(defaultProjects));
    }
    if (!localStorage.getItem('stats')) {
        localStorage.setItem('stats', JSON.stringify({
            years: 1,
            projects: 5
        }));
    }
}

// Load and display projects
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || defaultProjects;
    const container = document.getElementById('projects-container');
    
    if (!container) return;
    
    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                ${project.image ? `<img src="${project.image}" alt="${project.name}">` : '<i class="fas fa-folder"></i>'}
            </div>
            <div class="project-content">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.split(',').map(tech => `<span>${tech.trim()}</span>`).join('')}
                </div>
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project <i class="fas fa-external-link-alt"></i></a>` : ''}
            </div>
        </div>
    `).join('');
    
    // Update projects count in stats
    const projectsCount = document.getElementById('projects-count');
    if (projectsCount) {
        projectsCount.textContent = projects.length;
    }
}

// Load and display skills
function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skills')) || defaultSkills;
    const container = document.getElementById('skills-container');
    
    if (!container) return;
    
    container.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <i class="${skill.icon} skill-icon"></i>
            <h3 class="skill-name">${skill.name}</h3>
            <div class="skill-level">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
        </div>
    `).join('');
    
    // Update skills count in stats
    const skillsCount = document.getElementById('skills-count');
    if (skillsCount) {
        skillsCount.textContent = skills.length;
    }
}

// Load stats
function loadStats() {
    const stats = JSON.parse(localStorage.getItem('stats')) || { years: 1, projects: 5 };
    const yearsExp = document.getElementById('years-exp');
    const projectsCount = document.getElementById('projects-count');
    if (yearsExp) yearsExp.textContent = stats.years;
    if (projectsCount) projectsCount.textContent = stats.projects;
}

// Back to top button functionality
window.onscroll = function() {
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    }
};

document.getElementById('topBtn')?.addEventListener('click', function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    loadSkills();
    loadProjects();
    loadStats();
});
