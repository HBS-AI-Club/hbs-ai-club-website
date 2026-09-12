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

export type NavVariant = "overlay" | "solid";

export function Nav({ variant = "solid" }: { variant?: NavVariant }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlaysHero = variant === "overlay";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header
      className={`${overlaysHero ? "fixed" : "sticky"} inset-x-0 top-0 z-[90] transition-all duration-300 ${
        !overlaysHero || scrolled || open
          ? "border-b border-white/10 bg-[#14090d]/92 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8"
      >
        <Link
          href="/"
          className="font-display text-3xl tracking-tight text-white"
          onClick={() => setOpen(false)}
        >
          HBS AI Club
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm transition-colors ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/join"
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03]"
          >
            Join the Club
          </Link>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="site-mobile-menu"
        >
          <span className="text-xs font-semibold uppercase tracking-widest">
            {open ? "Close" : "Menu"}
          </span>
        </button>
      </nav>

      {open && (
        <div
          id="site-mobile-menu"
          className="mx-auto w-full max-w-7xl px-6 pb-4 lg:hidden"
        >
          <div className="liquid-glass flex flex-col gap-1 rounded-2xl p-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg px-3 py-2 text-sm font-medium text-white"
            >
              Join the Club →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
