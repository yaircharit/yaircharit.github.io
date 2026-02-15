import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import projectsData from '../data/projects.json';
import '../styles/ProjectPage.css';

export default function ProjectPage() {
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

  const isHtmlLink = project.link && project.link.endsWith('.html');
  const handleZoom = amt => setZoom(z => Math.max(0.25, Math.min(z + amt, 2)));
  const repo = project.repository && (
    <a href={project.repository} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto' }}><Icon name="FaGithub" /></a>
  )

  return (
    <div className="project-page">
      <button onClick={() => navigate('/#projects')} className="back-button">← Back</button>
      
      <div className="project-content">
        <h1>{project.title}</h1>
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="technology-tag">{tech}</span>
          ))}
          {repo}
        </div>
        <p className="project-description">{(project.fullDescription) ? project.fullDescription : project.description}</p>
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
              <button onClick={() => handleZoom(-0.05)} title="Zoom Out">-</button>
              <span className="zoom-label">{Math.round(zoom * 100)}%</span>
              <button onClick={() => handleZoom(0.05)} title="Zoom In">+</button>
              <button onClick={() => setZoom(1)} title="Reset Zoom">⟳</button>
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
