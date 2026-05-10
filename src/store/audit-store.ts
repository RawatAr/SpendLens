/**
 * Zustand Store — Global State Management
 *
 * Slices:
 * - formState: tool inputs + global audit inputs
 * - auditResult: computed audit result
 * - auditId: Supabase-stored audit record ID
 * - sessionRestored: flag for session restore banner
 *
 * Persisted to localStorage with versioned key "spendlens-v1"
 */

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { AuditInput, AggregateAuditResult, ToolInput } from "@/types/audit";

interface AuditStore {
  // ── Form State ──────────────────────────────────────────────────────────────
  formState: AuditInput;
  setFormState: (state: Partial<AuditInput>) => void;
  addTool: () => void;
  removeTool: (id: string) => void;
  updateTool: (id: string, updates: Partial<ToolInput>) => void;
  resetForm: () => void;

  // ── Audit Result ────────────────────────────────────────────────────────────
  auditResult: AggregateAuditResult | null;
  setAuditResult: (result: AggregateAuditResult) => void;
  clearAuditResult: () => void;

  // ── Audit ID (Supabase record) ───────────────────────────────────────────────
  auditId: string | null;
  setAuditId: (id: string) => void;

  // ── Session Restore ──────────────────────────────────────────────────────────
  sessionRestored: boolean;
  setSessionRestored: (value: boolean) => void;
  hasPreviousSession: boolean;
  setHasPreviousSession: (value: boolean) => void;
}

const defaultTool = (): ToolInput => ({
  id: nanoid(),
  tool: "cursor",
  plan: "pro",
  monthlySpend: 0,
  seats: 1,
});

const defaultFormState: AuditInput = {
  tools: [defaultTool()],
  teamSize: 5,
  useCase: "coding",
};

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      // ── Form State ────────────────────────────────────────────────────────────
      formState: defaultFormState,
      setFormState: (updates) =>
        set((s) => ({ formState: { ...s.formState, ...updates } })),
      addTool: () =>
        set((s) => ({
          formState: {
            ...s.formState,
            tools: [...s.formState.tools, defaultTool()],
          },
        })),
      removeTool: (id) =>
        set((s) => ({
          formState: {
            ...s.formState,
            tools: s.formState.tools.filter((t) => t.id !== id),
          },
        })),
      updateTool: (id, updates) =>
        set((s) => ({
          formState: {
            ...s.formState,
            tools: s.formState.tools.map((t) =>
              t.id === id ? { ...t, ...updates } : t
            ),
          },
        })),
      resetForm: () =>
        set({
          formState: defaultFormState,
          auditResult: null,
          auditId: null,
          sessionRestored: false,
        }),

      // ── Audit Result ──────────────────────────────────────────────────────────
      auditResult: null,
      setAuditResult: (result) => set({ auditResult: result }),
      clearAuditResult: () => set({ auditResult: null }),

      // ── Audit ID ──────────────────────────────────────────────────────────────
      auditId: null,
      setAuditId: (id) => set({ auditId: id }),

      // ── Session Restore ───────────────────────────────────────────────────────
      sessionRestored: false,
      setSessionRestored: (value) => set({ sessionRestored: value }),
      hasPreviousSession: false,
      setHasPreviousSession: (value) => set({ hasPreviousSession: value }),
    }),
    {
      name: "spendlens-v1",
      storage: createJSONStorage(() => localStorage),
      // Only persist form state and audit result — not UI flags
      partialize: (state) => ({
        formState: state.formState,
        auditResult: state.auditResult,
        auditId: state.auditId,
      }),
    }
  )
);
