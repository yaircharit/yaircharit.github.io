import { useState, useEffect } from 'react'
import './navbar.css'
import logo from '../../assets/YC_Logo_Red.png'
import projectsData from '../../data/projects.json'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [prevScroll, setPrevScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const isScrollingDown = currentScroll > prevScroll
      const homeSection = document.getElementById('home')
      const homeSectionHeight = homeSection?.offsetHeight || 0

      // Update navbar visibility
      if (currentScroll <= 10) {
        setVisible(true)
        setScrolled(false)
      } else if (isScrollingDown && currentScroll > homeSectionHeight * 0.5) {
        setVisible(false)
      } else {
        setVisible(true)
        setScrolled(true)
      }

      setPrevScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScroll])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : 'hidden'}`}>
        <div className="left-section">
          <a href="/" className="navbar-icon">
            <img src={logo} className="nav-logo" alt="React Logo" />
          </a>

        
      <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li className="dropdown">
          <a href="#projects" onClick={toggleProjects}>
            Projects {isProjectsOpen ? '▼' : '▶'}
          </a>
          <ul className={`dropdown-menu ${isProjectsOpen ? 'active' : ''}`}>
            {projectsData.projects.map((project) => (
              <li key={project.id}>
                <a href={`#${project.id}`}>{project.title}</a>
              </li>
            ))}
          </ul>
        </li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="resume">Resume</a></li>
      </ul>
              </div>
      <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
    </nav>
  )
}

export default Navbar