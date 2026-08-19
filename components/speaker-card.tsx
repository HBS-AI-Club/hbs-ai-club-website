import type { Speaker } from "@/lib/notion";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className="flex h-full min-h-32 items-center rounded-2xl border border-line bg-paper-2 p-6">
      <div className="flex min-w-0 items-center gap-4">
        {speaker.headshot && (
          // Notion supplies short-lived remote URLs that cannot be allowlisted safely.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={speaker.headshot}
            alt={speaker.name}
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
        )}
        <div className="min-w-0">
          <h3 className="font-display text-2xl leading-tight tracking-[-0.015em]">
            {speaker.name}
          </h3>
          <p className="mt-1 text-sm leading-snug text-muted">
            {[speaker.title, speaker.company].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
    </article>
  );
}
