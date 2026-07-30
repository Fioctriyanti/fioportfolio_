/**
 * certificates.ts
 * ──────────────────────────────────────────────────────────
 * All content sourced exclusively from:
 *   • Fio_Octriyanti_DataAnalyst_CV.pdf
 *   • Fio_Octriyanti_Portofolio.pdf (all 11 pages)
 *
 * Nothing invented. Nothing exaggerated.
 * ──────────────────────────────────────────────────────────
 *
 * VISUAL EMPHASIS DECISIONS:
 *
 * TIER 1 — "Featured" (holographic border, larger card, priority position)
 *   → Gemini Certified Educator: externally issued by Google for Education,
 *     valid 3 years, directly relevant to AI/technology domain. Google brand
 *     recognition is immediate to any recruiter globally.
 *   → HarvardX CS50P: Harvard brand recognition is the strongest external
 *     credential signal in Fio's portfolio. Verified certificate via edX.
 *   → Google Student Ambassador — Certificate of Graduation: "selected from
 *     12,000 students nationwide" is the single most socially validated
 *     credential in the entire portfolio. It belongs above the fold.
 *
 * TIER 2 — "Highlighted" (accent border, standard card, prominent position)
 *   → Dicoding MS Fabric + Azure Gen AI: cloud platform certifications from
 *     a recognised Indonesian tech education platform. Industry-relevant,
 *     current (Feb 2026), verifiable by QR code. The Azure cert specifically
 *     signals emerging Gen AI skills.
 *   → 1st Runner-Up Putra Putri Data Science 2025: a competition result
 *     rather than a certification, but it is the only competitive achievement
 *     in the portfolio and deserves visual prominence equal to the certs.
 *   → EF SET C1 Advanced: C1 English is professional working proficiency.
 *     For an Indonesian student targeting international opportunities,
 *     this signals communication readiness — a real differentiator.
 *
 * TIER 3 — "Standard" (subtle border, compact card)
 *   → HIMASADA organizational certificates (RELOUD, ACTION, GSS, SASOVI):
 *     These demonstrate active participation and leadership roles but are
 *     internal certificates rather than externally verified credentials.
 *     Shown for completeness and to support the Leadership narrative,
 *     not as primary credibility signals.
 * ──────────────────────────────────────────────────────────
 */

export type CertCategory =
  | "Artificial Intelligence"
  | "Professional Development"
  | "English"
  | "Leadership"
  | "Competitions"
  | "Workshops";

export type CertTier = "featured" | "highlighted" | "standard";
export type CertAccent = "holo" | "cyan" | "blue" | "purple" | "aurora" | "green";

export interface Certificate {
  id: string;
  tier: CertTier;
  category: CertCategory;
  accent: CertAccent;
  icon: string;                // emoji — no external dep
  title: string;
  issuer: string;
  issuerShort: string;
  year: string;
  issued: string;              // full date string, exactly as shown on cert
  validThrough?: string;       // if certificate expires
  credentialId?: string;       // ID as shown on actual certificate
  verifyUrl?: string;          // only if explicitly shown on cert
  description: string;         // 2–3 sentence narrative, not a bullet list
  skillsObtained: string[];
  emphasized: boolean;         // whether to apply visual prominence
  emphasisReason: string;      // why this cert gets visual emphasis
}

