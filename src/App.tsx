import Navbar from './components/Navbar'
import ScrollVideoDriver from './components/ScrollVideoDriver'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      {/* Subtle film-grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Scene 1: Introduction Storyboard */}
      <ScrollVideoDriver videoSrc="/8597294-hd_1920_1080_30fps.mp4">
        <Hero />
        <About />
        <Skills />
      </ScrollVideoDriver>

      {/* Scene 2: Portfolio Storyboard */}
      <ScrollVideoDriver videoSrc="/Firefly Floating Geometric Crystal_A low-poly abstract crystal or icosphere, glass-frosted material,.mp4">
        <Projects />
        <Experience />
        <Contact />
      </ScrollVideoDriver>
    </>
  )
}
