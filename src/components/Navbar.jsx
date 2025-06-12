import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../assets/YC_Logo_Red.png'
import projectsData from '../data/projects.json'
import contactDetails from'../data/contact.json'
import navbarData from '../data/navbar.json'
import DropdownMenu from './DropdownMenu'

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', dark);
  }, [dark]);

  return [dark, setDark];
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownTimeout, setDropdownTimeout] = useState(null)
  const navigate = useNavigate()
  const [dark, setDark] = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseLeave = (label) => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null)
    }, 1000)
    setDropdownTimeout(timeout)
  }

  const handleMouseEnter = (label) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setOpenDropdown(label)
  }

  const handleNavigation = (e, path) => {
    e.preventDefault();
    if (path === '/') {
      window.location.hash = '#/';
    } else if (path.startsWith('#')) {
      window.location.hash = '#/' + path; // double-hash for anchor
    } else if (path.startsWith('/')) {
      window.location.hash = '#' + path;
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Helper to generate dropdown items for projects
  const getProjectDropdownItems = () =>
    projectsData.projects.map((project) => {
      if (project.link) {
        if (project.link.endsWith('.html')) {
          return {
            label: project.title,
            href: `/project/${project.id}`,
            onClick: (e) => handleNavigation(e, `/project/${project.id}`)
          }
        } else {
          return {
            label: project.title,
            href: project.link,
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }
      } else {
        return {
          label: project.title,
          href: `/project/${project.id}`,
          onClick: (e) => handleNavigation(e, `/project/${project.id}`)
        }
      }
    })

  // Helper for future dropdowns (static or dynamic)
  const getDropdownItems = (item) => {
    if (item.label === 'Projects') {
      return getProjectDropdownItems()
    }
    // For future dropdowns, you can add logic here
    // Example: return item.items || []
    return item.items || []
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="left-section">
        <a href="/" className="navbar-icon" onClick={(e) => handleNavigation(e, '/')}> 
          <img src={logo} className="nav-logo" alt="React Logo" />
        </a>
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {navbarData.menu.map((item) => {
            if (item.type === 'anchor') {
              return (
                <li key={item.label}>
                  <a href={item.target} onClick={(e) => handleNavigation(e, item.target)}>{item.label}</a>
                </li>
              )
            } else if (item.type === 'dropdown') {
              return (
                <DropdownMenu
                  key={item.label}
                  label={item.label}
                  items={getDropdownItems(item)}
                  isOpen={openDropdown === item.label}
                  onToggle={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={() => handleMouseLeave(item.label)}
                  handleNavigation={handleNavigation}
                />
              )
            } else if (item.type === 'external' && item.label === 'Resume') {
              return (
                <li key={item.label}>
                  <a href={contactDetails.resumeLink} target="_blank" rel="noopener noreferrer">{item.label}</a>
                </li>
              )
            }
            return null
          })}
        </ul>
      </div>
      <div className="right-section">
        <button
          className="dark-mode-toggle"
          onClick={() => setDark(d => !d)}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '1rem' }}
        >
          {dark ? (
            // Moon SVG
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
            </svg>
          ) : (
            // Sun SVG
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          )}
        </button>
        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar