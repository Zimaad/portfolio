const projects = [
  {
    title: 'Hiatus',
    techStack: 'NEXT.JS 16 / LANGGRAPH / FASTAPI / LLAMA 3.3 / FIREBASE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS89hYfCKpc8XHgyROmfOs-5NbpOynDGZXRB1slM1BSODiJGd43e0jamx0udm6djBLdSVEPeZEu8nY3LwPlJafnEdEuLo74ifbX1R8Uebyujy7BXiRgtcwRRUOatIOPvNp82jmkLfdwNmVPIbVVJq_GRI4cH3MXAfOI72GPFFwUgw8JES9C-6RyTQWhS7e-rMr3I3JvEq8TIIhWvshbbej8mlHK6JOSKvcXr-9toEyBVzlT7oqEKljSciLw7stjPzh-fP6-HXKug',
    liveUrl: 'https://hiatus-three.vercel.app/',
    githubUrl: 'https://github.com/Zimaad/hiatus',
  },
  {
    title: 'Echonote',
    techStack: 'NEXT.JS 15 / ELECTRON / GEMINI AI / WHISPER / PYANNOTE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJCWBOnUAiVKt-kkMEZ5NUVw7TpyCVz4bMahDKbUlWb9rDvGdNwGyDw_S5Ueyn2eR8ChkYLnr1UCVJQPKhLkutRP5j7NezPQ_rV4zvC5SPtKie6DRLZAr_mdULP4H9y0brfEF6oxgvOkHti4ZMXOsK_UaEe94KzSlc1TmnQ_ulhkVNy6HIUSSHWBPsJiaeShge1tUrCZHu95C_9uMOzSWgCawYActnj1kuTtO6Lmr3_qHhbCinN4AvILgmSGuiLrilXWm8u6VuGg',
    liveUrl: 'https://echonote1.vercel.app/',
    githubUrl: 'https://github.com/Zimaad/Echonote1',
  },
  {
    title: 'CodeLens',
    techStack: 'REACT 19 / VITE / D3.JS / LANGCHAIN / LLM APIS / TAILWIND V4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBqZ7Fj-0I9Z-0OB5ieYEAZfmiziFnEIbEwgci6MYIs9CNpKaRZylxJj-3T3EAmaVBr17x5nLvb0PMzikJEpIEteEhJLQ_LU7oqJKkdknPYKWTsvVrP5hcDxx3jNxRg-4f_YJeTjuPh92tE0sxYW6eaI7E6P73FkN7bCgaaTy_klGHGWfO0KCfLY2gLEgwvEdrk5PX7NCyyb7rvl_k8vzHaa1OoTEg2Vs-Cs0x3BQwVglYfhSMYqjoy42VdT7ZeZg7tozJ0Rq-UQ',
    liveUrl: 'https://codelens-two.vercel.app/',
    githubUrl: 'https://github.com/Zimaad/codelens',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-40 px-6 md:px-10 bg-surface">
      <div className="max-w-screen-xl mx-auto">
        {/* Header row */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="geist text-[10px] tracking-[0.2em] text-primary mb-4">03 — SELECTED WORK</p>
            <h2 className="cormorant text-5xl md:text-6xl">Archives</h2>
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

        {/* 3-column grid — all projects side by side */}
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-20">
          {projects.map((project, i) => (
            <div key={i} className="group relative">
              {/* Clickable image — links to live site if available */}
              <a
                href={project.liveUrl || project.githubUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-[3/4] overflow-hidden bg-surface-container-low mb-6"
              >
                <img
                  className="w-full h-full object-cover grayscale group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  src={project.image}
                  alt={project.title}
                />
              </a>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="cormorant text-2xl mb-1.5">{project.title}</h4>
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
                  {!project.liveUrl && !project.githubUrl && (
                    <span
                      className="geist text-[8px] text-outline-variant tracking-[0.15em] uppercase"
                      title="Private / internal project"
                    >
                      PRIVATE
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
