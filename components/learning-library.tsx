"use client";

import { useMemo, useState } from "react";
import type { Podcast, Resource } from "@/lib/notion";

const PATHS = [
  {
    label: "New to AI",
    title: "Understand the landscape",
    description: "Build a useful mental model before going deeper.",
    time: "45 minutes",
    outcome: "Understand the major capabilities, players, and business questions.",
    resourceNames: ["The AI Canon", "The Batch", "Building with Claude — Docs"],
    fallbackTopics: ["AI Strategy"],
    accent: "text-crimson",
  },
  {
    label: "Product & strategy",
    title: "Make better AI bets",
    description: "Connect technical shifts to products, teams, and defensibility.",
    time: "60 minutes",
    outcome: "Ask sharper questions about an AI product, company, or operating plan.",
    resourceNames: ["The AI Canon", "Chip Huyen — Blog & AI Engineering", "The Batch"],
    fallbackTopics: ["AI Strategy", "Tools"],
    accent: "text-electric",
  },
  {
    label: "Ready to build",
    title: "Go from prompt to prototype",
    description: "Use practical guides to create a working first project.",
    time: "2–3 hours",
    outcome: "Build a prototype and understand how modern AI applications fit together.",
    resourceNames: [
      "DeepLearning.AI Short Courses",
      "OpenAI Cookbook",
      "Hugging Face — Learn",
      "Neural Networks: Zero to Hero",
    ],
    fallbackTopics: ["Agents", "Prompting", "ML Fundamentals"],
    accent: "text-[#f2bd74]",
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

    if (exact.length >= 2) return exact;

    return resources
      .filter((resource) =>
        resource.topics.some((resourceTopic) =>
          selectedPath.fallbackTopics.some((pathTopic) => resourceTopic === pathTopic)
        )
      )
      .slice(0, 4);
  }, [resources, selectedPath]);

  function choosePath(index: number) {
    setActivePath(index);
    requestAnimationFrame(() => {
      document.getElementById("selected-path")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="eyebrow text-muted">Choose one path</div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PATHS.map((path, index) => {
            const active = activePath === index;
            return (
              <button
                key={path.label}
                type="button"
                onClick={() => choosePath(index)}
                aria-pressed={active}
                className={`hairline-card group rounded-2xl p-6 text-left transition-all hover:-translate-y-1 ${
                  active ? "border-crimson/70 bg-paper-3" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`eyebrow ${path.accent}`}>{path.label}</span>
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                </div>
                <h2 className="mt-8 font-instrument text-2xl">{path.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {path.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="text-ink-soft">{path.time}</span>
                  <span className={active ? "text-crimson" : "text-muted"}>
                    {active ? "Selected" : "View →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div
          id="selected-path"
          className="scroll-mt-24 mt-6 overflow-hidden rounded-3xl border border-line bg-paper-2"
        >
          <div className="grid gap-5 border-b border-line px-6 py-7 lg:grid-cols-[0.72fr_1.28fr] sm:px-8">
            <div>
              <div className={`eyebrow ${selectedPath.accent}`}>Selected path</div>
              <h2 className="mt-2 font-instrument text-3xl">{selectedPath.title}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-ink-soft lg:self-end">
              {selectedPath.outcome}
            </p>
          </div>

          {pathResources.length > 0 ? (
            <ol className="divide-y divide-line">
              {pathResources.map((resource, index) => (
                <li key={resource.id}>
                  <a
                    href={resource.link || "/learn"}
                    target={resource.link ? "_blank" : undefined}
                    rel={resource.link ? "noopener noreferrer" : undefined}
                    className="group grid gap-3 px-6 py-5 transition-colors hover:bg-paper-3 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center sm:px-8"
                  >
                    <span className="font-mono text-xs text-crimson">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-instrument text-xl group-hover:text-crimson">
                        {resource.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {[resource.source, resource.type, resource.level]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <span className="hidden text-sm text-ink-soft sm:block">Open ↗</span>
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <p className="px-8 py-10 text-sm text-muted">
              This path is being refreshed. Check back soon.
            </p>
          )}
        </div>
      </section>

      {podcasts.length > 0 && (
        <section className="border-t border-line bg-paper-2/55">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <div className="eyebrow text-electric">Listen on the go</div>
              <h2 className="mt-3 font-instrument text-4xl tracking-tight">
                Three shows worth your time.
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {podcasts.slice(0, 3).map((podcast, index) => (
                <a
                  key={podcast.id}
                  href={podcast.link || "/learn"}
                  target={podcast.link ? "_blank" : undefined}
                  rel={podcast.link ? "noopener noreferrer" : undefined}
                  className="group grid gap-3 py-5 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center sm:gap-5"
                >
                  <span className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-instrument text-xl group-hover:text-electric">
                      {podcast.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{podcast.hostGuest}</p>
                  </div>
                  <span className="hidden text-ink-soft sm:block">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
