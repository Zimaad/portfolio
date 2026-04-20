import { useReveal } from '../hooks/useReveal';

const services = [
  {
    icon: 'devices',
    title: 'Custom Web Applications',
    description: 'Full-stack apps tailored to your business — from dashboards and marketplaces to SaaS platforms. Built with React, Next.js, and scalable backends.',
    tech: ['React / Next.js', 'Node.js / Python', 'Firebase / MongoDB', 'REST & GraphQL APIs'],
  },
  {
    icon: 'smart_toy',
    title: 'AI-Powered Tools',
    description: 'Chatbots, autonomous agents, data analysis tools, and AI integrations that give your business a genuine edge over the competition.',
    tech: ['LangChain / LangGraph', 'OpenAI / Gemini', 'Custom AI Agents', 'Data Pipelines'],
  },
  {
    icon: 'web',
    title: 'Websites & Landing Pages',
    description: 'Premium, high-converting websites that look stunning and rank on Google. SEO-optimized, mobile-first, and built to impress.',
    tech: ['Responsive Design', 'SEO Optimization', 'Performance Tuning', 'Analytics Setup'],
  },
  {
    icon: 'settings_suggest',
    title: 'Automation & Integration',
    description: 'Connect your tools, automate repetitive workflows, and streamline operations. Stop wasting hours on tasks a machine can do in seconds.',
    tech: ['Workflow Automation', 'API Integrations', 'Payment Systems', 'Cloud Deployment'],
  },
];

export default function Experience() {
  const revealRef = useReveal();

  return (
    <section id="services" ref={revealRef} className="bg-surface-container-low py-40 px-6 md:px-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-20 reveal">
          <p className="geist text-[10px] tracking-[0.2em] text-primary mb-4">02 — SERVICES</p>
          <h2 className="cormorant text-5xl md:text-6xl text-on-surface">What I Build</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group reveal border-t border-outline-variant/15 pt-8 hover:border-primary/40 transition-colors duration-700"
            >
              <div className="flex items-start gap-5 mb-5">
                <div className="w-12 h-12 border border-outline-variant/20 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                  <span className="material-symbols-outlined text-xl text-on-surface-variant group-hover:text-primary transition-colors duration-500">
                    {service.icon}
                  </span>
                </div>
                <div>
                  <h3 className="cormorant text-2xl md:text-3xl text-on-surface group-hover:text-primary transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>
              </div>

              <p className="manrope text-on-surface-variant font-light leading-relaxed mb-6 max-w-md">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="geist text-[8px] tracking-[0.15em] text-on-surface-variant/60 uppercase border border-outline-variant/15 px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
