// Initialize data from portfolio
function initializeAdminData() {
    // Skills
    if (!localStorage.getItem('skills')) {
        const defaultSkills = [
            { name: 'HTML5', level: 90, icon: 'fab fa-html5' },
            { name: 'CSS3', level: 85, icon: 'fab fa-css3-alt' },
            { name: 'JavaScript', level: 75, icon: 'fab fa-js' },
            { name: 'Responsive Design', level: 80, icon: 'fas fa-mobile-alt' },
            { name: 'Web Development', level: 70, icon: 'fas fa-code' },
            { name: 'Problem Solving', level: 75, icon: 'fas fa-lightbulb' }
        ];
        localStorage.setItem('skills', JSON.stringify(defaultSkills));
    }

    // Projects
    if (!localStorage.getItem('projects')) {
        const defaultProjects = [
            {
                name: 'Portfolio Website',
                description: 'A personal portfolio website showcasing skills and projects.',
                technologies: 'HTML, CSS, JavaScript',
                link: '#',
                image: ''
            }
        ];
        localStorage.setItem('projects', JSON.stringify(defaultProjects));
    }

    // Stats
    if (!localStorage.getItem('stats')) {
        localStorage.setItem('stats', JSON.stringify({ years: 1, projects: 5 }));
    }
}

// Navigation
document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active nav
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Show section
        const section = this.dataset.section;
        document.querySelectorAll('.admin-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(section + '-section').classList.add('active');
    });
});

// ===== SKILLS =====

function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    const container = document.getElementById('skills-list');
    
    if (!container) return;
    
    if (skills.length === 0) {
        container.innerHTML = '<p class="no-data">No skills added yet. Click "Add Skill" to get started.</p>';
        return;
    }
    
    container.innerHTML = skills.map((skill, index) => `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${skill.name}</h3>
                <div class="card-actions">
                    <button class="edit-btn" onclick="editSkill(${index})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteSkill(${index})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <i class="${skill.icon} skill-icon-display"></i>
                <div class="skill-level-bar">
                    <div class="skill-level-progress" style="width: ${skill.level}%"></div>
                </div>
                <p style="margin-top: 10px; font-weight: 600;">Level: ${skill.level}%</p>
            </div>
        </div>
    `).join('');
}

function showAddSkillModal() {
    document.getElementById('skill-modal-title').textContent = 'Add Skill';
    document.getElementById('skill-form').reset();
    document.getElementById('skill-index').value = '';
    document.getElementById('skill-level-display').textContent = '50%';
    document.getElementById('skill-modal').classList.add('show');
}

function editSkill(index) {
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    const skill = skills[index];
    
    document.getElementById('skill-modal-title').textContent = 'Edit Skill';
    document.getElementById('skill-index').value = index;
    document.getElementById('skill-name').value = skill.name;
    document.getElementById('skill-level').value = skill.level;
    document.getElementById('skill-level-display').textContent = skill.level + '%';
    document.getElementById('skill-icon').value = skill.icon;
    
    document.getElementById('skill-modal').classList.add('show');
}

function closeSkillModal() {
    document.getElementById('skill-modal').classList.remove('show');
}

function updateLevelDisplay(value) {
    document.getElementById('skill-level-display').textContent = value + '%';
}

function saveSkill(e) {
    e.preventDefault();
    
    const index = document.getElementById('skill-index').value;
    const name = document.getElementById('skill-name').value;
    const level = document.getElementById('skill-level').value;
    const icon = document.getElementById('skill-icon').value || 'fas fa-code';
    
    let skills = JSON.parse(localStorage.getItem('skills')) || [];
    
    const skillData = { name, level: parseInt(level), icon };
    
    if (index !== '') {
        skills[parseInt(index)] = skillData;
        showToast('Skill updated successfully!');
    } else {
        skills.push(skillData);
        showToast('Skill added successfully!');
    }
    
    localStorage.setItem('skills', JSON.stringify(skills));
    closeSkillModal();
    loadSkills();
}

function deleteSkill(index) {
    if (confirm('Are you sure you want to delete this skill?')) {
        let skills = JSON.parse(localStorage.getItem('skills')) || [];
        skills.splice(index, 1);
        localStorage.setItem('skills', JSON.stringify(skills));
        showToast('Skill deleted successfully!');
        loadSkills();
    }
}

// ===== PROJECTS =====

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const container = document.getElementById('projects-list');
    
    if (!container) return;
    
    if (projects.length === 0) {
        container.innerHTML = '<p class="no-data">No projects added yet. Click "Add Project" to get started.</p>';
        return;
    }
    
    container.innerHTML = projects.map((project, index) => `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${project.name}</h3>
                <div class="card-actions">
                    <button class="edit-btn" onclick="editProject(${index})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteProject(${index})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <p><strong>Technologies:</strong> ${project.technologies}</p>
                <p>${project.description}</p>
                ${project.link ? `<p><a href="${project.link}" target="_blank">View Project</a></p>` : ''}
            </div>
        </div>
    `).join('');
}

function showAddProjectModal() {
    document.getElementById('project-modal-title').textContent = 'Add Project';
    document.getElementById('project-form').reset();
    document.getElementById('project-index').value = '';
    document.getElementById('project-modal').classList.add('show');
}

function editProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects[index];
    
    document.getElementById('project-modal-title').textContent = 'Edit Project';
    document.getElementById('project-index').value = index;
    document.getElementById('project-name').value = project.name;
    document.getElementById('project-description').value = project.description;
    document.getElementById('project-technologies').value = project.technologies;
    document.getElementById('project-link').value = project.link || '';
    document.getElementById('project-image').value = project.image || '';
    
    document.getElementById('project-modal').classList.add('show');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('show');
}

function saveProject(e) {
    e.preventDefault();
    
    const index = document.getElementById('project-index').value;
    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;
    const technologies = document.getElementById('project-technologies').value;
    const link = document.getElementById('project-link').value;
    const image = document.getElementById('project-image').value;
    
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    const projectData = { name, description, technologies, link, image };
    
    if (index !== '') {
        projects[parseInt(index)] = projectData;
        showToast('Project updated successfully!');
    } else {
        projects.push(projectData);
        showToast('Project added successfully!');
    }
    
    localStorage.setItem('projects', JSON.stringify(projects));
    closeProjectModal();
    loadProjects();
}

function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        showToast('Project deleted successfully!');
        loadProjects();
    }
}

// ===== STATS =====

function loadStats() {
    const stats = JSON.parse(localStorage.getItem('stats')) || { years: 1, projects: 5 };
    document.getElementById('years-input').value = stats.years;
    document.getElementById('projects-input').value = stats.projects;
}

function saveStats() {
    const years = document.getElementById('years-input').value;
    const projects = document.getElementById('projects-input').value;
    
    const stats = {
        years: parseInt(years),
        projects: parseInt(projects)
    };
    
    localStorage.setItem('stats', JSON.stringify(stats));
    showToast('Stats saved successfully!');
}

// ===== TOAST NOTIFICATION =====

function showToast(message, isError = false) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast' + (isError ? ' error' : '');
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Close modals on outside click
document.getElementById('skill-modal')?.addEventListener('click', function(e) {
    if (e.target === this) closeSkillModal();
});

document.getElementById('project-modal')?.addEventListener('click', function(e) {
    if (e.target === this) closeProjectModal();
});

// Close modals on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSkillModal();
        closeProjectModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminData();
    loadSkills();
    loadProjects();
    loadStats();
});
