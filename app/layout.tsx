import type { Metadata } from "next";
import { Fraunces, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

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
    "The Harvard Business School Artificial Intelligence Club — fireside chats, technical learning, and community at the frontier of AI and business.",
  openGraph: {
    title: "HBS AI Club",
    description:
      "Where business meets artificial intelligence. Fireside chats, technical learning, and community at Harvard Business School.",
    siteName: "HBS AI Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HBS AI Club",
    description: "Where business meets artificial intelligence — at Harvard Business School.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
