import Navbar from './components/Navbar/navbar'
import Projects from './components/Projects/Projects'
import ContactIcons from './components/ContactIcons/ContactIcons'
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground'
import Timeline from './components/Timeline/Timeline'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home" className="home-section">
          <AnimatedBackground />
          <div className="home-content">
            <h1>Yair Charit</h1>
            <div className="title-underline"></div>
            <ContactIcons color="black" />
          </div>
        </section>
        <section id="about">
          <h2>About <span className="gradient-text">Me</span></h2>
          <p>Detail-oriented and resourceful SQA Automation Engineer with hands-on experience in developing scalable automated testing systems for medical devices.<br />
          Proven track record in test automation, system integration, and validation, with a strong foundation in object-oriented programming and scripting.<br />
          Skilled in collaborating with cross-functional teams to ensure reliability, performance, and compliance. <br />
          Now seeking a challenging role to contribute to the quality, safety, and security of complex software systems.</p>
          <Timeline />
        </section>
        <section id="projects">
          <h2>My <span className="gradient-text">Projects</span></h2>
          <Projects />
        </section>
        <section id="contact" className="contact-section">
          <hr />
          <h2>Contact <span className="gradient-text">Me</span></h2>
          <ContactIcons color="black" />
          <p>Feel free to reach out through any of these platforms!</p>
        </section>
      </main>
    </>
  )
}

export default App
