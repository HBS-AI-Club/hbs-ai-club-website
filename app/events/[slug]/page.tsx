import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvents, getEventBySlug, getSpeakers } from "@/lib/notion";
import { CATEGORY_META, fmtDate } from "@/lib/format";

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = await getEventBySlug(slug);
  if (!e) return { title: "Event" };
  return {
    title: e.name,
    description: e.description || `${e.type} · ${fmtDate(e.date, "medium")}`,
  };
}

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const [events, speakers] = [await getEvents(), await getSpeakers()];
  const meta = CATEGORY_META[event.category];

  // link the speaker to their page if we have a card for them
  const matchedSpeaker = event.speaker
    ? speakers.find((s) => event.speaker.toLowerCase().includes(s.name.toLowerCase()))
    : undefined;

  const related = events
    .filter((e) => e.slug !== event.slug && e.category === event.category)
    .reverse()
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Link href="/events" className="text-sm text-muted hover:text-crimson">
        ← All events
      </Link>

      <div className="mt-8">
        <span
          className="rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ background: meta.soft, color: meta.color }}
        >
          {meta.label}
        </span>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{event.name}</h1>
      </div>

      {event.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={event.cover}
          alt={event.name}
          className="mt-8 w-full rounded-2xl border border-line object-cover"
        />
      )}

      <dl className="mt-8 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <Field label="When" value={`${fmtDate(event.date, "full")}${event.time ? ` · ${event.time}` : ""}`} />
        {event.location && <Field label="Where" value={event.location} />}
        {(event.speaker || event.company) && (
          <div>
            <dt className="eyebrow text-muted">Speaker</dt>
            <dd className="mt-1 text-ink">
              {matchedSpeaker ? (
                <Link href={`/speakers/${matchedSpeaker.slug}`} className="text-crimson hover:underline">
                  {event.speaker || matchedSpeaker.name}
                </Link>
              ) : (
                event.speaker
              )}
              {event.company ? `${event.speaker ? " · " : ""}${event.company}` : ""}
            </dd>
          </div>
        )}
        {event.coHosts && <Field label="Co-hosts" value={event.coHosts} />}
      </dl>

      {event.description && (
        <p className="mt-8 text-lg leading-relaxed text-ink-soft">{event.description}</p>
      )}

      {related.length > 0 && (
        <section className="mt-14 border-t border-line pt-8">
          <h2 className="eyebrow mb-4 text-muted">More {meta.label.toLowerCase()} events</h2>
          <ul className="divide-y divide-line border-t border-line">
            {related.map((e) => (
              <li key={e.id}>
                <Link href={`/events/${e.slug}`} className="group flex items-center gap-4 py-4">
                  <span className="flex-1 font-display text-lg group-hover:text-crimson">{e.name}</span>
                  <span className="text-sm text-muted">{fmtDate(e.date, "medium")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-muted">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}
