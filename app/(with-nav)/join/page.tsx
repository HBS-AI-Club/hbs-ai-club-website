import Link from "next/link";

export const metadata = {
  title: "Join",
  description: "Join the Harvard Business School AI Club.",
};

const BENEFITS = [
  ["Learn", "Practical sessions that move from AI fundamentals to useful workflows."],
  ["Connect", "A cross-campus network of classmates building, operating, and investing in AI."],
  ["Lead", "Sharper context for the product, strategy, and policy decisions ahead."],
];

export default function JoinPage() {
  return (
    <div>
      <header className="relative overflow-hidden border-b border-line">
        <div className="editorial-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow text-crimson">Join HBS AI Club</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="max-w-4xl font-instrument text-5xl leading-[0.96] tracking-[-0.045em] sm:text-7xl">
              Curiosity is the only{" "}
              <span className="italic text-crimson">prerequisite.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:justify-self-end">
              Join nearly 400 HBS students learning what AI can do, where it is
              going, and what it means for the businesses we will lead.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <section className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {BENEFITS.map(([title, description], index) => (
            <article key={title} className="bg-paper-2 p-7 sm:p-8">
              <span className="font-mono text-xs text-crimson">0{index + 1}</span>
              <h2 className="mt-10 font-instrument text-3xl">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
            </article>
          ))}
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="eyebrow text-electric">Ready when you are</div>
            <h2 className="mt-3 font-instrument text-4xl tracking-tight">
              Two simple ways in.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Membership is open to every matriculated HBS student and registered
              partner, regardless of technical background.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:ai@studentclubs.hbs.edu?subject=Joining%20the%20HBS%20AI%20Club&body=Hi%20AI%20Club%20team%2C%20I%27d%20like%20to%20join%20the%20club%20and%20get%20on%20the%20mailing%20list."
              className="hairline-card group flex min-h-64 flex-col rounded-3xl p-7 transition-transform hover:-translate-y-1"
            >
              <span className="eyebrow text-crimson">Email the board</span>
              <span className="mt-10 font-instrument text-2xl">Join the mailing list</span>
              <span className="mt-2 text-sm leading-relaxed text-muted">
                Ask to be added to club updates and the community.
              </span>
              <span className="mt-auto pt-8 text-sm font-semibold text-ink-soft group-hover:text-crimson">
                ai@studentclubs.hbs.edu ↗
              </span>
            </a>
            <a
              href="https://www.hbs.edu/mba/student-life/activities-government-and-clubs/student-clubs/ai-club"
              target="_blank"
              rel="noopener noreferrer"
              className="hairline-card group flex min-h-64 flex-col rounded-3xl p-7 transition-transform hover:-translate-y-1"
            >
              <span className="eyebrow text-electric">HBS club portal</span>
              <span className="mt-10 font-instrument text-2xl">Register officially</span>
              <span className="mt-2 text-sm leading-relaxed text-muted">
                Find the club in the HBS directory and complete your membership.
              </span>
              <span className="mt-auto pt-8 text-sm font-semibold text-ink-soft group-hover:text-electric">
                Open the official page ↗
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
      </main>
    </div>
  );
}
