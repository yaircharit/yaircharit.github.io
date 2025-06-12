import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import ProjectPage from './components/ProjectPage'
import ContactIcons from './components/ContactIcons'
import AnimatedBackground from './components/AnimatedBackground'
import Timeline from './components/Timeline'
import './styles/App.css'
import { useEffect, useRef } from 'react';

function useHashAnchorScroll() {
  useEffect(() => {
    const onHashChange = () => {
      const hashParts = window.location.hash.split('#');
      const anchor = hashParts[2]; // after the second #
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('hashchange', onHashChange);
    // Call on mount in case user lands directly on a hash
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
}

function ScrollToHashAnchorOnMount() {
  useEffect(() => {
    const hashParts = window.location.hash.split('#');
    const anchor = hashParts[2];
    if (anchor) {
      let attempts = 0;
      const maxAttempts = 20;
      const tryScroll = () => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };
      tryScroll();
    }
  }, []);
  return null;
}

function useShowTimelineLineOnHome() {
  const location = useLocation();
  useEffect(() => {
    // Debug: log the location object
    console.log('location:', location);

    // Home is just "/"
    const isHome = location.pathname === '/';
    if (isHome) {
      document.body.classList.add('show-timeline-line');
    } else {
      document.body.classList.remove('show-timeline-line');
    }
    return () => {
      document.body.classList.remove('show-timeline-line');
    };
  }, [location]);
}

function TimelineLineManager() {
  useShowTimelineLineOnHome();
  return null;
}

function App() {
  useHashAnchorScroll();

  // Dynamically position the timeline line
  useEffect(() => {
    function updateTimelineLine() {
      const timeline = document.getElementById('timeline-section');
      const projects = document.getElementById('projects');
      const line = document.querySelector('.timeline-line-vertical');
      const container = document.querySelector('.timeline-line-container');
      if (timeline && projects && line && container) {
        const top = timeline.offsetTop;
        const end = projects.offsetTop + projects.offsetHeight;
        line.style.top = `${top}px`;
        line.style.height = `${end - top}px`;
      }
    }
    updateTimelineLine();
    window.addEventListener('resize', updateTimelineLine);
    window.addEventListener('scroll', updateTimelineLine);
    return () => {
      window.removeEventListener('resize', updateTimelineLine);
      window.removeEventListener('scroll', updateTimelineLine);
    };
  }, []);

  return (
    <Router>
      <TimelineLineManager />
      <Navbar />
      <main>
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
            <Projects />
          </section>
        </div>
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

export default App
