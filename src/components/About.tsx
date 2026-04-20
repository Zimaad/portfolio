import { useReveal } from '../hooks/useReveal';

export default function About() {
  const revealRef = useReveal();

  return (
    <section id="about" className="py-40 px-6 md:px-10 bg-surface" ref={revealRef}>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 mb-24">
          <div className="md:col-span-8 reveal">
            <p className="geist text-[10px] tracking-[0.2em] text-primary mb-8">01 — WHO I AM</p>
            <h2 className="cormorant text-5xl md:text-7xl leading-tight text-on-surface">
              I help startups and businesses launch{' '}
              <span className="italic text-outline">software that actually works.</span>
            </h2>
          </div>
          <div className="md:col-span-4 flex items-end reveal">
            <p className="manrope text-on-surface-variant font-light leading-relaxed">
              You have the idea — I bring it to life. From custom web apps and AI-powered tools to high-converting 
              landing pages, I handle the entire build so you can focus on growing your business. No fluff, no 
              missed deadlines, just clean code and products that perform.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal">
          {[
            { number: '3+', label: 'Years Building' },
            { number: '15+', label: 'Projects Shipped' },
            { number: '100%', label: 'On-Time Delivery' },
            { number: '∞', label: 'Commitment to Quality' },
          ].map((stat) => (
            <div key={stat.label} className="border-t border-outline-variant/20 pt-6">
              <p className="cormorant text-4xl md:text-5xl text-on-surface mb-2">{stat.number}</p>
              <p className="geist text-[9px] tracking-[0.2em] text-on-surface-variant uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
