import { getSpeakers } from "@/lib/notion";
import { SpeakerCard } from "@/components/speaker-card";

export const revalidate = 60;

export const metadata = {
  title: "Speakers",
  description:
    "Founders, investors, researchers, and operators who have shared their thinking with the HBS AI Club.",
};

export default async function SpeakersPage() {
  const speakers = await getSpeakers();
  const featured = speakers.filter((speaker) => speaker.featured);
  const rest = speakers.filter((speaker) => !speaker.featured);

  return (
    <div>
      <header className="relative overflow-hidden border-b border-line">
        <div className="editorial-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow text-crimson">Speakers</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="max-w-4xl font-instrument text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">
              The people building{" "}
              <span className="italic text-crimson">what comes next.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:justify-self-end">
              Candid conversations with the operators, founders, researchers, and
              investors turning AI from a capability into companies and change.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        {speakers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-paper-2 px-6 py-20 text-center">
            <p className="font-instrument text-2xl">Speaker archive coming soon</p>
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <section>
                <div className="flex items-end justify-between border-b border-line pb-5">
                  <div>
                    <div className="eyebrow text-crimson">Selected voices</div>
                    <h2 className="mt-2 font-instrument text-3xl">Featured guests</h2>
                  </div>
                  <span className="text-sm text-muted">{featured.length} profiles</span>
                </div>
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {featured.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                  ))}
                </div>
              </section>
            )}

            {rest.length > 0 && (
              <section className="mt-24">
                <div className="eyebrow border-b border-line pb-5 text-muted">
                  More from our community
                </div>
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
