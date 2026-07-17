import Link from "next/link";
import { getEvents, getSpeakers, getLeadership } from "@/lib/notion";
import { CATEGORY_META, cleanCompany, fmtDate } from "@/lib/format";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { Avatar } from "@/components/avatar";

export const revalidate = 60;

export default async function Home() {
  const [events, speakers, leaders] = await Promise.all([
    getEvents(),
    getSpeakers(),
    getLeadership(),
  ]);

  const dated = events.filter((e) => e.date);

  // distinct, display-cleaned company names (for the hero marquee + stat)
  const companyList: string[] = [];
  const seen = new Set<string>();
  for (const c of [...speakers.map((s) => s.company), ...events.map((e) => e.company)]) {
    const name = cleanCompany(c);
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    companyList.push(name);
  }

  const recent = dated.slice(-3).reverse();
  const featured = speakers.filter((s) => s.featured).slice(0, 6);

  const stats = [
    { n: `${events.length}`, l: "events hosted" },
    { n: `${speakers.length}`, l: "guest speakers" },
    { n: `${companyList.length}+`, l: "companies & funds" },
    { n: `${leaders.length}`, l: "student leaders" },
  ];

  return (
    <div>
      <Hero companies={companyList} stats={stats} />

      {/* Stat strip */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="bg-paper px-5 py-6">
                <div className="font-display text-3xl text-crimson sm:text-4xl">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Kinetic statement */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <Reveal>
          <p className="font-display text-3xl leading-[1.15] tracking-tight sm:text-5xl">
            We bring the frontier to campus — and put{" "}
            <span className="italic text-crimson">students</span> at the center of it.
          </p>
        </Reveal>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Fireside Chats",
              d: "Candid conversations with the operators, founders, and investors shaping AI — from OpenAI and Sierra to GSV and SemiAnalysis.",
              c: CATEGORY_META.fireside.color,
            },
            {
              t: "Technical Learning",
              d: "Hands-on sessions that take you from LLM fundamentals to building and evaluating agents — no engineering background required.",
              c: CATEGORY_META.technical.color,
            },
            {
              t: "Community",
              d: "Dinners, socials, and project show-and-tells that turn classmates into collaborators and friends.",
              c: CATEGORY_META.social.color,
            },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <span className="block h-1 w-10 rounded-full" style={{ background: p.c }} />
              <h3 className="mt-4 font-display text-xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recent events */}
      {recent.length > 0 && (
        <section className="border-y border-line bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <Reveal>
              <div className="flex items-end justify-between">
                <div>
                  <div className="eyebrow text-crimson">Recently</div>
                  <h2 className="mt-2 font-display text-3xl">Latest events</h2>
                </div>
                <Link href="/events" className="text-sm font-medium text-crimson hover:underline">
                  All events →
                </Link>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {recent.map((e, i) => {
                const m = CATEGORY_META[e.category];
                return (
                  <Reveal key={e.id} delay={i * 90}>
                    <Link
                      href={`/events/${e.slug}`}
                      className="flex h-full flex-col rounded-2xl border border-line bg-paper p-5 transition-shadow hover:shadow-[0_2px_20px_rgba(26,23,20,0.06)]"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                          style={{ background: m.soft, color: m.color }}
                        >
                          {m.label}
                        </span>
                        <span className="text-xs text-muted">{fmtDate(e.date, "medium")}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg leading-snug">{e.name}</h3>
                      {(e.speaker || e.company) && (
                        <p className="mt-1 text-sm text-muted">
                          {[e.speaker, e.company].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Speaker wall */}
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
              {featured.map((s) => (
                <Link
                  key={s.id}
                  href={`/speakers/${s.slug}`}
                  className="group flex items-center gap-4 bg-paper px-6 py-5 transition-colors hover:bg-paper-2"
                >
                  <Avatar name={s.name} src={s.headshot} size={44} />
                  <div className="min-w-0">
                    <div className="font-display text-lg leading-tight group-hover:text-crimson">
                      {s.name}
                    </div>
                    <div className="truncate text-sm text-muted">
                      {s.title}
                      {s.company ? ` · ${s.company}` : ""}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-paper sm:px-14">
            <div className="hero-grid-dark absolute inset-0 opacity-40" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Come build the future of AI with us.
              </h2>
              <p className="mt-3 text-paper/70">
                Open to every HBS student — technical or not. Join the list and never miss an event.
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
