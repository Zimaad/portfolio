export default function About() {
  return (
    <section id="about" className="py-40 px-10 bg-surface">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-8">
          <p className="geist text-[10px] tracking-[0.2em] text-primary mb-8">01 — PHILOSOPHY</p>
          <h2 className="cormorant text-5xl md:text-7xl leading-tight text-on-surface">
            Bridging the gap between <span className="italic text-outline">sensory aesthetics</span> and rigorous engineering through intentional, high-performance code.
          </h2>
        </div>
        <div className="md:col-span-4 flex items-end">
          <p className="manrope text-on-surface-variant font-light leading-relaxed">
            I specialize in creating immersive digital environments where every pixel serves a purpose and every line of code is optimized for the future. My approach is holistic: from the architectural foundation to the microscopic details of user interaction.
          </p>
        </div>
      </div>
    </section>
  );
}
