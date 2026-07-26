import Image from "next/image";
import type { Leader } from "@/lib/notion";
import { initials } from "@/lib/format";
import { leadershipPhoto } from "@/lib/leadership-photos";

export function LeaderCard({
  leader,
  compact = false,
}: {
  leader: Leader;
  compact?: boolean;
}) {
  const photo = leadershipPhoto(leader.name, leader.photo);

  if (compact) {
    return (
      <article className="flex items-center gap-4 border-t border-line py-5">
        {photo ? (
          <Image
            src={photo}
            alt={leader.name}
            width={52}
            height={52}
            className="h-[52px] w-[52px] shrink-0 rounded-full object-cover grayscale-[20%]"
          />
        ) : (
          <div className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-crimson-soft font-instrument text-lg text-crimson">
            {initials(leader.name)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-instrument text-lg leading-tight">{leader.name}</h3>
          <p className="mt-0.5 truncate text-xs text-muted">
            {[leader.role, leader.classYear].filter(Boolean).join(" · ")}
          </p>
        </div>
        {leader.linkedin && (
          <a
            href={leader.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${leader.name} on LinkedIn`}
            className="ml-auto text-sm text-muted transition-colors hover:text-crimson"
          >
            ↗
          </a>
        )}
      </article>
    );
  }

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-line bg-paper-2">
        {photo ? (
          <Image
            src={photo}
            alt={leader.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="editorial-grid grid h-full place-items-center bg-paper-3">
            <span className="font-instrument text-7xl text-crimson/80">
              {initials(leader.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        {leader.linkedin && (
          <a
            href={leader.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${leader.name} on LinkedIn`}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/25 text-sm text-white backdrop-blur transition-colors hover:bg-crimson"
          >
            ↗
          </a>
        )}
      </div>
      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-instrument text-2xl leading-tight">{leader.name}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-crimson">
              {leader.role}
            </p>
          </div>
          {leader.classYear && (
            <span className="shrink-0 pt-1 text-xs text-muted">{leader.classYear}</span>
          )}
        </div>
        {leader.bio && (
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{leader.bio}</p>
        )}
      </div>
    </article>
  );
}
