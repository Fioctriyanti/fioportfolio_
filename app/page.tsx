"use client";

// 1. Intro & Hero Components
import IntroScreen from "@/components/Intro/IntroScreen";
import Hero from "@/components/hero/Hero";
import HeroMarquee from "@/components/hero/HeroMarquee";
import FloatingBadge from "@/components/hero/FloatingBadge";

// 2. Main Content Components
import About from "@/components/about/About";
import Lorong3D from "@/components/highlights/lorong3D";
import Belief from "@/components/Belief/belief";
import Projects from "@/components/projects/Projects";
import Organizations from "@/components/organizations/Organizations";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#EBE6EF] overflow-x-hidden">
      <IntroScreen />
      <Hero />
      <div className="relative z-20 -mt-12 pb-6" style={{ backgroundColor: "#EBE6EF" }}>
        <HeroMarquee />
      </div>
      <About />
      <Lorong3D />
      <Belief />
      <Projects />
      <Organizations />
      <Contact />
    </main>
  );
}