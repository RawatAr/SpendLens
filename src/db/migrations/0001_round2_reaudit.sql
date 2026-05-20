-- Round 2: stored_audits table
-- Run this in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS stored_audits (
  id TEXT PRIMARY KEY,
  user_email TEXT NOT NULL,
  input_stack JSONB NOT NULL,
  output_result JSONB NOT NULL,
  pricing_snapshot JSONB NOT NULL,
  pricing_hash TEXT NOT NULL,
  flagged_for_reaudit BOOLEAN NOT NULL DEFAULT FALSE,
  reaudit_email_sent_at TIMESTAMPTZ,
  unsubscribed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast change detection (only scan rows with stale hashes)
CREATE INDEX IF NOT EXISTS idx_stored_audits_pricing_hash ON stored_audits (pricing_hash);
CREATE INDEX IF NOT EXISTS idx_stored_audits_user_email ON stored_audits (user_email);
CREATE INDEX IF NOT EXISTS idx_stored_audits_flagged ON stored_audits (flagged_for_reaudit);

-- Round 2: pricing_changes log table (for market-changes page)
CREATE TABLE IF NOT EXISTS pricing_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  tool_id TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  field_changed TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  description TEXT NOT NULL
);

-- Verify tables created
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('stored_audits', 'pricing_changes');
