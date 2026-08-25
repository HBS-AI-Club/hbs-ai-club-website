"use client";

import { useMemo, useState } from "react";
import type { Podcast, Resource } from "@/lib/notion";
import { Reveal } from "@/components/reveal";

const LOGO_OVERRIDES: Record<string, string> = {
  "karpathy.ai": "https://karpathy.ai/assets/me_new.jpg",
  "lennyspodcast.com":
    "https://substack-post-media.s3.amazonaws.com/public/images/1e8acd24-ffed-43b3-af00-52f14a10b272_2048x2048.png",
};

function SourceLogo({ link, name }: { link: string; name: string }) {
  const [failed, setFailed] = useState(false);
  let domain = "";

  try {
    domain = new URL(link).hostname.replace(/^www\./, "");
  } catch {
    domain = "";
  }

  const initial = name.replace(/^the\s+/i, "").charAt(0).toUpperCase() || "AI";
  const logoUrl =
    LOGO_OVERRIDES[domain] ||
    (domain
      ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`
      : "");

  return (
    <div
      className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden text-lg font-bold text-crimson"
      aria-hidden="true"
    >
      {logoUrl && !failed ? (
        // Source favicons are loaded from Google's public favicon endpoint.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="grid h-16 w-16 place-items-center rounded-full bg-crimson-soft">
          {initial}
        </span>
      )}
    </div>
  );
}

const PATHS = [
  {
    label: "Learn the basics",
    title: "Understand AI",
    description: "A short introduction to how today’s AI tools work.",
    time: "About 45 min",
    resourceNames: ["The AI Canon", "The Batch", "Building with Claude — Docs"],
    fallbackTopics: ["AI Strategy"],
  },
  {
    label: "Use AI at work",
    title: "See where AI helps",
    description: "Learn how teams use AI in products and daily work.",
    time: "About 60 min",
    resourceNames: ["The AI Canon", "Chip Huyen — Blog & AI Engineering", "The Batch"],
    fallbackTopics: ["AI Strategy", "Tools"],
  },
  {
    label: "Build something",
    title: "Make a simple prototype",
    description: "Follow a few guides and create a first project.",
    time: "2–3 hours",
    resourceNames: [
      "DeepLearning.AI Short Courses",
      "OpenAI Cookbook",
      "Hugging Face — Learn",
      "Neural Networks: Zero to Hero",
    ],
    fallbackTopics: ["Agents", "Prompting", "ML Fundamentals"],
  },
] as const;

export function LearningLibrary({
  resources,
  podcasts,
}: {
  resources: Resource[];
  podcasts: Podcast[];
}) {
  const [activePath, setActivePath] = useState(0);
  const selectedPath = PATHS[activePath];

  const pathResources = useMemo(() => {
    const exact = selectedPath.resourceNames
      .map((name) => resources.find((resource) => resource.name === name))
      .filter((resource): resource is Resource => Boolean(resource));

    if (exact.length >= 2) return exact.slice(0, 4);

    return resources
      .filter((resource) =>
        resource.topics.some((topic) =>
          selectedPath.fallbackTopics.some((pathTopic) => topic === pathTopic)
        )
      )
      .slice(0, 4);
  }, [resources, selectedPath]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal variant="slide-left">
          <div
            role="tablist"
            aria-label="Learning goals"
            className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line pb-4"
          >
            {PATHS.map((path, index) => {
              const active = index === activePath;
              return (
                <button
                  key={path.label}
                  type="button"
                  role="tab"
                  id={`path-tab-${index}`}
                  aria-selected={active}
                  aria-controls="learning-path-panel"
                  onClick={() => setActivePath(index)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-crimson text-white"
                      : "border border-line text-muted hover:border-muted hover:text-white"
                  }`}
                >
                  {path.label}
                </button>
              );
            })}
          </div>

          <div
            key={activePath}
            id="learning-path-panel"
            role="tabpanel"
            aria-labelledby={`path-tab-${activePath}`}
            className="learning-panel grid gap-10 py-12 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16"
          >
            <div>
              <div className="eyebrow text-crimson">{selectedPath.time}</div>
              <h2 className="mt-4 max-w-md font-display text-4xl leading-tight tracking-[-0.025em] sm:text-5xl">
                {selectedPath.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                {selectedPath.description}
              </p>
            </div>

            {pathResources.length > 0 ? (
              <ol className="grid gap-4 sm:grid-cols-2">
                {pathResources.map((resource) => (
                  <li key={resource.id}>
                    <a
                      href={resource.link || "/learn"}
                      target={resource.link ? "_blank" : undefined}
                      rel={resource.link ? "noopener noreferrer" : undefined}
                      className="motion-card group flex min-h-52 h-full flex-col rounded-2xl border border-line bg-paper-2 p-6 hover:bg-paper-3"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <SourceLogo link={resource.link} name={resource.source || resource.name} />
                        <span className="text-sm text-muted transition-colors group-hover:text-crimson">
                          ↗
                        </span>
                      </div>
                      <div className="mt-auto pt-8">
                        <h3 className="font-display text-2xl leading-tight text-ink group-hover:text-crimson">
                          {resource.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          {[resource.source, resource.type, resource.level]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="border-y border-line py-10 text-sm text-muted">
                This path is being refreshed. Check back soon.
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {podcasts.length > 0 && (
        <section className="border-t border-line bg-paper-2/50">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <Reveal variant="focus">
              <div>
                <div className="eyebrow text-crimson">Listen</div>
                <h2 className="mt-4 font-display text-4xl tracking-[-0.025em]">
                  Three podcasts we recommend.
                </h2>
              </div>
              <div className="mt-9 grid gap-4 md:grid-cols-3">
                {podcasts.slice(0, 3).map((podcast) => (
                  <a
                    key={podcast.id}
                    href={podcast.link || "/learn"}
                    target={podcast.link ? "_blank" : undefined}
                    rel={podcast.link ? "noopener noreferrer" : undefined}
                    className="motion-card group flex min-h-52 flex-col rounded-2xl border border-line bg-paper-2 p-6 hover:bg-paper-3"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <SourceLogo link={podcast.link} name={podcast.name} />
                      <span className="text-sm text-muted transition-colors group-hover:text-crimson">↗</span>
                    </div>
                    <div className="mt-auto pt-8">
                      <h3 className="font-display text-2xl leading-tight group-hover:text-crimson">
                        {podcast.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted">{podcast.hostGuest}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