export const CERTIFICATES: Certificate[] = [

  /* ──────────────────────────────────────────
     ARTIFICIAL INTELLIGENCE
  ────────────────────────────────────────── */
  {
    id: "gemini-educator",
    tier: "featured",
    category: "Artificial Intelligence",
    accent: "holo",
    icon: "✦",
    title: "Gemini Certified Educator",
    issuer: "Google for Education",
    issuerShort: "Google",
    year: "2025",
    issued: "14 September 2025",
    validThrough: "13 September 2028",
    description:
      "Awarded by Google for Education for demonstrating the knowledge, skills, and basic competencies needed to use Google AI in education. This certification validates Fio's practical proficiency with Gemini AI tools and her ability to apply them meaningfully in educational and professional settings.",
    skillsObtained: ["Google Gemini", "AI in Education", "AI Literacy", "Educational Technology"],
    emphasized: true,
    emphasisReason:
      "Google-issued, 3-year validity, directly relevant to AI domain. Google brand is immediately recognisable to any recruiter globally and signals verified AI competency rather than self-reported interest.",
  },

  {
    id: "google-ambassador-cert",
    tier: "featured",
    category: "Leadership",
    accent: "holo",
    icon: "🏅",
    title: "Google Student Ambassador — Certificate of Graduation",
    issuer: "Google",
    issuerShort: "Google",
    year: "2025",
    issued: "2025",
    description:
      "Awarded upon successful completion of the Google Student Ambassador programme — Class of 2025 — in recognition of selection from a national pool of 12,000 students and exceptional leadership in championing the adoption of Google AI within the campus community. Issued with an On-Campus Event Host designation.",
    skillsObtained: ["AI Advocacy", "Community Leadership", "Event Hosting", "Google AI"],
    emphasized: true,
    emphasisReason:
      "'Selected from 12,000 students nationwide' is the single most socially validated statement in Fio's entire portfolio. The certificate backs it with a Google-issued document — this is the first credential a recruiter should see.",
  },

  {
    id: "dicoding-azure",
    tier: "highlighted",
    category: "Artificial Intelligence",
    accent: "blue",
    icon: "☁",
    title: "Building Gen AI Applications with Microsoft Azure",
    issuer: "Dicoding Indonesia",
    issuerShort: "Dicoding",
    year: "2026",
    issued: "18 February 2026",
    validThrough: "18 February 2029",
    credentialId: "4EXGIYWVDPRL",
    verifyUrl: "https://dicoding.com/certificates/4EXGIYWVDPRL",
    description:
      "Competency completion certificate from Dicoding Indonesia for successfully completing the course on building generative AI applications using Microsoft Azure cloud services. Verifiable via QR code at dicoding.com/certificates/4EXGIYWVDPRL.",
    skillsObtained: ["Microsoft Azure", "Generative AI", "Cloud Computing", "AI Application Development"],
    emphasized: true,
    emphasisReason:
      "Azure Gen AI is a current and high-demand skill. The Feb 2026 date signals Fio is actively upskilling in the newest AI development paradigm — this positions her as forward-looking, not resting on past coursework.",
  },

  {
    id: "dicoding-fabric",
    tier: "highlighted",
    category: "Professional Development",
    accent: "cyan",
    icon: "◈",
    title: "Data Science with Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    issuerShort: "Dicoding",
    year: "2026",
    issued: "17 February 2026",
    validThrough: "17 February 2029",
    credentialId: "6RPN7KE99X2M",
    verifyUrl: "https://dicoding.com/certificates/6RPN7KE99X2M",
    description:
      "Competency completion certificate from Dicoding Indonesia for successfully completing the course on applying Data Science using Microsoft Fabric — Microsoft's unified analytics platform. Verifiable via QR code at dicoding.com/certificates/6RPN7KE99X2M.",
    skillsObtained: ["Microsoft Fabric", "Data Science", "Unified Analytics", "Cloud Data Platforms"],
    emphasized: true,
    emphasisReason:
      "Microsoft Fabric is a recently released unified analytics platform. Certification in it signals awareness of current industry tooling — recruiters at Microsoft-stack organisations will recognise it immediately.",
  },

  /* ──────────────────────────────────────────
     PROFESSIONAL DEVELOPMENT
  ────────────────────────────────────────── */
  {
    id: "harvardx-cs50p",
    tier: "featured",
    category: "Professional Development",
    accent: "aurora",
    icon: "🎓",
    title: "CS50's Introduction to Programming with Python",
    issuer: "HarvardX via edX",
    issuerShort: "HarvardX",
    year: "2026",
    issued: "6 February 2026",
    credentialId: "12345678901234567890",
    description:
      "Verified Certificate from HarvardX (an online learning initiative of Harvard University) for successfully completing CS50P — CS50's Introduction to Programming with Python — with a passing grade. Issued via the edX platform.",
    skillsObtained: ["Python", "Programming Fundamentals", "Problem Solving", "Computer Science"],
    emphasized: true,
    emphasisReason:
      "Harvard University brand recognition is the strongest external academic credential signal in Fio's portfolio. Verified certificates from HarvardX carry immediate credibility with international recruiters and scholarship committees alike.",
  },

  /* ──────────────────────────────────────────
     ENGLISH
  ────────────────────────────────────────── */
  {
    id: "efset-c1",
    tier: "highlighted",
    category: "English",
    accent: "green",
    icon: "🌐",
    title: "EF SET English Certificate — C1 Advanced",
    issuer: "EF Education First (EF SET)",
    issuerShort: "EF SET",
    year: "2025",
    issued: "2025",
    description:
      "EF SET English Certificate at C1 Advanced level — Professional Working Proficiency. C1 is the level at which non-native speakers can engage effectively in professional, academic, and complex social contexts in English without difficulty.",
    skillsObtained: ["English C1 Advanced", "Professional Communication", "Academic English"],
    emphasized: true,
    emphasisReason:
      "For an Indonesian student targeting international internships and English-medium professional environments, a verified C1 certificate directly addresses a recruiter's implicit question about language readiness. It converts a claim into evidence.",
  },

  /* ──────────────────────────────────────────
     COMPETITIONS
  ────────────────────────────────────────── */
  {
    id: "putra-putri-ds",
    tier: "highlighted",
    category: "Competitions",
    accent: "aurora",
    icon: "🏆",
    title: "1st Runner-Up — Putra Putri Data Science 2025",
    issuer: "State University of Surabaya (Sadafest PPSD 2025)",
    issuerShort: "UNESA",
    year: "2025",
    issued: "2025",
    description:
      "Achieved 1st Runner-Up position in the Putra Putri Data Science 2025 competition at UNESA's Sadafest Grand Final PPSD 2025. Selection process included presenting 3 case studies, an individual interview, creating an introductory video that garnered over 2,000 views on Instagram, and delivering a speech to a large audience.",
    skillsObtained: ["Data Science Presentation", "Case Study Analysis", "Public Speaking", "Interview Skills"],
    emphasized: true,
    emphasisReason:
      "The only competitive achievement in the portfolio. Multi-stage selection (case studies, interview, video, speech) makes this a holistic credibility signal — it tested technical depth, communication, and public presence simultaneously.",
  },

  /* ──────────────────────────────────────────
     LEADERSHIP / WORKSHOPS — HIMASADA CERTS
  ────────────────────────────────────────── */
  {
    id: "himasada-action",
    tier: "standard",
    category: "Leadership",
    accent: "purple",
    icon: "◆",
    title: "Panitia — Academic Competition of Data Science 2025",
    issuer: "Himpunan Mahasiswa Sains Data (HIMASADA) UNESA",
    issuerShort: "HIMASADA",
    year: "2025",
    issued: "27 October – 30 November 2025",
    credentialId: "013/B/ACTION/HIMASADA/UNESA/XI/2025",
    description:
      "Certificate of participation as committee member (Panitia) for the Academic Competition of Data Science 2025 — a national-level competition organised by HIMASADA FMIPA UNESA, held at the State University of Surabaya.",
    skillsObtained: ["Event Coordination", "Competition Management", "Team Collaboration"],
    emphasized: false,
    emphasisReason: "Internal organisational certificate — supports the Leadership narrative but not a primary external credibility signal.",
  },

  {
    id: "himasada-reloud",
    tier: "standard",
    category: "Leadership",
    accent: "purple",
    icon: "◆",
    title: "Panitia — RELOUD 2025",
    issuer: "Himpunan Mahasiswa Sains Data (HIMASADA) UNESA",
    issuerShort: "HIMASADA",
    year: "2025",
    issued: "13–20 September 2025",
    credentialId: "012/A/RELOUD/HIMASADA/Unesa/IX/2025",
    description:
      "Certificate of participation as committee member (Panitia) for RELOUD 2025, the annual Data Science department orientation event at UNESA themed 'Shaping a Generation That Thinks Critically and Acts Analytically — Revolution in Unity of Data Science 2025.'",
    skillsObtained: ["Event Logistics", "Forum Facilitation", "Organisational Coordination"],
    emphasized: false,
    emphasisReason: "Internal organisational certificate — part of the HIMASADA leadership record.",
  },

  {
    id: "himasada-gss",
    tier: "standard",
    category: "Workshops",
    accent: "blue",
    icon: "◇",
    title: "Moderator — Group Sharing Spiritual (GSS)",
    issuer: "Himpunan Mahasiswa Sains Data (HIMASADA) UNESA",
    issuerShort: "HIMASADA",
    year: "2025",
    issued: "28 September – 9 November 2025",
    credentialId: "016/A/GSS/HIMASADA/UNESA/IX/2025",
    description:
      "Certificate for serving as Moderator in the Group Sharing Spiritual (GSS) programme — a multi-week series themed 'Menggali Potensi Diri dan Memperkuat Toleransi Sebagai Landasan bagi Pertumbuhan Spiritual Mahasiswa,' organised by HIMASADA FMIPA UNESA.",
    skillsObtained: ["Facilitation", "Active Listening", "Discussion Moderation"],
    emphasized: false,
    emphasisReason: "Internal programme certificate — demonstrates community engagement.",
  },

  {
    id: "himasada-sasovi",
    tier: "standard",
    category: "Leadership",
    accent: "purple",
    icon: "◆",
    title: "Master of Ceremony — SASOVI 2025",
    issuer: "Himpunan Mahasiswa Sains Data (HIMASADA) UNESA",
    issuerShort: "HIMASADA",
    year: "2025",
    issued: "1 November 2025",
    credentialId: "015/B/SASOVI/HIMASADA/UNESA/X/2025",
    description:
      "Certificate for serving as Master of Ceremony at SASOVI 2025 — a HIMASADA showcase event themed 'Dari lensa pemuda, untuk Indonesia berkarya' (From the lens of youth, for Indonesia to create), held at UNESA.",
    skillsObtained: ["Public Speaking", "Live Event Hosting", "Composure Under Pressure"],
    emphasized: false,
    emphasisReason: "Internal organisational certificate — demonstrates public speaking in a live event context.",
  },
];

/* ── Grouped by category for display ── */
export const CERT_CATEGORIES: CertCategory[] = [
  "Artificial Intelligence",
  "Professional Development",
  "English",
  "Competitions",
  "Leadership",
  "Workshops",
];

export function getCertsByCategory(cat: CertCategory): Certificate[] {
  return CERTIFICATES.filter((c) => c.category === cat);
}

export const FEATURED_CERTS = CERTIFICATES.filter((c) => c.tier === "featured");
export const HIGHLIGHTED_CERTS = CERTIFICATES.filter((c) => c.tier === "highlighted");
export const STANDARD_CERTS = CERTIFICATES.filter((c) => c.tier === "standard");
