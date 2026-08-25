import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

const CLUB_PROGRAMS = ["Workshop", "Campus talk", "Member project"];

export const metadata = {
  title: "Sponsorship",
  description: "Partner with the Harvard Business School AI Club.",
};

export default function SponsorshipPage() {
  return (
    <div>
      <PageIntro
        eyebrow="Sponsorship"
        title={<>Partner with the <span className="text-crimson">HBS AI Club.</span></>}
        description="Help us run workshops, talks, and member programs."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal variant="scale">
          <div
            aria-label="How sponsorship works"
            className="overflow-hidden rounded-3xl border border-line bg-paper-2 px-7 py-10 sm:px-12 sm:py-12"
          >
          <div className="max-w-2xl">
            <div className="eyebrow text-crimson">How sponsorship works</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-0.025em]">
              One partnership, three ways to help.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_auto_1.15fr_auto_0.9fr] lg:items-stretch">
            <div className="motion-card flex min-h-48 flex-col justify-between rounded-2xl border border-line bg-paper-3 p-6">
              <div className="eyebrow text-muted">You provide</div>
              <p className="mt-8 font-display text-3xl leading-tight">
                Time, speakers, or funding.
              </p>
            </div>

            <div aria-hidden="true" className="grid place-items-center text-crimson">
              <span className="lg:hidden">↓</span>
              <span className="flow-arrow hidden lg:block">→</span>
            </div>

            <div className="motion-card rounded-2xl border border-crimson/25 bg-crimson-soft/50 p-6">
              <div className="eyebrow text-crimson">The club runs</div>
              <div className="mt-6 grid gap-3">
                {CLUB_PROGRAMS.map((program, index) => (
                  <div
                    key={program}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <span className="text-xs font-semibold text-crimson">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-ink">{program}</span>
                  </div>
                ))}
              </div>
            </div>

            <div aria-hidden="true" className="grid place-items-center text-crimson">
              <span className="lg:hidden">↓</span>
              <span className="flow-arrow hidden lg:block">→</span>
            </div>

            <div className="motion-card relative flex min-h-48 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-paper-3 p-6">
              <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full border border-crimson/20" />
              <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full border border-crimson/30" />
              <div className="eyebrow relative text-muted">Members reached</div>
              <div className="relative mt-8">
                <div className="font-display text-6xl text-crimson">400+</div>
                <p className="mt-1 text-sm text-ink-soft">HBS students</p>
              </div>
            </div>
          </div>
          </div>
        </Reveal>

        <Reveal delay={100} variant="slide-left">
          <div className="motion-card mt-10 grid gap-8 rounded-3xl border border-line bg-paper-2 px-7 py-10 sm:grid-cols-[1fr_auto] sm:items-center sm:px-12 sm:py-12">
            <div>
              <div className="eyebrow text-crimson">Let’s talk</div>
              <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-[-0.025em]">
                Interested in partnering?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Send us your name, organization, and idea. We will follow up.
              </p>
            </div>
            <a
              href="mailto:ai@studentclubs.hbs.edu?subject=HBS%20AI%20Club%20Sponsorship&body=Hi%20HBS%20AI%20Club%20team%2C%0A%0AName%3A%20%0AOrganization%3A%20%0APartnership%20idea%3A%20%0A%0ABest%2C"
              className="w-fit rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-dark"
            >
              Email us
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
