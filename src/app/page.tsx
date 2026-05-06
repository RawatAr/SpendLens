import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import DemoPreview from "@/components/landing/DemoPreview";
import AIInsights from "@/components/landing/AIInsights";
import SavingsExamples from "@/components/landing/SavingsExamples";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/layout/Footer";
import { SectionConnectivity } from "@/components/ui/section-connectivity";

export const metadata: Metadata = {
  title: "SpendLens — AI Spend Audit Tool",
  description:
    "Get an instant audit of your AI tool spend. Discover overspend, find cheaper alternatives, and calculate real monthly savings — free, no login required.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <DemoPreview />
      <AIInsights />
      <SavingsExamples />
      <FinalCTA />
      <Footer />
    </main>
  );
}
