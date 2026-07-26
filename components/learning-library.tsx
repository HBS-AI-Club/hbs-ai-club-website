"use client";

import { useMemo, useState } from "react";
import type { Podcast, Resource } from "@/lib/notion";

const ALL = "All";

const PATHS = [
  {
    label: "New to AI",
    title: "Build your foundation",
    description: "Plain-English context before the technical details.",
    topic: "AI Strategy",
    accent: "text-crimson",
  },
  {
    label: "Product & strategy",
    title: "Make better AI bets",
    description: "Frameworks for products, teams, and defensibility.",
    topic: "Tools",
    accent: "text-electric",
  },
  {
    label: "Ready to build",
    title: "Go from prompt to prototype",
    description: "Hands-on guides for LLMs, agents, and applications.",
    topic: "Agents",
    accent: "text-[#79bfff]",
  },
];

export function LearningLibrary({
  resources,
  podcasts,
}: {
  resources: Resource[];
  podcasts: Podcast[];
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [level, setLevel] = useState(ALL);

  const topics = useMemo(
    () => [ALL, ...Array.from(new Set(resources.flatMap((resource) => resource.topics)))],
    [resources]
  );
  const types = useMemo(
    () => [ALL, ...Array.from(new Set(resources.map((resource) => resource.type).filter(Boolean)))],
    [resources]
  );
  const levels = useMemo(
    () => [ALL, ...Array.from(new Set(resources.map((resource) => resource.level).filter(Boolean)))],
    [resources]
  );

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const searchable = [
        resource.name,
        resource.description,
        resource.source,
        resource.type,
        resource.level,
        ...resource.topics,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (topic === ALL || resource.topics.includes(topic)) &&
        (type === ALL || resource.type === type) &&
        (level === ALL || resource.level === level)
      );
    });
  }, [resources, query, topic, type, level]);

  const hasFilters = query || topic !== ALL || type !== ALL || level !== ALL;

  function resetFilters() {
    setQuery("");
    setTopic(ALL);
    setType(ALL);
    setLevel(ALL);
  }

  function choosePath(pathTopic: string) {
    setQuery("");
    setType(ALL);
    setLevel(ALL);
    setTopic(topics.includes(pathTopic) ? pathTopic : ALL);
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="eyebrow text-muted">Choose a starting point</div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PATHS.map((path, index) => (
            <button
              key={path.label}
              type="button"
              onClick={() => choosePath(path.topic)}
              className="hairline-card group rounded-2xl p-6 text-left transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className={`eyebrow ${path.accent}`}>{path.label}</span>
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
              </div>
              <h2 className="mt-10 font-instrument text-2xl">{path.title}</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                {path.description}
              </p>
              <span className="mt-6 inline-block text-sm font-semibold text-ink-soft transition-transform group-hover:translate-x-1">
                Browse this path →
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="library" className="border-y border-line bg-paper-2/65 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <div className="eyebrow text-crimson">Resource library</div>
              <h2 className="mt-3 font-instrument text-4xl tracking-tight sm:text-5xl">
                Find what you need.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Filter by the question you are trying to answer, not by what the
                algorithm thinks will keep you scrolling.
              </p>
            </div>

            <div>
              <label className="block">
                <span className="sr-only">Search resources</span>
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-5 py-4 focus-within:border-crimson">
                  <span aria-hidden className="font-mono text-sm text-muted">
                    /
                  </span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search courses, topics, or sources"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="text-xs font-semibold uppercase tracking-wider text-muted hover:text-ink"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </label>

              <div className="mt-5 space-y-4">
                <FilterRow label="Topic" options={topics} value={topic} onChange={setTopic} />
                <FilterRow label="Format" options={types} value={type} onChange={setType} />
                <FilterRow label="Level" options={levels} value={level} onChange={setLevel} />
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-b border-line pb-4">
            <p className="text-xs uppercase tracking-[0.15em] text-muted">
              {visible.length} {visible.length === 1 ? "resource" : "resources"}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-crimson hover:text-ink"
              >
                Reset filters
              </button>
            )}
          </div>

          {visible.length === 0 ? (
            <div className="rounded-b-3xl border-x border-b border-dashed border-line px-6 py-20 text-center">
              <p className="font-instrument text-2xl">No exact match.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 text-sm font-semibold text-crimson"
              >
                Clear the filters and keep exploring
              </button>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden rounded-b-3xl border-x border-b border-line bg-line md:grid-cols-2">
              {visible.map((resource, index) => (
                <a
                  key={resource.id}
                  href={resource.link || "/learn"}
                  target={resource.link ? "_blank" : undefined}
                  rel={resource.link ? "noopener noreferrer" : undefined}
                  className="group flex min-h-72 flex-col bg-paper p-6 transition-colors hover:bg-paper-3 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {resource.type && (
                        <span className="rounded-full bg-crimson-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-crimson">
                          {resource.type}
                        </span>
                      )}
                      {resource.level && (
                        <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                          {resource.level}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-10 max-w-md font-instrument text-2xl leading-tight group-hover:text-crimson">
                    {resource.name}
                  </h3>
                  {resource.source && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                      {resource.source}
                    </p>
                  )}
                  {resource.description && (
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {resource.description}
                    </p>
                  )}
                  <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <div className="flex flex-wrap gap-1.5">
                      {resource.topics.map((resourceTopic) => (
                        <span
                          key={resourceTopic}
                          className="text-[11px] text-muted before:mr-1 before:text-line before:content-['#']"
                        >
                          {resourceTopic}
                        </span>
                      ))}
                    </div>
                    <span className="text-lg text-ink-soft transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {podcasts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <div className="eyebrow text-electric">Listen on the go</div>
              <h2 className="mt-3 font-instrument text-4xl tracking-tight sm:text-5xl">
                Keep the signal. Skip the feed.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Five shows that reliably make the commute, workout, or walk across
                campus more interesting.
              </p>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {podcasts.map((podcast, index) => (
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
                    <p className="mt-1 text-sm text-muted">
                      {podcast.hostGuest}
                      {podcast.description ? ` · ${podcast.description}` : ""}
                    </p>
                  </div>
                  <span className="hidden text-ink-soft transition-transform group-hover:translate-x-1 sm:block">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-12 shrink-0 pt-2 text-[10px] font-bold uppercase tracking-wider text-muted">
        {label}
      </span>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              value === option
                ? "bg-ink text-paper"
                : "border border-line text-muted hover:border-muted hover:text-ink"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
