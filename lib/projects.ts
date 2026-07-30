/**
 * projects.ts — Fio Octriyanti Portfolio
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for all project content (Flat List Version).
 * ─────────────────────────────────────────────────────────────
 */

export type ProjectCategory =
  | "NLP"
  | "Machine Learning"
  | "Deep Learning"
  | "Database Systems"
  | "Data Mining"
  | "Predictive Analytics"
  | "Data Visualization"
  | "UI/UX Design"
  | "Software Engineering"
  | "Computer Vision"
  | "Data Warehouse";

export type ProjectTier = "featured";
export type ProjectAccent = "cyan" | "blue" | "purple" | "aurora" | "holo";

export interface WorkflowStep {
  step: number;
  label: string;
  detail: string;
}

export interface Metric {
  label: string;
  value: string;
  context: string;
}

export interface ProjectAssessment {
  recruiterImpression: string;
  technicalDifficulty: 1 | 2 | 3 | 4 | 5;
  businessValue: 1 | 2 | 3 | 4 | 5;
  researchValue: 1 | 2 | 3 | 4 | 5;
  skillsDemonstrated: string[];
  heroImageSuggestion: string;
  colorAccent: string;
  animationSuggestion: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  tier: "featured" | "secondary" | "compact" | "archived" | string; // <--- PASTIKAN BARIS INI ADA
  category: string;
  accent: string;
  timeline: string;
  type: string;
  title: string;
  tagline: string;
  heroGradient: string;
  background: string;
  objective: string;
  problem: string;
  whyItMatters: string;
  dataset: string;
  languages: string[];
  tools: string[];
  libraries: string[];
  algorithms: string[];
  stack: string[];
  workflow: WorkflowStep[];
  methodology: string;
  eda: string;
  featureEngineering?: string;
  modelDevelopment?: string;
  evaluationMetrics: string;
  visualization: string;
  results: string;
  impact: string;
  myRole: string;
  keyContributions: string[];
  challenges: string;
  lessonsLearned: string;
  metrics: Metric[];
  assessment: ProjectAssessment;
  githubUrl?: string;
  demoUrl?: string;
  links?: Record<string, string>;
}

