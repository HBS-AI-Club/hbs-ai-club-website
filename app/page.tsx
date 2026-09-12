import Link from "next/link";
import { getSpeakers } from "@/lib/notion";
import { Hero } from "@/components/hero";
import { HomepageScrollRestoration } from "@/components/homepage-scroll-restoration";
import { Reveal } from "@/components/reveal";
import type { RevealVariant } from "@/components/reveal";
import { SiteChrome } from "@/components/site-chrome";
import { SpeakerCard } from "@/components/speaker-card";

export const revalidate = 60;

const PATHS = [
  {
    title: "Learn",
    description: "Use our short guides.",
    href: "/learn",
    reveal: "slide-left",
  },
  {
    title: "Hear from speakers",
    description: "Meet people who work with AI.",
    href: "/speakers",
    reveal: "scale",
  },
  {
    title: "Meet classmates",
    description: "Join the HBS AI community.",
    href: "/join",
    reveal: "slide-right",
  },
] satisfies Array<{
  title: string;
  description: string;
  href: string;
  reveal: RevealVariant;
}>;

export default async function Home() {
  const speakers = await getSpeakers();
  const featured = speakers.filter((speaker) => speaker.featured).slice(0, 3);

  return (
    <SiteChrome navVariant="overlay">
      <HomepageScrollRestoration />
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal variant="slide-left">
          <div className="grid gap-10 border-b border-line pb-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <h2 className="max-w-4xl font-display text-4xl leading-[1.03] tracking-[-0.03em] sm:text-6xl">
              What members can do.
            </h2>
            <div className="lg:justify-self-end">
              <p className="max-w-md text-base leading-relaxed text-ink-soft">
                Learn, hear from speakers, and meet classmates.
              </p>
              <div className="mt-6 flex gap-6 text-sm text-muted">
                <span><strong className="text-ink">400+</strong> members</span>
                <span><strong className="text-ink">30+</strong> programs</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3">
          {PATHS.map((path, index) => (
            <Reveal key={path.title} delay={index * 80} variant={path.reveal}>
              <Link
                href={path.href}
                className="motion-card group flex items-center justify-between gap-6 border-b border-line py-9 lg:block lg:border-b-0 lg:border-r lg:px-8 lg:py-12 first:lg:pl-0 last:lg:border-r-0 last:lg:pr-0"
              >
                <div>
                  <h3 className="font-display text-3xl tracking-[-0.02em]">
                    {path.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                    {path.description}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-muted transition-transform group-hover:translate-x-1 group-hover:text-crimson lg:mt-8 lg:inline-block">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="border-y border-line bg-paper-2/50">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <Reveal variant="slide-left">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="eyebrow text-crimson">Past speakers</div>
                  <h2 className="mt-3 font-display text-4xl tracking-[-0.025em]">
                    People who have joined us.
                  </h2>
                </div>
                <Link href="/speakers" className="hidden text-sm font-semibold text-ink-soft hover:text-crimson sm:block">
                  View all →
                </Link>
              </div>
            </Reveal>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {featured.map((speaker, index) => (
                <Reveal key={speaker.id} delay={index * 70} variant="scale">
                  <SpeakerCard speaker={speaker} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal variant="focus">
          <div className="motion-card flex flex-col gap-8 rounded-3xl border border-line bg-paper-2 px-7 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-12">
            <div>
              <h2 className="font-display text-4xl tracking-[-0.025em]">Ready to join?</h2>
              <p className="mt-2 text-sm text-muted">Open to every HBS student and registered partner.</p>
            </div>
            <Link
              href="/join"
              className="w-fit rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
            >
              Join HBS AI Club
            </Link>
          </div>
        </Reveal>
      </section>
    </SiteChrome>
  );
}
