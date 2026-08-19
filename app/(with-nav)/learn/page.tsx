import { getResources, getPodcasts } from "@/lib/notion";
import { LearningLibrary } from "@/components/learning-library";
import { PageIntro } from "@/components/page-intro";

export const revalidate = 60;

export const metadata = {
  title: "Learn",
  description: "AI learning resources recommended by the HBS AI Club.",
};

export default async function LearnPage() {
  const [resources, podcasts] = await Promise.all([getResources(), getPodcasts()]);

  return (
    <div>
      <PageIntro
        eyebrow="Learn"
        title={<>Start <span className="text-crimson">learning.</span></>}
        description="Choose a goal and follow a short list of resources."
      />

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
