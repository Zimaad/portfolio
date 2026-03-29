import { useReveal } from '../hooks/useReveal';

const skillCategories = [
  {
    label: 'Languages',
    skills: ['C++', 'Python', 'Java', 'JavaScript', 'Dart', 'HTML/CSS'],
  },
  {
    label: 'Frameworks',
    skills: ['React', 'Node.js', 'Flask', 'FastAPI', 'Django'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Docker', 'Google Cloud Platform', 'VS Code', 'Visual Studio'],
  },
  {
    label: 'Libraries',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'D3.js', 'LangChain'],
  },
];

export default function Skills() {
  const revealRef = useReveal();

  return (
    <section
      id="skills"
      ref={revealRef}
      className="relative py-32 md:py-40 px-6 md:px-12"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="reveal text-muted font-medium mb-12"
          style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          Skills
        </p>

        <h2 className="reveal font-serif text-4xl md:text-5xl text-ink leading-tight tracking-tight mb-16">
          {/* SKILLS HEADING — e.g. "What I work with" */}
          What I work with
        </h2>

        <div className="space-y-12">
          {skillCategories.map((category, catIdx) => (
            <div
              key={category.label}
              className="reveal"
              style={{ transitionDelay: `${catIdx * 100}ms` }}
            >
              <h3
                className="text-muted font-medium mb-5"
                style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-5 py-2.5 text-sm text-ink/80 bg-surface border border-border rounded-full hover:border-ink/20 transition-colors duration-300 font-normal cursor-default"
                  >
                    {skill}
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
