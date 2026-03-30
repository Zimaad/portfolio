import { useReveal } from '../hooks/useReveal';

const projects = [
  {
    title: 'CodeLens',
    description: 'AI Codebase Visualization & Chat Platform. Architected a repository analysis tool with an interactive D3.js dependency graph and real-time AI code intelligence.',
    techStack: ['React 19', 'Vite', 'Tailwind v4', 'D3.js', 'LangChain'],
    githubUrl: 'https://github.com/Zimaad/codelens',
    liveUrl: 'https://codelens-two.vercel.app/#',
  },
  {
    title: 'Lost & Found',
    description: 'A full-stack web application enabling students to easily post, search, and manage lost and found items within a secure campus environment.',
    techStack: ['HTML', 'JavaScript', 'Firebase', 'CSS'],
    githubUrl: 'https://github.com/Zimaad/lostandfoundv2',
    liveUrl: 'https://lostnfounddjsce.web.app/',
  },
  {
    title: 'Echonote',
    description: 'AI-Powered Meeting Productivity Platform. Engineered a cross-platform automation engine with real-time transcription, speaker diarization, and automated Google Slides report generation.',
    techStack: ['Next.js 15', 'Electron', 'Gemini AI', 'Whisper', 'Pyannote.audio'],
    githubUrl: '#',
    liveUrl: '#',
  },
];

export default function Projects() {
  const revealRef = useReveal();

  return (
    <section id="projects" ref={revealRef} className="py-32 md:py-40 px-6 md:px-12 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <p
          className="reveal text-muted font-medium mb-12"
          style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          Projects
        </p>

        <h2 className="reveal font-serif text-4xl md:text-5xl text-ink leading-tight tracking-tight mb-16">
          {/* PROJECTS HEADING — e.g. "Selected work" */}
          Selected work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="reveal group flex flex-col border border-border rounded-2xl p-7 md:p-8 transition-all duration-600 hover:-translate-y-1"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.04)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 rgba(0,0,0,0)';
              }}
            >
              {/* Project title */}
              <h3 className="font-serif text-2xl text-ink mb-3 leading-snug">
                {/* PROJECT TITLE */}
                {project.title}
              </h3>

              {/* Project description */}
              <p className="text-muted text-sm leading-relaxed mb-6 font-light flex-grow">
                {/* PROJECT DESCRIPTION */}
                {project.description}
              </p>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-accent bg-accent-light px-2.5 py-1 rounded-full font-medium"
                    style={{ fontSize: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-5 mt-auto">
                <a
                  href={project.githubUrl}
                  className="text-muted hover:text-ink transition-colors duration-300 inline-flex items-center gap-1"
                  style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">&#8599;</span>
                </a>
                <a
                  href={project.liveUrl}
                  className="text-muted hover:text-ink transition-colors duration-300 inline-flex items-center gap-1"
                  style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">&#8599;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
