import { getResources, getPodcasts } from "@/lib/notion";
import { LearningLibrary } from "@/components/learning-library";

export const revalidate = 60;

export const metadata = {
  title: "Learn",
  description:
    "The HBS AI Club field guide: guided learning paths and a curated library for busy MBAs.",
};

export default async function LearnPage() {
  const [resources, podcasts] = await Promise.all([getResources(), getPodcasts()]);

  return (
    <div>
      <header className="page-hero relative overflow-hidden border-b border-line">
        <div className="editorial-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow text-electric">The HBS AI field guide</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="max-w-4xl font-instrument text-5xl leading-[0.96] tracking-[-0.045em] sm:text-7xl">
              Learn AI without{" "}
              <span className="italic text-crimson">drowning in it.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:justify-self-end">
              A high-signal library for busy MBAs: the courses, explainers, and
              podcasts our community actually recommends.
            </p>
          </div>
        </div>
      </header>

      {resources.length === 0 && podcasts.length === 0 ? (
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="rounded-3xl border border-dashed border-line bg-paper-2 px-6 py-20 text-center text-sm text-muted">
            The field guide is being assembled. Check back soon.
          </div>
        </div>
      ) : (
        <LearningLibrary resources={resources} podcasts={podcasts} />
      )}
    </div>
  );
}
