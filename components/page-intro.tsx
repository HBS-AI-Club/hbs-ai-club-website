import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <header className="page-intro relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="intro-eyebrow eyebrow text-crimson">{eyebrow}</div>
        <h1 className="intro-title mt-5 max-w-4xl font-display text-5xl leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="intro-copy mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
          {description}
        </p>
      </div>
    </header>
  );
}