/* ────────────────────────────────────────────────────────────
   #1 — NLP: MBG Sentiment & Topic Analysis
──────────────────────────────────────────────────────────────── */
const mbgSentiment: ProjectData = {
  id: "p1",
  slug: "mbg-sentiment-topic-analysis",
  tier: "featured",
  category: "NLP",
  accent: "cyan",
  timeline: "2025",
  type: "Group Project",
  title: "Sentiment & Topic Analysis of the MBG Programme",
  tagline: "7,000+ social media posts. Two platforms. One national policy question.",

  heroGradient: "linear-gradient(135deg, rgba(0,200,240,0.3) 0%, rgba(74,124,247,0.22) 50%, rgba(139,92,246,0.18) 100%)",
  background: "Indonesia's Free Nutritious Meals (MBG) programme is one of the largest active social policy initiatives in the country. Like any large-scale government programme, public perception shapes its reception and long-term adoption — yet there was no systematic picture of what Indonesian citizens were actually saying about it online, across the platforms where they naturally spoke.",
  objective: "To conduct a large-scale, multi-platform NLP analysis of public discourse on the MBG programme — classifying sentiment across positive, negative, and neutral categories using a fine-tuned IndoBERT model, and surfacing 8 optimal latent discussion topics driving each sentiment class via LDA.",
  problem: "Social media generates an enormous volume of opinion data about public policy, but most of it is analysed only qualitatively and at small scale. At 7,000+ posts across X (Nitter) and YouTube, the corpus was too large for manual review, skewed by uneven character lengths, and heavily saturated with informal Indonesian text, code-switching, and platform-specific slang.",
  whyItMatters: "Sentiment alone is a blunt instrument. Knowing that 'many people are negative' is not actionable. Knowing which specific topics — logistics, nutritional quality, infrastructure readiness — are generating the most negative sentiment gives policymakers and programme managers something they can actually respond to. That is what this analysis was designed to produce.",
  dataset: "7,000+ posts collected from X (Nitter) and YouTube, containing 5,204 initial rows from X alongside comprehensive YouTube video comments. The data features highly informal Indonesian text, heavy use of abbreviations, platform-specific jargon, and local regional dialects.",
  languages: ["Python"],
  tools: ["Jupyter Notebook"],
  libraries: ["Pandas", "NumPy", "NLTK", "Matplotlib", "Seaborn", "Scikit-learn", "pyLDAvis"],
  algorithms: ["IndoBERT (mdhugol/indonesia-bert-sentiment-classification)", "Latent Dirichlet Allocation — LDA (topic modelling)"],
  stack: ["Python", "IndoBERT", "LDA", "Pandas", "NLTK", "Scikit-learn", "pyLDAvis", "Matplotlib", "Seaborn", "Jupyter Notebook"],
  workflow: [
    { step: 1, label: "Data Collection & EDA", detail: "Scraped 7,000+ posts from X (Nitter) and YouTube; identified character length discrepancies between platforms" },
    { step: 2, label: "Text Preprocessing", detail: "Tokenisation, emoji conversion, stopword removal, and custom slang normalisation (e.g., 'yg' -> 'yang', 'mbg' -> 'makan bergizi gratis')" },
    { step: 3, label: "Sentiment Classification", detail: "Applied fine-tuned IndoBERT transformer to label text into 3 distinct sentiment classes" },
    { step: 4, label: "Topic Modelling Optimization", detail: "Tuned LDA hyperparameters over multiple iterations to determine the optimal number of topics using coherence scores" },
    { step: 5, label: "Interactive Visualization & Mapping", detail: "Mapped topic distributions via pyLDAvis and generated sentiment confidence quartiles" },
    { step: 6, label: "Insight Synthesis", detail: "Topic clusters cross-referenced against sentiment labels to isolate specific high-concern policy issues" }
  ],
  methodology: "IndoBERT was chosen over multilingual BERT because Indonesian social media contains significant slang, abbreviations, and regional dialect variation that general-purpose multilingual models handle poorly. Specifically, we leveraged the 'mdhugol/indonesia-bert-sentiment-classification' model to guarantee context-aware sequence processing. LDA was applied independently from the sentiment classification step — identifying latent topics regardless of sentiment — and the two outputs were then cross-referenced: which topics generated the highest proportion of negative sentiment, and did that pattern differ between X and YouTube audiences.",
  eda: "Initial exploration confirmed an uneven sentiment distribution: neutral posts dominated, with negative sentiment concentrated in specific topic clusters rather than distributed evenly. Platform comparison in EDA revealed that YouTube comments were significantly longer and more argumentative, while X posts were shorter, denser in slang, and required aggressive normalisation in the preprocessing layer.",
  featureEngineering: "Text preprocessing pipeline included: emoji conversion to text descriptors, hashtag extraction, URL/username (@) removal, and construction of a custom Indonesian slang normalisation dictionary built from observed token patterns (e.g., 'ga' -> 'tidak'). BoW and TF-IDF vectorisations were evaluated for LDA inputs; raw tokenised sequences were fed directly into IndoBERT.",
  modelDevelopment: "IndoBERT served as the core deep learning architecture for sentiment classification. For topic modelling, LDA hyperparameter tuning was conducted using Coherence Scores (C_v), where a peak value at k=8 was selected. The resulting 8 topics were projected into 2D space using a pyLDAvis layout driven by t-SNE coordinates to ensure well-segregated, non-overlapping topical clusters.",
  evaluationMetrics: "Sentiment model: Evaluated using standard classification reports (precision, recall, F1-score) alongside an analysis of the model's confidence scores across classes using Quartiles (Boxplot/Violin plots) to measure prediction certainty. Topic model: LDA Coherence Score (C_v) served as the primary quantitative metric, backed by a qualitative top-N term interpretability review.",
  visualization: "Comprehensive static and interactive charts produced in Python: Seaborn distribution charts for cross-platform sentiment, word clouds of cleaned text corpora, unigram/bigram top-term bar charts, interactive pyLDAvis t-SNE topic maps, and confidence score quartile boxplots.",
  results: "8 distinct discussion themes identified via LDA. Crucially, negative sentiment was not random; it was heavily concentrated in specific clusters involving distribution logistics, infrastructure readiness, and food safety/poisoning concerns. X and YouTube audiences showed materially different topic distributions, with X leaning toward instant infrastructure critique and YouTube housing long-form policy discourse.",
  impact: "The combined IndoBERT + LDA methodology moves analysis from a binary 'people are negative/positive' finding to a granular, topic-specific insight map. By showing *why* certain segments are dissatisfied (e.g., logistical vulnerabilities), this approach provides clear, actionable data points for public sector decision-makers and policy outreach strategies.",
  myRole: "Group project. Contributed to EDA, text preprocessing pipeline design, slang dictionary mapping, LDA coherence tuning, cross-platform comparative analysis, and building the interactive pyLDAvis visualisations.",
  keyContributions: [
    "Preprocessing pipeline design for informal Indonesian social media text including targeted slang mapping",
    "LDA implementation, hyperparameter tuning via coherence curves, and pyLDAvis t-SNE mapping",
    "Cross-platform topic and sentiment comparison analysis between X and YouTube",
    "Visualisation of sentiment confidence score quartiles and topic-sentiment intersections"
  ],
  challenges: "Indonesian social media text is highly informal — slang, abbreviations, and regional dialect variation created preprocessing complexity that required domain-specific solutions rather than standard English-optimised NLP pipelines. Determining the correct number of LDA topics (k) required iterative tuning and careful manual validation to avoid either over-merging distinct themes or over-fragmenting coherent ones.",
  lessonsLearned: "Language-specific transformer models (like IndoBERT) matter substantially more than model size for low-resource and informal-register text. The most analytically valuable output was not the overall sentiment distribution but the intersection of topic cluster and sentiment — that is where actionable policy-relevant information lives.",
  metrics: [
    { label: "Posts Analysed", value: "7,000+", context: "X (Nitter) and YouTube combined" },
    { label: "LDA Topics", value: "8", context: "Coherence-score-optimised clusters" },
    { label: "Platforms", value: "2", context: "Cross-platform comparison conducted" },
    { label: "Sentiment Classes", value: "3", context: "Positive / Negative / Neutral via IndoBERT" }
  ],
  // ... bagian atas kode project.ts tetap sama dan tidak diubah

  githubUrl: "https://github.com/24031554030-source/mbg-sentiment-analysis",

  assessment: {
    recruiterImpression: "Scale (7,000+ posts), a genuinely relevant national policy question, two distinct NLP methodologies combined, and cross-platform comparative analysis. This is the project that shows she can handle real-world unstructured data at volume — which is a daily reality in industry NLP roles.",
    technicalDifficulty: 4,
    businessValue: 5,
    researchValue: 5,
    skillsDemonstrated: ["NLP", "Text Preprocessing", "Sentiment Analysis", "Topic Modelling", "Python", "IndoBERT", "LDA", "pyLDAvis", "Pandas", "Data Visualisation", "Cross-platform Analysis"],

    // GANTI BAGIAN INI SAJA: Masukkan path foto makanan yang sudah kamu simpan di folder public/
    heroImageSuggestion: "/images/projects/mbg-hero.jpg",

    colorAccent: "#00c8f0 (cyan)",
    animationSuggestion: "Scroll-triggered node network forming, with sentiment colour codes animating in — Framer Motion staggered circles"
  }
};

