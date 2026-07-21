import { getLeadership } from "@/lib/notion";
import { LeaderCard } from "@/components/leader-card";

export const revalidate = 60;

export const metadata = {
  title: "Leadership",
  description: "The student board leading the Harvard Business School AI Club.",
};

export default async function LeadershipPage() {
  const leaders = await getLeadership();
  const current = leaders.filter((l) => l.tenure === "Current Board");
  const past = leaders.filter((l) => l.tenure === "Past Board");
  const uncategorized = leaders.filter(
    (l) => l.tenure !== "Current Board" && l.tenure !== "Past Board"
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <header className="max-w-2xl">
        <div className="eyebrow text-crimson">Leadership</div>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Run by students, for students
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          The club is led by an all-volunteer MBA board that programs the events,
          books the speakers, and keeps the community humming.
        </p>
      </header>

      {leaders.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-line bg-paper-2 px-6 py-16 text-center">
          <p className="font-display text-xl">Board page coming soon</p>
        </div>
      ) : (
        <>
          <Section
            title="Current board"
            subtitle="2026–27"
            people={current.length ? current : uncategorized}
          />
          {past.length > 0 && (
            <Section title="Past board" subtitle="2025–26" people={past} muted />
          )}
        </>
      )}
    </div>
  );
}

function Section({
  title,
  subtitle,
  people,
  muted,
}: {
  title: string;
  subtitle: string;
  people: Awaited<ReturnType<typeof getLeadership>>;
  muted?: boolean;
}) {
  if (people.length === 0) return null;
  return (
    <section className="mt-14">
      <div className="flex items-baseline gap-3">
        <h2 className="font-display text-2xl">{title}</h2>
        <span className="text-sm text-muted">{subtitle}</span>
      </div>
      <div
        className={`mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${
          muted ? "opacity-95" : ""
        }`}
      >
        {people.map((l) => (
          <LeaderCard key={l.id} leader={l} />
        ))}
      </div>
    </section>
  );
}
