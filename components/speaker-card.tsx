import Link from "next/link";
import type { Speaker } from "@/lib/notion";
import { Avatar } from "./avatar";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className="group flex min-h-72 flex-col rounded-3xl border border-line bg-paper-2/65 p-6 transition duration-300 hover:-translate-y-1 hover:border-muted/60 hover:bg-paper-3">
      <Link href={`/speakers/${speaker.slug}`} className="flex items-center gap-4">
        <Avatar name={speaker.name} src={speaker.headshot} size={64} />
        <div className="min-w-0">
          <h3 className="font-instrument text-xl leading-tight group-hover:text-crimson">
            {speaker.name}
          </h3>
          <p className="mt-1 truncate text-xs uppercase tracking-wide text-muted">
            {speaker.title}
            {speaker.company ? ` · ${speaker.company}` : ""}
          </p>
        </div>
      </Link>

      {speaker.bio && (
        <p className="mt-6 line-clamp-4 text-sm leading-relaxed text-ink-soft">
          {speaker.bio}
        </p>
      )}

      <div className="mt-auto flex items-end justify-between border-t border-line pt-5">
        {speaker.talk ? (
          <span className="line-clamp-2 max-w-[75%] pr-2 font-instrument text-sm italic text-muted">
            {speaker.talk}
          </span>
        ) : (
          <span />
        )}
        {speaker.linkedin && (
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${speaker.name} on LinkedIn`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-sm text-muted transition-colors hover:border-crimson hover:text-crimson"
          >
            ↗
          </a>
        )}
      </div>
    </article>
  );
}
