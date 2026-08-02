import Link from "next/link";
import { SponsorshipInquiry } from "@/components/sponsorship-inquiry";
import { getSpeakers } from "@/lib/notion";

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

export const metadata = {
  title: "Sponsorship",
  description:
    "Partner with the Harvard Business School AI Club to support practical learning and thoughtful conversations about AI.",
};

export const revalidate = 60;

export default async function SponsorshipPage() {
  const speakers = await getSpeakers();
  const selectedVoices = speakers.filter((speaker) => speaker.featured).slice(0, 3);

  return (
    <div>
      <header className="page-hero relative overflow-hidden border-b border-line">
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
                href="#sponsor-inquiry"
                className="mt-7 inline-flex rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </div>
      </header>

      <div>
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-7xl grid-cols-3 px-5 sm:px-8">
            {[
              ["400+", "members"],
              ["30+", "programs in the past year"],
              [`${speakers.length}`, "published speaker profiles"],
            ].map(([number, label], index) => (
              <div
                key={label}
                className={`py-8 sm:py-10 ${index > 0 ? "border-l border-line pl-5 sm:pl-8" : ""}`}
              >
                <div className="font-instrument text-3xl sm:text-5xl">{number}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
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
                          className="rounded-full border border-line px-3 py-1.5 text-xs text-muted"
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

        {selectedVoices.length > 0 && (
          <section className="border-y border-line bg-paper-2">
            <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
              <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
                <div>
                  <div className="eyebrow text-electric">Proof of programming</div>
                  <h2 className="mt-3 max-w-sm font-instrument text-4xl leading-tight tracking-tight sm:text-5xl">
                    Conversations with people doing the work.
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                    Our strongest programs pair student questions with genuine
                    operating, investing, research, and policy experience.
                  </p>
                </div>
                <div className="divide-y divide-line border-y border-line">
                  {selectedVoices.map((speaker, index) => (
                    <Link
                      key={speaker.id}
                      href={`/speakers/${speaker.slug}`}
                      className="group grid gap-3 py-6 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center sm:gap-5"
                    >
                      <span className="font-mono text-xs text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-instrument text-xl group-hover:text-electric">
                          {speaker.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          {[speaker.title, speaker.company].filter(Boolean).join(" · ")}
                        </p>
                        {speaker.talk && (
                          <p className="mt-2 text-sm text-ink-soft">{speaker.talk}</p>
                        )}
                      </div>
                      <span className="hidden text-ink-soft transition-transform group-hover:translate-x-1 sm:block">
                        View →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section
          id="sponsor-inquiry"
          className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"
        >
          <div className="hero-grid-dark relative overflow-hidden rounded-3xl border border-line bg-paper-2 px-7 py-10 sm:px-12 sm:py-12">
            <div className="relative grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <div className="eyebrow text-crimson">Let’s build something useful</div>
                <h2 className="mt-4 font-instrument text-4xl leading-tight tracking-tight sm:text-5xl">
                  Start with what your organization knows.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  We will shape the right learning, conversation, or community
                  format around your expertise and our members’ needs. Opportunities
                  are tailored rather than sold as fixed tiers.
                </p>
                <a
                  href="mailto:ai@studentclubs.hbs.edu?subject=HBS%20AI%20Club%20Sponsorship"
                  className="mt-6 inline-block text-sm font-semibold text-crimson hover:underline"
                >
                  Or email ai@studentclubs.hbs.edu
                </a>
              </div>
              <SponsorshipInquiry />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
