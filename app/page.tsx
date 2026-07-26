import Link from "next/link";
import { getLeadership, getResources, getSpeakers } from "@/lib/notion";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { Avatar } from "@/components/avatar";

export const revalidate = 60;

const PILLARS = [
  {
    title: "Fireside Chats",
    description:
      "Candid conversations with the operators, founders, and investors shaping AI—from OpenAI and Sierra to GSV and SemiAnalysis.",
    color: "#ef6f81",
  },
  {
    title: "Technical Learning",
    description:
      "Hands-on sessions that take you from LLM fundamentals to building and evaluating agents—no engineering background required.",
    color: "#6fb2e6",
  },
  {
    title: "Community",
    description:
      "Dinners, socials, and project show-and-tells that turn classmates into collaborators and friends.",
    color: "#dda45f",
  },
];

export default async function Home() {
  const [speakers, leaders, resources] = await Promise.all([
    getSpeakers(),
    getLeadership(),
    getResources(),
  ]);

  const featured = speakers.filter((speaker) => speaker.featured).slice(0, 6);
  const starterResources = resources.slice(0, 3);
  const stats = [
    { number: "400+", label: "club members" },
    { number: `${speakers.length}`, label: "guest speakers" },
    { number: `${resources.length}`, label: "curated resources" },
    { number: `${leaders.length}`, label: "student leaders" },
  ];

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 py-14">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-paper px-5 py-6">
                <div className="font-display text-3xl text-crimson sm:text-4xl">
                  {stat.number}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <Reveal>
          <p className="font-display text-3xl leading-[1.15] tracking-tight sm:text-5xl">
            We bring the frontier to campus—and put{" "}
            <span className="italic text-crimson">students</span> at the center of it.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 90}>
              <span
                className="block h-1 w-10 rounded-full"
                style={{ background: pillar.color }}
              />
              <h3 className="mt-4 font-display text-xl">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {starterResources.length > 0 && (
        <section className="border-y border-line bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <Reveal>
              <div className="flex items-end justify-between">
                <div>
                  <div className="eyebrow text-crimson">Start here</div>
                  <h2 className="mt-2 font-display text-3xl">From the field guide</h2>
                </div>
                <Link href="/learn" className="text-sm font-medium text-crimson hover:underline">
                  Explore Learn →
                </Link>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {starterResources.map((resource, index) => (
                <Reveal key={resource.id} delay={index * 90}>
                  <a
                    href={resource.link || "/learn"}
                    target={resource.link ? "_blank" : undefined}
                    rel={resource.link ? "noopener noreferrer" : undefined}
                    className="flex h-full flex-col rounded-2xl border border-line bg-paper p-5 transition-shadow hover:shadow-[0_2px_20px_rgba(255,255,255,0.06)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-crimson-soft px-2 py-0.5 text-[11px] font-medium text-crimson">
                        {resource.type || "Resource"}
                      </span>
                      <span className="text-xs text-muted">{resource.level}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg leading-snug">{resource.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {resource.description}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <div className="eyebrow text-crimson">On our stage</div>
                <h2 className="mt-2 font-display text-3xl">Past speakers</h2>
              </div>
              <Link href="/speakers" className="text-sm font-medium text-crimson hover:underline">
                All speakers →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((speaker) => (
                <Link
                  key={speaker.id}
                  href={`/speakers/${speaker.slug}`}
                  className="group flex items-center gap-4 bg-paper px-6 py-5 transition-colors hover:bg-paper-2"
                >
                  <Avatar name={speaker.name} src={speaker.headshot} size={44} />
                  <div className="min-w-0">
                    <div className="font-display text-lg leading-tight group-hover:text-crimson">
                      {speaker.name}
                    </div>
                    <div className="truncate text-sm text-muted">
                      {speaker.title}
                      {speaker.company ? ` · ${speaker.company}` : ""}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-paper-2 px-8 py-14 text-ink sm:px-14">
            <div className="hero-grid-dark absolute inset-0 opacity-40" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Come build the future of AI with us.
              </h2>
              <p className="mt-3 text-muted">
                Open to every HBS student—technical or not. Join the community and
                learn alongside classmates.
              </p>
              <Link
                href="/join"
                className="mt-6 inline-block rounded-full bg-crimson px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-crimson-dark"
              >
                Join the club
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
