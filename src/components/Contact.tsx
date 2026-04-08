export default function Contact() {
  return (
    <section id="contact" className="py-60 px-10 bg-surface flex flex-col items-center text-center">
      <h2 className="cormorant text-[8vw] leading-none mb-16 italic text-on-surface">Let's Collaborate</h2>
      <button className="bg-primary text-on-primary px-16 py-6 geist text-[12px] tracking-[0.4em] uppercase hover:bg-secondary transition-colors duration-300">
        INITIATE PROJECT
      </button>
      <div className="mt-20 flex gap-8">
        <a className="geist text-[10px] tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="mailto:zimaad@example.com">EMAIL</a>
        <a className="geist text-[10px] tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">TWITTER</a>
        <a className="geist text-[10px] tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="https://linkedin.com/in/zimaad">LINKEDIN</a>
      </div>
    </section>
  );
}
