import type { Metadata } from "next";
import ResultsPage from "@/components/results/ResultsPage";

export const metadata: Metadata = {
  title: "Your AI Spend Audit Results",
  description: "See your personalized AI tool spend audit — savings opportunities, recommendations, and next steps.",
  robots: { index: false, follow: false }, // Results are personal, don't index
};

export default function Results() {
  return <ResultsPage />;
}
