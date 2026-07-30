"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import {
  Link2,
  AtSign,
  Mail,
  ArrowUpRight,
  Heart,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { useInView } from "@/lib/useInView";

/* ═══════════════════════════════════════════════════════
   DECRYPT TEXT — custom React Bits-style implementation
═══════════════════════════════════════════════════════ */
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-+";

function useDecryptText(target: string, trigger: boolean, speed = 40) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    iterRef.current = 0;

    function step() {
      const progress = iterRef.current;
      const resolved = target.length;

      const next = target
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < Math.floor(progress)) return char;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");

      setDisplay(next);

      if (progress < resolved) {
        iterRef.current += 0.55;
        rafRef.current = setTimeout(step, speed);
      } else {
        setDisplay(target);
      }
    }

    if (rafRef.current) clearTimeout(rafRef.current);
    step();

    return () => {
      if (rafRef.current) clearTimeout(rafRef.current);
    };
  }, [trigger, target, speed]);

  return display;
}

/* ═══════════════════════════════════════════════════════
   CONTACT CARD DATA — Dark Purple Text Theme
═══════════════════════════════════════════════════════ */
interface ContactChannel {
  id: string;
  icon: React.ReactNode;
  platform: string;
  handle: string;
  description: string;
  href: string;
  accent: {
    text: string;
    rgb: string;
    gradient: string;
    glow: string;
    border: string;
  };
  cta: string;
}

const CHANNELS: ContactChannel[] = [
  {
    id: "linkedin",
    icon: <Link2 className="h-5 w-5" strokeWidth={2} />,
    platform: "LinkedIn",
    handle: "fio-octriyanti",
    description:
      "Connect professionally — projects, collaborations, internship inquiries, or just to say hello.",
    href: "https://www.linkedin.com/in/fio-octriyanti-6a4292322",
    accent: {
      text: "#3b0764",
      rgb: "59,7,100",
      gradient: "linear-gradient(135deg,#3b0764,#581c87)",
      glow: "rgba(59,7,100,0.15)",
      border: "rgba(88,28,135,0.3)",
    },
    cta: "View Profile",
  },
  {
    id: "instagram",
    icon: <AtSign className="h-5 w-5" strokeWidth={2} />,
    platform: "Instagram",
    handle: "@fouwlyy",
    description:
      "A more personal window — day-to-day life, learning, and the things I find worth sharing.",
    href: "https://instagram.com/fouwlyy",
    accent: {
      text: "#4c1d95",
      rgb: "76,29,149",
      gradient: "linear-gradient(135deg,#4c1d95,#6b21a8)",
      glow: "rgba(76,29,149,0.15)",
      border: "rgba(107,33,168,0.3)",
    },
    cta: "Follow",
  },
  {
    id: "email",
    icon: <Mail className="h-5 w-5" strokeWidth={2} />,
    platform: "Email",
    handle: "fioulaoktriyanti",
    description:
      "For research proposals, internship discussions, detailed enquiries, or anything that needs more than a DM.",
    href: "mailto:fioulaoktriyanti@gmail.com",
    accent: {
      text: "#3b0764",
      rgb: "59,7,100",
      gradient: "linear-gradient(135deg,#2e1065,#581c87)",
      glow: "rgba(59,7,100,0.15)",
      border: "rgba(88,28,135,0.3)",
    },
    cta: "Send Email",
  },
];

