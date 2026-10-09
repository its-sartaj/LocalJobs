"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Plus, Wrench, Menu, X, Check, ChevronDown, ShieldCheck, Briefcase, MessageCircle } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { POPULAR_PINCODES } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [selectedPincode, setSelectedPincode] = useState(POPULAR_PINCODES[0]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo & Location */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/" className="inline-block shrink-0">
                <Logo size="md" />
              </Link>

              {/* Location Pill (Desktop & Tablet) */}
              <button
                onClick={() => setShowLocationModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100/80 text-slate-700 text-xs font-semibold border border-slate-200/80 transition active:scale-95 group"
                title="Change Operating Area"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-500 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate max-w-[130px] font-medium text-slate-800">{selectedPincode.area}</span>
                <span className="text-[10px] text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded font-bold">
                  {selectedPincode.pincode}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <Link
                href="/post-task"
                className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition ${
                  pathname === "/post-task"
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Kaam Karwana Hai
              </Link>

              <Link
                href="/worker/feed"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition ${
                  pathname === "/worker/feed" || pathname === "/leads"
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Leads Feed</span>
              </Link>

              <Link
                href="/worker/register"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition ${
                  pathname === "/worker/register"
                    ? "bg-amber-50 text-amber-800 font-bold"
                    : "text-slate-600 hover:text-amber-700 hover:bg-slate-50"
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                <span>Mechanic Banein</span>
              </Link>
            </nav>

            {/* Right Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Location Quick Button */}
              <button
                onClick={() => setShowLocationModal(true)}
                className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-50 text-slate-700 text-[11px] font-semibold border border-slate-200"
              >
                <MapPin className="w-3 h-3 text-brand-500" />
                <span className="truncate max-w-[80px]">{selectedPincode.area.split(" ")[0]}</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </button>

              {/* Primary CTA Button (Desktop only, mobile has bottom nav) */}
              <Link
                href="/post-task"
                className="hidden sm:inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-sm hover:shadow transition active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Kaam Post Karein</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2">
            <Link
              href="/post-task"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-brand-50 text-brand-900 font-bold text-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">Kaam Karwana Hai</p>
                  <p className="text-[11px] text-slate-500 font-normal">AC, Electrician, Plumber post karein</p>
                </div>
              </div>
              <span className="text-[10px] bg-brand-200 text-brand-900 font-black px-2 py-0.5 rounded-full">Free</span>
            </Link>

            <Link
              href="/worker/feed"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/70 text-blue-900 font-bold text-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">Leads Feed (Kaam Chahiye)</p>
                  <p className="text-[11px] text-slate-500 font-normal">Area ke live customer jobs dekhein</p>
                </div>
              </div>
              <span className="text-[10px] bg-blue-200 text-blue-900 font-black px-2 py-0.5 rounded-full">Mechanic</span>
            </Link>

            <Link
              href="/worker/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 text-amber-900 font-bold text-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">Mechanic Profile Banayein</p>
                  <p className="text-[11px] text-slate-500 font-normal">Free registration & naye customers paayein</p>
                </div>
              </div>
              <span className="text-[10px] bg-amber-200 text-amber-900 font-black px-2 py-0.5 rounded-full">Partner</span>
            </Link>

            <a
              href="https://wa.me/917979968347?text=Namaste%20Local%20Jobs!%20Mujhe%20help%20chahiye"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#25D366]/10 text-emerald-950 font-bold text-sm hover:bg-[#25D366]/20 transition border border-[#25D366]/20"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">WhatsApp Helpline</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">+91 79799 68347</p>
                </div>
              </div>
              <span className="text-[10px] bg-[#25D366] text-white font-black px-2 py-0.5 rounded-full">Chat</span>
            </a>
          </div>
        )}
      </header>

      {/* Location Picker Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Apna Area Chunein</h3>
                  <p className="text-[11px] text-slate-500">Hyperlocal: Sirf aapke pados ke mechanic connect honge</p>
                </div>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mt-4 max-h-72 overflow-y-auto pr-1">
              {POPULAR_PINCODES.map((item) => {
                const isSelected = selectedPincode.pincode === item.pincode;
                return (
                  <button
                    key={item.pincode}
                    onClick={() => {
                      setSelectedPincode(item);
                      setShowLocationModal(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                      isSelected
                        ? "border-brand-500 bg-brand-50/60 text-brand-950 font-bold shadow-xs"
                        : "border-slate-200/80 hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.area}</p>
                      <p className="text-xs text-slate-500">{item.city} • Pincode: {item.pincode}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowLocationModal(false)}
              className="mt-4 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-bold transition shadow-sm"
            >
              Confirm Karein
            </button>
          </div>
        </div>
      )}
    </>
  );
}
