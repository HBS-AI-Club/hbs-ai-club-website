import { SiteChrome } from "@/components/site-chrome";

export default function WithNavLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteChrome className="cinematic-surface">{children}</SiteChrome>;
}
