import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProjectCardList from './components/ProjectCard'
import ProjectPage from './components/ProjectPage'
import ContactIcons from './components/ContactIcons'
import AnimatedBackground from './components/AnimatedBackground'
import Timeline from './components/Timeline'
import './styles/App.css'
import { useEffect } from 'react'

function useShowTimelineLineOnHome() {
  const location = useLocation()
  useEffect(() => {
    const isHome = location.pathname === '/'
    document.body.classList.toggle('show-timeline-line', isHome)
    return () => document.body.classList.remove('show-timeline-line')
  }, [location])
}

function useHashAnchorScroll() {
  useEffect(() => {
    const scrollToAnchor = () => {
      const anchor = window.location.hash.split('#')[2]
      if (anchor) {
        let attempts = 0
        const tryScroll = () => {
          const el = document.getElementById(anchor)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          else if (attempts++ < 20) setTimeout(tryScroll, 100)
        }
        tryScroll()
      }
    }
    window.addEventListener('hashchange', scrollToAnchor)
    scrollToAnchor()
    return () => window.removeEventListener('hashchange', scrollToAnchor)
  }, [])
}

function TimelineLineManager() {
  useShowTimelineLineOnHome()
  return null
}

export default function App() {
  useHashAnchorScroll()
  useEffect(() => {
    const updateTimelineLine = () => {
      const timeline = document.getElementById('timeline-section')
      const projects = document.getElementById('projects')
      const line = document.querySelector('.timeline-line-vertical')
      if (timeline && projects && line) {
        const top = timeline.offsetTop
        const end = projects.offsetTop + projects.offsetHeight
        line.style.top = `${top}px`
        line.style.height = `${end - top}px`
      }
    }
    updateTimelineLine()
    window.addEventListener('resize', updateTimelineLine)
    window.addEventListener('scroll', updateTimelineLine)
    return () => {
      window.removeEventListener('resize', updateTimelineLine)
      window.removeEventListener('scroll', updateTimelineLine)
    }
  }, [])

  return (
    <Router>
      <TimelineLineManager />
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div className="timeline-line-container">
                <div className="timeline-line-vertical"></div>
                <section id="home" className="home-section">
                  <AnimatedBackground />
                  <div className="home-content">
                    <h1>Yair Charit</h1>
                    <div className="title-underline"></div>
                    <ContactIcons />
                  </div>
                </section>
                <section id="about">
                  <h2>About <span className="gradient-text">Me</span></h2>
                  <div className="about-content">
                    <p>Detail-oriented and resourceful SQA Automation Engineer with hands-on experience in developing scalable automated testing systems for medical devices.<br />
                      Proven track record in test automation, system integration, and validation, with a strong foundation in object-oriented programming and scripting.<br />
                      Skilled in collaborating with cross-functional teams to ensure reliability, performance, and compliance. <br />
                      Now seeking a challenging role to contribute to the quality, safety, and security of complex software systems.</p>
                  </div>
                </section>
                <section id="timeline-section">
                  <Timeline />
                </section>
                <section id="projects">
                  <h2>My <span className="gradient-text">Projects</span></h2>
                  <ProjectCardList />
                </section>
              </div>
            }
          />
          <Route path="/project/:projectId" element={<ProjectPage />} />
        </Routes>
        <section id="contact" className="contact-section">
          <hr />
          <h2>Contact <span className="gradient-text">Me</span></h2>
          <ContactIcons />
          <p>Feel free to reach out through any of these platforms!</p>
        </section>
      </main>
    </Router>
  )
}
