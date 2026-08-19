import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Join",
  description: "Join the Harvard Business School AI Club.",
};

const CLUB_DIRECTORY =
  "https://www.hbs.edu/mba/student-life/activities-government-and-clubs/student-clubs/ai-club";

export default function JoinPage() {
  return (
    <div>
      <PageIntro
        eyebrow="Join"
        title={<>Join the <span className="text-crimson">HBS AI Club.</span></>}
        description="Open to HBS students and registered partners. No technical background needed."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="rounded-3xl border border-line bg-paper-2 px-7 py-10 sm:px-12 sm:py-12">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="eyebrow text-crimson">Official membership</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-0.025em]">
                Register through HBS.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                It takes about two minutes. You will receive club updates and
                invitations.
              </p>
            </div>
            <a
              href={CLUB_DIRECTORY}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-dark"
            >
              Register with HBS ↗
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold">Already registered?</h3>
            <p className="mt-1 text-sm text-muted">Ask us to add you to club updates.</p>
          </div>
          <a
            href="mailto:ai@studentclubs.hbs.edu?subject=Add%20me%20to%20HBS%20AI%20Club%20updates&body=Hi%20AI%20Club%20team%2C%20I%27m%20an%20HBS%20student%20and%20would%20like%20to%20receive%20club%20updates."
            className="text-sm font-semibold text-crimson hover:text-white"
          >
            Request updates →
          </a>
        </div>

        <p className="mt-8 text-sm text-muted">
          Want to sponsor the club? Visit our{" "}
          <Link href="/sponsorship" className="font-semibold text-ink-soft hover:text-crimson">
            sponsorship page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
