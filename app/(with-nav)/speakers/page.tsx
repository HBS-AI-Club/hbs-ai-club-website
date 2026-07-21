import { getSpeakers } from "@/lib/notion";
import { SpeakerCard } from "@/components/speaker-card";

export const revalidate = 60;

export const metadata = {
  title: "Speakers",
  description:
    "The founders, investors, researchers, and operators who have spoken at the HBS AI Club.",
};

export default async function SpeakersPage() {
  const speakers = await getSpeakers();
  const featured = speakers.filter((s) => s.featured);
  const rest = speakers.filter((s) => !s.featured);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <header className="max-w-2xl">
        <div className="eyebrow text-crimson">Speakers</div>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          The people building what&apos;s next
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          We bring the operators, founders, and investors defining the AI era to
          campus. Here are some of the guests who have joined us.
        </p>
      </header>

      {speakers.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {featured.length > 0 && (
            <section className="mt-12">
              <h2 className="eyebrow mb-4 text-muted">Featured guests</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((s) => (
                  <SpeakerCard key={s.id} speaker={s} />
                ))}
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="mt-12">
              <h2 className="eyebrow mb-4 text-muted">More speakers</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((s) => (
                  <SpeakerCard key={s.id} speaker={s} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-2xl border border-dashed border-line bg-paper-2 px-6 py-16 text-center">
      <p className="font-display text-xl">Speaker archive coming soon</p>
      <p className="mt-2 text-sm text-muted">Check back as we add past guests.</p>
    </div>
  );
}
