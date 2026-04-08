const skillCategories = [
  {
    label: 'FRONTEND',
    skills: ['React / Next.js', 'Tailwind CSS', 'Vite', 'D3.js / GSAP', 'Electron'],
  },
  {
    label: 'BACKEND',
    skills: ['Node.js', 'FastAPI / Flask', 'Django', 'REST APIs', 'Python / C++ / Java'],
  },
  {
    label: 'AI / ML',
    skills: ['LangChain / LangGraph', 'OpenAI / Gemini AI', 'Pyannote.audio', 'Pandas / NumPy', 'Scikit-learn'],
  },
  {
    label: 'DATABASES & DEVOPS',
    skills: ['Firebase', 'MongoDB', 'Google Cloud (GCP)', 'Docker', 'CI/CD / GitHub Actions'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-40 px-10 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="geist text-[10px] tracking-[0.2em] text-primary mb-8">04 — TOOLKIT</p>
          <h2 className="cormorant text-5xl">The Fullstack <br /> Arsenal</h2>
        </div>
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {skillCategories.map((category) => (
            <div key={category.label}>
              <p className="geist text-[9px] text-outline-variant mb-4 tracking-[0.2em] uppercase">
                {category.label}
              </p>
              <ul className="manrope text-lg space-y-2 font-light text-on-surface">
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
