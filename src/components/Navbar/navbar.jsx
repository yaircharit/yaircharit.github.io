import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/YC_Logo_Red.png'
import projectsData from '../../data/projects.json'
import contactDetails from'../../data/contact.json'

function Navbar() {  const [isOpen, setIsOpen] = useState(false)
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownTimeout, setDropdownTimeout] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle auto-close of dropdown
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsProjectsOpen(false)
    }, 1000) // Close after 1 second
    setDropdownTimeout(timeout)
  }

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
  }

  const handleNavigation = (e, path) => {
    e.preventDefault()
    if (path.startsWith('#')) {
      // If we're on the home page, just scroll to the section
      if (window.location.pathname === '/') {
        const element = document.querySelector(path)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // If we're on a different page, navigate to home and then scroll
        navigate('/')
        setTimeout(() => {
          const element = document.querySelector(path)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    } else {
      navigate(path)
    }
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen)
  }

  return (    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="left-section">
        <a href="/" className="navbar-icon" onClick={(e) => handleNavigation(e, '/')}>
          <img src={logo} className="nav-logo" alt="React Logo" />
        </a>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={(e) => handleNavigation(e, '#home')}>Home</a></li>
          <li><a href="#about" onClick={(e) => handleNavigation(e, '#about')}>About</a></li>
          <li 
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a onClick={toggleProjects}>
              Projects {isProjectsOpen ? '▼' : '▶'}
            </a>
            <ul className={`dropdown-menu ${isProjectsOpen ? 'active' : ''}`}>{projectsData.projects.map((project) => (
                <li key={project.id}>
                  {project.link ? (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <a 
                      href={`/project/${project.id}`}
                      onClick={(e) => handleNavigation(e, `/project/${project.id}`)}
                    >
                      {project.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li><a href="#contact" onClick={(e) => handleNavigation(e, '#contact')}>Contact</a></li>
          <li><a href={contactDetails.resumeLink}>Resume</a></li>
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