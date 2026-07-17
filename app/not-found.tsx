import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center">
      <div className="eyebrow text-crimson">404</div>
      <h1 className="mt-3 font-display text-5xl leading-tight">Page not found</h1>
      <p className="mt-4 text-lg text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-crimson px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-crimson-dark"
        >
          Back home
        </Link>
        <Link
          href="/events"
          className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40"
        >
          Browse events
        </Link>
      </div>
    </div>
  );
}
