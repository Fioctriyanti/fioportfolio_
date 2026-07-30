/**
 * journey.ts
 * ─────────────────────────────────────────────────────────
 * All milestone content sourced exclusively from Fio's CV.
 * Written as connected storytelling — each milestone ends
 * with a thread that pulls into the next.
 * ─────────────────────────────────────────────────────────
 */

export type MilestoneAccent = "cyan" | "blue" | "purple" | "aurora" | "holo";

export interface Milestone {
  id: string;
  year: string;
  period: string;          // human-readable range, e.g. "2022 – 2024"
  index: number;
  accent: MilestoneAccent;
  icon: string;            // emoji — no external dependency
  category: string;        // short label: "Foundation", "Decision", etc.
  title: string;
  story: string;           // 3–5 sentences, narrative voice
  bridge: string;          // 1 sentence connecting to the NEXT milestone
  lessonsLearned: string[];
  skillsAcquired: string[];
  visualConcept: string;   // description for the gradient/glow background
  isFinal?: boolean;       // marks the "Still Writing" closer
}

export const MILESTONES: Milestone[] = [
  {
    id: "m1",
    index: 0,
    year: "2022",
    period: "2022 – 2024",
    accent: "blue",
    icon: "🔬",
    category: "Foundation",
    title: "The Natural Science Years",
    story:
      "Before data, there was a pattern. In the Natural Science programme at Sugar Group High School, I found myself drawn not to the facts themselves but to the mechanisms behind them — why variables interact, why outcomes differ, why the same experiment produces different results in different conditions. Science taught me that the most interesting answers always raise a harder question. That restlessness turned out to be a useful quality to carry forward.",
    bridge:
      "When it came time to choose a university, that same restlessness made the answer clear.",
    lessonsLearned: [
      "Analytical thinking is a discipline, not a talent",
      "Precision in framing a question determines the quality of the answer",
      "The habit of asking 'why' has no field boundary",
    ],
    skillsAcquired: ["Analytical Thinking", "Scientific Method", "Critical Reasoning"],
    visualConcept: "Deep blue gradient with subtle molecular-structure dot pattern — science lab energy, cool and structured",
  },

  {
    id: "m2",
    index: 1,
    year: "2024",
    period: "2024",
    accent: "cyan",
    icon: "🎯",
    category: "Decision",
    title: "Choosing Data Science",
    story:
      "I enrolled in the Bachelor of Data Science programme at the State University of Surabaya (UNESA) — on the International Track — and made it deliberate, not accidental. Data Science was the intersection I had been looking for: rigorous enough to satisfy the analytical instinct built during high school, but oriented toward real-world problems rather than purely theoretical ones. The International Track meant lectures, materials, and examinations in English — a pressure I welcomed because it forced communication precision alongside technical precision.",
    bridge:
      "The first semester placed a blank code editor in front of me and asked what I could build.",
    lessonsLearned: [
      "Choosing a field intentionally changes how you inhabit it",
      "Communication in a second language enforces clarity of thought",
      "GPA is a lagging indicator of genuine engagement — 3.84 followed from caring about the work",
    ],
    skillsAcquired: ["Python (foundations)", "Academic Research", "English Professional Proficiency"],
    visualConcept: "Cyan dawn gradient — a horizon opening, the sense of a deliberate new start",
  },

  {
    id: "m3",
    index: 2,
    year: "2024",
    period: "2024 – Early 2025",
    accent: "blue",
    icon: "💻",
    category: "First Code",
    title: "Learning to Think in Code",
    story:
      "The Basic Programming course introduced something I hadn't encountered before: a problem-solving system with strict rules and zero ambiguity. I built Hangman Gambit — a fully functional, OOP-designed digital Hangman game — not because the game itself was complex, but because the process of designing classes, managing state, and separating concerns required a different kind of thinking. The RATEMATE rating application followed: array data structures, shell sort for ranking, linear search for retrieval. For the first time, I was not just analysing systems. I was building them.",
    bridge:
      "But building systems made me ask a harder question: what happens when the data driving those systems is wrong?",
    lessonsLearned: [
      "Object-Oriented Programming is a framework for managing complexity, not just a syntax",
      "Algorithm selection has practical consequences — not all sorts are created equal",
      "Building something functional from scratch changes how you read code written by others",
    ],
    skillsAcquired: ["Python", "OOP", "Data Structures", "Algorithms", "Shell Sort", "Linear Search"],
    visualConcept: "Dark navy with floating code-bracket decorative elements and a subtle terminal cursor blink — first contact with programming",
  },

  {
    id: "m4",
    index: 3,
    year: "2025",
    period: "2025",
    accent: "cyan",
    icon: "📊",
    category: "First Model",
    title: "The First Real Statistical Model",
    story:
      "Life Expectancy Prediction was the first project where I confronted what data science actually requires: not just running a regression, but understanding why you run it, what it assumes, and what happens when those assumptions break. VIF-based multicollinearity assessment, residual analysis, formal assumption testing — these steps made me realise that statistical rigour is not bureaucracy. It is the difference between a result you can defend and a result that merely looks convincing. The model identified schooling years, adult mortality, and HIV/AIDS prevalence as the strongest independent predictors after controlling for correlated variables.",
    bridge:
      "Understanding what makes data reliable made me want to understand what makes data well-structured in the first place.",
    lessonsLearned: [
      "Multicollinearity is invisible until you look for it — and catastrophic when you don't",
      "Model interpretability is a feature, not a limitation",
      "Statistical assumptions must be tested, not assumed",
    ],
    skillsAcquired: ["Multiple Linear Regression", "EDA", "VIF Analysis", "Feature Selection", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
    visualConcept: "Scatter plot constellation on dark background — data points arranged in a diagonal trend line with glowing cyan highlights on outliers",
  },

  {
    id: "m5",
    index: 4,
    year: "2025",
    period: "2025",
    accent: "purple",
    icon: "🗄️",
    category: "Infrastructure",
    title: "The Layer Beneath the Analysis",
    story:
      "The Database Systems project and Docker implementation forced a realisation that data science does not begin with a clean CSV. It begins much earlier — with the decisions made at schema design, with the constraints enforced at the database level, with the containers that isolate environments from each other. Designing a normalised PostgreSQL schema, writing JOINs that actually return correct results, configuring Docker to run MySQL and phpMyAdmin together: these were not glamorous tasks. But they were the foundation that every model I would later build depends on. Bad infrastructure produces unreliable analysis even when the model is technically correct.",
    bridge:
      "With the infrastructure understood, the next question was: what can machine learning actually do with clean, well-structured data?",
    lessonsLearned: [
      "Data quality is decided before any query runs",
      "Schema constraints are guarantees, not restrictions",
      "Understanding the layer below your tools makes you better at using your tools",
    ],
    skillsAcquired: ["PostgreSQL", "SQL", "Relational Database Design", "Docker", "MySQL", "phpMyAdmin", "Schema Normalisation", "CRUD"],
    visualConcept: "Purple grid network on dark background — interconnected table nodes with relationship arrows, structured and architectural",
  },

  {
    id: "m6",
    index: 5,
    year: "2025",
    period: "2025",
    accent: "aurora",
    icon: "🤖",
    category: "Machine Learning",
    title: "Into Machine Learning and Deep Learning",
    story:
      "Customer Churn Prediction and CNN-Based Spoken Digit Recognition arrived in the same semester and together mapped the full breadth of the field. The churn project taught me that evaluation metric selection is a business decision disguised as a technical one: optimising for accuracy on an imbalanced dataset is meaningless, and knowing the right metric requires understanding what a false positive actually costs the company. The CNN project taught me something different — that the pipeline from raw signal to trained classifier requires domain understanding, not just model selection. MFCC feature extraction, Mel-spectrogram comparison, audio normalisation: each step was a decision about what information the model would be allowed to see.",
    bridge:
      "Both projects worked on structured or structured-convertible data. The next question was what happens with language — the most unstructured data that exists.",
    lessonsLearned: [
      "SMOTE applied before the train/test split is a data leakage error — sequencing matters",
      "Audio ML begins with signal processing, not model selection",
      "Classification + clustering together produce outputs more useful than either alone",
    ],
    skillsAcquired: ["Machine Learning", "Classification", "K-Means Clustering", "SMOTE", "TensorFlow", "CNN", "MFCC", "Mel-Spectrogram", "Librosa", "Scikit-learn"],
    visualConcept: "Aurora pink and purple gradient — neural network node diagram with pulsing connection weights, warm and electric simultaneously",
  },

  {
    id: "m7",
    index: 6,
    year: "2025",
    period: "2025",
    accent: "cyan",
    icon: "🗣️",
    category: "NLP",
    title: "Language as Data",
    story:
      "7,000 social media posts. Two platforms. One question about a national policy. The MBG Sentiment and Topic Analysis project was the first time the scale of data made individual posts invisible — and that invisibility was the point. IndoBERT, pre-trained on Indonesian text, handled the sentiment classification because Indonesian social media is dense with slang and regional variation that multilingual models handle poorly. LDA surfaced eight latent discussion themes. The finding that mattered most was not the overall sentiment distribution but the intersection of specific topics with negative sentiment — infrastructure readiness and distribution logistics, not the concept of the programme itself. That distinction between 'people are unhappy' and 'people are unhappy about this specific thing' is where NLP earns its value.",
    bridge:
      "The scale of this project and what it revealed about how data can serve public understanding caught the attention of something larger.",
    lessonsLearned: [
      "Language-specific models outperform multilingual models in informal-register text",
      "Topic modelling without sentiment is incomplete; sentiment without topic modelling is unactionable",
      "7,000 posts is large enough to be informative and small enough to handle carefully",
    ],
    skillsAcquired: ["NLP", "IndoBERT", "LDA", "Topic Modelling", "Sentiment Analysis", "Text Preprocessing", "NLTK", "Cross-platform Analysis"],
    visualConcept: "Cyan and blue gradient — word cloud silhouette with sentiment colour coding, social media post nodes flowing into classified clusters",
  },

  {
    id: "m8",
    index: 7,
    year: "2025",
    period: "2025 – 2026",
    accent: "holo",
    icon: "🏆",
    category: "Leadership",
    title: "Leading Beyond the Screen",
    story:
      "Selected as a Google Student Ambassador for Google Gemini Indonesia from a national pool of 12,000 applicants. Placed 1st Runner-Up in the Putra Putri Data Science 2025 competition — a selection process that included presenting three case studies, an interview, a public speech, and a video that reached over 2,000 Instagram views. Served as Coach for the ORIGAMIPA student orientation programme, Event Division Staff for RELOUD 2025, Public Relations Staff for ACTION 2025, Moderator for GSS, and Master of Ceremony for SASOVI 2025. Each of these roles asked for something different: communication precision, stakeholder coordination, public presence, mentoring patience. Together, they revealed that the skills that make analysis useful — structure, clarity, persuasion — are the same skills that make leadership effective.",
    bridge:
      "Leadership and technical work are not parallel tracks. They reinforce each other.",
    lessonsLearned: [
      "Being selected from 12,000 applicants is a credential; what you do with the role is the actual work",
      "Communication that changes behaviour is harder than analysis that identifies what should change",
      "Mentoring new students teaches you how much of what you know you cannot yet articulate",
    ],
    skillsAcquired: ["Public Speaking", "Leadership", "Stakeholder Communication", "Event Coordination", "Mentoring", "AI Literacy Advocacy"],
    visualConcept: "Full holographic prism gradient — the culmination of all four accent colours, representing the full spectrum of skill built across all milestones",
  },

  {
    id: "m9",
    index: 8,
    year: "2026",
    period: "2026 – Present",
    accent: "holo",
    icon: "✦",
    category: "Horizon",
    title: "Still Writing the Story.",
    story:
      "HarvardX CS50P. Gemini Certified Educator. Data Science with Microsoft Fabric. Building Gen AI Applications with Microsoft Azure. This portfolio. Not as proof of arrival — as evidence of direction. The certifications are not the destination; they are markers of where the learning is pointing. A career as a Data Analyst or Data Scientist, in an environment that values both rigour and communication, in problems where data actually changes decisions. That future is not yet written. But the sentence is already underway.",
    bridge: "",
    lessonsLearned: [
      "Portfolios are not final products — they are arguments about what comes next",
      "Certification is most valuable when it reflects genuine learning, not just credential acquisition",
    ],
    skillsAcquired: ["HarvardX CS50P", "Gemini Certified Educator", "Microsoft Fabric", "Azure Gen AI", "Portfolio Development"],
    visualConcept: "Holographic gradient fading into bright white at the right edge — the story continuing off the frame, unfinished and deliberate",
    isFinal: true,
  },
];
