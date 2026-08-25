import Image from "next/image";
import type { Leader } from "@/lib/notion";
import { initials } from "@/lib/format";
import {
  leadershipPhoto,
  leadershipPhotoCrop,
} from "@/lib/leadership-photos";

export function LeaderCard({
  leader,
  compact = false,
}: {
  leader: Leader;
  compact?: boolean;
}) {
  const photo = leadershipPhoto(leader.name, leader.photo);
  const crop = leadershipPhotoCrop(leader.name);

  if (compact) {
    return (
      <article className="motion-card flex items-center gap-4 border-t border-line py-5">
        {photo ? (
          <Image
            src={photo}
            alt={leader.name}
            width={52}
            height={52}
            className="h-[52px] w-[52px] shrink-0 rounded-full object-cover grayscale-[20%]"
          />
        ) : (
          <div className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-crimson-soft font-display text-lg text-crimson">
            {initials(leader.name)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-tight">{leader.name}</h3>
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
      <div className="motion-card relative aspect-square overflow-hidden rounded-2xl border border-line bg-paper-2">
        {photo ? (
          <div
            className="absolute transition-opacity duration-300 group-hover:opacity-95"
            style={{
              width: `${crop.scale * 100}%`,
              height: `${crop.scale * 100}%`,
              left: `${(1 - crop.scale) * 50 + crop.x}%`,
              top: `${(1 - crop.scale) * 50 + crop.y}%`,
            }}
          >
            <Image
              src={photo}
              alt={leader.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="editorial-grid grid h-full place-items-center bg-paper-3">
            <span className="font-display text-7xl text-crimson/80">
              {initials(leader.name)}
            </span>
          </div>
        )}
        {leader.linkedin && (
          <a
            href={leader.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${leader.name} on LinkedIn`}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/40 text-sm text-white backdrop-blur transition-colors hover:bg-crimson"
          >
            ↗
          </a>
        )}
      </div>
      <div className="pt-4">
        <h3 className="font-display text-2xl leading-tight tracking-[-0.015em]">{leader.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-crimson">
          {leader.role}
        </p>
      </div>
    </article>
  );
}
