import { Link } from 'react-router-dom'
import projectsData from '../data/projects.json'
import '../styles/Projects.css'

function Projects() {
  const githubIcon = (
    <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
    </svg>
  );

  return (
    <div className="projects-container">
      {projectsData.projects.map((project) => (
        <div key={project.id} className="project-card">
          {project.link ? (
            project.link.endsWith('.html') ? (
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
                        {githubIcon}
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
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
                        {githubIcon}
                      </a>
                    )}
                  </div>
                </div>
              </a>
            )
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
                      {githubIcon}
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
