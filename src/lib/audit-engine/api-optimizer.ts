/**
 * Audit Engine — API Usage Optimization Tips
 *
 * For usage-based API tools (Anthropic API, OpenAI API),
 * recommend optimization strategies instead of plan switches.
 */

import type { ToolName } from "@/types/audit";

const API_TOOLS: Set<ToolName> = new Set(["anthropic-api", "openai-api"]);

export function isApiTool(tool: ToolName): boolean {
  return API_TOOLS.has(tool);
}

export function getApiOptimizationTips(tool: ToolName): string[] {
  if (tool === "anthropic-api") {
    return [
      "Enable prompt caching for repeated context blocks — can reduce costs by 70–90% for long system prompts.",
      "Use Claude Haiku for classification, routing, and simple extraction tasks — ~25x cheaper than Sonnet.",
      "Batch non-real-time requests using the Batch API (50% cost reduction on eligible requests).",
      "Set max_tokens limits to avoid runaway completions — cap to your actual expected output length.",
      "Audit your system prompt length — every token in system prompts is charged on every request.",
    ];
  }

  if (tool === "openai-api") {
    return [
      "Use gpt-4o-mini instead of gpt-4o for classification, summarization, and extraction — 15x cheaper per token.",
      "Enable prompt caching for system prompts — OpenAI caches prompts >1024 tokens at a 50% discount.",
      "Use the Batch API for async workloads — 50% off vs synchronous API pricing.",
      "Reduce max_tokens to match your expected output — unused token budget is not billed but poor estimates inflate context.",
      "Consider Assistants API file search vs embedding all context manually — more cost-efficient for RAG patterns.",
    ];
  }

  return [];
}