/* ────────────────────────────────────────────────────────────
   #2 — COMPUTER VISION: PCD Parking Space Detection
──────────────────────────────────────────────────────────────── */
const pcdParking: ProjectData = {
  id: "pcd",
  slug: "parking-space-availability-detection",
  tier: "featured",
  category: "Computer Vision",
  accent: "cyan",
  timeline: "2026",
  type: "Academic Project",
  title: "Parking Space Availability Detection",
  tagline: "Real-time smart parking optimization utilizing Image Segmentation and Spatial Filtering.",
  heroGradient: "linear-gradient(135deg, rgba(0,200,240,0.3) 0%, rgba(74,124,247,0.22) 50%, rgba(139,92,246,0.18) 100%)",
  background: "Urban smart mobility challenges rely heavily on maximizing infrastructure utility. Manual space checks lead to traffic congestion and carbon emission spikes, requiring an automated edge-ready visual recognition paradigm.",
  objective: "To deploy an efficient computer vision solution that identifies, segments, and communicates individual lot availability from static overhead camera feeds.",
  problem: "Traditional systems depend on expensive IoT ultrasonic sensors per slot. Computer vision architectures offer a hardware-lean alternative but must withstand varying lux conditions, shadows, and perspective distortions.",
  whyItMatters: "Optimizing parking velocity slashes internal garage emissions and enhances consumer throughput, creating a scalable component for future smart-city frameworks.",
  dataset: "High-resolution multi-angle sequential parking lot image sequences capturing varying occlusion baselines and illumination variance.",
  languages: ["Python"],
  tools: ["Jupyter Notebook", "Google Colab"],
  libraries: ["OpenCV", "NumPy", "Matplotlib"],
  algorithms: ["Image Segmentation", "Spatial Filtering Techniques", "Canny Edge Detection", "Adaptive Thresholding"],
  stack: ["Python", "OpenCV", "Spatial Filtering", "Image Segmentation", "NumPy"],
  workflow: [
    { step: 1, label: "Feed Masking", detail: "Isolating precise coordinate grids representing individual lot bounds." },
    { step: 2, label: "Spatial Filtering", detail: "Applying Gaussian blurs and contrast enhancement pipelines to neutralize shadow artifacts." },
    { step: 3, label: "Segmentation", detail: "Running dynamic thresholding to isolate boundaries of parked vehicles." },
    { step: 4, label: "State Validation", detail: "Comparing real-time segment pixel densities against baseline empty slot matrix values." }
  ],
  methodology: "The system bypasses heavy deep learning compute loads by optimizing traditional image processing pipelines. By utilizing custom spatial filters alongside fine-tuned Canny kernels, it achieves structural edge isolation rapidly enough for constrained IoT environments.",
  eda: "Initial pixel value distribution analysis revealed intense variance across shadow zones, dictating the implementation of adaptive, localized threshold filters rather than global scalar operations.",
  featureEngineering: "Constructed custom spatial filters tailored to eliminate high-frequency noise from asphalt grain textures while accentuating vehicle structural boundaries.",
  evaluationMetrics: "IOU (Intersection Over Union) bounds for localized space mask segment accuracy and classification accuracy metrics for overall vacant vs. occupied tracking.",
  visualization: "Real-time bounded green/red slot overlay bounding boxes projected natively onto the source image array streams via OpenCV drawing nodes.",
  results: "Successfully architected a reliable image-based space processor capable of running localized mask pipelines smoothly, maintaining exceptional state-detection metrics across high-contrast environments.",
  impact: "Provides a zero-sensor, software-driven infrastructure mapping foundation that converts standard security camera loops into active quantitative space analytics platforms.",
  myRole: "Lead analyst and signal engineer. Built the core image segmentation logic, designed the custom spatial filtering pipelines, and integrated the link deliverables.",
  keyContributions: [
    "Engineered robust spatial filters optimizing boundary contrast on high-glare surfaces.",
    "Integrated dynamic adaptive threshold steps preventing false slot states during cloud-cover shifts.",
    "Drafted comprehensive academic reporting and Canva deck structures."
  ],
  challenges: "Overcoming extreme illumination volatility and vehicle overlap perspectives. Solved by refining isolated static space region-of-interest masks to evaluate pixels only within designated constraints.",
  lessonsLearned: "Classical computer vision processes, when calibrated accurately, can match deep learning yields on fixed camera setups with a fraction of the hardware operational costs.",
  metrics: [
    { label: "Hardware Cost", value: "0 USD", context: "Utilizes existing camera arrays without sensors" },
    { label: "Core Processing", value: "OpenCV", context: "Pure mathematical matrices" },
    { label: "Pipeline Latency", value: "Near-Zero", context: "Lightweight algorithmic execution" },
    { label: "Primary Methods", value: "2", context: "Segmentation + Spatial Filtering" }
  ],

githubUrl: "https://github.com/24031554030-source/parking-space-detection-image-processing",

  assessment: {
    recruiterImpression: "A masterclass in resource-constrained engineering. Demonstrates deep understanding of core signal and pixel physics without blindly throwing heavy neural nets at an edge-computing problem.",
    technicalDifficulty: 4,
    businessValue: 5,
    researchValue: 4,
    skillsDemonstrated: ["Computer Vision", "OpenCV", "Image Processing", "Spatial Filtering", "Python", "Problem Solving"],
    heroImageSuggestion: "Digital parking matrix grid layout shifting states dynamically from cyan to deep indigo shadows.",
    colorAccent: "#00c8f0 (cyan)",
    animationSuggestion: "Staggered line matrices illuminating geometric boundary constraints across card transitions."
  },
  links: {
    report: "https://docs.google.com/document/d/1Y03qCa21KSJffxDBBF1Rtm3psp8377jLEgwj3elKM/edit?usp=sharing",
    ppt: "https://www.canva.com/design/DAHI_Lfcn/Y/OKN3-hsn2T6injq1ITD6w/edit",
    colab: "https://colab.research.google.com/drive/1cROA32IN-ohrHCavlleqs8liMQYN0p7?usp=sharing",
    drive: "https://drive.google.com/drive/folders/1P09c72y0M6dS-atkSHrnoblij-7pRuAS?usp=sharing",
    publication: "https://docs.google.com/document/d/1ySd2Sd_Mln7Lg6WjyGrm4zZPZ02CJO_u/edit?usp=sharing"
  }
};

