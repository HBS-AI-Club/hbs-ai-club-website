export default function WithNavLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="cinematic-surface">{children}</div>;
}
