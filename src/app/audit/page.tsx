import type { Metadata } from "next";
import AuditForm from "@/components/audit/AuditForm";

export const metadata: Metadata = {
  title: "Audit Your AI Spend",
  description: "Enter your AI tools and get an instant, defensible spend audit in under 2 minutes.",
};

export default function AuditPage() {
  return <AuditForm />;
}
