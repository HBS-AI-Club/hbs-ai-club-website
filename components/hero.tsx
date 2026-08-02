"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/learn", label: "Learn" },
  { href: "/speakers", label: "Speakers" },
  { href: "/leadership", label: "Leadership" },
  { href: "/sponsorship", label: "Sponsorship" },
];

const textShadow = "0 1px 24px rgba(0,0,0,0.55)";

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const frame = window.requestAnimationFrame(() => {
      onScroll();
      setVideoEnabled(!prefersReducedMotion && !connection?.saveData);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-b border-white/10 bg-[#14090d]/92 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8"
        >
          <Link
            href="/"
            className="font-instrument text-3xl tracking-tight text-white"
            style={{ textShadow }}
            onClick={() => setMenuOpen(false)}
          >
            HBS AI Club
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
                style={{ textShadow }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/join"
              className="liquid-glass hidden rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] md:inline-block"
              style={{ textShadow }}
            >
              Join the Club
            </Link>
            <button
              className="text-white md:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="home-mobile-menu"
              style={{ textShadow }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest">
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            id="home-mobile-menu"
            className="mx-auto w-full max-w-7xl px-6 pb-4 md:hidden"
          >
            <div className="liquid-glass flex flex-col gap-1 rounded-2xl p-3">
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/join"
                onClick={() => setMenuOpen(false)}
                className="mt-1 rounded-lg px-3 py-2 text-sm font-medium text-white"
              >
                Join the Club →
              </Link>
            </div>
          </div>
        )}
      </header>

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
            className="absolute inset-0 z-0 h-full w-full object-cover"
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

        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start px-6 pb-24 pt-[24vh] text-center sm:pt-[23vh]">
          <h1
            className="animate-fade-rise max-w-7xl font-instrument text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-white sm:text-7xl md:text-8xl"
            style={{ textShadow }}
          >
            Where business meets artificial intelligence.
          </h1>

          <p
            className="animate-fade-rise-delay mt-7 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base"
            style={{ textShadow }}
          >
            The 400+ member HBS community where students build practical AI
            skills, hear candid perspectives, and find classmates working at the
            frontier.
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
              Explore Learn
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
