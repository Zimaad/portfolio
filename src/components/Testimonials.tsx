const testimonials = [
  {
    quote: "Zimaad didn't just build what we asked for — he understood our business and built something better. The AI integration he added to our workflow saved us hours every week.",
    name: 'Arjun Mehta',
    role: 'Founder, TechVentures',
  },
  {
    quote: "Working with Zimaad felt like having a CTO on demand. He took our rough idea and turned it into a polished, production-ready product in weeks. Highly recommended.",
    name: 'Sarah Chen',
    role: 'CEO, DataBridge',
  },
  {
    quote: "The attention to detail was incredible. Every interaction, every animation, every line of code was intentional. Our conversion rate doubled after the redesign.",
    name: 'Ravi Patel',
    role: 'Marketing Director, ScaleUp',
  },
];

// Duplicate for seamless infinite loop
const marqueeItems = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-40 px-0 bg-surface overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 mb-20">
        <p className="geist text-[10px] tracking-[0.2em] text-primary mb-4">05 — TESTIMONIALS</p>
        <h2 className="cormorant text-5xl md:text-6xl text-on-surface">What Clients Say</h2>
      </div>

      {/* Infinite Carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex gap-6 w-max">
          {marqueeItems.map((testimonial, index) => (
            <div
              key={index}
              className="group border border-outline-variant/10 p-8 md:p-10 hover:border-outline-variant/25 transition-all duration-700 relative w-[360px] md:w-[420px] shrink-0"
            >
              {/* Quote mark */}
              <span className="cormorant text-6xl text-outline-variant/15 absolute top-4 right-6 leading-none select-none">"</span>

              <p className="manrope text-on-surface-variant font-light leading-relaxed mb-8 relative z-10 text-sm">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-outline-variant/10 pt-6">
                <p className="manrope text-on-surface font-medium text-sm">{testimonial.name}</p>
                <p className="geist text-[9px] tracking-[0.15em] text-on-surface-variant uppercase mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframes for the marquee */}
      <style>{`
        .marquee-track {
          animation: marquee-scroll 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
