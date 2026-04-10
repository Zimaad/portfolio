export interface Project {
  title: string;
  techStack: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  slug: string;
  description: string;
  details?: string;
  conclusion?: string;
  year?: string;
  role?: string;
}

export const projects: Project[] = [
  {
    title: 'Hiatus',
    slug: 'hiatus',
    techStack: 'NEXT.JS 16 / LANGGRAPH / FASTAPI / LLAMA 3.3 / FIREBASE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS89hYfCKpc8XHgyROmfOs-5NbpOynDGZXRB1slM1BSODiJGd43e0jamx0udm6djBLdSVEPeZEu8nY3LwPlJafnEdEuLo74ifbX1R8Uebyujy7BXiRgtcwRRUOatIOPvNp82jmkLfdwNmVPIbVVJq_GRI4cH3MXAfOI72GPFFwUgw8JES9C-6RyTQWhS7e-rMr3I3JvEq8TIIhWvshbbej8mlHK6JOSKvcXr-9toEyBVzlT7oqEKljSciLw7stjPzh-fP6-HXKug',
    liveUrl: 'https://hiatus-three.vercel.app/',
    githubUrl: 'https://github.com/Zimaad/hiatus',
    description: 'An AI-first workspace designed to handle the heavy lifting of research, making complex data analysis feel like a conversation.',
    year: '2026',
    role: 'Full Stack & AI Engineer',
    details: 'We were working on a project in college and our professors demanded actual research papers which showed that our project was novel, and I couldn\'t find a way to find gaps in research papers. That is where the idea of Hiatus was born. It uses LangGraph to run autonomous agents that actually navigate academic databases and break down complex tasks on their own. The backend is a FastAPI setup that communicates with a Next.js 16 frontend, ensuring that as the AI "thinks" and analyzes, you see the progress in real-time without any lag. It’s about making deep research feel less like a chore and more like a collaboration.',
    conclusion: 'Working on Hiatus taught me a lot about agentic workflows and how to manage state in high-latency AI operations. It’s still growing, but the core idea of an AI partner that actually "does the work" is where I think tools are heading.'
  },
  {
    title: 'Echonote',
    slug: 'echonote',
    techStack: 'NEXT.JS 15 / ELECTRON / WHISPER / PYANNOTE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJCWBOnUAiVKt-kkMEZ5NUVw7TpyCVz4bMahDKbUlWb9rDvGdNwGyDw_S5Ueyn2eR8ChkYLnr1UCVJQPKhLkutRP5j7NezPQ_rV4zvC5SPtKie6DRLZAr_mdULP4H9y0brfEF6oxgvOkHti4ZMXOsK_UaEe94KzSlc1TmnQ_ulhkVNy6HIUSSHWBPsJiaeShge1tUrCZHu95C_9uMOzSWgCawYActnj1kuTtO6Lmr3_qHhbCinN4AvILgmSGuiLrilXWm8u6VuGg',
    liveUrl: 'https://echonote1.vercel.app/',
    githubUrl: 'https://github.com/Zimaad/Echonote1',
    description: 'A tool that turns messy meeting audio into searchable, structured knowledge. It handles the transcription so you can focus on the talk.',
    year: '2025',
    role: 'Lead Developer',
    details: 'Echonote came out of a personal frustration with missed details in meetings. I integrated OpenAI\'s Whisper for transcription and Pyannote for speaker diarization (the tech that figures out who is talking). Since it\'s an Electron app, it feels like a native part of your workflow. It translates raw audio into semantic data, allowing you to search for specific moments in a conversation just like you’d search a PDF.',
    conclusion: 'The challenge here was balancing local performance with cloud inference. I’m pretty happy with how the diarization turned out—it makes reviewing long transcripts much easier when you know exactly who said what.'
  },
  {
    title: 'CodeLens',
    slug: 'codelens',
    techStack: 'REACT 19 / VITE / D3.JS / LANGCHAIN / LLM APIS / TAILWIND V4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBqZ7Fj-0I9Z-0OB5ieYEAZfmiziFnEIbEwgci6MYIs9CNpKaRZylxJj-3T3EAmaVBr17x5nLvb0PMzikJEpIEteEhJLQ_LU7oqJKkdknPYKWTsvVrP5hcDxx3jNxRg-4f_YJeTjuPh92tE0sxYW6eaI7E6P73FkN7bCgaaTy_klGHGWfO0KCfLY2gLEgwvEdrk5PX7NCyyb7rvl_k8vzHaa1OoTEg2Vs-Cs0x3BQwVglYfhSMYqjoy42VdT7ZeZg7tozJ0Rq-UQ',
    liveUrl: 'https://codelens-two.vercel.app/',
    githubUrl: 'https://github.com/Zimaad/codelens',
    description: 'A visual way to map out and understand massive codebases. It turns complex file structures into interactive dependency graphs.',
    year: '2023',
    role: 'Frontend Architect',
    details: 'Dropping into a massive, unfamiliar codebase is usually a nightmare. I created CodeLens to give developers a "map" of their project. Using D3.js, it generates a force-directed graph of every file relationship. Then, I used LangChain and LLM APIs to add an "insight" layer—so you can click a node and have the AI explain how that specific module fits into the whole system. It was a great project to experiment with the performance limits of React 19.',
    conclusion: 'CodeLens was as much about design as it was about data. Figuring out how to visualize thousands of nodes without overwhelming the browser—or the user—was a huge puzzle. It’s a tool I still use myself whenever I start a new gig.'
  },
];
