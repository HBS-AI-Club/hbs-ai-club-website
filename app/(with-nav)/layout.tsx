import { Nav } from "@/components/nav";

// Shared chrome for every page EXCEPT the homepage, which carries its own
// glassmorphic nav inside the video hero.
export default function WithNavLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