/* ────────────────────────────────────────────────────────────
   #3 — MACHINE LEARNING: Disaster Vulnerability Mapping
──────────────────────────────────────────────────────────────── */
const mlDisaster: ProjectData = {
  id: "ml",
  slug: "indonesia-disaster-vulnerability-mapping",
  tier: "featured",
  category: "Machine Learning",
  accent: "purple",
  timeline: "2026",
  type: "Academic Project",
  title: "Indonesia Disaster Vulnerability Mapping",
  tagline: "A Spatial Ensemble Machine Learning Approach for Multi-Source Risk Prediction.",
  heroGradient: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(74,124,247,0.22) 50%, rgba(0,200,240,0.15) 100%)",
  background: "Indonesia's position on the Ring of Fire subjects its vast provinces to highly non-linear environmental risks. Standard reactive mitigation strategies fall short, mandating a cross-disciplinary, multi-source spatial forecasting architecture.",
  objective: "To construct a predictive ensemble machine learning architecture capable of classifying regional risk vectors across Indonesian provinces using heterogeneous environmental datasets.",
  problem: "Integrating historical geo-hazard logs with modern climatic variables creates massive multi-collinearity and scaling imbalances that break traditional linear regression metrics.",
  whyItMatters: "Enables regional governance and non-governmental actors to proactively allocate limited medical, logistical, and monetary resources prior to seasonal catastrophic windows.",
  dataset: "Multi-source regional geospatial data featuring historic seismic arrays, meteorological records, topographic classifications, and population density weights.",
  languages: ["Python"],
  tools: ["Jupyter Notebook", "Google Drive Assets"],
  libraries: ["Scikit-learn", "Pandas", "NumPy", "Geopandas", "Seaborn"],
  algorithms: ["Ensemble Learning", "Random Forest Regressor", "Gradient Boosting Models", "Spatial Clustering"],
  stack: ["Python", "Scikit-learn", "Spatial Ensembles", "Pandas", "Geospatial Analysis"],
  workflow: [
    { step: 1, label: "Data Integration", detail: "Merging disparate atmospheric, tectonic, and demographic vectors into a single geospatial data framework." },
    { step: 2, label: "Spatial Resampling", detail: "Addressing intense regional class imbalances using localized spatial stratified cross-validation." },
    { step: 3, label: "Ensemble Pipeline", detail: "Training tree-based ensemble estimators to extract non-linear risk interactions." },
    { step: 4, label: "Risk Mapping", detail: "Projecting probability metrics into clear regional vulnerability categories." }
  ],
  methodology: "Leverages tree-based ensemble models engineered specifically to navigate complex multi-source anomalies. By combining Gradient Boosting vectors with robust Random Forest pipelines, the model structures robust regional risk indices without suffering from over-fitting.",
  eda: "Revealed extreme feature variances and geographic outliers, confirming that traditional uniform scaling would compromise micro-regional predictive metrics.",
  featureEngineering: "Derived interaction matrices combining population density markers directly with proximity indices to active tectonic faults, building high-value risk signals.",
  evaluationMetrics: "Root Mean Squared Error (RMSE) across continuous danger metrics, validation F1 indices for tiered risk mapping, and Out-Of-Bag (OOB) error margins.",
  visualization: "Comprehensive provincial choropleth risk visualizations alongside intricate feature importance matrices mapped natively using Python visualization libraries.",
  results: "Successfully engineered a unified spatial ensemble model establishing verified multi-source prediction markers, identifying critical latent hazard vectors across the archipelago.",
  impact: "Establishes an automated, high-fidelity quantitative risk modeling blueprint that transforms raw scattered logs into actionable institutional protection roadmaps.",
  myRole: "Data Architect and Machine Learning Engineer. Led data integration, engineered the spatial features, tuned the ensemble parameters, and verified project document links.",
  keyContributions: [
    "Successfully normalized and merged heterogeneous multi-source spatial arrays.",
    "Optimized ensemble pipelines mitigating structural variance across limited regional feature records.",
    "Constructed clear project slides and accessible remote archive directories."
  ],
  challenges: "Resolving extreme variations in structural reporting standards across disparate government entities. Addressed through rigorous data imputation and standardization filters.",
  lessonsLearned: "Ensemble learning approaches excel dramatically at handling environmental data because they natively counter the structural instability of highly diverse natural systems.",
  metrics: [
    { label: "Data Sources", value: "Multi-Source", context: "Meteorological, Seismic, and Social logs" },
    { label: "Model Class", value: "Ensemble", context: "Tree-based multi-tier estimators" },
    { label: "Target Scope", value: "National", context: "All Indonesian administrative provinces" },
    { label: "Framework", value: "Scikit-Learn", context: "Optimized predictive pipelines" }
  ],

