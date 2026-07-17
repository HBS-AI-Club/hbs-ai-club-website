import Link from "next/link";
import type { Speaker } from "@/lib/notion";
import { Avatar } from "./avatar";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-paper p-5 transition-shadow hover:shadow-[0_2px_20px_rgba(26,23,20,0.06)]">
      <Link href={`/speakers/${speaker.slug}`} className="group flex items-center gap-4">
        <Avatar name={speaker.name} src={speaker.headshot} size={56} />
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-tight group-hover:text-crimson">
            {speaker.name}
          </h3>
          <p className="truncate text-sm text-muted">
            {speaker.title}
            {speaker.company ? ` · ${speaker.company}` : ""}
          </p>
        </div>
      </Link>

      {speaker.bio && (
        <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-ink-soft">
          {speaker.bio}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        {speaker.talk ? (
          <span className="line-clamp-1 pr-2 text-xs italic text-muted">
            “{speaker.talk}”
          </span>
        ) : (
          <span />
        )}
        {speaker.linkedin && (
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-medium text-crimson hover:underline"
          >
            LinkedIn ↗
          </a>
        )}
      </div>
    </article>
  );
}
