import { useState } from 'react';

const faqs = [
  {
    question: 'How much does a project typically cost?',
    answer: "Every project is different, so I provide custom quotes after our initial conversation. A landing page starts around $200, a full web application from $800, and AI-powered tools from $1,300 depending on complexity. I'm transparent about pricing from day one — no hidden fees, no surprises.",
  },
  {
    question: 'How long does it take to build?',
    answer: "A landing page or marketing site typically takes 3-5 days. A full web application with backend, database, and integrations usually takes 2-4 weeks depending on complexity. AI-powered tools may take 3-6 weeks. I'll give you a realistic timeline before we start.",
  },
  {
    question: 'Do you work with international clients?',
    answer: "Absolutely. I work with clients globally and am comfortable with async communication across time zones. Most of my communication happens over email, Slack, or scheduled video calls — whatever works best for you.",
  },
  {
    question: 'What happens after launch?',
    answer: "I don't disappear after deployment. Every project includes a post-launch support period where I fix bugs and handle adjustments. For ongoing maintenance, I offer flexible retainer packages. Your product stays in good hands.",
  },
  {
    question: 'Can you integrate AI into my existing product?',
    answer: "Yes — that's one of my specialties. Whether it's adding a chatbot, automating workflows with AI agents, building recommendation systems, or integrating with OpenAI/Gemini APIs, I can plug AI capabilities into your existing tech stack without rebuilding everything.",
  },
  {
    question: 'What if I only have a rough idea?',
    answer: "That's perfectly fine. Many of my best projects started as rough ideas. During the discovery phase, I help you refine your concept, define the scope, and figure out the smartest way to build it. You don't need a detailed spec — just bring the vision.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-40 px-6 md:px-10 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <p className="geist text-[10px] tracking-[0.2em] text-primary mb-4">06 — FAQ</p>
          <h2 className="cormorant text-5xl md:text-6xl text-on-surface">Common Questions</h2>
          <p className="manrope text-on-surface-variant font-light mt-6 leading-relaxed">
            Everything you need to know before we start working together.
          </p>
        </div>

        <div className="md:col-span-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-t border-outline-variant/15 last:border-b"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full py-7 flex justify-between items-center text-left group"
              >
                <h3 className="cormorant text-xl md:text-2xl text-on-surface group-hover:text-primary transition-colors duration-300 pr-8">
                  {faq.question}
                </h3>
                <span
                  className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-all duration-300 shrink-0"
                  style={{
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
                  }}
                >
                  add
                </span>
              </button>
              <div
                style={{
                  maxHeight: openIndex === index ? '300px' : '0px',
                  opacity: openIndex === index ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease',
                }}
              >
                <p className="manrope text-on-surface-variant font-light leading-relaxed pb-7 max-w-2xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
