import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0c0608]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-white">HBS AI Club</div>
            <p className="mt-2 text-sm text-muted">
              The AI community at Harvard Business School.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm"
          >
            <Link href="/learn" className="text-ink-soft hover:text-white">Learn</Link>
            <Link href="/speakers" className="text-ink-soft hover:text-white">Speakers</Link>
            <Link href="/leadership" className="text-ink-soft hover:text-white">Leadership</Link>
            <Link href="/sponsorship" className="text-ink-soft hover:text-white">Sponsorship</Link>
            <Link href="/join" className="font-semibold text-crimson hover:text-white">Join</Link>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Harvard Business School AI Club</span>
          <a href="mailto:ai@studentclubs.hbs.edu" className="hover:text-white">
            ai@studentclubs.hbs.edu
          </a>
        </div>
      </div>
    </footer>
  );
}