githubUrl: "https://github.com/24031554030-source/indonesia-disaster-vulnerability-prediction",

  assessment: {
    recruiterImpression: "A highly sophisticated machine learning workflow that addresses an urgent, large-scale socio-economic problem. The capability to synthesize messy environmental metrics signals institutional maturity.",
    technicalDifficulty: 4,
    businessValue: 5,
    researchValue: 5,
    skillsDemonstrated: ["Machine Learning", "Ensemble Methods", "Spatial Modeling", "Python", "Pandas", "Data Wrangling"],
    heroImageSuggestion: "Archipelago silhouette illuminated by structural neon heat mappings tracking predictive variance vectors.",
    colorAccent: "#8b5cf6 (purple)",
    animationSuggestion: "Dynamic heatmap densities expanding outwards via staggered Framer Motion vector paths."
  },
  links: {
    report: "https://docs.google.com/document/d/1tl0Aay68hEOneN-SUgUbxlYY-9vQ1qXTqKJ3BbsUo8/edit?usp=sharing",
    ppt: "https://www.canva.com/design/DAHLN1tFM/vKpMdaaVpHrF8FfQ1e3Kvg/edit",
    drive: "https://drive.google.com/drive/folders/1Md6J-XTCmODuWomU4lmH9n9-b8XFYVKg?usp=sharing",
    assetDrive: "https://drive.google.com/drive/folders/1wI3VEfTik3YPuXyhlG9mTk-gb6Aqla052?usp=sharing"
  }
};

