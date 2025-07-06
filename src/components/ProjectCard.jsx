import { Link } from 'react-router-dom'
import projectsData from '../data/projects.json'
import '../styles/ProjectCard.css'
import Icon from './Icon'


function ProjectCard({ project }) {
  const techs = (
    <div className="project-technologies">
      {project.technologies.map((tech, i) => <span key={i} className="technology-tag">{tech}</span>)}
    </div>
  )
  const repo = project.repository && (
    <a href={project.repository} className="project-repo" target="_blank" rel="noopener noreferrer"><Icon name="FaGithub" /></a>
  )
  const titleLink = project.link
    ? (project.link.endsWith('.html')
        ? <Link to={`/project/${project.id}`}>{project.title}</Link>
        : <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>)
    : <Link to={`/project/${project.id}`}>{project.title}</Link>;

  return (
    <div className="project-content">
      <div>
        <h3>{titleLink}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-footer">{techs}{repo}</div>
    </div>
  );
}

export default function ProjectCardList() {
  return (
    <div className="projects-container">
      {projectsData.projects.map(project => (
        <div key={project.id} className="project-card">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}
