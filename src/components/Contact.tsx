export default function Contact() {
  return (
    <section id="contact" className="pt-40 pb-20 md:pt-48 md:pb-24 px-6 md:px-10 bg-surface">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="geist text-[10px] tracking-[0.2em] text-primary mb-8">07 — LET'S TALK</p>
        
        <h2 className="cormorant text-[clamp(2.5rem,8vw,8rem)] leading-none mb-8 italic text-on-surface">
          Ready to Build<br />Something Great?
        </h2>
        
        <p className="manrope text-on-surface-variant font-light max-w-lg mx-auto mb-12 leading-relaxed">
          Tell me about your project and I'll get back to you within 24 hours. No commitment, no pressure — just a conversation about what's possible.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a 
            href="mailto:zimaadazhari@gmail.com"
            className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 geist text-[11px] tracking-[0.3em] uppercase hover:bg-white/90 transition-all duration-500"
          >
            Start a Project
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
          </a>
          <a 
            href="https://linkedin.com/in/zimaad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-outline-variant/30 text-on-surface px-10 py-5 geist text-[11px] tracking-[0.3em] uppercase hover:border-primary/60 transition-all duration-500"
          >
            Connect on LinkedIn
          </a>
        </div>

        <p className="geist text-[9px] tracking-[0.2em] text-on-surface-variant/40 uppercase">
          or email directly — zimaadazhari@gmail.com
        </p>
      </div>
    </section>
  );
}
