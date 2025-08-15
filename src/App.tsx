import { useEffect, useRef, useState } from 'react';
import { SplashCursor } from './components/ui/splash-cursor';

function App() {
  const obsessionWordsElement = useRef<HTMLSpanElement>(null);
  const nameElement = useRef<HTMLHeadingElement>(null);
  const [activeView, setActiveView] = useState<'shell' | 'portfolio'>('shell');
  const [showContact, setShowContact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const obsessionWords = [
    "automating things that probably didn't need automating",
    "dark mode everything",
    "fixing bugs I created yesterday",
    "unnecessary but cool animations",
    "finding the perfect Google Font"
  ];
  


  useEffect(() => {
    const nameText = "Hi, I'm Zimaad";
    let currentCharIndex = 0;
    let animationId: number;
    let lastTime = 0;
    const charDelay = 80; // Consistent 80ms delay between characters
    
    function typeNextChar(currentTime: number) {
      if (!nameElement.current) return;
      
      // Ensure consistent timing
      if (currentTime - lastTime >= charDelay) {
        if (currentCharIndex <= nameText.length) {
          const displayText = nameText.substring(0, currentCharIndex);
          nameElement.current.innerHTML = displayText;
          currentCharIndex++;
          lastTime = currentTime;
        } else {
          // Remove cursor after typing is complete
          setTimeout(() => {
            if (nameElement.current) {
              nameElement.current.classList.add('typing-complete');
            }
          }, 1500); // Keep cursor for 1.5 seconds after typing
          return;
        }
      }
      
      animationId = requestAnimationFrame(typeNextChar);
    }
    
    // Start typing animation after a short delay
    setTimeout(() => {
      lastTime = performance.now();
      animationId = requestAnimationFrame(typeNextChar);
    }, 800);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
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
    const startTimeout = setTimeout(() => {
      // Ensure the container is properly initialized before starting animation
      if (obsessionWordsElement.current) {
        // Set initial state for the first word
        obsessionWordsElement.current.style.transform = 'translateY(-100%)';
        obsessionWordsElement.current.style.opacity = '0';
        obsessionWordsElement.current.textContent = ''; // Clear any initial content
      }
      
      // Small delay to ensure the initial state is applied
      setTimeout(() => {
        obsessionDropAnimation();
      }, 100);
    }, 4000);
    
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(animationTimeout);
    };
  }, []);

  useEffect(() => {
    // Optimized shell typing animation - runs when shell view is active
    const typingLines = document.querySelectorAll('.typing-line');
    let currentLineIndex = 0;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;
    let isAnimating = false;
    
    // Reset all lines to initial state
    const originalTexts = [
      'me_2021: Just starting to code...',
      'me_2022: Ok, this is weird...',
      'me_2023: How do I center a div?',
      'me_2024: Not important. How do I center my life?',
      'me_2025: Code runs. I\'m happy. That\'s enough.'
    ];
    
    typingLines.forEach((line, index) => {
      const lineElement = line as HTMLElement;
      lineElement.style.opacity = '0';
      lineElement.classList.remove('typing', 'complete');
      lineElement.innerHTML = '';
      const promptSpan = document.createElement('span');
      promptSpan.className = 'text-green-400';
      promptSpan.textContent = '> ';
      lineElement.appendChild(promptSpan);
      lineElement.appendChild(document.createTextNode(originalTexts[index]));
    });
    

    
    function typeNextLine() {
      if (currentLineIndex < typingLines.length && isAnimating) {
        const line = typingLines[currentLineIndex] as HTMLElement;
        const originalText = line.textContent || '';
        line.textContent = '';
        line.style.opacity = '1';
        line.classList.add('typing');
        
        let charIndex = 0;
        const textLength = originalText.length;
        
        function typeChar() {
          if (charIndex < textLength && isAnimating) {
            // Use requestAnimationFrame for smoother performance
            animationFrameId = requestAnimationFrame(() => {
              if (isAnimating) {
                line.textContent = originalText.substring(0, charIndex + 1);
                charIndex++;
                timeoutId = setTimeout(typeChar, 15); // Much faster typing
              }
            });
          } else if (isAnimating) {
            // Line complete
            line.classList.remove('typing');
            line.classList.add('complete');
            
            // Move to next line after a shorter delay
            timeoutId = setTimeout(() => {
              currentLineIndex++;
              typeNextLine();
            }, 200); // Much faster line transitions
          }
        }
        
        typeChar();
      }
    }
    

    
    // Start shell animation when shell view is active
    let shellStartTimeout: NodeJS.Timeout;
    if (activeView === 'shell') {
      // Reset animation state
      currentLineIndex = 0;
      isAnimating = false;
      
      shellStartTimeout = setTimeout(() => {
        if (!isAnimating) {
          isAnimating = true;
          typeNextLine();
        }
      }, 1000); // Reduced delay for faster response when switching
    }
    
    return () => {
      if (shellStartTimeout) {
        clearTimeout(shellStartTimeout);
      }
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeView]);

  // Handle clicks outside contact area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setShowContact(false);
      }
    }

    if (showContact) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showContact]);

  // Close mobile menu when clicking on a link
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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
      

      
              sections.forEach(section => {
          scrollObserver.observe(section);
        });
      
              projectItems.forEach(project => {
          scrollObserver.observe(project);
        });
    }, 100);

    return () => scrollObserver.disconnect();
  }, []);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
            {/* SplashCursor for hero section - optimized for performance */}
      {isMobile ? null : (
        <SplashCursor
          SIM_RESOLUTION={32}
          DYE_RESOLUTION={128}
          SPLAT_RADIUS={0.15}
          SPLAT_FORCE={2000}
          COLOR_UPDATE_SPEED={5}
          DENSITY_DISSIPATION={4}
          VELOCITY_DISSIPATION={3}
          PRESSURE_ITERATIONS={4}
          CURL={10}
        />
      )}
      
      <div className="portfolio">
        {/* HEADER */}
        <header className="flex justify-between items-center px-4 sm:px-8 py-4 bg-black/90 sticky top-0 z-40">
          <div className="text-lg sm:text-xl font-bold text-white">Zimaad Azhari</div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 lg:space-x-8 list-none">
              <li><a href="#home" className="text-blue-400 font-bold hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">Home</a></li>
              <li><a href="#about" className="text-blue-400 font-bold hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">About</a></li>
              <li><a href="#skills" className="text-blue-400 font-bold hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">Skills</a></li>
              <li><a href="#projects" className="text-blue-400 font-bold hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all hover:after:w-full">Projects</a></li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </header>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <a 
                href="#home" 
                className="text-2xl text-blue-400 font-bold hover:text-blue-300 transition-colors"
                onClick={handleNavLinkClick}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-2xl text-blue-400 font-bold hover:text-blue-300 transition-colors"
                onClick={handleNavLinkClick}
              >
                About
              </a>
              <a 
                href="#skills" 
                className="text-2xl text-blue-400 font-bold hover:text-blue-300 transition-colors"
                onClick={handleNavLinkClick}
              >
                Skills
              </a>
              <a 
                href="#projects" 
                className="text-2xl text-blue-400 font-bold hover:text-blue-300 transition-colors"
                onClick={handleNavLinkClick}
              >
                Projects
              </a>
            </div>
          </div>
        )}

        {/* HERO */}
        <section id="home" className="hero min-h-screen flex items-center relative overflow-hidden px-4 sm:px-8" style={{background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(10, 10, 10, 0.3), rgba(5, 5, 5, 0.3))'}}>
          <div className="hero-content relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left">
                <h1 
                  ref={nameElement}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 typing-name"
                  style={{ minHeight: '1.2em' }}
                ></h1>
                
                {/* Obsession Text */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-center sm:text-left">
                    <span className="whitespace-nowrap">I'm slightly obsessed with —</span>
                    <span className="obsession-words-container relative overflow-hidden inline-flex items-center justify-center sm:justify-start min-w-[280px] sm:min-w-[320px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]" style={{height: '2rem'}}>
                      <span 
                        ref={obsessionWordsElement}
                        className="obsession-words text-gray-300 absolute left-0 w-full text-center sm:text-left text-sm sm:text-base lg:text-lg xl:text-xl"
                        style={{top: '0', lineHeight: '2rem'}}
                      ></span>
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Column - Interactive Element */}
              <div className="flex justify-center lg:justify-end">
                <div 
                  className="interactive-container bg-gray-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl max-w-sm sm:max-w-md w-full relative z-10 cursor-pointer" 
                  style={{ pointerEvents: 'auto' }}
                  onClick={() => setActiveView(activeView === 'shell' ? 'portfolio' : 'shell')}
                >
                  {/* File Header */}
                  <div 
                    className="flex items-center justify-between mb-3 sm:mb-4 relative z-50 w-full" 
                    style={{ pointerEvents: 'auto' }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-400 text-xs sm:text-sm font-mono hover:text-white transition-colors">
                        {activeView === 'shell' ? 'shell' : 'portfolio.js'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Container with Animation */}
                  <div className="content-container relative min-h-[150px] sm:min-h-[200px]">
                    {/* Shell View */}
                    <div 
                      className={`shell-content text-xs sm:text-sm font-mono text-gray-300 space-y-1 sm:space-y-2 absolute inset-0 transition-all duration-500 ease-in-out ${
                        activeView === 'shell' 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      <div className="typing-line opacity-0">
                        <span className="text-green-400">&gt;</span> me_2021: Just starting to code...
                      </div>
                      <div className="typing-line opacity-0">
                        <span className="text-green-400">&gt;</span> me_2022: Ok, this is weird...
                      </div>
                      <div className="typing-line opacity-0">
                        <span className="text-green-400">&gt;</span> me_2023: How do I center a div?
                      </div>
                      <div className="typing-line opacity-0">
                        <span className="text-green-400">&gt;</span> me_2024: Not important. How do I center my life?
                      </div>
                      <div className="typing-line opacity-0">
                        <span className="text-green-400">&gt;</span> me_2025: Code runs. I'm happy. That's enough.
                      </div>
                    </div>
                    
                    {/* Portfolio.js View */}
                    <div 
                      className={`portfolio-content text-xs sm:text-sm font-mono text-gray-300 absolute inset-0 transition-all duration-500 ease-in-out ${
                        activeView === 'portfolio' 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      <div className="mb-2">
                        <span className="text-red-400">const</span> <span className="text-blue-400">developer</span> = <span className="text-yellow-400">{'{'}</span>
                      </div>
                      <div className="ml-2 sm:ml-4 space-y-1">
                        <div><span className="text-green-400">name</span>: <span className="text-yellow-400">'Zimaad Azhari'</span>,</div>
                        <div><span className="text-green-400">role</span>: <span className="text-yellow-400">'Full Stack Developer'</span>,</div>
                        <div><span className="text-green-400">passion</span>: <span className="text-yellow-400">'Creating amazing experiences'</span>,</div>
                        <div><span className="text-green-400">status</span>: <span className="text-yellow-400">'Available for opportunities'</span></div>
                      </div>
                      <div><span className="text-yellow-400">{'}'}</span>;</div>
                      <div className="mt-3 sm:mt-4 text-gray-500">// Ready to build something amazing?</div>
                      <div 
                        ref={contactRef}
                        className="cursor-pointer hover:bg-gray-800/30 p-1 rounded transition-colors inline-block"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowContact(!showContact);
                        }}
                      >
                        <span className="text-blue-400">developer</span>.<span className="text-green-400">contact</span>();
                        {showContact && (
                          <div className="mt-3 sm:mt-4 p-3 bg-gray-800/50 rounded border border-gray-600 text-xs sm:text-sm absolute z-50 max-w-[280px] sm:max-w-none">
                            <div className="text-gray-300 mb-2">Email: <span className="text-blue-400 break-all">zimaadazhari911@gmail.com</span></div>
                            <div className="text-gray-300">Phone: <span className="text-blue-400">+91 9326155384</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="fade-in py-12 sm:py-16 px-4 sm:px-8 text-center relative z-1">
          <div className="relative z-10">
            <div className="backdrop-blur-sm bg-black/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 mx-auto max-w-4xl shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 opacity-0 transform translate-y-8 transition-all duration-600">About Me</h2>
              <div className="about-content">
                <p className="text-gray-300 text-lg sm:text-xl leading-relaxed opacity-0 transform translate-y-10 transition-all duration-800 delay-200">
                  I'm a developer, designer, and problem-solver who believes in making technology not just functional, but delightful. I love creating things that look good, solve problems, and make people smile — usually with a mix of thoughtful design, smooth animations, and the occasional over-engineered idea.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="fade-in py-12 sm:py-16 px-4 sm:px-8 text-center relative z-1">
          <div className="relative z-10">
            <div className="backdrop-blur-sm bg-black/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 mx-auto max-w-6xl border border-white/10 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 opacity-0 transform translate-y-8 transition-all duration-600">Skills & Technologies</h              <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 mt-8 max-w-5xl mx-auto">
                <div className="skill bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-2 sm:gap-3 opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
                  <i className="fab fa-html5 text-2xl sm:text-4xl text-orange-500"></i>
                  <p className="font-bold text-xs sm:text-sm text-white">HTML</p>
                </div>
                <div className="skill bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-2 sm:gap-3 opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
                  <i className="fab fa-css3-alt text-2xl sm:text-4xl text-blue-500"></i>
                  <p className="font-bold text-xs sm:text-sm text-white">CSS</p>
                </div>
                <div className="skill bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-2 sm:gap-3 opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
                  <i className="fab fa-js-square text-2xl sm:text-4xl text-yellow-400"></i>
                  <p className="font-bold text-xs sm:text-sm text-white">JavaScript</p>
                </div>
                <div className="skill bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-2 sm:gap-3 opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
                  <i className="fab fa-python text-2xl sm:text-4xl text-blue-400"></i>
                  <p className="font-bold text-xs sm:text-sm text-white">Python</p>
                </div>
                <div className="skill bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-2 sm:gap-3 opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
                  <i className="fab fa-react text-2xl sm:text-4xl text-cyan-400"></i>
                  <p className="font-bold text-xs sm:text-sm text-white">React</p>
                </div>
                <div className="skill bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-2 sm:gap-3 opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
                  <i className="fas fa-code text-2xl sm:text-4xl text-green-400"></i>
                  <p className="font-bold text-xs sm:text-sm text-white">C/C++</p>
                </div>
                <div className="skill bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl transition-all duration-600 transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-blue-400/30 flex flex-col items-center gap-2 sm:gap-3 opacity-0 translate-y-12 scale-90 border border-white/20 hover:border-blue-400/50">
                  <i className="fab fa-java text-2xl sm:text-4xl text-red-500"></i>
                  <p className="font-bold text-xs sm:text-sm text-white">Java</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="fade-in py-16 sm:py-20 px-4 sm:px-8 relative z-1">
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="backdrop-blur-sm bg-black/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 sm:mb-16 text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">My Work</h2>
              
              {/* Mobile Projects Layout */}
              <div className="block lg:hidden space-y-8">
                {/* Project 1 */}
                <div className="project-item opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
                  <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:transform hover:scale-105 border border-white/20 hover:border-blue-400/50">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">AI-Powered Internal Order Management System</h3>
                    <div className="bg-gray-600 rounded-lg h-32 sm:h-48 mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-sm sm:text-lg">Project Image</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      Built for UrbanTech Services LLP to streamline procurement and quotation workflows. The system uses Gemini API for AI-driven email summarization, integrates with Microsoft Graph API for secure email handling, and provides a centralized dashboard for real-time order tracking. Developed with React and Tailwind CSS for a clean, responsive interface, delivering faster decisions and improved operational efficiency.
                    </p>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="project-item opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
                  <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:transform hover:scale-105 border border-white/20 hover:border-blue-400/50">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Campus Lost & Found Portal</h3>
                    <div className="bg-gray-600 rounded-lg h-32 sm:h-48 mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-sm sm:text-lg">Project Image</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      A web application that streamlines the process of reporting and retrieving lost items on campus. Built with React, Tailwind CSS, and Firebase, it enables students to log in via Google, post lost/found items with images, filter listings by date, contact item owners, and mark items as claimed — all in a secure and user-friendly interface.
                    </p>
                  </div>
                </div>

                {/* Project 3 */}
                <div className="project-item opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
                  <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:transform hover:scale-105 border border-white/20 hover:border-blue-400/50">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Discord Server Enhancement Bot</h3>
                    <div className="bg-gray-600 rounded-lg h-32 sm:h-48 mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-sm sm:text-lg">Project Image</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      A versatile Discord bot that streamlines server administration with automated moderation, custom commands, role management, and server analytics. Includes features like welcome systems, logging, and interactive utilities to create engaging community experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Timeline Layout */}
              <div className="hidden lg:block relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-blue-400 h-full opacity-80 lg:block hidden"></div>
              
                {/* Project 1 - Right Side */}
                <div className="project-item project-1 flex items-center mb-20 opacity-0 transform translate-x-16 translate-y-8 transition-all duration-1000 ease-out">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white/30 relative z-10 flex-shrink-0 shadow-lg"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:transform hover:scale-105 border border-white/20 hover:border-blue-400/50">
                      <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Internal Order Management System</h3>
                      <div className="bg-gray-600 rounded-lg h-48 mb-4 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">Project Image</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        Built for UrbanTech Services LLP to streamline procurement and quotation workflows. The system uses Gemini API for AI-driven email summarization, integrates with Microsoft Graph API for secure email handling, and provides a centralized dashboard for real-time order tracking. Developed with React and Tailwind CSS for a clean, responsive interface, delivering faster decisions and improved operational efficiency.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project 2 - Left Side */}
                <div className="project-item project-2 flex items-center mb-20 opacity-0 transform -translate-x-16 translate-y-8 transition-all duration-1000 ease-out">
                  <div className="w-1/2 pr-8">
                    <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:transform hover:scale-105 border border-white/20 hover:border-blue-400/50">
                      <h3 className="text-2xl font-bold text-white mb-4">Campus Lost & Found Portal</h3>
                      <div className="bg-gray-600 rounded-lg h-48 mb-4 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">Project Image</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        A web application that streamlines the process of reporting and retrieving lost items on campus. Built with React, Tailwind CSS, and Firebase, it enables students to log in via Google, post lost/found items with images, filter listings by date, contact item owners, and mark items as claimed — all in a secure and user-friendly interface.
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
                      <h3 className="text-2xl font-bold text-white mb-4">Discord Server Enhancement Bot</h3>
                      <div className="bg-gray-600 rounded-lg h-48 mb-4 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">Project Image</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        A versatile Discord bot that streamlines server administration with automated moderation, custom commands, role management, and server analytics. Includes features like welcome systems, logging, and interactive utilities to create engaging community experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL LINKS - No background, just floating on splash cursor */}
        <section className="social-section py-12 sm:py-16 text-center relative z-10">
          <div className="social-links relative z-20">
            <a href="https://github.com/Zimaad" target="_blank" rel="noopener noreferrer" className="text-white text-3xl sm:text-5xl mx-4 sm:mx-8 hover:text-blue-400 transition-all duration-300 hover:scale-110 opacity-0 transform translate-y-8 relative z-30 inline-block p-4">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/zimaad/" target="_blank" rel="noopener noreferrer" className="text-white text-3xl sm:text-5xl mx-4 sm:mx-8 hover:text-blue-400 transition-all duration-300 hover:scale-110 opacity-0 transform translate-y-8 relative z-30 inline-block p-4">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <p className="text-gray-300 mt-6 opacity-0 transform translate-y-5 transition-all duration-600 relative z-20 text-sm sm:text-base">© 2025 Zimaad Azhari. All rights reserved.</p>
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
          will-change: contents;
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
          animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        .typing-complete::after {
          animation: fade-out 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes smooth-blink {
          0%, 40% { opacity: 1; }
          50%, 90% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-out {
          to { opacity: 0; }
        }

        /* Obsession Words Animation Styles */
        .obsession-words {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: block;
          font-size: inherit;
          white-space: nowrap;
          line-height: inherit;
          /* Ensure proper text positioning to prevent cutting off descenders */
          position: relative;
          top: 0;
          transform: translateY(0);
        }

        /* Responsive styling for obsession text */
        @media (max-width: 640px) {
          .obsession-words-container {
            min-width: 280px !important;
          }
          
          .obsession-words {
            font-size: 0.9rem;
            white-space: normal;
            line-height: 2rem !important;
          }
          
          .hero-content p {
            font-size: 1rem !important;
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
          }
          
          .hero-content .obsession-words-container {
            margin-left: 0 !important;
            min-width: 320px !important;
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
        @media (max-width: 1024px) {
          .project-item {
            transform: translateY(20px) !important;
          }
          
          .project-item.visible {
            transform: translateY(0) !important;
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



        /* Optimized Interactive Container Animation */
        .interactive-container {
          will-change: transform, box-shadow;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .interactive-container:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(34, 197, 94, 0.2);
          border-color: rgba(34, 197, 94, 0.4);
        }

        .typing-line {
          will-change: opacity;
          transition: opacity 0.2s ease;
          min-height: 1.2em;
          position: relative;
        }

        .typing-line.typing::after {
          content: '|';
          color: #10b981;
          animation: blink 1.2s infinite;
          margin-left: 2px;
          position: absolute;
        }

        .typing-line.complete::after {
          display: none;
        }

        @keyframes blink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Mobile menu animations */
        @media (max-width: 768px) {
          .mobile-menu-enter {
            opacity: 0;
            transform: translateY(-20px);
          }
          
          .mobile-menu-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 300ms, transform 300ms;
          }
          
          .mobile-menu-exit {
            opacity: 1;
            transform: translateY(0);
          }
          
          .mobile-menu-exit-active {
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 300ms, transform 300ms;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Touch-friendly interactions for mobile */
        @media (max-width: 768px) {
          .interactive-container {
            min-height: 44px; /* iOS minimum touch target */
          }
          
          .social-links a {
            min-width: 44px;
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          
          /* Improve touch targets for navigation */
          header nav a {
            padding: 8px 12px;
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }



          /* Reduce animation complexity on mobile for better performance */
          .interactive-container:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(34, 197, 94, 0.15);
          }

          /* Improve mobile scrolling performance */
          .hero, .fade-in {
            -webkit-overflow-scrolling: touch;
          }

          /* Better mobile text wrapping */
          .obsession-words {
            word-break: break-word;
            hyphens: auto;
          }

          /* Mobile-optimized contact popup */
          .contact-popup {
            max-width: calc(100vw - 32px);
            margin: 0 16px;
          }
        }

        /* Additional mobile breakpoint for very small screens */
        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem !important;
            line-height: 1.2;
          }
          
          .obsession-words-container {
            min-width: 260px !important;
          }
          
          .obsession-words {
            line-height: 2rem !important;
          }
          
          .interactive-container {
            max-width: 100% !important;
            margin: 0 8px;
          }
          
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          
          .skill {
            padding: 12px 8px !important;
          }
          
          .skill i {
            font-size: 1.5rem !important;
          }
          
          .skill p {
            font-size: 0.75rem !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
        }

        /* Prevent text wrapping in skill labels */
        .skill p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* Prevent horizontal scroll on mobile */
        body {
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        /* Improve mobile tap highlights */
        * {
          -webkit-tap-highlight-color: rgba(59, 130, 246, 0.1);
        }

        /* Mobile-optimized focus states */
        @media (max-width: 768px) {
          button:focus,
          a:focus {
            outline: 2px solid rgba(59, 130, 246, 0.5);
            outline-offset: 2px;
          }
        }
      `}</style>
    </>
  );
}

export default App;
