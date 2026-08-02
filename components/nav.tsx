"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/learn", label: "Learn" },
  { href: "/speakers", label: "Speakers" },
  { href: "/leadership", label: "Leadership" },
  { href: "/sponsorship", label: "Sponsorship" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // The homepage has its own glassmorphic nav inside the video hero.
  if (isHome) return null;

  return (
    <header className="sticky top-0 z-[80] border-b border-white/10 bg-[#14090d]/92 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8"
      >
        <Link
          href="/"
          className="font-instrument text-3xl tracking-tight text-white"
          onClick={() => setOpen(false)}
        >
          HBS AI Club
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/join"
            className="liquid-glass rounded-full px-6 py-2.5 text-sm font-medium text-white hover:scale-[1.03]"
          >
            Join the Club
          </Link>
        </div>

        <button
          className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="site-mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="site-mobile-menu"
          className="border-t border-white/10 bg-[#14090d]/96 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-white/75 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setOpen(false)}
              className="liquid-glass mt-1 mb-2 w-fit rounded-full px-4 py-1.5 text-sm font-medium text-white"
            >
              Join the Club
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
