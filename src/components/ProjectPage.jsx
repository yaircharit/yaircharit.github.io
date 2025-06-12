import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';
import '../styles/ProjectPage.css';

function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData.projects.find(p => p.id === projectId);
  const [zoom, setZoom] = useState(1);

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

  const isHtmlLink = project.link && project.link.endsWith('.html');

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.05, 2));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.05, 0.25));
  const handleZoomReset = () => setZoom(1);

  return (
    <div className="project-page">
      <button onClick={handleBack} className="back-button">← Back</button>
      
      <div className="project-content">
        <h1>{project.title}</h1>
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="technology-tag">{tech}</span>
          ))}
          {project.repository && (
            <a 
              href={project.repository} 
              className="github-icon" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ marginLeft: 'auto' }}
            >
              <svg 
                height="32" 
                aria-hidden="true" 
                viewBox="0 0 16 16" 
                version="1.1" 
                width="32" 
                data-view-component="true"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
          )}
        </div>
        <p className="project-description">{project.description}</p>
      </div>
      {project.image && (
        <img 
          src={project.image} 
          alt={project.title} 
          className="project-hero-image"
        />
      )}
      {isHtmlLink && (
        <div className="project-html-container">
          <div className="zoom-controls">
            <div>
            <button onClick={handleZoomOut} title="Zoom Out">-</button>
            <span className="zoom-label">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} title="Zoom In">+</button>
            <button onClick={handleZoomReset} title="Reset Zoom">⟳</button>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="open-html-btn"
              style={{ right: '2rem', fontSize: '1rem', padding: '0.3rem 0.8rem', border: '1px solid #ccc', borderRadius: '5px', background: 'white', textDecoration: 'none', color: '#333', display: 'inline-block' }}
            >
              Open Full Page ↗
            </a>
          </div>
          <div className="iframe-zoom-wrapper">
            <iframe 
              src={project.link}
              title={project.title}
              className="project-html-frame"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', width: `${100/zoom}%`, height: `${100/zoom}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
