import { Link } from 'react-router-dom'
import projectsData from '../data/projects.json'
import '../styles/Projects.css'

function Projects() {
return (
    <div className="projects-container">
        {projectsData.projects.map((project) => (
            <div key={project.id} className="project-card">
              {/* Use Link for internal projects, and regular card for external links */}
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
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
                        {project.repository && (
                        <a href={project.repository} className="project-repo" target="_blank" rel="noopener noreferrer">
                          <span className="icon-github"></span>
                        </a>
                      )}
                    </div>
                  </div>
                </a>
              ) : (
                <Link to={`/project/${project.id}`} className="project-link">
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
                      {project.repository && (
                        <a href={project.repository} className="project-repo" target="_blank" rel="noopener noreferrer">
                          <span className="icon-github"></span>
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              )}
            </div>
        ))}
    </div>
)
}

export default Projects
