import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getMembershipActions } from "@/lib/notion";

export const metadata = {
  title: "Join",
  description: "Join the Harvard Business School AI Club.",
};

export default async function JoinPage() {
  const actions = await getMembershipActions();

  return (
    <div>
      <PageIntro
        eyebrow="Join"
        title={<>Join the <span className="text-crimson">HBS AI Club.</span></>}
        description="HBS students and partners can join in two short steps."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal variant="slide-left">
          <div className="mb-9 max-w-2xl">
            <div className="eyebrow text-crimson">Membership</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-0.025em]">
              Complete both steps.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Follow the steps in order. The membership form asks you to confirm your dues
              payment. Each link opens in a new tab.
            </p>
          </div>
        </Reveal>

        {actions.length > 0 ? (
          <ol className="grid items-stretch gap-5 lg:grid-cols-2">
            {actions.map((action, index) => (
              <li key={action.id} className="h-full">
                <Reveal
                  className="h-full"
                  delay={index * 100}
                  variant={index % 2 === 0 ? "slide-left" : "slide-right"}
                >
                  <div className="motion-card flex h-full min-h-64 flex-col rounded-3xl border border-line bg-paper-2 p-7 sm:p-8">
                    <div className="eyebrow text-crimson">
                      Step {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-5 font-display text-3xl tracking-[-0.025em]">
                      {action.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {action.description}
                    </p>
                    <a
                      href={action.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-fit rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-dark"
                    >
                      Continue ↗
                    </a>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : (
          <div className="rounded-3xl border border-line bg-paper-2 p-8">
            <h3 className="font-display text-2xl">Membership links are being updated.</h3>
            <p className="mt-3 text-sm text-muted">
              Email the club and we will help you join.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <a
            href="mailto:ai@studentclubs.hbs.edu?subject=HBS%20AI%20Club%20membership"
            className="font-semibold text-ink-soft hover:text-crimson"
          >
            Questions about membership? Email the club →
          </a>
          <p>
            Interested in partnering? Visit our{" "}
            <Link href="/sponsorship" className="font-semibold text-ink-soft hover:text-crimson">
              sponsorship page
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
