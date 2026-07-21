"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/", label: "Home", active: true },
  { href: "/events", label: "Events" },
  { href: "/speakers", label: "Speakers" },
  { href: "/leadership", label: "Leadership" },
  { href: "/learn", label: "Learn" },
];

const textShadow = "0 1px 24px rgba(0,0,0,0.55)";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Belt-and-suspenders: guarantee muted so autoplay is allowed everywhere.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* fullscreen looping background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        {/* glassmorphic navigation */}
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
          <Link
            href="/"
            className="font-instrument text-3xl tracking-tight text-white"
            style={{ textShadow }}
            onClick={() => setMenuOpen(false)}
          >
            HBS AI Club
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors ${
                  l.active ? "text-white" : "text-white/60 hover:text-white"
                }`}
                style={{ textShadow }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/join"
              className="liquid-glass hidden rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] md:inline-block"
              style={{ textShadow }}
            >
              Begin Journey
            </Link>
            <button
              className="text-white md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              style={{ textShadow }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* mobile menu */}
        {menuOpen && (
          <div className="mx-auto w-full max-w-7xl px-6 md:hidden">
            <div className="liquid-glass flex flex-col gap-1 rounded-2xl p-3">
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/join"
                onClick={() => setMenuOpen(false)}
                className="mt-1 rounded-lg px-3 py-2 text-sm font-medium text-white"
              >
                Begin Journey →
              </Link>
            </div>
          </div>
        )}

        {/* cinematic hero content, positioned in the upper area */}
        <div className="flex flex-1 flex-col items-center justify-start px-6 pt-[12vh] pb-24 text-center">
          <h1
            className="animate-fade-rise max-w-7xl font-instrument text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-white sm:text-7xl md:text-8xl"
            style={{ textShadow }}
          >
            Where business meets artificial intelligence.
          </h1>

          <Link
            href="/join"
            className="liquid-glass animate-fade-rise-delay mt-12 inline-block cursor-pointer rounded-full px-14 py-5 text-base text-white hover:scale-[1.03]"
            style={{ textShadow }}
          >
            Begin Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
