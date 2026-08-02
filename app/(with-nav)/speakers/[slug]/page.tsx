import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSpeakers,
  getSpeakerBySlug,
} from "@/lib/notion";
import { Avatar } from "@/components/avatar";

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

  return (
    <div className="speaker-detail relative overflow-hidden">
      <div className="editorial-grid absolute inset-0 opacity-[0.14]" />
      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <Link href="/speakers" className="text-sm text-muted hover:text-crimson">
          ← All speakers
        </Link>

        <header className="mt-12 grid gap-8 border-b border-line pb-12 sm:grid-cols-[8rem_1fr] sm:items-center">
          <Avatar name={speaker.name} src={speaker.headshot} size={128} />
          <div>
            {speaker.featured && (
              <span className="eyebrow text-crimson">Featured guest</span>
            )}
            <h1 className="mt-2 font-instrument text-5xl leading-tight tracking-tight sm:text-6xl">
              {speaker.name}
            </h1>
            <p className="mt-2 text-base text-ink-soft">
              {[speaker.title, speaker.company].filter(Boolean).join(" · ")}
            </p>
            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-wider text-crimson hover:border-crimson"
              >
                View on LinkedIn ↗
              </a>
            )}
          </div>
        </header>

        <div className="grid gap-10 py-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="eyebrow text-muted">Why we invited them</div>
          <div>
            {speaker.bio && (
              <p className="text-xl leading-relaxed text-ink-soft">{speaker.bio}</p>
            )}
            {speaker.talk && (
              <blockquote className="mt-10 border-l-2 border-crimson pl-6">
                <div className="eyebrow text-crimson">Conversation</div>
                <p className="mt-3 font-instrument text-3xl italic leading-tight">
                  “{speaker.talk}”
                </p>
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
