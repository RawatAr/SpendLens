/**
 * Database Client — Drizzle ORM + Supabase Postgres
 *
 * Lazy singleton: only creates a connection when first used at runtime.
 * Safe for Next.js build-time static analysis — no connection attempted
 * during `next build` unless DATABASE_URL is valid.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>;

// Lazily initialized — avoids build-time connection errors
let _db: DrizzleClient | null = null;

function createDb(): DrizzleClient {
  const url = process.env.DATABASE_URL;
  if (!url || url.includes("your_")) {
    throw new Error(
      "[SpendLens] DATABASE_URL is not configured. Set it in .env.local to enable database features."
    );
  }

  const connection = postgres(url, {
    prepare: false, // required for Supabase transaction mode pooler
    max: 10,
  });

  return drizzle(connection, { schema });
}

export function getDb(): DrizzleClient {
  if (!_db) {
    _db = createDb();
  }
  return _db;
}

// Convenience alias for server actions/route handlers
export const db = new Proxy({} as DrizzleClient, {
  get(_target, prop) {
    return getDb()[prop as keyof DrizzleClient];
  },
});
