import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import BackgroundVideo from './components/BackgroundVideo'

export default function App() {
  return (
    <>
      {/* Custom cursor — mix-blend-mode difference, desktop only */}
      <CustomCursor />

      {/* Subtle film-grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Always-playing Video Background */}
      <BackgroundVideo videoSrc="/Firefly Floating Geometric Crystal_A low-poly abstract crystal or icosphere, glass-frosted material,.mp4" />

      {/* Navigation */}
      <Navbar />

      <main className="relative z-10 w-full overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
