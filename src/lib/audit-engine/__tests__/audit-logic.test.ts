import { describe, it, expect } from 'vitest';
import { runAudit } from '../index';
import type { AuditInput } from '@/types/audit';

describe('Audit Engine Core Logic', () => {
  it('should identify savings for Cursor Business with small team', () => {
    const input: AuditInput = {
      teamSize: 2,
      useCase: 'coding',
      tools: [
        { id: '1', tool: 'cursor', plan: 'business', monthlySpend: 80, seats: 2 }
      ]
    };
    
    const result = runAudit(input);
    const cursorResult = result.tools[0];
    
    expect(cursorResult.recommendation).toBe('downgrade');
    expect(cursorResult.monthlySavings).toBeGreaterThan(0);
    expect(result.totalMonthlySavings).toBe(40); // (40 - 20) * 2
  });

  it('should recommend Claude Pro over Team for < 5 seats', () => {
    const input: AuditInput = {
      teamSize: 3,
      useCase: 'coding',
      tools: [
        { id: '2', tool: 'claude', plan: 'team', monthlySpend: 150, seats: 5 } // Claude Team min 5 seats
      ]
    };
    
    const result = runAudit(input);
    expect(result.tools[0].recommendation).toBe('downgrade');
    expect(result.tools[0].monthlySavings).toBe(90); // 150 - (20 * 3) = 90 savings
  });

  it('should identify annual billing opportunity for ChatGPT Plus', () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: 'writing',
      tools: [
        { id: '3', tool: 'chatgpt', plan: 'plus', monthlySpend: 20, seats: 1 }
      ]
    };
    
    const result = runAudit(input);
    // Plus has 0% annual discount in my data, so it should be keep
    expect(result.tools[0].recommendation).toBe('keep');
  });

  it('should remain optimal for well-configured stacks', () => {
    const input: AuditInput = {
      teamSize: 10,
      useCase: 'coding',
      tools: [
        { id: '4', tool: 'cursor', plan: 'pro', monthlySpend: 200, seats: 10 }
      ]
    };
    
    const result = runAudit(input);
    expect(result.savingsTier).toBe('optimal');
    expect(result.totalMonthlySavings).toBe(0);
  });

  it('should handle multiple tools and aggregate correctly', () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: 'coding',
      tools: [
        { id: '5', tool: 'cursor', plan: 'business', monthlySpend: 40, seats: 1 },
        { id: '6', tool: 'github-copilot', plan: 'business', monthlySpend: 19, seats: 1 }
      ]
    };
    
    const result = runAudit(input);
    expect(result.totalMonthlySavings).toBe(20 + 9); // Cursor (20) + Copilot (9)
    expect(result.totalAnnualSavings).toBe((20 + 9) * 12);
  });
});
