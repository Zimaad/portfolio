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
  clientType?: string;
  results?: string;
}

export const projects: Project[] = [
  {
    title: 'Hiatus',
    slug: 'hiatus',
    techStack: 'NEXT.JS 16 / LANGGRAPH / FASTAPI / LLAMA 3.3 / FIREBASE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS89hYfCKpc8XHgyROmfOs-5NbpOynDGZXRB1slM1BSODiJGd43e0jamx0udm6djBLdSVEPeZEu8nY3LwPlJafnEdEuLo74ifbX1R8Uebyujy7BXiRgtcwRRUOatIOPvNp82jmkLfdwNmVPIbVVJq_GRI4cH3MXAfOI72GPFFwUgw8JES9C-6RyTQWhS7e-rMr3I3JvEq8TIIhWvshbbej8mlHK6JOSKvcXr-9toEyBVzlT7oqEKljSciLw7stjPzh-fP6-HXKug',
    liveUrl: 'https://hiatus-three.vercel.app/',
    githubUrl: 'https://github.com/Zimaad/hiatus',
    description: 'An AI-powered research workspace that automates the heavy lifting of academic analysis — turning weeks of work into hours.',
    year: '2026',
    role: 'End-to-End Development',
    clientType: 'Internal Product',
    results: 'Reduced research time by 80% for academic teams',
    details: 'The problem was simple: finding genuine gaps in research papers was taking weeks. Hiatus solves this with autonomous AI agents (built on LangGraph) that navigate academic databases, break down complex papers, and surface novel insights in real-time. The full-stack build includes a FastAPI backend communicating with a Next.js 16 frontend, ensuring the AI\'s "thinking" process streams live without lag. It\'s the kind of tool that turns a painful chore into a quick collaboration with an AI partner.',
    conclusion: 'This project proved that agentic AI workflows can genuinely replace manual research processes. The architecture handles high-latency AI operations gracefully, and the real-time streaming UX makes complex analysis feel effortless.'
  },
  {
    title: 'Echonote',
    slug: 'echonote',
    techStack: 'NEXT.JS 15 / ELECTRON / WHISPER / PYANNOTE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJCWBOnUAiVKt-kkMEZ5NUVw7TpyCVz4bMahDKbUlWb9rDvGdNwGyDw_S5Ueyn2eR8ChkYLnr1UCVJQPKhLkutRP5j7NezPQ_rV4zvC5SPtKie6DRLZAr_mdULP4H9y0brfEF6oxgvOkHti4ZMXOsK_UaEe94KzSlc1TmnQ_ulhkVNy6HIUSSHWBPsJiaeShge1tUrCZHu95C_9uMOzSWgCawYActnj1kuTtO6Lmr3_qHhbCinN4AvILgmSGuiLrilXWm8u6VuGg',
    liveUrl: 'https://echonote1.vercel.app/',
    githubUrl: 'https://github.com/Zimaad/Echonote1',
    description: 'A desktop app that converts messy meeting recordings into searchable, speaker-tagged transcripts — so teams never miss a detail.',
    year: '2025',
    role: 'End-to-End Development',
    clientType: 'Productivity Tool',
    results: 'Processes 1hr meetings in under 3 minutes with speaker identification',
    details: 'Built to solve the universal pain of missed details in meetings. Echonote integrates OpenAI Whisper for transcription and Pyannote for speaker diarization — the AI figures out who said what. As an Electron app, it runs natively on desktop and translates raw audio into structured, searchable data. You can search for specific moments in a conversation just like searching a PDF.',
    conclusion: 'The key challenge was balancing local performance with cloud inference. The diarization pipeline turned out exceptionally well — reviewing hour-long transcripts becomes effortless when every statement is tagged to the right person.'
  },
  {
    title: 'CodeLens',
    slug: 'codelens',
    techStack: 'REACT 19 / VITE / D3.JS / LANGCHAIN / LLM APIS / TAILWIND V4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBqZ7Fj-0I9Z-0OB5ieYEAZfmiziFnEIbEwgci6MYIs9CNpKaRZylxJj-3T3EAmaVBr17x5nLvb0PMzikJEpIEteEhJLQ_LU7oqJKkdknPYKWTsvVrP5hcDxx3jNxRg-4f_YJeTjuPh92tE0sxYW6eaI7E6P73FkN7bCgaaTy_klGHGWfO0KCfLY2gLEgwvEdrk5PX7NCyyb7rvl_k8vzHaa1OoTEg2Vs-Cs0x3BQwVglYfhSMYqjoy42VdT7ZeZg7tozJ0Rq-UQ',
    liveUrl: 'https://codelens-two.vercel.app/',
    githubUrl: 'https://github.com/Zimaad/codelens',
    description: 'A visual tool that maps massive codebases into interactive dependency graphs — with AI-powered explanations for every module.',
    year: '2023',
    role: 'End-to-End Development',
    clientType: 'Developer Tool',
    results: 'Visualizes 1000+ file codebases with AI-driven insights',
    details: 'Dropping into a massive, unfamiliar codebase is a nightmare for any development team. CodeLens generates a force-directed graph of every file relationship using D3.js, then layers on AI-powered insights via LangChain — click any node and the AI explains how that module fits into the whole system. Built with React 19 and optimized to handle thousands of nodes without breaking a sweat.',
    conclusion: 'This project was as much about design as data visualization. Figuring out how to render thousands of interconnected nodes without overwhelming either the browser or the user was the core engineering challenge — and the result is a tool I still use on every new project.'
  },
];
