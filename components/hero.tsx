"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const textShadow = "0 1px 24px rgba(0,0,0,0.55)";

export function Hero() {
  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    const frame = window.requestAnimationFrame(() => {
      setVideoEnabled(!prefersReducedMotion && !connection?.saveData);
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
        className="relative min-h-[100svh] w-full overflow-hidden bg-[#0a0a0a] bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/hero-poster.jpg')" }}
      >
        {videoEnabled && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            aria-hidden="true"
            className="hero-media absolute inset-0 z-0 h-full w-full object-cover"
          >
            <source
              src="/hero-mobile.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source src="/hero.mp4" type="video/mp4" />
            Your browser does not support background video.
          </video>
        )}

        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start px-6 pb-24 pt-[22vh] text-center lg:pt-[24vh]">
          <h1
            className="animate-fade-rise max-w-7xl font-display text-5xl leading-[0.95] tracking-[-2.46px] text-white sm:text-6xl md:text-7xl xl:text-8xl"
            style={{ textShadow }}
          >
            Where business meets artificial intelligence.
          </h1>

          <p
            className="animate-fade-rise-delay mt-7 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base"
            style={{ textShadow }}
          >
            The HBS community for students who want to learn about AI and use it.
          </p>

          <div className="animate-fade-rise-delay-2 mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/join"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0a0a0a] transition-transform hover:scale-[1.03]"
            >
              Join HBS AI Club
            </Link>
            <Link
              href="/learn"
              className="liquid-glass rounded-full px-8 py-3.5 text-sm font-medium text-white hover:scale-[1.03]"
              style={{ textShadow }}
            >
              Start learning
            </Link>
          </div>
        </div>
      </section>
  );
}
