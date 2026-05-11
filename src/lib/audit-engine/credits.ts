/**
 * Audit Engine — Credex Credits Flag
 *
 * For tools that Credex carries discounted credits for,
 * attach a flag and estimated savings opportunity.
 */

import type { ToolName } from "@/types/audit";

// Tools that Credex currently carries discounted credits for
const CREDEX_TOOLS: Set<ToolName> = new Set([
  "cursor",
  "claude",
  "chatgpt",
  "anthropic-api",
  "openai-api",
]);

export function isCredexAvailable(tool: ToolName): boolean {
  return CREDEX_TOOLS.has(tool);
}
