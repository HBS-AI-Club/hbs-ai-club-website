"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroCanvas } from "./hero-canvas";

const ROTATING = ["artificial intelligence", "the frontier", "what comes next", "the future"];

export function Hero({
  companies,
  stats,
}: {
  companies: string[];
  stats: { n: string; l: string }[];
}) {
  const [intro, setIntro] = useState(true);
  const [wordIdx, setWordIdx] = useState(0);

  // intro loader: play once per browser session
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("hbsIntroSeen")) {
      setIntro(false);
      return;
    }
    sessionStorage.setItem("hbsIntroSeen", "1");
    const t = setTimeout(() => setIntro(false), 1900);
    return () => clearTimeout(t);
  }, []);

  // rotating headline word
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(id);
  }, []);

  const marquee = companies.length
    ? companies
    : ["OpenAI", "GSV Ventures", "SemiAnalysis", "Twelve Labs", "Sierra", "Distyl AI", "IVP", "Groq"];

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      {/* intro loader */}
      {intro && (
        <div className="intro-panel fixed inset-0 z-[200] flex items-center justify-center bg-ink">
          <div className="intro-word flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-crimson text-sm font-bold text-white">
              AI
            </span>
            <span className="font-display text-2xl font-semibold text-paper">HBS AI Club</span>
          </div>
        </div>
      )}

      {/* interactive mouse-reactive dot field */}
      <HeroCanvas />
      {/* ambient crimson depth */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #a51c30, transparent 70%)" }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-28 pb-10">
        <div className="eyebrow fade-up flex items-center gap-2.5 text-[#e5b3bb]" style={{ animationDelay: "0.15s" }}>
          <span className="h-px w-8 bg-crimson" />
          Harvard Business School · at the AI frontier
        </div>

        {/* min-height reserves 3 lines so the rotating word never resizes the hero */}
        <h1 className="mt-6 min-h-[3em] font-display text-[13vw] leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          <span className="rise" style={{ animationDelay: "0.15s" }}>
            <span style={{ animationDelay: "0.15s" }}>Where business</span>
          </span>
          <span className="rise" style={{ animationDelay: "0.28s" }}>
            <span style={{ animationDelay: "0.28s" }}>
              meets{" "}
              <em key={wordIdx} className="word-in font-display italic text-crimson">
                {ROTATING[wordIdx]}
              </em>
            </span>
          </span>
        </h1>

        <p
          className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-paper/70"
          style={{ animationDelay: "0.55s" }}
        >
          The HBS AI Club brings founders, investors, and researchers to campus, runs hands-on
          technical learning, and connects the students who will lead the AI era — whatever your
          starting point.
        </p>

        <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.7s" }}>
          <Link
            href="/join"
            className="rounded-full bg-crimson px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-crimson-dark"
          >
            Join the club
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-paper/25 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper/60"
          >
            See what we&apos;ve hosted →
          </Link>
        </div>
      </div>

      {/* marquee ticker */}
      <div className="relative border-t border-paper/10 py-5">
        <div className="marquee-mask flex overflow-hidden">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((c, i) => (
              <span key={i} className="flex items-center">
                <span className="px-6 font-display text-lg text-paper/55">{c}</span>
                <span className="text-crimson">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="scroll-cue pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 text-paper/40 sm:block">
        <svg width="20" height="26" viewBox="0 0 20 26" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 1v20M3 15l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
