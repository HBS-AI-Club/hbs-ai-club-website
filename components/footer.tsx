import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-crimson text-[13px] font-bold text-white">
                AI
              </span>
              <span className="font-display text-[17px] font-semibold">
                HBS AI Club
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The student community at Harvard Business School exploring the
              frontier of artificial intelligence and business — through fireside
              chats, technical learning, and the people building what&apos;s next.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <div className="eyebrow text-muted">Explore</div>
              <ul className="mt-3 space-y-2">
                <li><Link href="/events" className="text-ink-soft hover:text-crimson">Events</Link></li>
                <li><Link href="/speakers" className="text-ink-soft hover:text-crimson">Speakers</Link></li>
                <li><Link href="/leadership" className="text-ink-soft hover:text-crimson">Leadership</Link></li>
                <li><Link href="/learn" className="text-ink-soft hover:text-crimson">Learn</Link></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow text-muted">Get involved</div>
              <ul className="mt-3 space-y-2">
                <li><Link href="/join" className="text-ink-soft hover:text-crimson">Join the club</Link></li>
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
          <span>Built by students · Content managed in Notion</span>
        </div>
      </div>
    </footer>
  );
}
