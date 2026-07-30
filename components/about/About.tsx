"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import AboutDashboard from "./AboutDashboard";
import AboutStory from "./AboutStory";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, #06070f 0%, #090b1a 40%, #0b0a1e 100%)",
      }}
    >
      {/* Section-level background aurora lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Top-left cyan bloom */}
        <div
          className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, #00c8f0, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        {/* Centre-right purple bloom */}
        <div
          className="absolute -right-24 top-1/3 h-[600px] w-[600px] rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, #8b5cf6, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        {/* Bottom aurora pink bloom */}
        <div
          className="absolute bottom-0 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse, #f06292, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        {/* Horizontal glass divider line at the top */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,200,240,0.2) 30%, rgba(139,92,246,0.2) 70%, transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">

        {/* Section heading — left-aligned */}
        <SectionHeading
          eyebrow="About Me"
          title="The person behind the data."
          subtitle="Turning curiosity into data-driven solutions."
        />

        {/* Split layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* Left — Dashboard */}
          <div className="order-2 lg:order-1">
            <AboutDashboard />
          </div>

          {/* Right — Story */}
          <div className="order-1 lg:order-2">
            <AboutStory />
          </div>
        </div>
      </div>

      {/* Bottom divider into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(74,124,247,0.15) 40%, rgba(139,92,246,0.15) 60%, transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
