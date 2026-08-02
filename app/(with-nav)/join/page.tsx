import Link from "next/link";

export const metadata = {
  title: "Join",
  description: "Join the Harvard Business School AI Club.",
};

export default function JoinPage() {
  return (
    <div>
      <header className="page-hero relative overflow-hidden border-b border-line">
        <div className="editorial-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow text-crimson">Join HBS AI Club</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="max-w-4xl font-instrument text-5xl leading-[0.96] tracking-[-0.045em] sm:text-7xl">
              Curiosity is the only{" "}
              <span className="italic text-crimson">prerequisite.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:justify-self-end">
              Join 400+ HBS students learning what AI can do, where it is
              going, and what it means for the businesses we will lead.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <section className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="eyebrow text-electric">Membership</div>
            <h2 className="mt-3 font-instrument text-4xl tracking-tight">
              Choose your next step.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Membership is open to every matriculated HBS student and registered
              partner, regardless of technical background.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="https://www.hbs.edu/mba/student-life/activities-government-and-clubs/student-clubs/ai-club"
              target="_blank"
              rel="noopener noreferrer"
              className="hairline-card group flex min-h-64 flex-col rounded-3xl p-7 transition-transform hover:-translate-y-1"
            >
              <span className="eyebrow text-electric">Official membership</span>
              <span className="mt-10 font-instrument text-2xl">Register through HBS</span>
              <span className="mt-2 text-sm leading-relaxed text-muted">
                Complete your club membership through the official HBS directory.
              </span>
              <span className="mt-auto pt-8 text-sm font-semibold text-ink-soft group-hover:text-electric">
                Register now ↗
              </span>
            </a>
            <a
              href="mailto:ai@studentclubs.hbs.edu?subject=Add%20me%20to%20HBS%20AI%20Club%20updates&body=Hi%20AI%20Club%20team%2C%20I%27m%20an%20HBS%20student%20and%20would%20like%20to%20receive%20club%20updates."
              className="hairline-card group flex min-h-64 flex-col rounded-3xl p-7 transition-transform hover:-translate-y-1"
            >
              <span className="eyebrow text-crimson">Club updates</span>
              <span className="mt-10 font-instrument text-2xl">Join the mailing list</span>
              <span className="mt-2 text-sm leading-relaxed text-muted">
                Send a pre-written request to hear about workshops, conversations,
                and community programs.
              </span>
              <span className="mt-auto pt-8 text-sm font-semibold text-ink-soft group-hover:text-crimson">
                Request updates ↗
              </span>
            </a>
          </div>
        </section>

        <p className="mt-16 border-t border-line pt-6 text-sm text-muted">
          Interested in sponsoring, speaking, or collaborating?{" "}
          <a href="mailto:ai@studentclubs.hbs.edu" className="font-semibold text-crimson">
            Talk to the board
          </a>{" "}
          or meet the{" "}
          <Link href="/leadership" className="font-semibold text-crimson">
            student leaders
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
