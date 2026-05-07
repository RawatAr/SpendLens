// ─── Tool & Plan Types ────────────────────────────────────────────────────────

export type ToolName =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "v0"
  | "windsurf";

export type UseCaseType = "coding" | "writing" | "data" | "research" | "mixed";

export type SavingsTier = "high" | "medium" | "low" | "optimal";

export type RecommendationType = "keep" | "downgrade" | "switch" | "optimize";

export type ConfidenceLevel = "high" | "medium" | "low";

// ─── Input Types ──────────────────────────────────────────────────────────────

export interface ToolInput {
  id: string; // local uuid for react key
  tool: ToolName;
  plan: string;
  monthlySpend: number; // USD, user-entered (ground truth)
  seats: number;
}

export interface AuditInput {
  tools: ToolInput[];
  teamSize: number;
  useCase: UseCaseType;
}

// ─── Output Types ─────────────────────────────────────────────────────────────

export interface ToolAuditResult {
  toolId: string; // matches ToolInput.id
  tool: ToolName;
  toolDisplayName: string;
  currentPlan: string;
  currentMonthlyCost: number;
  recommendation: RecommendationType;
  recommendedAction: string; // plain English explanation
  monthlySavings: number;
  annualSavings: number;
  confidence: ConfidenceLevel;
  credexAvailable: boolean;
  annualBillingSavings?: number; // savings if switching to annual billing
  apiOptimizationTips?: string[]; // for API-direct tools
}

export interface AggregateAuditResult {
  tools: ToolAuditResult[];
  totalMonthlyCurrent: number;
  totalMonthlyOptimized: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  savingsTier: SavingsTier;
  teamSize: number;
  useCase: UseCaseType;
  generatedAt: string; // ISO timestamp
}

// ─── Database Record Types ────────────────────────────────────────────────────

export interface AuditRecord {
  id: string;
  toolsSnapshot: ToolAuditResult[];
  savingsTier: SavingsTier;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  createdAt: string;
}

export interface LeadRecord {
  id: string;
  auditId: string;
  email: string;
  companyName?: string;
  role?: string;
  monthlySavings: number;
  savingsTier: SavingsTier;
  ipHash: string;
  createdAt: string;
}

// ─── Plan Definition ──────────────────────────────────────────────────────────

export interface PlanDefinition {
  id: string;
  name: string;
  pricePerSeat: number; // monthly USD
  minSeats?: number;
  maxSeats?: number;
  annualDiscountPct?: number; // e.g. 16 = 16% off
  isUsageBased?: boolean;
  bestFor?: UseCaseType[];
}

export interface ToolDefinition {
  id: ToolName;
  name: string;
  plans: PlanDefinition[];
  credexAvailable: boolean;
  category: "coding" | "writing" | "general" | "api";
}
