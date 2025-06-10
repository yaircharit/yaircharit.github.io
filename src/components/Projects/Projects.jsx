import { useState, useEffect } from 'react'
import projectsData from '../../data/projects.json'
import './Projects.css'

function Projects() {
return (
    <div className="projects-container">
        {projectsData.projects.map((project) => (
            <div key={project.id} className="project-card">          {project.image && (
                    <img 
                        src={project.image} 
                        alt={project.title}
                        className="project-image"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                )}
                <div className="project-content">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    <div className="project-footer">
                      <div className="project-technologies">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="technology-tag">{tech}</span>
                        ))}
                      </div>
                      <a href={project.repository} className="project-repo" target="_blank" rel="noopener noreferrer">
                        <span className="icon-github"></span>
                      </a>
                    </div>
                  </div>
            </div>
        ))}
    </div>
)
}

export default Projects