/* ────────────────────────────────────────────────────────────
   #4 — DATA MINING: StuntGraph Analysis
──────────────────────────────────────────────────────────────── */
const dmStuntGraph: ProjectData = {
  id: "dm",
  slug: "stuntgraph-analysis",
  tier: "featured",
  category: "Data Mining",
  accent: "aurora",
  timeline: "2026",
  type: "Academic Project",
  title: "StuntGraph Analysis",
  tagline: "Graph-Based Spatio-Temporal Analysis of Socioeconomic Factors Affecting Stunting Prevalence.",
  heroGradient: "linear-gradient(135deg, rgba(240,98,146,0.28) 0%, rgba(139,92,246,0.22) 50%, rgba(74,124,247,0.18) 100%)",
  background: "Child development diagnostics require tracking intricate socio-economic webs. Stunting indicators are heavily influenced by overlapping regional realities, meaning traditional independent analysis fails to isolate root systemic causes.",
  objective: "To model public health dynamics through an integrated graph-based architecture combined with PCA reduction and Multiple Linear Regression (MLR).",
  problem: "Socioeconomic data profiles contain extensive collinearity and noise. Isolating genuine regional risk similarities requires advanced community detection alongside dimensional isolation.",
  whyItMatters: "Reveals the structural dependencies behind health metrics, allowing public health agencies to deploy structural adjustments to clusters of provinces simultaneously.",
  dataset: "Multi-year provincial socioeconomic indicators, health facility accessibility tables, and national stunting percentage registries.",
  languages: ["Python"],
  tools: ["Google Colab", "Claude Workflow Interface"],
  libraries: ["NetworkX", "Scikit-learn", "Pandas", "Statsmodels", "Matplotlib"],
  algorithms: ["Principal Component Analysis (PCA)", "Multiple Linear Regression (MLR)", "Community Detection", "Spatio-Temporal Graphing"],
  stack: ["Python", "NetworkX", "PCA", "Regression Modeling", "Graph Analytics"],
  workflow: [
    { step: 1, label: "PCA Filtering", detail: "Compressing dense socioeconomic features into principal uncorrelated components." },
    { step: 2, label: "Graph Construction", detail: "Building structural network nodes linking provinces based on mathematical feature similarity." },
    { step: 3, label: "Community Isolation", detail: "Running community detection algorithms to map regional health vulnerability clusters." },
    { step: 4, label: "Regression Analysis", detail: "Applying MLR pipelines across derived graph networks to extract causal weights." }
  ],
  methodology: "Blends traditional statistical rigor with modern network science. PCA isolates the cleanest underlying variance profiles, MLR establishes verified statistical significance, and NetworkX community detection maps how these metrics geographically interconnect.",
  eda: "Revealed intense variance grouping structures, confirming that structural health problems across disparate provinces frequently shared identical underlying socioeconomic vectors.",
  featureEngineering: "Transformed multi-dimensional provincial vectors into compressed principal component coordinates, mapping these into relational proximity edge values.",
  evaluationMetrics: "Modularity index scores for community separation, Adjusted $R^2$ regression metrics, and $p$-value verification for variable significance thresholds.",
  visualization: "Intricate topological network graph visualizations plotting community classifications alongside targeted linear trend alignments.",
  results: "Successfully isolated hidden socioeconomic clusters showing distinct stunting risk profiles, establishing actionable graph analytics for healthcare intelligence.",
  impact: "Pioneers the application of graph database logic to national health diagnostics, changing how multi-source public tables are evaluated for intervention planning.",
  myRole: "Network Analyst and Statistician. Managed the graph construction, executed PCA components, developed the MLR engine, and shared the complete design flow.",
  keyContributions: [
    "Integrated PCA pipelines reducing data dimensionality without dropping critical variance.",
    "Built dynamic spatial network graphs tracing latent provincial health linkages.",
    "Documented detailed workflow architectures and digital research output boards."
  ],
  challenges: "Managing high correlation profiles across local datasets. Resolved by utilizing PCA to distill clean, entirely orthogonal factors prior to regression modeling.",
  lessonsLearned: "Socioeconomic health impacts rarely respect administrative borders. Graph-based networks uncover natural geographic risk groupings that standard spreadsheets completely hide.",
  metrics: [
    { label: "Data Pipeline", value: "PCA + MLR", context: "Dimensional reduction + modeling" },
    { label: "Network Library", value: "NetworkX", context: "Graph topology orchestration" },
    { label: "Key Insights", value: "Communities", context: "Latent provincial risk groupings" },
    { label: "Analysis Mode", value: "Spatio-Temporal", context: "Multi-year structural evaluation" }
  ],

  githubUrl: "https://github.com/24031554030-source/stuntgraph-spatio-temporal-analysis",

  assessment: {
    recruiterImpression: "Brilliant combination of traditional statistical tracking with modern network analysis. Shows an exceptional capability to extract structural patterns out of highly convoluted datasets.",
    technicalDifficulty: 5,
    businessValue: 4,
    researchValue: 5,
    skillsDemonstrated: ["Data Mining", "Graph Networks", "PCA", "Statistical Modeling", "Python", "NetworkX"],
    heroImageSuggestion: "Network topology chart glowing with vibrant pink community clusters against a dark matte space.",
    colorAccent: "#ff8fb1 (aurora)",
    animationSuggestion: "Nodes connecting via faint glowing links shifting into clear geometric sub-clusters dynamically."
  },
  links: {
    report: "https://docs.google.com/document/d/1FjtUasiwaaaequ7aLAPbCwJ0018_LGQu4ILnzW138/edit?usp=sharing",
    colab: "https://colab.research.google.com/drive/102wd2ETkcqVPDUCzJgeteln41YWQqrho?usp=sharing",
    workflow: "https://claude.ai/share/abcb7bcf-76af-482c-be2a-008e43c1d3b0",
    poster: "https://canva.link/vr3v502uqtm9ht9"
  }
};

