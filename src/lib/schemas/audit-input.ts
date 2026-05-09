/**
 * Zod Validation Schemas for Audit Input
 * Shared between frontend form validation and backend API validation.
 * Compatible with Zod v4 + React Hook Form.
 */

import { z } from "zod";

export const TOOL_NAMES = [
  "cursor",
  "github-copilot",
  "claude",
  "chatgpt",
  "anthropic-api",
  "openai-api",
  "gemini",
  "v0",
  "windsurf",
] as const;

export const USE_CASES = [
  "coding",
  "writing",
  "data",
  "research",
  "mixed",
] as const;

export const ToolInputSchema = z.object({
  id: z.string().min(1),
  tool: z.enum(TOOL_NAMES),
  plan: z.string().min(1, "Please select a plan"),
  monthlySpend: z
    .number()
    .positive("Monthly spend must be greater than $0"),
  seats: z
    .number()
    .int()
    .min(1, "Must have at least 1 seat"),
});

export const AuditInputSchema = z.object({
  tools: z
    .array(ToolInputSchema)
    .min(1, "Add at least one AI tool to audit"),
  teamSize: z
    .number()
    .int()
    .min(1, "Team size must be at least 1"),
  useCase: z.enum(USE_CASES),
});

export type AuditInputFormValues = z.infer<typeof AuditInputSchema>;

// Lead capture form schema
export const LeadCaptureSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  honeypot: z.string().max(0, "Bot detected"), // must be empty
});

export type LeadCaptureFormValues = z.infer<typeof LeadCaptureSchema>;
