import { useEffect, useRef } from 'react';
import { SplashCursor } from './components/ui/splash-cursor';

function App() {
  const typedWordsElement = useRef<HTMLSpanElement>(null);
  
  const words = [
    "Digital Craftsman",
    "Web Developer", 
    "Stack Overflow Survivor",
    "Problem Solver"
  ];
  
  useEffect(() => {
    let currentWordIndex = 0;
    
    function dropAnimation() {
      if (!typedWordsElement.current) return;
      
      // Set the current word
      typedWordsElement.current.textContent = words[currentWordIndex];
      
      // Reset to base state (completely reset all classes)
      typedWordsElement.current.className = 'typed-words text-blue-400 font-semibold absolute left-0 top-0 w-full text-left';
      
      // Force reflow to ensure clean state
      typedWordsElement.current.offsetHeight;
      
      // Animate in after a short delay
      setTimeout(() => {
        if (!typedWordsElement.current) return;
        typedWordsElement.current.classList.add('drop-in');
        
        // After 3 seconds, drop out and switch to next word
        setTimeout(() => {
          if (!typedWordsElement.current) return;
          typedWordsElement.current.classList.remove('drop-in');
          typedWordsElement.current.classList.add('drop-out');
          
          // After drop-out animation completes, move to next word
          setTimeout(() => {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            dropAnimation();
          }, 600); // Match CSS transition duration
        }, 3000); // Display for 3 seconds
      }, 100); // Small initial delay
    }
    
    // Start drop animation after component mounts
    setTimeout(dropAnimation, 1000);
  }, []);

  useEffect(() => {
    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class for CSS transitions
          entry.target.classList.add('visible');
          
          // For individual skills with stagger effect
          if (entry.target.id === 'skills') {
            const skillElements = entry.target.querySelectorAll('.skill');
            skillElements.forEach((skill, index) => {
              setTimeout(() => {
                skill.classList.add('visible');
              }, index * 100); // 100ms delay between each skill
            });
            
            // Animate skills title
            const skillsTitle = entry.target.querySelector('h2');
            if (skillsTitle) skillsTitle.classList.add('visible');
          }
          
          // For about section
          if (entry.target.id === 'about') {
            const aboutTitle = entry.target.querySelector('h2');
            const aboutText = entry.target.querySelector('.about-content p');
            
            if (aboutTitle) aboutTitle.classList.add('visible');
            setTimeout(() => {
              if (aboutText) aboutText.classList.add('visible');
            }, 200); // 200ms delay for text after title
          }
          
          // For social section  
          if (entry.target.classList.contains('social-section')) {
            const socialLinks = entry.target.querySelectorAll('.social-links a');
            const socialText = entry.target.querySelector('p');
            
            socialLinks.forEach((link, index) => {
              setTimeout(() => {
                link.classList.add('visible');
              }, index * 200);
            });
            
            setTimeout(() => {
              if (socialText) socialText.classList.add('visible');
            }, 400);
          }
          
          // Unobserve after animation to prevent re-triggering
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections for scroll animations - wait for DOM to be ready
    setTimeout(() => {
      const sections = document.querySelectorAll('#about, #skills, .social-section');
      console.log('Found sections to observe:', sections.length);
      sections.forEach(section => {
        console.log('Observing:', section.id || section.className);
        scrollObserver.observe(section);
      });
    }, 100);

    return () => scrollObserver.disconnect();
  }, []);

  return (
    <>
            {/* SplashCursor for hero section - optimized for performance */}
      <SplashCursor
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={256}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={4000}
        COLOR_UPDATE_SPEED={10}
        DENSITY_DISSIPATION={3}
        VELOCITY_DISSIPATION={2}
        PRESSURE_ITERATIONS={8}
        CURL={15}
      />
      
      <div className="portfolio">
        {/* HEADER */}
        <header className="flex justify-between items-center px-8 py-4 bg-black/90 sticky top-0 z-40">
          <div className="text-xl font-bold text-white">Zimaad Azhari</div>
          <nav>
            <ul className="flex space-x-8 list-none">
              <li><a href="#home" className="text-blue-400 font-bold hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">Home</a></li>
              <li><a href="#about" className="text-blue-400 font-bold hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">About</a></li>
              <li><a href="#skills" className="text-blue-400 font-bold hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">Skills</a></li>
            </ul>
          </nav>
        </header>

        {/* HERO */}
        <section id="home" className="hero min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(10, 10, 10, 0.3), rgba(5, 5, 5, 0.3))'}}>
          {/* Floating Orbs */}
          <div className="floating-orb absolute w-15 h-15 rounded-full opacity-60 top-1/5 left-1/10 animate-float-orb"></div>
          <div className="floating-orb absolute w-10 h-10 rounded-full opacity-60 top-3/5 left-4/5 animate-float-orb delay-[-5s]"></div>
          <div className="floating-orb absolute w-20 h-20 rounded-full opacity-60 top-4/5 left-1/5 animate-float-orb delay-[-10s]"></div>
          
          <div className="hero-content relative z-10">
            <h1 className="text-5xl font-bold text-white mb-4 text-center">
              Hi, I'm Zimaad
            </h1>
            <div className="text-center">
              <h2 className="typing-text text-2xl text-blue-400 font-semibold flex items-center justify-start inline-flex ml-8">
                A 
                <span className="typed-words-container relative overflow-hidden w-80 h-8 inline-block ml-2 flex items-center">
                  <span 
                    ref={typedWordsElement}
                    className="typed-words text-blue-400 font-semibold absolute left-0 w-full text-left"
                    style={{top: '50%', transform: 'translateY(-50%)'}}
                  ></span>
                </span>
              </h2>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="fade-in py-12 px-8 text-center bg-gray-900">
          <h2 className="text-3xl font-bold text-white mb-8 opacity-0 transform translate-y-8 transition-all duration-600">About Me</h2>
          <div className="about-content max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg opacity-0 transform translate-y-10 transition-all duration-800 delay-200">
              I'm a Computer Science & Data Science enthusiast with a passion for building cool and functional projects. 
              I enjoy working with AI, web development, and solving challenging problems.
            </p>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="fade-in py-12 px-8 text-center bg-gray-800">
          <h2 className="text-3xl font-bold text-white mb-8 opacity-0 transform translate-y-8 transition-all duration-600">Skills</h2>
          <div className="skills-grid flex flex-wrap justify-center items-center gap-6 mt-8 max-w-5xl mx-auto">
            <div className="skill bg-gray-700 p-6 rounded-lg transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/20 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90">
              <i className="fab fa-html5 text-4xl text-orange-500"></i>
              <p className="font-bold text-sm text-white">HTML</p>
            </div>
            <div className="skill bg-gray-700 p-6 rounded-lg transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/20 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90">
              <i className="fab fa-css3-alt text-4xl text-blue-500"></i>
              <p className="font-bold text-sm text-white">CSS</p>
            </div>
            <div className="skill bg-gray-700 p-6 rounded-lg transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/20 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90">
              <i className="fab fa-js-square text-4xl text-yellow-400"></i>
              <p className="font-bold text-sm text-white">JavaScript</p>
            </div>
            <div className="skill bg-gray-700 p-6 rounded-lg transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/20 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90">
              <i className="fab fa-python text-4xl text-blue-400"></i>
              <p className="font-bold text-sm text-white">Python</p>
            </div>
            <div className="skill bg-gray-700 p-6 rounded-lg transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/20 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90">
              <i className="fab fa-react text-4xl text-cyan-400"></i>
              <p className="font-bold text-sm text-white">React</p>
            </div>
            <div className="skill bg-gray-700 p-6 rounded-lg transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/20 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90">
              <i className="fas fa-code text-4xl text-green-400"></i>
              <p className="font-bold text-sm text-white">C/C++</p>
            </div>
            <div className="skill bg-gray-700 p-6 rounded-lg transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/20 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90">
              <i className="fab fa-java text-4xl text-red-500"></i>
              <p className="font-bold text-sm text-white">Java</p>
            </div>
          </div>
        </section>

        {/* SOCIAL LINKS - No background, just floating on splash cursor */}
        <section className="social-section py-16 text-center relative z-10">
          <div className="social-links relative z-20">
            <a href="https://github.com/Zimaad" target="_blank" rel="noopener noreferrer" className="text-white text-5xl mx-8 hover:text-blue-400 transition-all duration-300 hover:scale-110 opacity-0 transform translate-y-8 relative z-30 inline-block p-4">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/zimaad/" target="_blank" rel="noopener noreferrer" className="text-white text-5xl mx-8 hover:text-blue-400 transition-all duration-300 hover:scale-110 opacity-0 transform translate-y-8 relative z-30 inline-block p-4">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <p className="text-gray-300 mt-6 opacity-0 transform translate-y-5 transition-all duration-600 relative z-20">© 2025 Zimaad Azhari. All rights reserved.</p>
        </section>

      </div>

      <style>{`
        /* SplashCursor canvas - behind content but interactive */
        canvas#fluid {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 0 !important;
          pointer-events: auto !important;
          transition: opacity 0.3s ease-out !important;
        }

        /* Hero section should be above canvas but allow mouse through */
        .hero {
          position: relative;
          z-index: 1;
          pointer-events: none;
        }

        /* Hero text should be interactive */
        .hero h1, .hero h2, .hero .typing-text {
          pointer-events: auto;
        }

        /* Social links should block splash cursor */
        .social-links a {
          position: relative;
          z-index: 30;
          pointer-events: auto;
        }

        /* Create invisible blocker areas around social icons */
        .social-links a::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          z-index: 25;
          pointer-events: none;
        }

        /* Other sections should have solid background */
        #about, #skills {
          position: relative;
          z-index: 2;
          background: rgba(14, 23, 39, 1);
        }

        /* Header should be above everything */
        header {
          position: relative !important;
          z-index: 10 !important;
        }

        /* Drop Animation Styles */
        .typed-words {
          transform: translateY(-50%) translateY(100%);
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: block;
          line-height: 1;
        }
        
        .typed-words.drop-in {
          transform: translateY(-50%) translateY(0%);
          opacity: 1;
        }

        .typed-words.drop-out {
          transform: translateY(-50%) translateY(-100%);
          opacity: 0;
        }

        /* Scroll Animation Styles */
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .skill.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        h2.visible {
          opacity: 1;
          transform: translateY(0);
        }

        p.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .social-links a.visible {
          opacity: 1;
          transform: translateY(0);
        }

        footer p.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ensure Font Awesome icons load */
        .skill i {
          font-family: "Font Awesome 6 Free", "Font Awesome 6 Brands", "FontAwesome" !important;
          font-weight: 900;
          font-style: normal;
          font-variant: normal;
          text-rendering: auto;
          line-height: 1;
          display: inline-block;
          font-size: inherit;
          text-align: center;
        }
        
        .skill i.fab {
          font-family: "Font Awesome 6 Brands", "FontAwesome" !important;
          font-weight: 400;
        }
        
        .skill i.fas {
          font-family: "Font Awesome 6 Free", "FontAwesome" !important;
          font-weight: 900;
        }

        /* Floating Orbs Animation */
        @keyframes float-orb {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-100px) translateX(50px) scale(1.2);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-50px) translateX(-30px) scale(0.8);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(30px) translateX(-50px) scale(1.1);
            opacity: 0.7;
          }
        }

        .floating-orb:nth-child(1) {
          background: radial-gradient(circle, rgba(0, 170, 255, 0.3), transparent);
          animation: float-orb 15s infinite ease-in-out;
        }

        .floating-orb:nth-child(2) {
          background: radial-gradient(circle, rgba(83, 52, 131, 0.3), transparent);
          animation: float-orb 15s infinite ease-in-out;
          animation-delay: -5s;
        }

        .floating-orb:nth-child(3) {
          background: radial-gradient(circle, rgba(22, 33, 62, 0.2), transparent);
          animation: float-orb 15s infinite ease-in-out;
          animation-delay: -10s;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}

export default App;
