// Notion CMS data layer for the HBS AI Club site.
// Uses the stable REST API (version 2022-06-28) via fetch — no SDK version surprises.

import { slugify } from "./format";

const TOKEN = process.env.NOTION_TOKEN;
const NOTION_VERSION = "2022-06-28";
const REVALIDATE = 60; // seconds; page-level ISR also set per route

export const DB = {
  events: "399d8dc3-9a12-813e-a0dc-c0227d025104",
  speakers: "399d8dc3-9a12-81d6-8d3d-d3f611f445e9",
  leadership: "399d8dc3-9a12-8138-a668-fa51e77f422f",
  podcasts: "399d8dc3-9a12-8117-bd80-db300cb43ce9",
  learning: "399d8dc3-9a12-8117-afd8-fd48efc10ff9",
} as const;

type Json = Record<string, unknown>;

async function notionQuery(dbId: string, body: Json): Promise<any[]> {
  if (!TOKEN) {
    console.warn("NOTION_TOKEN missing — returning empty result set");
    return [];
  }
  const results: any[] = [];
  let cursor: string | undefined = undefined;
  do {
    const res: Response = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, page_size: 100, start_cursor: cursor }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) {
      throw new Error(`Notion query ${dbId} failed: ${res.status} ${await res.text()}`);
    }
    const data: any = await res.json();
    results.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return results;
}

// ---- property extractors -------------------------------------------------
const P = (page: any) => page.properties ?? {};
const txt = (rt: any[]): string => (rt ?? []).map((x) => x.plain_text).join("");
const gTitle = (p: any, k: string) => txt(p[k]?.title ?? []);
const gRich = (p: any, k: string) => txt(p[k]?.rich_text ?? []);
const gDate = (p: any, k: string): string | null => p[k]?.date?.start ?? null;
const gSelect = (p: any, k: string): string => p[k]?.select?.name ?? "";
const gMulti = (p: any, k: string): string[] => (p[k]?.multi_select ?? []).map((o: any) => o.name);
const gCheck = (p: any, k: string): boolean => Boolean(p[k]?.checkbox);
const gUrl = (p: any, k: string): string => p[k]?.url ?? "";
const gNum = (p: any, k: string): number | null => p[k]?.number ?? null;
const gFile = (p: any, k: string): string | null => {
  const f = (p[k]?.files ?? [])[0];
  if (!f) return null;
  return f.type === "external" ? f.external.url : f.file?.url ?? null;
};

// ---- domain types --------------------------------------------------------
export type EventCategory = "fireside" | "technical" | "social" | "workshop" | "other";

export interface EventItem {
  id: string;
  slug: string;
  name: string;
  date: string | null;
  time: string;
  location: string;
  type: string;
  category: EventCategory;
  description: string;
  speaker: string;
  company: string;
  coHosts: string;
  cover: string | null;
}

export interface Speaker {
  id: string;
  slug: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  talk: string;
  linkedin: string;
  featured: boolean;
  headshot: string | null;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  classYear: string;
  tenure: string;
  bio: string;
  linkedin: string;
  photo: string | null;
  order: number;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  level: string;
  topics: string[];
  description: string;
  link: string;
  source: string;
}

export interface Podcast {
  id: string;
  name: string;
  category: string;
  hostGuest: string;
  date: string | null;
  link: string;
  description: string;
}

function categorize(type: string): EventCategory {
  const t = type.toLowerCase();
  if (t.includes("fireside")) return "fireside";
  if (t.includes("technical")) return "technical";
  if (t.includes("social")) return "social";
  if (t.includes("workshop")) return "workshop";
  return "other";
}

const PUBLISHED = { property: "Show on Website", checkbox: { equals: true } };

