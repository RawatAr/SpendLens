"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Zap, Globe, ChevronDown } from "lucide-react";
import { useCurrency, Currency } from "@/context/currency-context";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "PROTOCOL", href: "/#how-it-works" },
  { label: "INTELLIGENCE", href: "/#insights" },
];

export function Navbar() {
  const pathname = usePathname();
  const isResults = pathname.startsWith("/results") || pathname.startsWith("/audit/");
  const { currency, setCurrency } = useCurrency();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const currencies: Currency[] = ["USD", "EUR", "GBP", "INR"];

  return (
    <nav 
      className={`relative z-[100] px-6 py-4 w-full bg-[#F7F8F6] border-b border-slate-100/50`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-12">
        {/* Logo Layer */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <Zap size={18} className="text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-950 tracking-[0.2em] uppercase leading-none mb-0.5">
              SpendLens
            </span>
            <span className="text-[7px] font-black text-slate-400 tracking-[0.4em] uppercase leading-none">
              Vector_Audit_01
            </span>
          </div>
        </Link>

        {/* Global Live Index (Currency Selector) */}
        {!isResults && (
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label}
                href={item.href}
                className="text-[9px] font-black text-slate-400 hover:text-slate-950 tracking-[0.4em] uppercase transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Action Layer */}
        <div className="flex items-center gap-4">
          {/* Currency Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm hover:border-emerald-500 transition-all text-[9px] font-black uppercase tracking-widest text-slate-600"
            >
              <Globe size={12} className="text-emerald-500" />
              {currency}
              <ChevronDown size={10} className={`transition-transform ${showCurrencyDropdown ? "rotate-180" : ""}`} />
            </button>
            
            {showCurrencyDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-2xl border border-slate-100 p-2 z-[110]"
              >
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${
                      currency === c ? "bg-emerald-500 text-white" : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <Link
            href="/audit"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-950 text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-md active:scale-95"
          >
            <Search size={12} /> INITIAL_AUDIT
          </Link>
        </div>
      </div>
    </nav>
  );
}
