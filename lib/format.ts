import type { EventCategory } from "./notion";

export const CATEGORY_META: Record<
  EventCategory,
  { label: string; color: string; soft: string }
> = {
  fireside: { label: "Fireside Chat", color: "#a51c30", soft: "#f4e3e5" },
  technical: { label: "Technical Learning", color: "#1f5e8b", soft: "#e2edf4" },
  social: { label: "Social", color: "#b5762a", soft: "#f6ecdd" },
  workshop: { label: "Workshop", color: "#6b4a9c", soft: "#ece4f5" },
  other: { label: "Event", color: "#4a4540", soft: "#eeece7" },
};

/** Parse a Notion date. Date-only strings are anchored at local noon to dodge
 *  timezone off-by-one errors. */
export function parseDate(iso: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d, 12);
  }
  return new Date(iso);
}

export function fmtDate(
  iso: string | null,
  style: "full" | "medium" | "monthDay" | "weekday" = "full"
): string {
  if (!iso) return "Date TBD";
  const d = parseDate(iso);
  const opts: Intl.DateTimeFormatOptions =
    style === "full"
      ? { weekday: "long", month: "long", day: "numeric", year: "numeric" }
      : style === "medium"
        ? { month: "short", day: "numeric", year: "numeric" }
        : style === "monthDay"
          ? { month: "short", day: "numeric" }
          : { weekday: "short" };
  return new Intl.DateTimeFormat("en-US", opts).format(d);
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Strip a leading internal club tag like "[AI Club] " from an event title. */
export function displayTitle(name: string): string {
  return name.replace(/^\s*\[[^\]]+\]\s*/, "").trim() || name;
}

/** Clean a company name for display (drop parentheticals like "Microsoft (Azure AIOps)"). */
export function cleanCompany(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}
