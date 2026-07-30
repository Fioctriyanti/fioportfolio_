/**
 * organizations.ts
 * ──────────────────────────────────────────────────────────
 * All content sourced exclusively from:
 *   • Fio_Octriyanti_DataAnalyst_CV.pdf
 *   • Fio_Octriyanti_Portofolio.pdf
 * Nothing invented. Nothing exaggerated.
 * ──────────────────────────────────────────────────────────
 */

export type OrgAccent = "holo" | "purple" | "blue";

export interface OrgRole {
  id: string;
  title: string;
  event?: string;
  duration: string;
  story: string;
  highlights: string[];
  skillsDeveloped: string[];
}

export interface Organization {
  id: string;
  accent: OrgAccent;
  tier: "featured" | "standard";
  name: string;
  shortName: string;
  duration: string;
  tagline: string;
  mission: string;
  roles: OrgRole[];
  totalRoles: number;
  icon: string;
  leadershipType: string;
  impact: string;
}

export const ORGANIZATIONS: Organization[] = [
  {
    id: "google",
    accent: "holo",
    tier: "featured",
    name: "Google Gemini Indonesia",
    shortName: "Google",
    duration: "2025 – 2026",
    tagline: "Championing AI literacy across campus communities.",
    icon: "✦",
    leadershipType: "Advocacy & Education",
    mission:
      "Google's Student Ambassador programme places selected students as bridges between Google's AI tools and their campus communities — not as brand representatives, but as educators and advocates for responsible AI adoption in student life.",
    impact:
      "Being selected from a national pool of 12,000 applicants was not the work — it was the starting point. The actual work was translating Google AI products into educational experiences that made sense to students across different backgrounds and technical comfort levels. Organising workshops, facilitating technology-sharing sessions, and navigating the communication between students and institutional stakeholders built skills that cannot be acquired in a classroom: reading a room, adjusting a message mid-session, and making complex technology feel accessible.",
    roles: [
      {
        id: "google-ambassador",
        title: "Google Student Ambassador",
        duration: "2025 – 2026",
        story:
          "Selected from 12,000 applicants nationwide for the Google Gemini Indonesia Student Ambassador programme — Class of 2025. Represented Google Gemini Indonesia by promoting AI literacy, digital innovation, and Google technologies within the university community. Organised educational events, workshops, and technology-sharing sessions, strengthening leadership, public speaking, and stakeholder communication skills.",
        highlights: [
          "Selected from a national pool of 12,000 applicants",
          "Organised on-campus educational events and AI technology-sharing sessions",
          "Championed adoption of Google AI tools within the university community",
        ],
        skillsDeveloped: ["Public Speaking", "AI Literacy Advocacy", "Event Organisation", "Stakeholder Communication", "Leadership"],
      },
    ],
    totalRoles: 1,
  },
  {
    id: "unesa",
    accent: "blue",
    tier: "standard",
    name: "State University of Surabaya",
    shortName: "UNESA",
    duration: "2025",
    tagline: "Guiding incoming students through their first days at university.",
    icon: "🎓",
    leadershipType: "Mentoring",
    mission:
      "ORIGAMIPA is the faculty orientation programme at UNESA's Faculty of Mathematics and Natural Sciences, introducing incoming students to campus life, academic expectations, and peer communities during their earliest — and often most disorienting — days at university.",
    impact:
      "Mentoring is a different kind of leadership than organising or coordinating. It requires patience over performance — being present when students are confused, providing guidance without providing answers, and building enough trust that new students feel comfortable asking questions they might otherwise suppress. The ORIGAMIPA coaching role developed a sensitivity to different learning paces and communication styles that now shapes how I explain analytical concepts to non-technical audiences.",
    roles: [
      {
        id: "origamipa-coach",
        title: "Coach",
        event: "ORIGAMIPA — Student Orientation Program",
        duration: "2025",
        story:
          "Guided and mentored new students throughout the university's faculty orientation programme. Facilitated group activities, provided academic support, and collaborated with committees to ensure smooth event execution. Developed leadership, teamwork, and communication skills through direct mentoring of incoming Data Science students during their first days at UNESA.",
        highlights: [
          "Mentored incoming students during the 4-day faculty orientation programme",
          "Facilitated group activities and provided individual academic support",
          "Collaborated with orientation committees for smooth programme execution",
        ],
        skillsDeveloped: ["Mentoring", "Group Facilitation", "Teamwork", "Patience", "Academic Communication"],
      },
    ],
    totalRoles: 1,
  },
  {
    id: "himasada",
    accent: "purple",
    tier: "standard",
    name: "Himpunan Mahasiswa Sains Data",
    shortName: "HIMASADA",
    duration: "2025",
    tagline: "Four roles. Three events. One student association shaped by data.",
    icon: "◈",
    leadershipType: "Operations, Communications & Performance",
    mission:
      "HIMASADA (Himpunan Mahasiswa Sains Data) is the Data Science student association at UNESA's Faculty of Mathematics and Natural Sciences, organising academic competitions, department orientations, spiritual development programmes, and cultural showcases for the Data Science student community.",
    impact:
      "Four different roles in HIMASADA across one year revealed something that project work alone cannot: that collaboration is not a soft skill — it is a technical one. Coordinating logistics for RELOUD, managing internal and external communications for ACTION, moderating GSS, and performing as Master of Ceremony at SASOVI each required a different communication register. Moving between these modes in the same year built adaptability that now shapes how I approach multi-stakeholder environments in analytical work.",
    roles: [
      {
        id: "reloud",
        title: "Event Division Staff",
        event: "RELOUD 2025",
        duration: "September 2025",
        story:
          "Coordinated event logistics and facilitated Forum Group Discussion (FGD) sessions during RELOUD 2025 — the annual Data Science department orientation event. Worked closely with organising committees to ensure efficient event implementation while enhancing project coordination and collaborative problem-solving abilities.",
        highlights: [
          "Coordinated logistics and FGD sessions for the department orientation programme",
          "Collaborated across multiple organising committees for event implementation",
          "Theme: 'Revolution in Unity of Data Science 2025' (13–20 September 2025)",
        ],
        skillsDeveloped: ["Event Logistics", "Forum Facilitation", "Committee Coordination", "Problem Solving"],
      },
      {
        id: "action",
        title: "Public Relations Staff",
        event: "ACTION 2025",
        duration: "October – November 2025",
        story:
          "Managed internal and external communications for ACTION 2025 — the Academic Competition of Data Science, a national-level competition organised by HIMASADA. Strengthened relationships between the organisation, students, and external stakeholders. Coordinated with faculty members and the field coordinator team, and contacted participants and judges for the UI/UX Design competition track.",
        highlights: [
          "Managed communications for a national-level Data Science academic competition",
          "Coordinated participants and judges for the UI/UX Design competition track",
          "Supported partnership and stakeholder communication across internal and external audiences",
        ],
        skillsDeveloped: ["Public Relations", "Stakeholder Communication", "Partnership Coordination", "External Engagement"],
      },
      {
        id: "gss",
        title: "Moderator",
        event: "Group Sharing Spiritual — GSS",
        duration: "September – November 2025",
        story:
          "Served as Moderator for the Group Sharing Spiritual (GSS) programme — a multi-week series facilitating structured group discussions on personal growth and tolerance among Data Science students. Moderated 7 sessions from 28 September to 9 November 2025, creating consistent and safe discussion environments across a diverse student group.",
        highlights: [
          "Moderated 7 sessions across a multi-week spiritual development programme",
          "Facilitated structured group discussions on personal growth and tolerance",
          "Created safe, consistent discussion environments for a diverse student group",
        ],
        skillsDeveloped: ["Facilitation", "Active Listening", "Discussion Management", "Empathy"],
      },
      {
        id: "sasovi",
        title: "Master of Ceremony",
        event: "SASOVI 2025",
        duration: "November 2025",
        story:
          "Served as Master of Ceremony for SASOVI 2025 — a HIMASADA showcase event held on 1 November 2025, themed 'Dari lensa pemuda, untuk Indonesia berkarya' (From the lens of youth, for Indonesia to create). Hosted and directed the programme flow of a large-audience event, coordinating between performers, organisers, and audience in a live public context.",
        highlights: [
          "Hosted SASOVI 2025 in front of a large faculty audience",
          "Coordinated programme flow between performers and organising committees",
          "Theme: 'From the lens of youth, for Indonesia to create'",
        ],
        skillsDeveloped: ["Public Speaking", "Live Event Hosting", "Composure Under Pressure", "Script Adaptation"],
      },
    ],
    totalRoles: 4,
  },
];

export const LEADERSHIP_REFLECTION = `Leadership taught me that the gap between knowing and communicating is wider than most technical training acknowledges. I could analyse a dataset correctly and still fail to move anyone to act on it. Six roles across three organisations in a single year — each requiring a different tone, a different audience, a different kind of presence — showed me that adapting your communication register is not a soft skill sitting beside your technical skills. It is the skill that determines whether your technical skills have any impact at all. The most important thing I built in these roles was not a programme or an event. It was the habit of reading the room before opening a slide.`;
