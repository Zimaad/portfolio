import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="py-40 px-6 md:px-10 bg-surface">
      <div className="max-w-screen-xl mx-auto">
        {/* Header row */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="geist text-[10px] tracking-[0.2em] text-primary mb-4">03 — CASE STUDIES</p>
            <h2 className="cormorant text-5xl md:text-6xl">Selected Work</h2>
          </div>
          <a
            className="cormorant italic text-lg border-b border-primary hover:pb-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            href="https://github.com/Zimaad"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all projects
          </a>
        </div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-20">
          {projects.map((project, i) => (
            <div key={i} className="group relative">
              {/* Clickable image */}
              <Link
                to={`/project/${project.slug}`}
                className="block aspect-[3/4] overflow-hidden bg-surface-container-low mb-6 cursor-pointer relative"
              >
                <img
                  className="w-full h-full object-cover grayscale group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  src={project.image}
                  alt={project.title}
                />
                {/* Client type badge */}
                {project.clientType && (
                  <span className="absolute top-4 left-4 geist text-[8px] tracking-[0.2em] uppercase bg-black/60 backdrop-blur-sm text-white/80 px-3 py-1.5 border border-white/10">
                    {project.clientType}
                  </span>
                )}
              </Link>

              <div className="flex justify-between items-start">
                <div>
                  <Link to={`/project/${project.slug}`}>
                    <h4 className="cormorant text-2xl mb-1.5 hover:text-primary transition-colors cursor-pointer">{project.title}</h4>
                  </Link>
                  <p className="geist text-[9px] text-on-surface-variant tracking-[0.12em] uppercase">
                    {project.techStack}
                  </p>
                </div>

                {/* Link icons */}
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                      className="text-outline-variant hover:text-primary transition-colors duration-500"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        arrow_outward
                      </span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="flex items-center text-outline-variant hover:text-primary transition-colors duration-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-[20px] h-[20px] relative -top-[4px]"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Results badge */}
              {project.results && (
                <p className="mt-3 geist text-[9px] text-primary/70 tracking-[0.1em] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span>
                  {project.results}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
