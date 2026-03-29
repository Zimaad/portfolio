import { useReveal } from '../hooks/useReveal';

export default function About() {
  const revealRef = useReveal();

  return (
    <section
      id="about"
      ref={revealRef}
      className="relative py-32 md:py-40 px-6 md:px-12"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p
          className="reveal text-muted font-medium mb-12"
          style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          About
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: Bio */}
          <div className="reveal">
            <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight tracking-tight mb-8">
              {/* ABOUT HEADING — e.g. "A few words about me" */}
              A few words about me
            </h2>
            <div className="space-y-5 text-muted text-base md:text-lg leading-relaxed font-light">
              <p>
                I am a B.Tech student in Computer Science (Data Science) with an Honors in Finance at Dwarkadas J. Sanghvi College of Engineering, Mumbai. My journey is driven by a passion for building scalable, AI-integrated applications that solve real-world problems.
              </p>
              <p>
                From architecting codebase visualization platforms to automating procurement workflows for enterprises, I focus on creating high-performance, user-centric solutions. I am particularly interested in the intersection of full-stack development, AI engineering, and fintech.
              </p>
              <div className="pt-6 space-y-4">
                <h4 className="text-ink font-sans font-bold uppercase tracking-widest text-[10px]">Education</h4>
                <p className="text-sm">B.Tech (Data Science) @ D.J. Sanghvi College | 2024–2028</p>
                
                <h4 className="text-ink font-sans font-bold uppercase tracking-widest text-[10px] pt-2">Key Achievements</h4>
                <ul className="text-sm space-y-2">
                  <li>• 1st Place at HackOps 2025 (DJS NSDC)</li>
                  <li>• Web/App Domain Winner at LOC 8.0 (DJS ACM)</li>
                  <li>• Rank 54 in Code UnCode 2025 (SPIT)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Modern Vector Art - Naturally Blended */}
          <div className="reveal flex items-center justify-center md:justify-end">
            <img 
              src="/profile_art.png" 
              alt="Vector Art" 
              className="w-full max-w-lg h-auto mix-blend-multiply opacity-80"
              style={{ filter: 'grayscale(0.2) contrast(1.1)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
