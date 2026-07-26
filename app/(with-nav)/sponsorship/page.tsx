const PARTNERSHIP_FORMATS = [
  {
    number: "01",
    title: "Learning partner",
    description:
      "Support a practical workshop or learning series that helps students understand and use emerging AI capabilities.",
    examples: ["Hands-on workshops", "Technical learning series", "Tools and learning access"],
  },
  {
    number: "02",
    title: "Conversation partner",
    description:
      "Bring a sharp operator, founder, researcher, or investor into a candid campus conversation around a consequential AI question.",
    examples: ["Executive conversations", "Industry deep dives", "Founder and operator perspectives"],
  },
  {
    number: "03",
    title: "Community partner",
    description:
      "Help create the spaces where classmates exchange ideas, find collaborators, and turn curiosity into projects.",
    examples: ["Builder showcases", "Community dinners", "Cross-club collaboration"],
  },
];

const PRINCIPLES = [
  {
    title: "Useful to students",
    description:
      "Every partnership should leave members with better context, stronger skills, or a more meaningful connection.",
  },
  {
    title: "Credible to the field",
    description:
      "We favor substantive voices and real operating insight over broad promotional programming.",
  },
  {
    title: "Built together",
    description:
      "The best format depends on your expertise and our members’ needs, so packages are shaped collaboratively.",
  },
];

export const metadata = {
  title: "Sponsorship",
  description:
    "Partner with the Harvard Business School AI Club to support practical learning and thoughtful conversations about AI.",
};

export default function SponsorshipPage() {
  return (
    <div>
      <header className="relative overflow-hidden border-b border-line">
        <div className="editorial-grid absolute inset-0 opacity-25" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-crimson/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow text-crimson">Sponsorship</div>
          <div className="mt-4 grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
            <h1 className="max-w-4xl font-instrument text-5xl leading-[0.97] tracking-[-0.04em] sm:text-7xl">
              Help shape how the next generation{" "}
              <span className="italic text-crimson">leads with AI.</span>
            </h1>
            <div className="max-w-md lg:justify-self-end">
              <p className="text-base leading-relaxed text-ink-soft">
                Partner with one of HBS’s largest student communities to make
                practical learning, candid dialogue, and ambitious building
                possible.
              </p>
              <a
                href="mailto:ai@studentclubs.hbs.edu?subject=HBS%20AI%20Club%20Sponsorship"
                className="mt-7 inline-flex rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-7xl grid-cols-3 px-5 sm:px-8">
            {[
              ["400+", "members"],
              ["30+", "programs in the past year"],
              ["1", "cross-disciplinary community"],
            ].map(([number, label], index) => (
              <div
                key={label}
                className={`py-8 sm:py-10 ${index > 0 ? "border-l border-line pl-5 sm:pl-8" : ""}`}
              >
                <div className="font-instrument text-3xl sm:text-5xl">{number}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <div className="eyebrow text-crimson">Ways to partner</div>
              <h2 className="mt-3 max-w-sm font-instrument text-4xl leading-tight tracking-tight sm:text-5xl">
                Support the work, not the noise.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                We design partnerships around useful experiences for members and
                genuine expertise from partners—not a fixed menu of logo placements.
              </p>
            </div>

            <div className="divide-y divide-line border-y border-line">
              {PARTNERSHIP_FORMATS.map((format) => (
                <article
                  key={format.title}
                  className="grid gap-5 py-8 sm:grid-cols-[3rem_1fr] sm:gap-7"
                >
                  <span className="font-mono text-xs text-crimson">{format.number}</span>
                  <div>
                    <h3 className="font-instrument text-3xl">{format.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {format.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {format.examples.map((example) => (
                        <span
                          key={example}
                          className="rounded-full border border-line px-3 py-1.5 text-[11px] text-muted"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-paper-2">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="eyebrow text-muted">What guides us</div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
              {PRINCIPLES.map((principle) => (
                <article key={principle.title} className="bg-paper p-7 sm:p-8">
                  <span className="block h-1 w-8 rounded-full bg-crimson" />
                  <h3 className="mt-8 font-instrument text-2xl">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="eyebrow text-crimson">What to expect</div>
              <h2 className="mt-3 font-instrument text-4xl leading-tight tracking-tight sm:text-5xl">
                A partnership designed around shared value.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "A clear program concept and student audience",
                "Thoughtful brand recognition where appropriate",
                "Coordination with the student board from idea to delivery",
                "A format consistent with HBS and student-club policies",
              ].map((item) => (
                <div
                  key={item}
                  className="hairline-card flex min-h-28 items-start gap-3 rounded-2xl p-5"
                >
                  <span className="mt-0.5 text-crimson">✦</span>
                  <p className="text-sm leading-relaxed text-ink-soft">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-28">
          <div className="hero-grid-dark relative overflow-hidden rounded-3xl border border-line bg-paper-2 px-7 py-14 sm:px-12 sm:py-16">
            <div className="relative max-w-3xl">
              <div className="eyebrow text-crimson">Let’s build something useful</div>
              <h2 className="mt-4 font-instrument text-4xl leading-tight tracking-tight sm:text-5xl">
                Tell us what your organization knows—and what you want HBS students
                to understand.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                We will work with you to find the right learning, conversation, or
                community format. Sponsorship opportunities are tailored rather
                than sold as fixed tiers.
              </p>
              <a
                href="mailto:ai@studentclubs.hbs.edu?subject=HBS%20AI%20Club%20Sponsorship"
                className="mt-7 inline-flex rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
              >
                ai@studentclubs.hbs.edu
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
