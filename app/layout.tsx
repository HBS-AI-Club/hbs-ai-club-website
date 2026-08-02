import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://hbs-ai-club-website.vercel.app"
  ),
  title: {
    default: "HBS AI Club",
    template: "%s · HBS AI Club",
  },
  description:
    "The Harvard Business School Artificial Intelligence Club—technical learning, candid conversations, and community at the frontier of AI and business.",
  openGraph: {
    title: "HBS AI Club",
    description:
      "Where business meets artificial intelligence. Technical learning, candid conversations, and community at Harvard Business School.",
    siteName: "HBS AI Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HBS AI Club",
    description: "Where business meets artificial intelligence—at Harvard Business School.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[120] rounded-full bg-crimson px-4 py-2 text-sm font-semibold text-white focus:not-sr-only"
        >
          Skip to content
        </a>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
