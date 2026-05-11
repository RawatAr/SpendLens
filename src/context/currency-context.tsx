"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

export type Currency = "USD" | "EUR" | "GBP" | "INR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatValue: (val: number) => string;
  convert: (val: number) => number;
}

const RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.15,
};

const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  const convert = useCallback((val: number) => val * RATES[currency], [currency]);

  const formatValue = useCallback((val: number) => {
    const converted = convert(val);
    const symbol = SYMBOLS[currency];
    return `${symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  }, [currency, convert]);

  const value = useMemo(() => ({
    currency,
    setCurrency,
    formatValue,
    convert
  }), [currency, formatValue, convert]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
