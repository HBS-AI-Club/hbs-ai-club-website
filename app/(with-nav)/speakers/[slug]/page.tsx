import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSpeakers,
  getSpeakerBySlug,
  getEvents,
  eventsForSpeaker,
} from "@/lib/notion";
import { Avatar } from "@/components/avatar";
import { CATEGORY_META, fmtDate } from "@/lib/format";

export const revalidate = 60;

export async function generateStaticParams() {
  const speakers = await getSpeakers();
  return speakers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = await getSpeakerBySlug(slug);
  if (!s) return { title: "Speaker" };
  return {
    title: s.name,
    description: s.bio || `${s.name}, ${s.title}${s.company ? ` at ${s.company}` : ""}`,
  };
}

export default async function SpeakerDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const speaker = await getSpeakerBySlug(slug);
  if (!speaker) notFound();

  const events = await getEvents();
  const talks = eventsForSpeaker(events, speaker.name).slice().reverse();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Link href="/speakers" className="text-sm text-muted hover:text-crimson">
        ← All speakers
      </Link>

      <header className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Avatar name={speaker.name} src={speaker.headshot} size={96} />
        <div>
          {speaker.featured && (
            <span className="eyebrow text-crimson">Featured guest</span>
          )}
          <h1 className="mt-1 font-display text-4xl leading-tight">{speaker.name}</h1>
          <p className="mt-1 text-lg text-ink-soft">
            {speaker.title}
            {speaker.company ? ` · ${speaker.company}` : ""}
          </p>
          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-full border border-line px-4 py-1.5 text-sm font-medium text-crimson hover:border-crimson"
            >
              LinkedIn ↗
            </a>
          )}
        </div>
      </header>

      {speaker.bio && (
        <p className="mt-8 border-t border-line pt-8 text-lg leading-relaxed text-ink-soft">
          {speaker.bio}
        </p>
      )}

      <section className="mt-10">
        <h2 className="eyebrow mb-4 text-muted">At the AI Club</h2>
        {talks.length === 0 ? (
          <p className="text-sm text-muted">
            {speaker.talk ? `Spoke on “${speaker.talk}.”` : "Details coming soon."}
          </p>
        ) : (
          <ul className="divide-y divide-line border-t border-line">
            {talks.map((e) => {
              const m = CATEGORY_META[e.category];
              return (
                <li key={e.id}>
                  <Link href={`/events/${e.slug}`} className="group flex items-center gap-4 py-4">
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{ background: m.soft, color: m.color }}
                    >
                      {m.label}
                    </span>
                    <span className="flex-1 font-display text-lg group-hover:text-crimson">
                      {e.name}
                    </span>
                    <span className="text-sm text-muted">{fmtDate(e.date, "medium")}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
