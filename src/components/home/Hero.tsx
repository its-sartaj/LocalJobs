"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, ShieldCheck, PhoneCall, Zap, Wrench, Sparkles } from "lucide-react";
import { POPULAR_PINCODES } from "@/lib/constants";
import { MountainHeroTheme } from "./MountainHeroTheme";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("110075");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/post-task?query=${encodeURIComponent(searchQuery)}&pincode=${selectedPincode}`);
    } else {
      router.push(`/post-task?pincode=${selectedPincode}`);
    }
  };

  const quickChips = [
    { label: "AC Cooling / Gas ❄️", cat: "ac_repair" },
    { label: "Bijli MCB / Wiring ⚡", cat: "electrician" },
    { label: "Nal & Pipe Leakage 💧", cat: "plumber" },
    { label: "Washing Machine 🌀", cat: "appliance" },
    { label: "Carpenter / Door Lock 🪚", cat: "carpenter" },
    { label: "RO Filter Service 🚰", cat: "ro_service" },
    { label: "Wall Paint & Putty 🎨", cat: "painter" },
    { label: "Geyser Repair & Fitting 🔥", cat: "appliance" },
    { label: "Ceiling Fan / Inverter 💨", cat: "electrician" },
    { label: "Fridge Gas Top-up 🧊", cat: "appliance" },
    { label: "Kitchen Sink Drain 🚿", cat: "plumber" },
    { label: "Deep Home Cleaning ✨", cat: "cleaning" },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-24 sm:pt-16 sm:pb-36">
      {/* Real-time Mountain Landscape with Flying Eagle & Torn Paper Edge */}
      <MountainHeroTheme />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 sm:space-y-6">
          {/* Majestic Mountain Theme Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.18] max-w-4xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
            Ghar ke har kaam ke liye,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
              apne area ka verified mechanic.
            </span>
          </h1>

          {/* Subtitle with High Readability */}
          <p className="text-xs sm:text-base lg:text-lg text-slate-100/95 font-medium max-w-2xl mx-auto leading-relaxed px-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            AC, Bijli, Plumber ya Carpenter — problem submit karein aur 15 minute mein apne pados ke mechanic se phone par seedha baat karein.
          </p>

          {/* Premium Unified Search Capsule */}
          <form
            onSubmit={handleSearch}
            className="mt-6 bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-2xl shadow-black/35 border border-white/80 max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
          >
            {/* Input Search Query */}
            <div className="flex-1 flex items-center px-3 sm:px-4 py-1.5 sm:py-2 gap-2.5">
              <button
                type="submit"
                aria-label="Search"
                className="text-slate-400 hover:text-brand-500 transition shrink-0"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kya theek karwana hai? (e.g. AC service, switch, nal)"
                aria-label="Search local services"
                className="w-full text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
              />
            </div>

            {/* Pincode / Area Selector */}
            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3 px-2 sm:px-3">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
              <select
                value={selectedPincode}
                onChange={(e) => setSelectedPincode(e.target.value)}
                aria-label="Select your location or pincode"
                className="flex-1 sm:flex-initial bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 py-2 px-3 rounded-xl sm:rounded-full border border-slate-200 focus:outline-none cursor-pointer transition min-w-0"
              >
                {POPULAR_PINCODES.map((p) => (
                  <option key={p.pincode} value={p.pincode}>
                    {p.area.split(" ")[0]} ({p.pincode})
                  </option>
                ))}
              </select>
            </div>
          </form>

          {/* AUTO SLIDER / INFINITE MARQUEE FOR POPULAR SERVICES */}
          <div className="pt-2 sm:pt-3 w-full max-w-4xl mx-auto overflow-hidden">
            {/* Mobile Title Badge */}
            <div className="flex sm:hidden items-center justify-center gap-1.5 mb-2 text-[11px] font-bold text-amber-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Popular Repairs (1-Tap Select)</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Title */}
              <div className="hidden sm:flex items-center gap-1 text-xs text-amber-200 font-semibold shrink-0 pl-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Popular:</span>
              </div>

              {/* Slider Track with Left & Right Soft Fade Masks */}
              <div
                className="relative flex-1 overflow-hidden py-1 w-full"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                }}
              >
                <div className="animate-auto-slider flex items-center gap-2 sm:gap-2.5 hover:[animation-play-state:paused]">
                  {/* First Set of Chips */}
                  {quickChips.map((chip, idx) => (
                    <Link
                      key={`chip-a-${idx}`}
                      href={`/post-task?category=${chip.cat}`}
                      className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-slate-800 hover:text-brand-600 border border-white/60 hover:border-white rounded-full text-xs font-semibold shadow-md backdrop-blur-md transition-all active:scale-95 shrink-0 whitespace-nowrap flex items-center"
                    >
                      {chip.label}
                    </Link>
                  ))}

                  {/* Duplicate Set for Seamless Infinite Auto Loop */}
                  {quickChips.map((chip, idx) => (
                    <Link
                      key={`chip-b-${idx}`}
                      href={`/post-task?category=${chip.cat}`}
                      className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-slate-800 hover:text-brand-600 border border-white/60 hover:border-white rounded-full text-xs font-semibold shadow-md backdrop-blur-md transition-all active:scale-95 shrink-0 whitespace-nowrap flex items-center"
                    >
                      {chip.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Human Trust Highlights */}
          <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/70 shadow-lg shadow-black/15 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">Direct Phone Call</p>
                <p className="text-[11px] text-slate-500">Seedha mechanic se baat karein</p>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/70 shadow-lg shadow-black/15 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">15–30 Min Arrival</p>
                <p className="text-[11px] text-slate-500">Aapke apne area ke mechanic</p>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/70 shadow-lg shadow-black/15 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">₹0 Booking Charges</p>
                <p className="text-[11px] text-slate-500">Zero commission, fair pricing</p>
              </div>
            </div>
          </div>

          {/* Worker Entry Link with Proper Breathing Room */}
          <div className="pt-4 sm:pt-6 pb-2">
            <Link
              href="/worker/feed"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 hover:text-slate-950 bg-white/95 hover:bg-white px-5 py-2.5 rounded-full shadow-lg border border-slate-200/80 transition active:scale-95"
            >
              <Wrench className="w-3.5 h-3.5 text-brand-600" />
              <span>Kya aap Mechanic hain? Leads dekhne ke liye yahan click karein →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