/* ═══════════════════════════════════════════════════════
   CONTACT CARD
═══════════════════════════════════════════════════════ */
function ContactCard({
  channel,
  index,
  isVisible,
}: {
  channel: ContactChannel;
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(40);
  const a = channel.accent;

  const handleText = useDecryptText(channel.handle, hovered, 35);
  const platformText = useDecryptText(channel.platform, isVisible, 45);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotX(((e.clientX - rect.left) / rect.width) * 100);
    setSpotY(((e.clientY - rect.top) / rect.height) * 100);
  }

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, ease, delay: index * 0.12 }}
    >
      <a
        href={channel.href}
        target={channel.id !== "email" ? "_blank" : undefined}
        rel={channel.id !== "email" ? "noopener noreferrer" : undefined}
        aria-label={`Contact via ${channel.platform}: ${channel.handle}`}
        className="block"
      >
        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="group relative overflow-hidden rounded-2xl border transition-all duration-300"
          style={{
            background: "linear-gradient(160deg, rgba(250, 245, 255, 0.95), rgba(243, 232, 255, 0.98))",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderColor: hovered ? a.border : "rgba(88, 28, 135, 0.2)",
            boxShadow: hovered
              ? `0 20px 50px rgba(${a.rgb},0.2), 0 0 0 1px rgba(${a.rgb},0.1)`
              : "0 4px 20px rgba(59, 7, 100, 0.06)",
            transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
          }}
        >
          {/* Spotlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 200px at ${spotX}% ${spotY}%,rgba(${a.rgb},0.12),transparent 70%)`,
              opacity: hovered ? 1 : 0,
            }}
            aria-hidden="true"
          />

          {/* Accent line */}
          <div
            className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl transition-opacity duration-300"
            style={{ background: a.gradient, opacity: hovered ? 1 : 0.6 }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 p-7">
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300"
              style={{
                background: "rgba(88, 28, 135, 0.12)",
                border: "1px solid rgba(88, 28, 135, 0.25)",
                color: "#3b0764",
                boxShadow: hovered ? "0 0 15px rgba(59, 7, 100, 0.2)" : "none",
              }}
              aria-hidden="true"
            >
              {channel.icon}
            </div>

            <div
              className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] font-bold"
              style={{ color: "#581c87" }}
            >
              {platformText}
            </div>

            <div
              className="mb-4 font-bold leading-tight transition-all duration-200"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "clamp(1.1rem,2.5vw,1.35rem)",
                letterSpacing: "-0.01em",
                color: "#2e1065",
              }}
            >
              {handleText}
            </div>

            <p className="mb-6 text-[13px] leading-[1.8] font-medium" style={{ color: "#4c1d95" }}>
              {channel.description}
            </p>

            <div
              className="flex items-center gap-2 font-mono text-[11px] font-bold transition-all duration-200"
              style={{ color: "#3b0764" }}
            >
              {channel.cta}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200"
                strokeWidth={2.5}
                style={{
                  transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   FINAL CTA BLOCK
═══════════════════════════════════════════════════════ */
function FinalCTA({ isVisible }: { isVisible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const ctaText = useDecryptText(
    "Let's Build Something Meaningful Together.",
    isVisible,
    28
  );
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: 0.45 }}
      className="mt-20 flex flex-col items-center gap-8 text-center"
    >
      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="h-px w-32 origin-center rounded-full"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(59,7,100,0.6),rgba(88,28,135,0.8),rgba(59,7,100,0.6),transparent)",
        }}
        aria-hidden="true"
      />

      {/* Headline */}
      <div className="max-w-2xl px-4">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <Sparkles
            className="h-4 w-4"
            style={{ color: "#3b0764" }}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span
            className="font-mono text-[11px] uppercase tracking-[0.18em] font-bold"
            style={{ color: "#3b0764" }}
          >
            Open to opportunities
          </span>
          <Sparkles
            className="h-4 w-4"
            style={{ color: "#3b0764" }}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>

        {/* FIX: Menggunakan solid dark purple color langsung untuk mencegah kotak ungu bug */}
        <h2
          className="font-bold leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-poppins)",
            fontSize: "clamp(1.6rem,4vw,3rem)",
            color: "#3b0764",
          }}
        >
          {ctaText}
        </h2>

        <p
          className="mt-5 text-[14px] leading-[1.8] mx-auto max-w-lg font-medium"
          style={{ fontFamily: "var(--font-poppins)", color: "#4c1d95" }}
        >
          Whether it&apos;s discussing Data Science, Artificial Intelligence,
          research, internships, or future collaborations, I&apos;d be delighted
          to connect.
        </p>
      </div>

      {/* Primary email CTA button */}
      <a
        href="mailto:fioulaoktriyanti@gmail.com"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-3.5 text-[14px] font-bold text-white transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #2e1065, #3b0764, #581c87)",
          boxShadow: hovered
            ? "0 8px 32px rgba(59,7,100,0.5), 0 2px 8px rgba(88,28,135,0.3)"
            : "0 4px 20px rgba(59,7,100,0.35)",
          transform: hovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        }}
        aria-label="Send email to fioulaoktriyanti@gmail.com"
      >
        <Mail className="h-4 w-4 text-white" strokeWidth={2} aria-hidden="true" />
        fioulaoktriyanti@gmail.com
        <ArrowUpRight
          className="h-4 w-4 text-white"
          strokeWidth={2}
          style={{
            transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
            transition: "transform 0.2s ease",
          }}
          aria-hidden="true"
        />
      </a>

      {/* Availability chip */}
      <div
        className="flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] font-bold"
        style={{
          background: "rgba(243, 232, 255, 0.9)",
          border: "1px solid rgba(88, 28, 135, 0.3)",
          color: "#3b0764",
          boxShadow: "0 2px 10px rgba(59, 7, 100, 0.08)",
        }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{
            background: "#581c87",
            boxShadow: "0 0 8px #581c87",
            animation: "pulse 2s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        Available for internships &amp; entry-level roles
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER — Bright Glowing Lilac Text Section
═══════════════════════════════════════════════════════ */
const STACK = [
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind CSS", icon: "↗" },
  { name: "Framer Motion", icon: "◎" },
  { name: "React Bits", icon: "⬡" },
  { name: "Vercel", icon: "▼" },
];

function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      className="relative border-t"
      style={{
        borderColor: "rgba(216,180,254,0.12)",
        background:
          "linear-gradient(180deg,#10051e 0%,#080210 100%)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(168,85,247,0.35) 30%,rgba(216,180,254,0.35) 70%,transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

          {/* Left — identity */}
          <div>
            <div
              className="mb-1 text-[15px] font-semibold"
              style={{
                fontFamily: "var(--font-poppins)",
                color: "#f3e8ff",
                textShadow: "0 0 12px rgba(233,213,255,0.8), 0 0 22px rgba(192,132,252,0.6)",
              }}
            >
              Fio Octriyanti
            </div>
            <div
              className="font-mono text-[10px]"
              style={{
                color: "#d8b4fe",
                textShadow: "0 0 8px rgba(216,180,254,0.6)",
              }}
            >
              Data Science Undergraduate · UNESA · Surabaya
            </div>
          </div>

          {/* Centre — Built with */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="font-mono text-[9px] uppercase tracking-[0.14em]"
              style={{
                color: "#e9d5ff",
                textShadow: "0 0 8px rgba(233,213,255,0.6)",
              }}
            >
              Built with
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {STACK.map((item) => (
                <span
                  key={item.name}
                  className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px]"
                  style={{
                    borderColor: "rgba(216,180,254,0.25)",
                    background: "rgba(168,85,247,0.1)",
                    color: "#f3e8ff",
                    textShadow: "0 0 6px rgba(233,213,255,0.6)",
                    boxShadow: "0 0 10px rgba(168,85,247,0.15)",
                  }}
                  title={item.name}
                >
                  <span
                    className="text-[8px]"
                    style={{ color: "#d8b4fe", textShadow: "0 0 6px rgba(216,180,254,0.8)" }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right — back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-[10px] transition-all duration-200 hover:scale-105"
            style={{
              color: "#e9d5ff",
              textShadow: "0 0 8px rgba(233,213,255,0.7)",
            }}
            aria-label="Scroll back to top"
          >
            Back to top
            <ChevronUp
              className="h-3.5 w-3.5"
              strokeWidth={2}
              style={{ filter: "drop-shadow(0 0 6px rgba(233,213,255,0.8))" }}
              aria-hidden="true"
            />
          </button>
        </div>

        <div
          className="my-8 h-px w-full"
          style={{ background: "rgba(216,180,254,0.12)" }}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p
            className="font-mono text-[9.5px]"
            style={{
              color: "#d8b4fe",
              textShadow: "0 0 8px rgba(216,180,254,0.5)",
            }}
          >
            Designed &amp; Developed by{" "}
            <span
              style={{
                color: "#ffffff",
                textShadow: "0 0 12px rgba(233,213,255,0.9), 0 0 20px rgba(192,132,252,0.7)",
              }}
            >
              Fio Octriyanti
            </span>
            {" "}· {new Date().getFullYear()}
          </p>

          <p
            className="flex items-center gap-1.5 font-mono text-[9.5px]"
            style={{
              color: "#d8b4fe",
              textShadow: "0 0 8px rgba(216,180,254,0.5)",
            }}
          >
            Made with{" "}
            <Heart
              className="h-3 w-3"
              style={{
                color: "#f472b6",
                filter: "drop-shadow(0 0 6px rgba(244,114,182,0.8))",
              }}
              strokeWidth={2}
              aria-hidden="true"
            />
            {" "}in Surabaya, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN CONTACT SECTION
═══════════════════════════════════════════════════════ */
export default function Contact() {
  const { ref: sectionRef, inView } = useInView(0.08);

  return (
    <>
      <section
        id="contact"
        className="relative overflow-hidden pb-12 pt-24 md:pt-32"
        aria-labelledby="contact-heading"
        style={{
          background:
            "linear-gradient(180deg,#130826 0%,#0e051d 50%,#080310 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -left-20 top-1/4 h-[420px] w-[420px] rounded-full opacity-[0.12]"
            style={{
              background: "radial-gradient(circle,#7e22ce,transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute -right-16 bottom-1/3 h-[380px] w-[380px] rounded-full opacity-[0.1]"
            style={{
              background: "radial-gradient(circle,#a855f7,transparent 65%)",
              filter: "blur(70px)",
            }}
          />
          <div
            className="absolute left-1/2 top-2/3 h-56 w-[500px] -translate-x-1/2 rounded-full opacity-[0.08]"
            style={{
              background: "radial-gradient(ellipse,#e9d5ff,transparent 60%)",
              filter: "blur(65px)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(168,85,247,0.2) 40%,rgba(216,180,254,0.2) 60%,transparent)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1100px] px-6 md:px-12">

          {/* Section heading */}
          <div className="mb-14 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 flex items-center justify-center gap-3"
            >
              <div
                className="h-px w-10 rounded-full"
                style={{
                  background: "linear-gradient(90deg,transparent,#3b0764)",
                }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.18em] font-bold"
                style={{ color: "#3b0764" }}
              >
                Contact
              </span>
              <div
                className="h-px w-10 rounded-full"
                style={{
                  background: "linear-gradient(90deg,#3b0764,transparent)",
                }}
                aria-hidden="true"
              />
            </motion.div>

            {/* FIX: Menggunakan solid dark purple color langsung untuk "Let's Connect." */}
            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight"
              style={{
                fontFamily: "var(--font-poppins)",
                color: "#3b0764",
              }}
            >
              Let&apos;s Connect.
            </motion.h2>
          </div>

          {/* Contact cards */}
          <div
            ref={sectionRef}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CHANNELS.map((channel, i) => (
              <ContactCard
                key={channel.id}
                channel={channel}
                index={i}
                isVisible={inView}
              />
            ))}
          </div>

          {/* Final CTA */}
          <FinalCTA isVisible={inView} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}