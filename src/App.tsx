import { useEffect, useRef } from 'react';
import { SplashCursor } from './components/ui/splash-cursor';

function App() {
  const obsessionWordsElement = useRef<HTMLSpanElement>(null);
  const nameElement = useRef<HTMLHeadingElement>(null);
  
  const obsessionWords = [
    "automating things that probably didn't need automating",
    "dark mode everything",
    "fixing bugs I created yesterday",
    "unnecessary but cool animations",
    "finding the perfect Google Font"
  ];
  


  useEffect(() => {
    // Smooth typing animation for the name
    const nameText = "Hi, I'm Zimaad";
    let currentCharIndex = 0;
    
    function typeNextChar() {
      if (!nameElement.current) return;
      
      if (currentCharIndex <= nameText.length) {
        const displayText = nameText.substring(0, currentCharIndex);
        nameElement.current.innerHTML = displayText;
        currentCharIndex++;
        
        // Use requestAnimationFrame for smoother animation
        setTimeout(() => requestAnimationFrame(typeNextChar), 100);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          if (nameElement.current) {
            nameElement.current.classList.add('typing-complete');
          }
        }, 1500); // Keep cursor for 1.5 seconds after typing
      }
    }
    
    // Start typing animation after a short delay
    setTimeout(() => requestAnimationFrame(typeNextChar), 800);
  }, []);

  useEffect(() => {
    let currentObsessionIndex = 0;
    let animationTimeout: NodeJS.Timeout;
    
    function obsessionDropAnimation() {
      if (!obsessionWordsElement.current) return;
      
      const element = obsessionWordsElement.current;
      
      // Set the current obsession word
      element.textContent = obsessionWords[currentObsessionIndex];
      
      // Reset to initial state (coming from top)
      element.style.transform = 'translateY(-100%)';
      element.style.opacity = '0';
      
      // Animate in smoothly
      requestAnimationFrame(() => {
        if (!element) return;
        element.style.transform = 'translateY(0%)';
        element.style.opacity = '1';
        
        // After displaying for 2 seconds, animate out
        animationTimeout = setTimeout(() => {
          if (!element) return;
          element.style.transform = 'translateY(100%)';
          element.style.opacity = '0';
          
          // After animation completes, move to next word
          setTimeout(() => {
            currentObsessionIndex = (currentObsessionIndex + 1) % obsessionWords.length;
            obsessionDropAnimation();
          }, 500); // Wait for exit animation
        }, 2000); // Display time
      });
    }
    
    // Start obsession animation after typing finishes (name takes ~1.6s + 0.8s delay + 1.5s cursor = 3.9s)
    const startTimeout = setTimeout(obsessionDropAnimation, 4000);
    
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(animationTimeout);
    };
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
          
          // For projects section title
          if (entry.target.id === 'projects') {
            const projectsTitle = entry.target.querySelector('h2');
            if (projectsTitle) projectsTitle.classList.add('visible');
          }
          
          // For individual project items
          if (entry.target.classList.contains('project-item')) {
            entry.target.classList.add('visible');
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
        } else {
          // Remove visible class when leaving viewport to allow re-animation
          entry.target.classList.remove('visible');
          
          // Reset skills animations
          if (entry.target.id === 'skills') {
            const skillElements = entry.target.querySelectorAll('.skill');
            const skillsTitle = entry.target.querySelector('h2');
            
            skillElements.forEach(skill => skill.classList.remove('visible'));
            if (skillsTitle) skillsTitle.classList.remove('visible');
          }
          
          // Reset about section animations
          if (entry.target.id === 'about') {
            const aboutTitle = entry.target.querySelector('h2');
            const aboutText = entry.target.querySelector('.about-content p');
            
            if (aboutTitle) aboutTitle.classList.remove('visible');
            if (aboutText) aboutText.classList.remove('visible');
          }
          
          // Reset projects section animations
          if (entry.target.id === 'projects') {
            const projectsTitle = entry.target.querySelector('h2');
            if (projectsTitle) projectsTitle.classList.remove('visible');
          }
          
          // Reset individual project items
          if (entry.target.classList.contains('project-item')) {
            entry.target.classList.remove('visible');
          }
          
          // Reset social section animations
          if (entry.target.classList.contains('social-section')) {
            const socialLinks = entry.target.querySelectorAll('.social-links a');
            const socialText = entry.target.querySelector('p');
            
            socialLinks.forEach(link => link.classList.remove('visible'));
            if (socialText) socialText.classList.remove('visible');
          }
        }
      });
    }, observerOptions);

    // Observe sections for scroll animations - wait for DOM to be ready
    setTimeout(() => {
      const sections = document.querySelectorAll('#about, #skills, #projects, .social-section');
      const projectItems = document.querySelectorAll('.project-item');
      
      console.log('Found sections to observe:', sections.length);
      console.log('Found project items to observe:', projectItems.length);
      
      sections.forEach(section => {
        console.log('Observing:', section.id || section.className);
        scrollObserver.observe(section);
      });
      
      projectItems.forEach(project => {
        console.log('Observing project:', project.className);
        scrollObserver.observe(project);
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
              <li><a href="#projects" className="text-blue-400 font-bold hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">Projects</a></li>
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
            <h1 
              ref={nameElement}
              className="text-5xl font-bold text-white mb-4 text-center typing-name"
              style={{ minHeight: '1.2em' }}
            ></h1>
            
            {/* Obsession Text */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-300 flex items-center justify-center flex-wrap">
                <span className="whitespace-nowrap">I'm slightly obsessed with —</span>
                <span className="obsession-words-container relative overflow-hidden ml-2 inline-flex items-center min-w-[200px] md:min-w-[400px]" style={{height: '1.5rem'}}>
                  <span 
                    ref={obsessionWordsElement}
                    className="obsession-words text-gray-300 absolute left-0 w-full text-left"
                    style={{top: '0', lineHeight: '1.5rem'}}
                  ></span>
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="fade-in py-16 px-8 text-center relative z-1">
          <div className="relative z-10">
            <div className="backdrop-blur-sm bg-black/30 rounded-2xl p-8 mx-auto max-w-4xl border border-white/10 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-12 opacity-0 transform translate-y-8 transition-all duration-600">About Me</h2>
              <div className="about-content">
                <p className="text-gray-300 text-xl leading-relaxed opacity-0 transform translate-y-10 transition-all duration-800 delay-200">
                  I'm a developer, designer, and problem-solver who believes in making technology not just functional, but delightful. I love creating things that look good, solve problems, and make people smile — usually with a mix of thoughtful design, smooth animations, and the occasional over-engineered idea.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SEPARATOR - Black space for splash cursor animation */}
        <div className="h-32 relative z-1">
          {/* This section allows the splash cursor to be visible and interactive */}
        </div>

        {/* SKILLS */}
        <section id="skills" className="fade-in py-16 px-8 text-center relative z-1">
          <div className="relative z-10"></div>
            <div className="backdrop-blur-sm bg-black/20 rounded-2xl p-8 mx-auto max-w-6xl border border-white/10 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-12 opacity-0 transform translate-y-8 transition-all duration-600">Skills & Technologies</h2>
              <div className="skills-grid flex flex-wrap justify-center items-center gap-6 mt-8 max-w-5xl mx-auto">
            <div className="skill bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
              <i className="fab fa-html5 text-4xl text-orange-500"></i>
              <p className="font-bold text-sm text-white">HTML</p>
            </div>
            <div className="skill bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
              <i className="fab fa-css3-alt text-4xl text-blue-500"></i>
              <p className="font-bold text-sm text-white">CSS</p>
            </div>
            <div className="skill bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
              <i className="fab fa-js-square text-4xl text-yellow-400"></i>
              <p className="font-bold text-sm text-white">JavaScript</p>
            </div>
            <div className="skill bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
              <i className="fab fa-python text-4xl text-blue-400"></i>
              <p className="font-bold text-sm text-white">Python</p>
            </div>
            <div className="skill bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
              <i className="fab fa-react text-4xl text-cyan-400"></i>
              <p className="font-bold text-sm text-white">React</p>
            </div>
            <div className="skill bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
              <i className="fas fa-code text-4xl text-green-400"></i>
              <p className="font-bold text-sm text-white">C/C++</p>
            </div>
            <div className="skill bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-3 min-w-[120px] opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
              <i className="fab fa-java text-4xl text-red-500"></i>
              <p className="font-bold text-sm text-white">Java</p>
            </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="fade-in py-20 px-8 relative z-1">
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="backdrop-blur-sm bg-black/10 rounded-2xl p-8 border border-white/10 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-16 text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">Featured Projects</h2>
              
              {/* Central Timeline Line */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-blue-400 h-full opacity-80"></div>
              
              {/* Project 1 - Right Side */}
              <div className="project-item project-1 flex items-center mb-20 opacity-0 transform translate-x-16 translate-y-8 transition-all duration-1000 ease-out">
                <div className="w-1/2 pr-8"></div>
                <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white/30 relative z-10 flex-shrink-0 shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:transform hover:scale-105 border border-white/20 hover:border-blue-400/50">
                    <h3 className="text-2xl font-bold text-white mb-4">Project 1</h3>
                    <div className="bg-gray-600 rounded-lg h-48 mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">Project Image</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      A revolutionary app that turns your coffee addiction into a productivity superpower. Features include 
                      caffeine-to-code conversion algorithms, automated espresso ordering, and real-time energy level monitoring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Project 2 - Left Side */}
              <div className="project-item project-2 flex items-center mb-20 opacity-0 transform -translate-x-16 translate-y-8 transition-all duration-1000 ease-out">
                <div className="w-1/2 pr-8">
                  <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:transform hover:scale-105 border border-white/20 hover:border-blue-400/50">
                    <h3 className="text-2xl font-bold text-white mb-4">Project 2</h3>
                    <div className="bg-gray-600 rounded-lg h-48 mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">Project Image</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      An AI-powered sock matching service that uses machine learning to reunite lost socks with their partners. 
                      Includes advanced pattern recognition, emotional support for lonely socks, and a witness protection program for fugitive pairs.
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-purple-500 rounded-full border-4 border-white/30 relative z-10 flex-shrink-0 shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* Project 3 - Right Side */}
              <div className="project-item project-3 flex items-center mb-20 opacity-0 transform translate-x-16 translate-y-8 transition-all duration-1000 ease-out">
                <div className="w-1/2 pr-8"></div>
                <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white/30 relative z-10 flex-shrink-0 shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:transform hover:scale-105 border border-white/20 hover:border-blue-400/50">
                    <h3 className="text-2xl font-bold text-white mb-4">Project 3</h3>
                    <div className="bg-gray-600 rounded-lg h-48 mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">Project Image</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      A time-traveling debugging tool that goes back in time to prevent bugs before they happen. 
                      Features include paradox-resistant code editing, temporal branch management, and a quantum debugger that exists in multiple states simultaneously.
                    </p>
                  </div>
                </div>
              </div>
              </div>
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

        /* About, Skills, and Projects sections now allow splash cursor behind */
        #about, #skills, #projects {
          position: relative;
          z-index: 1;
        }

        /* Header should be above everything */
        header {
          position: relative !important;
          z-index: 10 !important;
        }

        /* Typing Animation Styles */
        .typing-name {
          overflow: hidden;
          white-space: nowrap;
          min-height: 1.2em;
        }
        
        .typing-name::after {
          content: '|';
          color: #60a5fa;
          animation: smooth-blink 1.2s infinite;
          margin-left: 4px;
          font-weight: 300;
          display: inline-block;
          transform: translateZ(0);
          will-change: opacity;
        }
        
        .typing-complete::after {
          animation: fade-out 0.5s ease-out forwards;
        }
        
        @keyframes smooth-blink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-out {
          to { opacity: 0; }
        }

        /* Obsession Words Animation Styles */
        .obsession-words {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: block;
          font-size: 1rem;
          white-space: nowrap;
        }

        /* Responsive styling for obsession text */
        @media (max-width: 640px) {
          .obsession-words-container {
            min-width: 280px !important;
          }
          
          .obsession-words {
            font-size: 0.9rem;
            white-space: normal;
          }
          
          .hero-content p {
            font-size: 1rem !important;
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
          }
          
          .hero-content .obsession-words-container {
            margin-left: 0 !important;
          }
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

        /* Projects Animation Styles */
        .project-item {
          transition: all 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        
        .project-item.visible {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) !important;
        }

        /* Mobile responsiveness for projects */
        @media (max-width: 768px) {
          .project-item {
            flex-direction: column !important;
            transform: translateY(20px) !important;
          }
          
          .project-item.visible {
            transform: translateY(0) !important;
          }
          
          .project-item > div {
            width: 100% !important;
            padding: 0 !important;
            margin-bottom: 1rem;
          }
          
          .project-item .bg-blue-500,
          .project-item .bg-purple-500 {
            display: none;
          }
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