/* ────────────────────────────────────────────────────────────
   #5 — DATA WAREHOUSE: Energy-Economy Nexus Analyzing
──────────────────────────────────────────────────────────────── */
const dwEnergy: ProjectData = {
  id: "dw",
  slug: "energy-economy-nexus-analyzing",
  tier: "featured",
  category: "Data Warehouse",
  accent: "blue",
  timeline: "2026",
  type: "Academic Project",
  title: "Energy-Economy Nexus Analyzing",
  tagline: "Analyzing the Co-Movement of U.S. Electricity Price Shocks and Global Macroeconomic Indicators.",
  heroGradient: "linear-gradient(135deg, rgba(74,124,247,0.3) 0%, rgba(139,92,246,0.22) 50%, rgba(0,200,240,0.15) 100%)",
  background: "Globalized trade systems tie local utility costs directly to international macroeconomic stability. Evaluating the ripple effects of price shocks across modern volatility windows requires a structured, multi-tier analysis framework.",
  objective: "To track, store, and analyze the co-movement pattern profiles connecting U.S. power market pricing structures with international financial indices.",
  problem: "Macroeconomic data operates across diverse reporting frequencies and system structures, creating synchronization lags during global market volatility.",
  whyItMatters: "Enables portfolio analysts and energy managers to anticipate systemic asset risk dependencies triggered by regional energy infrastructure strain.",
  dataset: "U.S. industrial and commercial electricity pricing historical logs combined with global macroeconomic market index feeds.",
  languages: ["SQL", "Python"],
  tools: ["Data Warehouse Systems", "Google Docs Framework"],
  libraries: ["Pandas", "NumPy", "Matplotlib"],
  algorithms: ["Co-Movement Analysis", "Time-Series Synchronization", "Volatility Mapping"],
  stack: ["SQL", "Python", "Data Warehousing", "Time-Series Analysis", "Financial Intelligence"],
  workflow: [
    { step: 1, label: "Data Ingestion", detail: "Aggregating historical utility price matrices alongside macro index logs." },
    { step: 2, label: "Alignment", detail: "Synchronizing diverse reporting schedules into unified temporal baselines." },
    { step: 3, label: "Nexus Processing", detail: "Executing co-movement calculations across historic volatility intervals." },
    { step: 4, label: "Insight Projection", detail: "Structuring strategic analytical documentation for risk assessment." }
  ],
  methodology: "Deploys systematic data warehousing paradigms to clean, architecture, and query complex economic intervals. Employs optimized time-series synchronization logic to isolate clean correlation signals during high-volatility trading periods.",
  eda: "Identified deep alignment variations across seasonal market curves, pointing out crucial structural anomalies within global economic interaction logs.",
  featureEngineering: "Created custom time-indexed rolling correlation factors engineered to accurately map structural shocks across international economic borders.",
  evaluationMetrics: "Temporal correlation strength coefficients, query processing efficiency indices, and descriptive database integrity baselines.",
  visualization: "Comprehensive financial trend lines plotting cross-market interaction metrics across clear historical volatility eras.",
  results: "Successfully isolated verified market co-movement behaviors, delivering highly organized intelligence detailing how local energy shocks influence broad trade indices.",
  impact: "Demonstrates an exceptional ability to establish clean structural reporting frameworks out of disparate financial and utility market indices.",
  myRole: "Database Architect and Macro Analyst. Engineered the data warehousing pipelines, processed the temporal synchronization, and compiled the analytical resources.",
  keyContributions: [
    "Designed systematic data warehousing strategies for multi-market indexing.",
    "Processed clean financial co-movement metrics across highly volatile years.",
    "Developed comprehensive project documentation boards and Canva presentations."
  ],
  challenges: "Managing massive structural recording imbalances across global financial trackers. Solved through targeted temporal interpolation and clean data grouping rules.",
  lessonsLearned: "Solid, dependable data engineering pipelines and clean warehousing configurations are absolutely paramount before any complex predictive modeling can occur.",
  metrics: [
    { label: "Core Scope", value: "Global", context: "U.S. Energy vs. Global Markets" },
    { label: "Target Era", value: "2022-2024", context: "High macroeconomic volatility" },
    { label: "Primary Stack", value: "SQL + Python", context: "Warehousing + Analytics" },
    { label: "Analysis Focus", value: "Co-Movement", context: "Macroeconomic nexus tracking" }
  ],

  githubUrl: "https://github.com/24031554030-source/energy-economy-nexus-analysis",

  assessment: {
    recruiterImpression: "A highly practical demonstration of core data warehousing principles. Shows clear proficiency in orchestrating tidy data foundations across complex market categories.",
    technicalDifficulty: 3,
    businessValue: 4,
    researchValue: 4,
    skillsDemonstrated: ["Data Warehousing", "SQL", "Time-Series Alignment", "Financial Analytics", "Python", "Data Architecture"],
    heroImageSuggestion: "Sleek data pipelines flowing into structured data blocks glowing in deep sapphire accents.",
    colorAccent: "#4a7cf7 (blue)",
    animationSuggestion: "Linear data stream bars sliding smoothly into organized matrix structures upon scrolling."
  },
  links: {
    report: "https://docs.google.com/document/d/1ixafW9BT27XUo7OyjRo0FH9p6AeOgfmu1Y7h7-uGE/edit?usp=sharing",
    material: "https://docs.google.com/document/d/1Ilfef7UMQQrLocm64WmjlRd-26NXdzK/edit?usp=sharing",
    canva: "https://canva.link/13e4gv7fvu0cy7c"
  }
};

/* ────────────────────────────────────────────────────────────
   EXPORT ARRAYS AND CONFIGURATIONS
   ───────────────────────────────────────────────────────────────
   Maintains interface integrity for Projects.tsx & components.
═══════════════════════════════════════════════════════════════ */

// SEMUA PROJECT MASUK KE SATU LIST UTAMA
export const PROJECTS: ProjectData[] = [
  mbgSentiment,
  pcdParking,
  mlDisaster,
  dmStuntGraph,
  dwEnergy
];

export const DISPLAY_CATEGORIES: ProjectCategory[] = [
  "NLP",
  "Computer Vision",
  "Machine Learning",
  "Data Mining",
  "Data Warehouse"
];

// Supaya tidak merusak import di halaman lain yang memanggil FEATURED_PROJECTS, 
// kita langsung arahkan variabel ini ke list utama PROJECTS.
export const FEATURED_PROJECTS = PROJECTS;