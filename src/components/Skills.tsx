const steps = [
  {
    number: '01',
    icon: 'chat',
    title: 'Discovery',
    description: "We talk about your idea, goals, and timeline. No jargon, no BS — just a clear conversation about what you need and how I can help.",
  },
  {
    number: '02',
    icon: 'draw',
    title: 'Design',
    description: "I create mockups and prototypes you'll actually love before writing a single line of code. You see exactly what you're getting.",
  },
  {
    number: '03',
    icon: 'code',
    title: 'Build',
    description: "I develop your product using battle-tested, modern tech. You get regular updates, a transparent process, and zero guesswork about where things stand.",
  },
  {
    number: '04',
    icon: 'rocket_launch',
    title: 'Launch & Support',
    description: "I deploy, test, and provide ongoing support. Your product goes live stress-free, and I stick around to make sure everything runs smooth.",
  },
];

export default function Skills() {
  return (
    <section id="process" className="py-40 px-6 md:px-10 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-20">
          <p className="geist text-[10px] tracking-[0.2em] text-primary mb-4">04 — PROCESS</p>
          <h2 className="cormorant text-5xl md:text-6xl text-on-surface">How I Work</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="group relative">
              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-[1px] bg-outline-variant/15" />
              )}

              <div className="border-t border-outline-variant/20 pt-8 group-hover:border-primary/40 transition-colors duration-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 border border-outline-variant/20 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                    <span className="material-symbols-outlined text-xl text-on-surface-variant group-hover:text-primary transition-colors duration-500">
                      {step.icon}
                    </span>
                  </div>
                  <span className="geist text-[10px] tracking-[0.2em] text-outline-variant">{step.number}</span>
                </div>

                <h3 className="cormorant text-2xl md:text-3xl text-on-surface mb-4 group-hover:text-primary transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="manrope text-on-surface-variant font-light leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
