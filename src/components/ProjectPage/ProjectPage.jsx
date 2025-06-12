import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../../data/projects.json';
import './ProjectPage.css';

function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData.projects.find(p => p.id === projectId);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleBack = () => {
    navigate('/#projects');
  };
  return (
    <div className="project-page">
      <button onClick={handleBack} className="back-button">← Back</button>
      
      <div className="project-content">
        <h1>{project.title}</h1>
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="technology-tag">{tech}</span>
          ))}
        </div>
        <p className="project-description">{project.description}</p>
        {project.repository && (
          <a 
            href={project.repository} 
            className="project-repo-link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View Repository
          </a>
        )}
      </div>
      {project.image && (
        <img 
          src={project.image} 
          alt={project.title} 
          className="project-hero-image"
        />
      )}
    </div>
  );
}

export default ProjectPage;
