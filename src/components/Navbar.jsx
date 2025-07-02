import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../assets/YC_Logo_Red.png'
import projectsData from '../data/projects.json'
import navbarData from '../data/navbar.json'
import DropdownMenu from './DropdownMenu'

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark)
    localStorage.setItem('darkMode', dark)
  }, [dark])
  return [dark, setDark]
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownTimeout, setDropdownTimeout] = useState(null)
  const navigate = useNavigate()
  const [dark, setDark] = useDarkMode()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigation = (e, path) => {
    e.preventDefault()

    window.location.hash = path
    setIsOpen(false)
  }

  const getProjectDropdownItems = () =>
    projectsData.projects.map(project =>
      project.link && !project.link.endsWith('.html')
        ? { label: project.title, href: project.link, target: '_blank', rel: 'noopener noreferrer' }
        : { label: project.title, href: `/project/${project.id}`, onClick: e => handleNavigation(e, `/project/${project.id}`) }
    )

  const getDropdownItems = item =>
    item.label === 'Projects' ? getProjectDropdownItems() : item.items || []

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="left-section">
        {/* Hamburger button for mobile - now on the left */}
        <button className="hamburger mobile-only" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        {/* Navbar menu for desktop and toggled mobile */}
        <ul className={`navbar-menu${isOpen ? ' active' : ''}`}>
          {navbarData.menu.map(item => {
            if (item.type === 'dropdown')
              return (
                <DropdownMenu
                  key={item.label}
                  label={item.label}
                  items={getDropdownItems(item)}
                  isOpen={openDropdown === item.label}
                  onToggle={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  onMouseEnter={() => {
                    if (dropdownTimeout) {
                      clearTimeout(dropdownTimeout);
                      setDropdownTimeout(null)
                    }
                    setOpenDropdown(item.label)
                  }}
                  onMouseLeave={() =>
                    setDropdownTimeout(setTimeout(() => setOpenDropdown(null), 1000))
                  }
                  handleNavigation={handleNavigation}
                />
              )
            return (
              <li key={item.label}>
                <a href={item.target} onClick={e => handleNavigation(e, item.target)}>
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="right-section">
        <button
          className="dark-mode-toggle"
          onClick={() => setDark(d => !d)}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '1rem'
          }}
        >
          {dark ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          )}
        </button>
      </div>
    </nav>
  )
}