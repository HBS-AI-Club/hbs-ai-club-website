import { getResources, getPodcasts } from "@/lib/notion";

export const revalidate = 60;

export const metadata = {
  title: "Learn",
  description:
    "Curated learning resources and podcasts to get up to speed on AI, chosen by the HBS AI Club.",
};

export default async function LearnPage() {
  const [resources, podcasts] = await Promise.all([getResources(), getPodcasts()]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <header className="max-w-2xl">
        <div className="eyebrow text-crimson">Learn</div>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Get up to speed
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          A living, club-curated shortlist of the courses, essays, and podcasts we
          keep coming back to.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="eyebrow mb-4 text-muted">Resources</h2>
        {resources.length === 0 ? (
          <Empty text="Curated resources are on the way — the board is assembling the list." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {resources.map((r) => (
              <a
                key={r.id}
                href={r.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-2xl border border-line bg-paper p-5 transition-shadow hover:shadow-[0_2px_20px_rgba(26,23,20,0.06)]"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {r.type && (
                    <span className="rounded-full bg-crimson-soft px-2 py-0.5 font-medium text-crimson">
                      {r.type}
                    </span>
                  )}
                  {r.level && <span className="text-muted">{r.level}</span>}
                </div>
                <h3 className="mt-2 font-display text-lg leading-snug">{r.name}</h3>
                {r.source && <p className="text-sm text-muted">{r.source}</p>}
                {r.description && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.description}</p>
                )}
                {r.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.topics.map((t) => (
                      <span key={t} className="rounded bg-paper-2 px-2 py-0.5 text-[11px] text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="eyebrow mb-4 text-muted">Podcasts</h2>
        {podcasts.length === 0 ? (
          <Empty text="Podcast picks coming soon." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {podcasts.map((p) => (
              <a
                key={p.id}
                href={p.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-2xl border border-line bg-paper p-5 transition-shadow hover:shadow-[0_2px_20px_rgba(26,23,20,0.06)]"
              >
                {p.category && (
                  <span className="w-fit rounded-full bg-crimson-soft px-2 py-0.5 text-[11px] font-medium text-crimson">
                    {p.category}
                  </span>
                )}
                <h3 className="mt-2 font-display text-lg leading-snug">{p.name}</h3>
                {p.hostGuest && <p className="text-sm text-muted">{p.hostGuest}</p>}
                {p.description && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.description}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-paper-2 px-6 py-12 text-center text-sm text-muted">
      {text}
    </div>
  );
}
