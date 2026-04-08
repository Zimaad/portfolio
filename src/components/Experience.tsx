import { useReveal } from '../hooks/useReveal';

const experiences = [
  {
    company: 'UrbanTech Services LLP',
    role: 'Fullstack Developer Intern',
    date: 'June 2025 — Present',
    description: 'Built PREX, a procurement and quotation automation tool for enterprises, improving operational visibility with a React-based real-time order analytics dashboard.',
  },
  {
    company: 'TSB Enterprises',
    role: 'Web Developer',
    date: 'Dec 2025',
    description: 'Developed a Django-based booking platform with Razorpay payments, QR code generation, and automated booking lifecycle management.',
  },
];

export default function Experience() {
  const revealRef = useReveal();

  return (
    <section id="experience" ref={revealRef} className="bg-surface-container-low py-40 px-10">
      <div className="max-w-screen-xl mx-auto">
        <p className="geist text-[10px] tracking-[0.2em] text-primary mb-16 text-center">02 — JOURNEY</p>
        <div className="space-y-32">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`grid md:grid-cols-12 items-start group ${index !== 0 ? 'border-t border-outline-variant/10 pt-16' : ''}`}
            >
              <div className="md:col-span-2 geist text-[10px] text-on-surface-variant mt-2">
                {exp.date}
              </div>
              <div className="md:col-span-6">
                <h3 className="cormorant text-4xl mb-4 group-hover:text-primary transition-colors">
                  {exp.role}
                </h3>
                <p className="manrope text-on-surface-variant max-w-md">
                  {exp.description}
                </p>
              </div>
              <div className="md:col-span-4 text-right hidden md:block">
                <span className="geist text-[10px] tracking-[0.2em] text-outline-variant uppercase">
                  {exp.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