/** Assign a URL-safe, unique slug to each item (deterministic given stable order). */
function assignSlugs<T extends { name: string }>(items: T[]): (T & { slug: string })[] {
  const counts = new Map<string, number>();
  return items.map((it) => {
    const base = slugify(it.name) || "item";
    const n = counts.get(base) ?? 0;
    counts.set(base, n + 1);
    return { ...it, slug: n === 0 ? base : `${base}-${n + 1}` };
  });
}

// ---- fetchers ------------------------------------------------------------
export async function getEvents(): Promise<EventItem[]> {
  const rows = await notionQuery(DB.events, {
    filter: PUBLISHED,
    sorts: [{ property: "Date", direction: "ascending" }],
  });
  const items = rows.map((r) => {
    const p = P(r);
    const type = gSelect(p, "Type");
    return {
      id: r.id,
      name: gTitle(p, "Name"),
      date: gDate(p, "Date"),
      time: gRich(p, "Time"),
      location: gRich(p, "Location"),
      type,
      category: categorize(type),
      description: gRich(p, "Description"),
      speaker: gRich(p, "Speaker"),
      company: gRich(p, "Company"),
      coHosts: gRich(p, "Co-Hosts"),
      cover: gFile(p, "Cover Image"),
    };
  });
  return assignSlugs(items);
}

export async function getSpeakers(): Promise<Speaker[]> {
  const rows = await notionQuery(DB.speakers, { filter: PUBLISHED });
  return assignSlugs(
    rows
    .map((r) => {
      const p = P(r);
      return {
        id: r.id,
        name: gTitle(p, "Name"),
        title: gRich(p, "Title"),
        company: gRich(p, "Company"),
        bio: gRich(p, "Bio"),
        talk: gRich(p, "Talk"),
        linkedin: gUrl(p, "LinkedIn"),
        featured: gCheck(p, "Featured"),
        headshot: gFile(p, "Headshot"),
      };
    })
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name))
  );
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) ?? null;
}

export async function getSpeakerBySlug(slug: string): Promise<Speaker | null> {
  const speakers = await getSpeakers();
  return speakers.find((s) => s.slug === slug) ?? null;
}

/** Events whose Speaker field mentions this speaker's name. */
export function eventsForSpeaker(events: EventItem[], speakerName: string): EventItem[] {
  const n = speakerName.trim().toLowerCase();
  if (!n) return [];
  return events.filter((e) => e.speaker.toLowerCase().includes(n));
}

export async function getLeadership(): Promise<Leader[]> {
  const rows = await notionQuery(DB.leadership, { filter: PUBLISHED });
  return rows
    .map((r) => {
      const p = P(r);
      return {
        id: r.id,
        name: gTitle(p, "Name"),
        role: gRich(p, "Role"),
        classYear: gSelect(p, "Class Year"),
        tenure: gSelect(p, "Tenure"),
        bio: gRich(p, "Bio"),
        linkedin: gUrl(p, "LinkedIn"),
        photo: gFile(p, "Photo"),
        order: gNum(p, "Order") ?? 999,
      };
    })
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export async function getResources(): Promise<Resource[]> {
  const rows = await notionQuery(DB.learning, { filter: PUBLISHED });
  return rows.map((r) => {
    const p = P(r);
    return {
      id: r.id,
      name: gTitle(p, "Name"),
      type: gSelect(p, "Type"),
      level: gSelect(p, "Level"),
      topics: gMulti(p, "Topics"),
      description: gRich(p, "Description"),
      link: gUrl(p, "Link"),
      source: gRich(p, "Source"),
    };
  });
}

export async function getPodcasts(): Promise<Podcast[]> {
  const rows = await notionQuery(DB.podcasts, { filter: PUBLISHED });
  return rows.map((r) => {
    const p = P(r);
    return {
      id: r.id,
      name: gTitle(p, "Name"),
      category: gSelect(p, "Category"),
      hostGuest: gRich(p, "Host / Guest"),
      date: gDate(p, "Date"),
      link: gUrl(p, "Link"),
      description: gRich(p, "Description"),
    };
  });
}
