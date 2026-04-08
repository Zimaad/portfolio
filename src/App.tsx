import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Intro from './components/Intro'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  /* Lock scroll during intro */
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [introComplete])

  return (
    <>
      <Intro onComplete={() => setIntroComplete(true)} />

      <CustomCursor />

      {/* Subtle film-grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />

      <main className="relative z-10 w-full overflow-x-hidden">
        <Hero introComplete={introComplete} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
