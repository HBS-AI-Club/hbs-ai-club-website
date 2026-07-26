import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2/80">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-crimson text-[12px] font-bold text-white">
                AI
              </span>
              <span className="font-instrument text-2xl">
                HBS AI Club
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The student community helping HBS understand, use, and lead through
              the shift to AI.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3 sm:gap-14">
            <div>
              <div className="eyebrow text-muted">Explore</div>
              <ul className="mt-3 space-y-2">
                <li><Link href="/speakers" className="text-ink-soft hover:text-crimson">Speakers</Link></li>
                <li><Link href="/leadership" className="text-ink-soft hover:text-crimson">Leadership</Link></li>
                <li><Link href="/learn" className="text-ink-soft hover:text-crimson">Learn</Link></li>
                <li><Link href="/sponsorship" className="text-ink-soft hover:text-crimson">Sponsorship</Link></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow text-muted">Get involved</div>
              <ul className="mt-3 space-y-2">
                <li><Link href="/join" className="text-ink-soft hover:text-crimson">Join the club</Link></li>
                <li><Link href="/sponsorship" className="text-ink-soft hover:text-crimson">Partner with us</Link></li>
                <li>
                  <a href="mailto:ai@studentclubs.hbs.edu" className="text-ink-soft hover:text-crimson">
                    Email us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="eyebrow text-muted">Harvard</div>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="https://www.hbs.edu" className="text-ink-soft hover:text-crimson">
                    HBS
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hbs.edu/mba/student-life/activities-government-and-clubs/student-clubs/ai-club"
                    className="text-ink-soft hover:text-crimson"
                  >
                    Club directory
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Harvard Business School AI Club</span>
          <span>Curious by default · Built by students</span>
        </div>
      </div>
    </footer>
  );
}
