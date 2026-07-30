"use client";

const KEYWORDS = [
  "Machine Learning",
  "Artificial Intelligence",
  "Natural Language Processing",
  "Predictive Analytics",
  "Business Intelligence",
  "Python",
  "SQL",
  "TensorFlow",
  "PostgreSQL",
  "Google Student Ambassador",
  "International Track",
  "Data Visualization",
  "Research",
  "Continuous Learning",
];

export default function HeroMarquee() {
  const list = [...KEYWORDS, ...KEYWORDS];

  return (
<div
  className="relative overflow-hidden border-y border-[#3A004D]/10 py-3 bg-transparent"
        style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
      aria-label="Skills and areas of focus"
    >
      <div className="marquee-track flex w-max items-center gap-8">
        {list.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] text-[#3A004D] font-semibold"
          >
            {word}
            <span className="text-[#8B4F67]" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}