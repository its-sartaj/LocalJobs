"use client";

import { CATEGORIES, POPULAR_PINCODES } from "@/lib/constants";
import { Filter, Search } from "lucide-react";

interface WorkerFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedPincode: string;
  onSelectPincode: (pin: string) => void;
  selectedUrgency: string;
  onSelectUrgency: (urgency: string) => void;
  showUnlockedOnly: boolean;
  onToggleUnlockedOnly: (val: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function WorkerFilters({
  selectedCategory,
  onSelectCategory,
  selectedPincode,
  onSelectPincode,
  selectedUrgency,
  onSelectUrgency,
  showUnlockedOnly,
  onToggleUnlockedOnly,
  searchQuery,
  onSearchChange,
}: WorkerFiltersProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
      {/* Search & Location Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        {/* Search input */}
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search problems or keywords (e.g. AC gas, MCB, leakage)..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
          />
        </div>

        {/* Pincode & Urgency Selectors (Mobile Friendly Grid) */}
        <div className="grid grid-cols-2 gap-2">
          <select
            value={selectedPincode}
            onChange={(e) => onSelectPincode(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 truncate"
          >
            <option value="all">📍 Sabhi Pincodes</option>
            {POPULAR_PINCODES.map((p) => (
              <option key={p.pincode} value={p.pincode}>
                📍 {p.pincode} ({p.area.split(" ")[0]})
              </option>
            ))}
          </select>

          {/* Urgency select */}
          <select
            value={selectedUrgency}
            onChange={(e) => onSelectUrgency(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 truncate"
          >
            <option value="all">⚡ Urgency: Sabhi</option>
            <option value="urgent">⚡ Urgent (15-30 Min)</option>
            <option value="today">📅 Aaj (Today)</option>
            <option value="flexible">🕒 Flexible</option>
          </select>
        </div>
      </div>

      {/* Category Chips Scrollable */}
      <div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => onSelectCategory("all")}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Sabhi Trades (All)
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.title.split("&")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Unlocked Only */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
          <input
            type="checkbox"
            checked={showUnlockedOnly}
            onChange={(e) => onToggleUnlockedOnly(e.target.checked)}
            className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
          />
          <span>Sirf Meri Unlocked Leads Dekhein</span>
        </label>

        <span className="text-[11px] text-slate-400">
          Showing filtered hyperlocal results
        </span>
      </div>
    </div>
  );
}
