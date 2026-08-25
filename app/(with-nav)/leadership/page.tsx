import { getLeadership } from "@/lib/notion";
import { LeaderCard } from "@/components/leader-card";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const revalidate = 60;

export const metadata = {
  title: "Leadership",
  description: "Meet the student board leading the Harvard Business School AI Club.",
};

export default async function LeadershipPage() {
  const leaders = await getLeadership();
  const current = leaders.filter((leader) => leader.tenure === "Current Board");
  const past = leaders.filter((leader) => leader.tenure === "Past Board");
  const uncategorized = leaders.filter(
    (leader) => leader.tenure !== "Current Board" && leader.tenure !== "Past Board"
  );
  const currentBoard = current.length ? current : uncategorized;

  return (
    <div>
      <PageIntro
        eyebrow="Leadership"
        title={<>Meet the <span className="text-crimson">board.</span></>}
        description="HBS students who run the club."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {leaders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-paper-2 px-6 py-20 text-center">
            <p className="font-display text-2xl">Board page coming soon</p>
          </div>
        ) : (
          <>
            <section>
              <Reveal variant="slide-left">
                <div className="flex items-end justify-between border-b border-line pb-4">
                  <div>
                    <div className="eyebrow text-crimson">Current board</div>
                    <h2 className="mt-2 font-display text-3xl">2026–27</h2>
                  </div>
                </div>
              </Reveal>
              <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {currentBoard.map((leader, index) => (
                  <Reveal key={leader.id} delay={(index % 4) * 70} variant="scale">
                    <LeaderCard leader={leader} />
                  </Reveal>
                ))}
              </div>
            </section>

            {past.length > 0 && (
              <section className="mt-20 border-t border-line pt-12">
                <div className="grid gap-8 lg:grid-cols-[0.5fr_1.5fr]">
                  <div>
                    <div className="eyebrow text-muted">Club alumni</div>
                    <h2 className="mt-2 font-display text-3xl">Past leadership</h2>
                  </div>
                  <div className="grid gap-x-10 sm:grid-cols-2">
                    {past.map((leader, index) => (
                      <Reveal
                        key={leader.id}
                        delay={(index % 2) * 70}
                        variant="slide-right"
                      >
                        <LeaderCard leader={leader} compact />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
