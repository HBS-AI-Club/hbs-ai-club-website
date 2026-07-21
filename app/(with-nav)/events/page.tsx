import { getEvents } from "@/lib/notion";
import { EventsView } from "@/components/events-view";

export const revalidate = 60;

export const metadata = {
  title: "Events",
  description:
    "Fireside chats, technical learning sessions, and socials from the HBS AI Club — browse by calendar or agenda.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <header className="max-w-2xl">
        <div className="eyebrow text-crimson">Events</div>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          A year at the frontier
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          From fireside chats with leaders at OpenAI, GSV, and SemiAnalysis to
          hands-on technical learning, here&apos;s everything the club has hosted —
          browse it as a calendar or a running agenda.
        </p>
      </header>

      <div className="mt-10">
        <EventsView events={events} />
      </div>
    </div>
  );
}
