import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hbsai.club"),
  title: {
    default: "HBS AI Club",
    template: "%s · HBS AI Club",
  },
  description:
    "Harvard Business School’s student club for learning and building with AI.",
  openGraph: {
    title: "HBS AI Club",
    description:
      "The AI community at Harvard Business School.",
    siteName: "HBS AI Club",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "HBS AI Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HBS AI Club",
    description: "The AI community at Harvard Business School.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[120] rounded-full bg-crimson px-4 py-2 text-sm font-semibold text-white focus:not-sr-only"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
