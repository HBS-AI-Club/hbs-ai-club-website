import Link from "next/link";

export const metadata = {
  title: "Join",
  description: "Join the Harvard Business School AI Club.",
};

const BENEFITS = [
  "Priority invites to every fireside chat and speaker event",
  "Hands-on technical learning sessions — beginner-friendly",
  "A community of classmates building and investing in AI",
  "Project show-and-tells, socials, and industry dinners",
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="eyebrow text-crimson">Join</div>
      <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
        Get involved
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        The AI Club is open to every HBS student — whether you&apos;re shipping models
        or just AI-curious. Membership is free to join the mailing list; here&apos;s what
        you&apos;ll get.
      </p>

      <ul className="mt-8 space-y-3">
        {BENEFITS.map((b) => (
          <li key={b} className="flex gap-3 text-ink-soft">
            <span className="mt-1 text-crimson">✦</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-line bg-paper-2 p-6 sm:p-8">
        <h2 className="font-display text-xl">Two ways in</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <a
            href="mailto:ai@studentclubs.hbs.edu?subject=Joining%20the%20HBS%20AI%20Club&body=Hi%20AI%20Club%20team%2C%20I%27d%20like%20to%20join%20the%20club%20and%20get%20on%20the%20mailing%20list."
            className="flex flex-col rounded-xl bg-paper p-5 ring-1 ring-line transition-shadow hover:shadow-[0_2px_20px_rgba(255,255,255,0.06)]"
          >
            <span className="eyebrow text-crimson">Email us</span>
            <span className="mt-1 font-display text-lg">ai@studentclubs.hbs.edu</span>
            <span className="mt-1 text-sm text-muted">
              Ask to be added to the mailing list and Slack.
            </span>
          </a>
          <a
            href="https://www.hbs.edu/mba/student-life/activities-government-and-clubs/student-clubs/ai-club"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-xl bg-paper p-5 ring-1 ring-line transition-shadow hover:shadow-[0_2px_20px_rgba(255,255,255,0.06)]"
          >
            <span className="eyebrow text-crimson">Club portal</span>
            <span className="mt-1 font-display text-lg">Official HBS page ↗</span>
            <span className="mt-1 text-sm text-muted">
              Sign up through the HBS student clubs directory.
            </span>
          </a>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted">
        Interested in sponsoring or speaking?{" "}
        <a href="mailto:ai@studentclubs.hbs.edu" className="text-crimson hover:underline">
          Get in touch
        </a>{" "}
        — or meet the{" "}
        <Link href="/leadership" className="text-crimson hover:underline">
          board
        </Link>
        .
      </p>
    </div>
  );
}
