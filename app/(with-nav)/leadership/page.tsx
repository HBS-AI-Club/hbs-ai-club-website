import { getLeadership } from "@/lib/notion";
import { LeaderCard } from "@/components/leader-card";

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
      <header className="page-hero relative overflow-hidden border-b border-line">
        <div className="editorial-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow text-crimson">Leadership</div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="max-w-4xl font-instrument text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">
              Built by classmates who make AI{" "}
              <span className="italic text-crimson">useful.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:justify-self-end">
              Our student board turns curiosity into a real community—creating
              practical learning, bringing sharp voices to campus, and making it
              easier to find collaborators.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        {leaders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-paper-2 px-6 py-20 text-center">
            <p className="font-instrument text-2xl">Board page coming soon</p>
          </div>
        ) : (
          <>
            <section>
              <div className="flex items-end justify-between border-b border-line pb-5">
                <div>
                  <div className="eyebrow text-crimson">Current board</div>
                  <h2 className="mt-2 font-instrument text-3xl">MBA 2027</h2>
                </div>
                <span className="text-sm text-muted">{currentBoard.length} leaders</span>
              </div>
              <div className="mt-9 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {currentBoard.map((leader) => (
                  <LeaderCard key={leader.id} leader={leader} />
                ))}
              </div>
            </section>

            {past.length > 0 && (
              <section className="mt-28">
                <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
                  <div>
                    <div className="eyebrow text-muted">Club alumni</div>
                    <h2 className="mt-2 font-instrument text-3xl">Past leadership</h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      The students who helped build the community and set its
                      learning-first culture.
                    </p>
                  </div>
                  <div className="grid gap-x-10 sm:grid-cols-2">
                    {past.map((leader) => (
                      <LeaderCard key={leader.id} leader={leader} compact />
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
