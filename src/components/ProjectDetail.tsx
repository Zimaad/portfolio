import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.project-hero', 
      { clipPath: 'inset(10% 20% 10% 20%)', scale: 1.1 },
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'expo.inOut' }
    )
    .from('.project-title', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .from('.project-meta > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.4')
    .from('.project-content', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' }, '-=0.2');
  }, { scope: containerRef });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h2 className="cormorant text-4xl mb-6">Project not found</h2>
          <Link to="/" className="geist text-[10px] tracking-widest uppercase border-b border-primary hover:pb-2 transition-all">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-surface text-neutral-50 selection:bg-primary selection:text-surface">
      {/* Back button */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 pointer-events-none">
        <Link to="/" className="pointer-events-auto group flex items-center gap-3 w-fit">
          <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-neutral-50 group-hover:text-neutral-950 transition-all duration-500">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </div>
          <span className="geist text-[9px] tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">ALL CASE STUDIES</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden project-hero">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
      </section>

      {/* Content Section */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 -mt-32 relative z-10 pb-40">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24">
          
          {/* Sticky Sidebar Meta */}
          <aside className="project-meta">
            <h1 className="cormorant text-6xl md:text-8xl mb-8 project-title leading-none">{project.title}</h1>
            
            <div className="space-y-10">
              <div className="meta-item">
                <p className="geist text-[9px] tracking-[0.2em] text-neutral-500 mb-2 uppercase">Scope —</p>
                <p className="geist text-sm text-neutral-200">{project.role || 'End-to-End Development'}</p>
              </div>

              {project.clientType && (
                <div className="meta-item">
                  <p className="geist text-[9px] tracking-[0.2em] text-neutral-500 mb-2 uppercase">Type —</p>
                  <p className="geist text-sm text-neutral-200">{project.clientType}</p>
                </div>
              )}
              
              <div className="meta-item">
                <p className="geist text-[9px] tracking-[0.2em] text-neutral-500 mb-2 uppercase">Year —</p>
                <p className="geist text-sm text-neutral-200">{project.year || '2024'}</p>
              </div>

              <div className="meta-item">
                <p className="geist text-[9px] tracking-[0.2em] text-neutral-500 mb-2 uppercase">Tech Stack —</p>
                <p className="geist text-sm text-neutral-200 leading-relaxed">{project.techStack}</p>
              </div>

              <div className="pt-6 flex gap-8">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 group border-b border-neutral-800 pb-2 hover:border-neutral-50 transition-all duration-500"
                  >
                    <span className="geist text-[9px] tracking-[0.2em]">LIVE SITE</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_outward</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 group border-b border-neutral-800 pb-2 hover:border-neutral-50 transition-all duration-500"
                  >
                    <span className="geist text-[9px] tracking-[0.2em]">GITHUB</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_outward</span>
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="project-content">
            <p className="cormorant italic text-3xl md:text-4xl text-neutral-300 leading-snug mb-16">
              {project.description}
            </p>

            <div className="prose prose-invert max-w-none">
              {/* Results highlight */}
              {project.results && (
                <div className="mb-12 p-6 border border-neutral-800 bg-neutral-900/50">
                  <p className="geist text-[9px] tracking-[0.2em] text-neutral-500 mb-3 uppercase">Key Result —</p>
                  <p className="manrope text-lg text-neutral-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
                    {project.results}
                  </p>
                </div>
              )}

              <h3 className="cormorant text-2xl mb-6 text-neutral-50">The Challenge & Solution</h3>
              <p className="geist text-neutral-400 leading-relaxed mb-12 text-lg">
                {project.details}
              </p>

              <div className="my-20 aspect-video overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src={project.image} 
                  alt={`${project.title} preview`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>

              <h3 className="cormorant text-2xl mb-6 text-neutral-50">Takeaway</h3>
              <p className="geist text-neutral-400 leading-relaxed text-lg">
                {project.conclusion || "This project represents a significant step in building production-grade software that solves real problems."}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-neutral-900">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <Link to="/" className="geist text-[9px] tracking-[0.3em] hover:text-primary transition-colors">ALL CASE STUDIES</Link>
          <div className="flex gap-10">
            <span className="geist text-[9px] tracking-[0.3em] text-neutral-600 uppercase">Case Study — {project.year || '2024'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
