import { getSpeakers } from "@/lib/notion";
import { SpeakerCard } from "@/components/speaker-card";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const revalidate = 60;

export const metadata = {
  title: "Speakers",
  description: "People who have spoken with the HBS AI Club.",
};

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

  return (
    <div>
      <PageIntro
        eyebrow="Speakers"
        title={<>Meet our <span className="text-crimson">speakers.</span></>}
        description="Past guests of the HBS AI Club."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {speakers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-paper-2 px-6 py-20 text-center">
            <p className="font-display text-2xl">Speaker archive coming soon</p>
          </div>
        ) : (
          <>
            <Reveal variant="slide-right">
              <div className="flex justify-end border-b border-line pb-4">
                <span className="text-sm text-muted">{speakers.length} profiles</span>
              </div>
            </Reveal>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker, index) => (
                <Reveal
                  key={speaker.id}
                  delay={(index % 3) * 70}
                  className="h-full"
                  variant={index % 2 === 0 ? "scale" : "rise"}
                >
                  <SpeakerCard speaker={speaker} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
