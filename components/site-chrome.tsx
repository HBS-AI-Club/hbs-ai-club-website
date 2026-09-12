import { Footer } from "@/components/footer";
import { Nav, type NavVariant } from "@/components/nav";

export function SiteChrome({
  children,
  navVariant = "solid",
  className = "",
}: Readonly<{
  children: React.ReactNode;
  navVariant?: NavVariant;
  className?: string;
}>) {
  return (
    <>
      <Nav variant={navVariant} />
      <main id="main-content" className={`flex-1 ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
