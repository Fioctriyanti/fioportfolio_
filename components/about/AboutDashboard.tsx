"use client";

import {
  GraduationCap,
  Globe,
  Bot,
  Database,
  Brain,
  Users,
  Layers,
  TrendingUp,
} from "lucide-react";
import StatCard, { type StatCardData } from "./StatCard";
import { useInView } from "@/lib/useInView";

const CARDS: StatCardData[] = [
  {
    value: 3.84,
    decimals: 2,
    unit: "/4.00",
    label: "Current GPA",
    sub: "State University of Surabaya",
    icon: <GraduationCap />,
    accent: "cyan",
    delay: 0,
  },
  {
    label: "International Track",
    sub: "English-medium programme · UNESA",
    icon: <Globe />,
    accent: "blue",
    delay: 0.08,
  },
  {
    label: "Google Ambassador",
    sub: "Selected from 12,000 applicants nationwide",
    icon: <Bot />,
    accent: "purple",
    delay: 0.16,
  },
  {
    value: 16,
    unit: "+",
    label: "Academic Projects",
    sub: "ML · NLP · Deep Learning · Databases",
    icon: <Layers />,
    accent: "aurora",
    delay: 0.24,
  },
  {
    label: "Machine Learning",
    sub: "Regression · Classification · Clustering · CNNs",
    icon: <Brain />,
    accent: "blue",
    delay: 0.32,
  },
  {
    label: "NLP",
    sub: "IndoBERT · LDA · Sentiment Analysis",
    icon: <Database />,
    accent: "cyan",
    delay: 0.40,
  },
  {
    value: 7,
    unit: "+",
    label: "Org. Roles",
    sub: "Events · PR · Mentoring · MC",
    icon: <Users />,
    accent: "purple",
    delay: 0.48,
  },
  {
    label: "Continuous Growth",
    sub: "HarvardX · Google · Dicoding certified",
    icon: <TrendingUp />,
    accent: "aurora",
    delay: 0.56,
  },
];

export default function AboutDashboard() {
  const { ref, inView } = useInView(0.15);

  return (
    <div ref={ref} className="relative">
      {/* Floating aurora orbs behind the grid */}
      <div
        className="pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,240,0.4), transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-64 w-64 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%)",
          filter: "blur(48px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 left-1/3 h-32 w-32 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(240,98,146,0.4), transparent 70%)",
          filter: "blur(32px)",
        }}
        aria-hidden="true"
      />

      {/* Dashboard grid */}
      <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
        {CARDS.map((card) => (
          <StatCard key={card.label} data={card} visible={inView} />
        ))}
      </div>
    </div>
  );
}
