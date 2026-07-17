import { initials } from "@/lib/format";

/** Circular avatar: shows a photo if present, else initials on a soft crimson tint. */
export function Avatar({
  name,
  src,
  size = 64,
}: {
  name: string;
  src?: string | null;
  size?: number;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full font-display font-semibold text-crimson"
      style={{
        width: size,
        height: size,
        background: "var(--color-crimson-soft)",
        fontSize: size * 0.36,
      }}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
