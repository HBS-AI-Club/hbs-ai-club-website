import type { Leader } from "@/lib/notion";
import { Avatar } from "./avatar";

export function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-line bg-paper p-6 text-center transition-shadow hover:shadow-[0_2px_20px_rgba(255,255,255,0.06)]">
      <Avatar name={leader.name} src={leader.photo} size={88} />
      <h3 className="mt-4 font-display text-lg leading-tight">{leader.name}</h3>
      {leader.role && (
        <p className="mt-0.5 text-sm font-medium text-crimson">{leader.role}</p>
      )}
      {leader.classYear && (
        <p className="text-xs text-muted">{leader.classYear}</p>
      )}
      {leader.bio && (
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{leader.bio}</p>
      )}
      {leader.linkedin && (
        <a
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-xs font-medium text-crimson hover:underline"
        >
          LinkedIn ↗
        </a>
      )}
    </article>
  );
}
