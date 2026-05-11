# TESTS.md

## Automated Test Suite
I have implemented a suite of Jest unit tests covering the core logic of the `Audit Engine`. These tests ensure that the math, plan-fit rules, and savings calculations are accurate and defensible.

### Test Files
1. **`src/lib/audit-engine/__tests__/audit-logic.test.ts`**
   - **Covers**: Correct savings calculation for Cursor Pro -> Business downgrades.
   - **Covers**: Annual billing discount math.
   - **Covers**: Claude Team -> Pro seat-based logic.
   - **Covers**: ChatGPT Team -> Plus optimization.
   - **Covers**: Handling of optimal stacks (ensuring $0 savings for efficient teams).

### How to Run
```bash
npm test
```

### CI Integration
Tests are automatically executed on every push to the `main` branch via the `.github/workflows/ci.yml` workflow.
