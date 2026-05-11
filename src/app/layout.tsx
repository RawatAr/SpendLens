import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/Navbar";
import { CurrencyProvider } from "@/context/currency-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://spendlens.io"),
  title: {
    default: "SpendLens — AI Spend Audit Tool",
    template: "%s | SpendLens",
  },
  description:
    "Get an instant audit of your AI tool spend. Discover overspend, find cheaper alternatives, and calculate real monthly savings — free, no login required.",
  keywords: [
    "AI spend audit",
    "Cursor pricing",
    "Claude pricing",
    "AI tool cost optimization",
    "startup AI spending",
    "ChatGPT alternatives",
    "GitHub Copilot audit",
  ],
  authors: [{ name: "SpendLens by Credex" }],
  creator: "Credex",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://spendlens.io",
    siteName: "SpendLens",
    title: "SpendLens — AI Spend Audit Tool",
    description:
      "Find out if you're overpaying for AI tools. Get an instant audit with real savings numbers — free, no login.",
    images: [
      {
        url: "/api/og?savings=1250&annual=15000&tier=high&tools=Cursor,Claude,ChatGPT",
        width: 1200,
        height: 630,
        alt: "SpendLens AI Spend Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpendLens — AI Spend Audit Tool",
    description:
      "Find out if you're overpaying for AI tools. Free instant audit — no login required.",
    images: [
      "/api/og?savings=1250&annual=15000&tier=high&tools=Cursor,Claude,ChatGPT",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#F7F8F6]">
        <CurrencyProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" theme="light" />
        </CurrencyProvider>
      </body>
    </html>
  );
}
