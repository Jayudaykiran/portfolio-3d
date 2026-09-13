export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI Systems' | 'Full Stack' | '3D & Creative' | 'DSA & Algorithms';
  date: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  score: string;
  location: string;
  highlights: string[];
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  tag: string;
}

export const PERSONAL_INFO = {
  name: "Neerukonda Jaya Uday Kiran",
  shortName: "Jaya Uday Kiran",
  preferredName: "Jay",
  role: "AI Systems Engineer & 3D Web Creative",
  headline: "Architecting Multi-Stage AI Compilers & Interactive 3D WebGL Experiences",
  bio: "Computer Science Engineer specializing in AI/ML systems engineering, LLM compiler pipelines, and interactive 3D WebGL graphics. Passionate about transforming complex algorithmic problems into sleek, responsive digital experiences.",
  email: "jaiudayk@gmail.com",
  phone: "+91 89197 89733",
  location: "Visakhapatnam, India & Punjab (LPU)",
  status: "Available for Software & AI Engineering Roles",
  socials: {
    github: "https://github.com/Jayudaykiran",
    linkedin: "https://linkedin.com/in/jayudaykiran",
    emailMailto: "mailto:jaiudayk@gmail.com",
    tel: "tel:+918919789733"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "ai-compiler",
    title: "AI Architecture Compiler",
    subtitle: "End-to-End Generative Architecture Pipeline",
    category: "AI Systems",
    date: "Aug 2025",
    badge: "Flagship AI Project",
    featured: true,
    description: "Engineered a multi-stage AI compiler pipeline converting natural language product requirements into production-ready software architecture blueprints.",
    longDescription: "A multi-phase systems engineering compiler that synthesizes comprehensive software architectures from natural language PRDs. Implemented with modular generation stages: intent extraction, structural system design, database schema synthesis, Pydantic cross-layer validation, and automated error-repair runtime with SQLite execution validation.",
    tags: ["Python", "Streamlit", "Groq API", "Pydantic", "SQLite", "LLM Systems", "System Design"],
    metrics: [
      "Zero invalid schema outputs via SQLite runtime validation",
      "Multi-stage automated repair for duplicate APIs and orphaned keys",
      "Real-time JSON visualization and execution logging"
    ],
    features: [
      "Automated schema validation and cross-layer consistency verification",
      "Pydantic schema enforcement catching duplicate APIs & invalid auth mappings",
      "Execution-aware SQLite runtime for dynamic table creation verification",
      "Interactive Streamlit developer dashboard with real-time compilation logs"
    ],
    githubUrl: "https://github.com/Jayudaykiran"
  },
  {
    id: "multi-persona-chatbot",
    title: "Multi-Persona AI ChatBot",
    subtitle: "Context-Aware Role-Adaptive LLM System",
    category: "AI Systems",
    date: "Jun 2025",
    featured: true,
    badge: "Interactive AI",
    description: "Multi-persona AI chatbot supporting specialized modes (Doctor, Teacher, Tech Support) with role-tailored prompt engineering and real-time streaming.",
    longDescription: "Designed and deployed a responsive web conversational system integrating Cohere's advanced language model with a lightweight Flask backend. Features role-specific prompt engineering pipelines that dynamically modulate tone, terminology, and reasoning depth according to selected persona modes.",
    tags: ["Flask", "HTML5", "CSS3", "JavaScript", "Cohere LLM", "NLP", "Prompt Engineering"],
    metrics: [
      "3 Distinct Persona Modes with distinct cognitive frameworks",
      "Sub-200ms API routing response overhead",
      "Enhanced NLP context retention across multi-turn sessions"
    ],
    features: [
      "Dynamic prompt orchestration for Doctor, Educator, and Engineer personas",
      "Seamless Cohere API integration with structured response formatting",
      "Clean, modern chat interface with real-time markdown and syntax rendering",
      "Error-resilient fallback mechanisms for uninterrupted conversations"
    ],
    githubUrl: "https://github.com/Jayudaykiran"
  },
  {
    id: "lumiere-fashion-3d",
    title: "Lumière — 3D Women's Fashion Boutique",
    subtitle: "High-Fashion WebGL Apparel Showcase",
    category: "3D & Creative",
    date: "Upcoming (Phase 2)",
    featured: true,
    badge: "Next Project Teaser",
    description: "Interactive 3D digital boutique for women's designer apparel with real-time GLSL cloth wave shaders, 360° rotation, and dynamic lighting reflections.",
    longDescription: "An avant-garde e-commerce experience marrying haute couture with cutting-edge 3D WebGL technology. Visitors can inspect fabric weave in 360 degrees, simulate garment lighting changes, interact with dynamic silk drape physics, and add curated looks directly to their bag.",
    tags: ["Three.js", "WebGL Shaders", "React", "Tailwind CSS", "GLSL", "E-Commerce"],
    metrics: [
      "60 FPS smooth orbital 3D product examination",
      "Custom GLSL silk sheen & anisotropic lighting shaders",
      "Responsive mobile-first interactive bag & checkout"
    ],
    features: [
      "Real-time 360-degree garment inspection with orbit controls",
      "Interactive silk & fabric wave shader simulation",
      "Dynamic studio lighting presets (Golden Hour, Runway Spotlight, Studio Softbox)",
      "Curated seasonal collection and instant cart management"
    ],
    liveUrl: "#"
  },
  {
    id: "dsa-lms",
    title: "High-Performance LMS & Algorithmic Engine",
    subtitle: "DSA-Driven Learning Management System",
    category: "DSA & Algorithms",
    date: "Mar 2023",
    badge: "Capstone Project",
    featured: false,
    description: "Engineered a high-performance Learning Management System in C++ & Java utilizing advanced Data Structures and Algorithms for optimal query throughput.",
    longDescription: "A comprehensive Learning Management System capstone built during intensive Board Infinity training. Built with custom indexing, balanced trees, and hash mappings to achieve sub-millisecond retrieval of student records, course hierarchies, and automated grading submissions.",
    tags: ["C++", "Java", "DSA", "Data Structures", "System Performance", "Optimization"],
    metrics: [
      "O(1) average lookup times for indexed student/course mappings",
      "Strict time & space complexity constraints met under benchmark tests",
      "Scalable hierarchical course graph traversal"
    ],
    features: [
      "Custom balanced binary search tree & hash map implementations",
      "Optimized memory management and resource cleanup in native C++",
      "Interactive terminal and console query interface for administrative management",
      "Comprehensive benchmark test suite measuring execution time"
    ],
    githubUrl: "https://github.com/Jayudaykiran"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI, ML & LLM Engineering",
    description: "Designing generative AI pipelines, RAG systems, and LLM reasoning compilers",
    iconName: "BrainCircuit",
    skills: [
      { name: "RAG & LLM Pipelines", level: 90, highlight: true },
      { name: "Prompt Engineering & Multi-Persona", level: 95, highlight: true },
      { name: "Natural Language Processing (NLP)", level: 85, highlight: true },
      { name: "Pydantic & Schema Validation", level: 92 },
      { name: "Groq & Cohere APIs", level: 90 },
      { name: "Computer Vision (YOLO / Ultralytics)", level: 80 },
      { name: "PyTorch & TensorFlow", level: 75 },
      { name: "Scikit-Learn", level: 80 }
    ]
  },
  {
    title: "3D Graphics & Creative Web",
    description: "Interactive WebGL shaders, Three.js canvases, and high-performance UI",
    iconName: "Boxes",
    skills: [
      { name: "Three.js & WebGL", level: 88, highlight: true },
      { name: "GLSL Custom Shaders", level: 82, highlight: true },
      { name: "React & TypeScript", level: 90, highlight: true },
      { name: "Tailwind CSS & Glassmorphism", level: 94 },
      { name: "Framer Motion & Micro-interactions", level: 85 },
      { name: "HTML5 / CSS3 Responsive Layouts", level: 95 },
      { name: "UI/UX Design Principles", level: 85 }
    ]
  },
  {
    title: "Systems & Programming Languages",
    description: "Core algorithms, data structures, and backend systems engineering",
    iconName: "Code2",
    skills: [
      { name: "Python", level: 92, highlight: true },
      { name: "C++ (Data Structures & Algos)", level: 88, highlight: true },
      { name: "Java", level: 82 },
      { name: "JavaScript / ESNext", level: 88 },
      { name: "SQL & SQLite Engine", level: 85 },
      { name: "Flask & RESTful APIs", level: 86 },
      { name: "Streamlit Dashboards", level: 90 }
    ]
  },
  {
    title: "Tools, Data & Cloud",
    description: "Developer workflows, version control, and data visualization",
    iconName: "Terminal",
    skills: [
      { name: "Git & GitHub Workflows", level: 90, highlight: true },
      { name: "NumPy & Pandas", level: 88 },
      { name: "Matplotlib & Seaborn", level: 84 },
      { name: "Cloud Computing (NPTEL Certified)", level: 82 },
      { name: "Power BI Data Insights", level: 80 },
      { name: "Py-PDFLoader & Document AI", level: 85 }
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    title: "Data Structures & Algorithms",
    issuer: "Board Infinity",
    date: "Jul 2024",
    tag: "Core Engineering"
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL (National Programme on Technology Enhanced Learning)",
    date: "Nov 2024",
    tag: "Cloud Infrastructure"
  },
  {
    title: "Algorithms Specialization",
    issuer: "Stanford University (Coursera)",
    date: "Feb 2023",
    tag: "Theoretical Computer Science"
  },
  {
    title: "Machine Learning",
    issuer: "Coursera",
    date: "Feb 2023",
    tag: "Artificial Intelligence"
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Lovely Professional University",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    duration: "Aug 2022 – Present",
    score: "CGPA: 6.41",
    location: "Punjab, India",
    highlights: [
      "Specializing in Artificial Intelligence, Machine Learning, and High-Performance Software Systems",
      "Developed end-to-end AI Architecture Compilers and LLM-driven generative pipelines",
      "Active participant in technical symposiums and competitive coding training"
    ]
  },
  {
    institution: "Vignan Global Gen School",
    degree: "Intermediate (Class XII - MPC)",
    duration: "Apr 2020 – Mar 2022",
    score: "Percentage: 75%",
    location: "Visakhapatnam, Andhra Pradesh",
    highlights: [
      "Focused on Advanced Mathematics, Physics, and Chemistry",
      "Developed foundational analytical and problem-solving methodologies"
    ]
  },
  {
    institution: "Vignan Global Gen School",
    degree: "Matriculation (Class X)",
    duration: "Apr 2019 – Mar 2020",
    score: "Percentage: 70%",
    location: "Visakhapatnam, Andhra Pradesh",
    highlights: [
      "Comprehensive secondary education with emphasis on Science & Mathematics"
    ]
  }
];
