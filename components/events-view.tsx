"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EventItem, EventCategory } from "@/lib/notion";
import { CATEGORY_META, fmtDate, parseDate } from "@/lib/format";

type View = "calendar" | "agenda";
type Filter = "upcoming" | "past" | "all";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function EventsView({ events }: { events: EventItem[] }) {
  const now = useMemo(() => new Date(), []);
  const todayKey = ymd(now);

  const [view, setView] = useState<View>("agenda");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<EventItem | null>(null);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<EventCategory | "all">("all");

  const dated = useMemo(
    () => events.filter((e) => e.date) as (EventItem & { date: string })[],
    [events]
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dated.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      if (q && !`${e.name} ${e.speaker} ${e.company} ${e.location}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [dated, query, cat]);
  const upcoming = useMemo(
    () => filtered.filter((e) => e.date >= todayKey),
    [filtered, todayKey]
  );

  return (
    <div>
      {/* controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full border border-line bg-paper-2 p-1">
          {(["agenda", "calendar"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                view === v ? "bg-crimson text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {view === "agenda" && (
          <div className="inline-flex gap-1 text-sm">
            {(["upcoming", "past", "all"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1.5 capitalize transition-colors ${
                  filter === f
                    ? "bg-crimson text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                {f}
                {f === "upcoming" && upcoming.length > 0 ? ` (${upcoming.length})` : ""}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* search + category filter */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events, speakers, companies…"
          className="w-full rounded-full border border-line bg-paper px-4 py-2 text-sm focus:border-crimson sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["all", "All"],
              ["fireside", "Fireside"],
              ["technical", "Technical"],
              ["social", "Social"],
              ["workshop", "Workshop"],
            ] as [EventCategory | "all", string][]
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setCat(k)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                cat === k ? "bg-crimson text-white" : "bg-paper-2 text-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "calendar" && <Legend />}

      <div className="mt-6">
        {view === "agenda" ? (
          <Agenda
            dated={filtered}
            filter={filter}
            todayKey={todayKey}
            onPick={setSelected}
          />
        ) : (
          <CalendarView dated={filtered} todayKey={todayKey} onPick={setSelected} />
        )}
      </div>

      {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
      {Object.entries(CATEGORY_META)
        .filter(([k]) => k !== "other")
        .map(([k, m]) => (
          <span key={k} className="flex items-center gap-1.5 text-xs text-muted">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: m.color }}
            />
            {m.label}
          </span>
        ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Agenda */
function Agenda({
  dated,
  filter,
  todayKey,
  onPick,
}: {
  dated: (EventItem & { date: string })[];
  filter: Filter;
  todayKey: string;
  onPick: (e: EventItem) => void;
}) {
  const asc = (a: EventItem & { date: string }, b: EventItem & { date: string }) =>
    a.date.localeCompare(b.date);
  const desc = (a: EventItem & { date: string }, b: EventItem & { date: string }) =>
    b.date.localeCompare(a.date);

  const list =
    filter === "upcoming"
      ? dated.filter((e) => e.date >= todayKey).sort(asc)
      : filter === "past"
        ? dated.filter((e) => e.date < todayKey).sort(desc)
        : dated.slice().sort(desc);

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-paper-2 px-6 py-16 text-center">
        <p className="font-display text-xl">No {filter === "all" ? "" : filter} events to show</p>
        <p className="mt-2 text-sm text-muted">
          {filter === "upcoming"
            ? "The next season is being planned — check back soon, or join to get the invites."
            : "Nothing here yet."}
        </p>
      </div>
    );
  }

  // group by month
  const groups: { key: string; label: string; items: (EventItem & { date: string })[] }[] = [];
  for (const e of list) {
    const d = parseDate(e.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const label = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(d);
    let g = groups.find((x) => x.key === key);
    if (!g) groups.push((g = { key, label, items: [] }));
    g.items.push(e);
  }

  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <section key={g.key}>
          <h3 className="eyebrow sticky top-16 z-10 bg-paper/90 py-2 text-muted backdrop-blur">
            {g.label}
          </h3>
          <ul className="mt-2 divide-y divide-line border-t border-line">
            {g.items.map((e) => (
              <AgendaRow key={e.id} event={e} onPick={onPick} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function AgendaRow({ event, onPick }: { event: EventItem; onPick: (e: EventItem) => void }) {
  const meta = CATEGORY_META[event.category];
  const d = event.date ? parseDate(event.date) : null;
  return (
    <li>
      <button
        onClick={() => onPick(event)}
        className="group flex w-full items-start gap-5 py-5 text-left"
      >
        <div className="w-14 shrink-0 text-center">
          <div className="font-display text-2xl leading-none">{d ? d.getDate() : "—"}</div>
          <div className="mt-1 text-xs uppercase tracking-wide text-muted">
            {d ? fmtDate(event.date, "weekday") : ""}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-medium"
              style={{ background: meta.soft, color: meta.color }}
            >
              {meta.label}
            </span>
            {event.time && <span className="text-xs text-muted">{event.time}</span>}
          </div>
          <h4 className="mt-1.5 font-display text-lg leading-snug text-ink group-hover:text-crimson">
            {event.name}
          </h4>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-muted">
            {(event.speaker || event.company) && (
              <span>{[event.speaker, event.company].filter(Boolean).join(" · ")}</span>
            )}
            {event.location && <span>· {event.location}</span>}
          </div>
        </div>
        <span className="mt-1 hidden text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-crimson sm:block">
          →
        </span>
      </button>
    </li>
  );
}

/* -------------------------------------------------------------- Calendar */
function CalendarView({
  dated,
  todayKey,
  onPick,
}: {
  dated: (EventItem & { date: string })[];
  todayKey: string;
  onPick: (e: EventItem) => void;
}) {
  const byDay = useMemo(() => {
    const m: Record<string, EventItem[]> = {};
    for (const e of dated) (m[e.date] ??= []).push(e);
    return m;
  }, [dated]);

  // default to the most recent event's month
  const initial = useMemo(() => {
    const last = dated.length ? parseDate(dated[dated.length - 1].date) : new Date();
    return new Date(last.getFullYear(), last.getMonth(), 1);
  }, [dated]);
  const [cursor, setCursor] = useState(initial);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(cursor);

  const monthEventCount = dated.filter(
    (e) => e.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)
  ).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft hover:border-crimson hover:text-crimson"
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="text-center">
          <div className="font-display text-xl">{monthLabel}</div>
          <div className="text-xs text-muted">
            {monthEventCount} event{monthEventCount === 1 ? "" : "s"}
          </div>
        </div>
        <button
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft hover:border-crimson hover:text-crimson"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-line bg-line text-sm">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="bg-paper-2 py-2 text-center text-[11px] font-medium uppercase tracking-wide text-muted"
          >
            {w.slice(0, 1)}
            <span className="hidden sm:inline">{w.slice(1)}</span>
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="min-h-24 bg-paper-2/40" />;
          const key = ymd(date);
          const evs = byDay[key] ?? [];
          const isToday = key === todayKey;
          return (
            <div key={i} className="min-h-24 bg-paper p-1.5">
              <div
                className={`mb-1 text-right text-xs ${
                  isToday
                    ? "font-bold text-crimson"
                    : "text-muted"
                }`}
              >
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {evs.slice(0, 3).map((e) => {
                  const m = CATEGORY_META[e.category];
                  return (
                    <button
                      key={e.id}
                      onClick={() => onPick(e)}
                      title={e.name}
                      className="block w-full truncate rounded px-1.5 py-1 text-left text-[11px] leading-tight hover:opacity-80"
                      style={{ background: m.soft, color: m.color }}
                    >
                      {e.name}
                    </button>
                  );
                })}
                {evs.length > 3 && (
                  <div className="px-1 text-[10px] text-muted">+{evs.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Modal */
function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const meta = CATEGORY_META[event.category];
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-paper p-6 shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ background: meta.soft, color: meta.color }}
          >
            {meta.label}
          </span>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-paper-2 hover:text-ink"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <h3 className="mt-3 font-display text-2xl leading-tight">{event.name}</h3>

        <dl className="mt-4 space-y-2 text-sm">
          <Row label="When" value={`${fmtDate(event.date, "full")}${event.time ? ` · ${event.time}` : ""}`} />
          {event.location && <Row label="Where" value={event.location} />}
          {(event.speaker || event.company) && (
            <Row label="Speaker" value={[event.speaker, event.company].filter(Boolean).join(" · ")} />
          )}
          {event.coHosts && <Row label="Co-hosts" value={event.coHosts} />}
        </dl>

        {event.description && (
          <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-ink-soft">
            {event.description}
          </p>
        )}

        <Link
          href={`/events/${event.slug}`}
          className="mt-5 inline-block text-sm font-medium text-crimson hover:underline"
        >
          View full details →
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-20 shrink-0 text-muted">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
