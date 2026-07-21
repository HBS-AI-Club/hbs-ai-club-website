"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/events", label: "Events" },
  { href: "/speakers", label: "Speakers" },
  { href: "/leadership", label: "Leadership" },
  { href: "/learn", label: "Learn" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  // On home, the nav floats over the dark hero until the user scrolls.
  const onDark = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The homepage has its own glassmorphic nav inside the video hero.
  if (isHome) return null;

  return (
    <header
      className={`sticky top-0 z-[80] transition-colors duration-300 ${
        onDark
          ? "border-b border-white/5 bg-ink"
          : "border-b border-line bg-paper/85 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-crimson text-[13px] font-bold text-white">
            AI
          </span>
          <span className="font-instrument text-2xl tracking-tight text-ink">
            HBS AI Club
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors ${
                  onDark
                    ? `[text-shadow:0_1px_12px_rgba(0,0,0,0.5)] ${
                        active ? "text-white" : "text-paper/90 hover:text-white"
                      }`
                    : active
                      ? "text-crimson"
                      : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/join"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              onDark
                ? "bg-paper text-ink hover:bg-crimson hover:text-white"
                : "bg-ink text-paper hover:bg-crimson"
            }`}
          >
            Join
          </Link>
        </div>

        <button
          className={`transition-colors md:hidden ${onDark ? "text-paper" : "text-ink-soft"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-ink-soft"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setOpen(false)}
              className="mt-1 mb-2 w-fit rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-paper"
            >
              Join
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
