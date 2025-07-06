import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../assets/YC_Logo_Red.png'
import projectsData from '../data/projects.json'
import navbarData from '../data/navbar.json'
import DropdownMenu from './DropdownMenu'
import Icon from './Icon' // <-- Import the Icon component

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
          <button className="hamburger mobile-only" onClick={() => setIsOpen(!isOpen)} aria-label="Open menu">
            <Icon name="FaBars" size={24} />
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
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <Icon name={dark ? "FaSun" : "FaMoon"} size={24}/>
        </button>
        <a href="/" onClick={e => handleNavigation(e, "/")}>
          <img src={logo} alt="YC Logo" className="navbar-logo" />
        </a>
      </div>
    </nav>
  )
}