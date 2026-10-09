"use client";

import { useState } from "react";
import { Wrench, Phone, MapPin, CheckCircle2, X, Coins, ShieldCheck, AlertCircle } from "lucide-react";
import { CATEGORIES, POPULAR_PINCODES } from "@/lib/constants";
import { addWorker, setCurrentUser } from "@/lib/storage";
import { isValidIndianPhone, cleanIndianPhone } from "@/lib/utils";

interface WorkerRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function WorkerRegisterModal({
  isOpen,
  onClose,
  onSuccess,
}: WorkerRegisterModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["ac_repair"]);
  const [selectedPincodes, setSelectedPincodes] = useState<string[]>(["110075"]);
  const [city, setCity] = useState("New Delhi");
  const [experienceYears, setExperienceYears] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter((s) => s !== skillId));
      }
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const togglePincode = (pincode: string) => {
    if (selectedPincodes.includes(pincode)) {
      if (selectedPincodes.length > 1) {
        setSelectedPincodes(selectedPincodes.filter((p) => p !== pincode));
      }
    } else {
      setSelectedPincodes([...selectedPincodes, pincode]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Kripya apna naam dalein.");
      return;
    }
    if (!isValidIndianPhone(phone)) {
      setErrorMessage("Kripya sahi 10-digit mobile number dalein.");
      return;
    }
    if (selectedSkills.length === 0) {
      setErrorMessage("Kam se kam 1 skill/trade select karein.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    setTimeout(() => {
      const newWorker = addWorker({
        name: name.trim(),
        phone: cleanIndianPhone(phone),
        skills: selectedSkills,
        operatingPincodes: selectedPincodes,
        city,
        experienceYears,
        completedJobs: 0,
        rating: 5.0,
        isVerified: true, // auto-verified for onboarding ease
      });

      // Switch active user to this newly registered worker
      setCurrentUser(newWorker);
      setIsSubmitting(false);
      onSuccess();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Mechanic Registration (Free)
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Apne area ke rozana naye customers paayein
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free coins reward callout */}
        <div className="my-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Coins className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <p className="font-extrabold text-amber-950">100 Free Welcome Coins</p>
              <p className="text-[10px] text-amber-800">
                Pehle 4 leads bilkul free unlock karne ke liye
              </p>
            </div>
          </div>
          <span className="text-xs bg-amber-200 text-amber-950 font-black px-2 py-1 rounded-lg">
            ₹0 Fee
          </span>
        </div>

        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Aapka Naam *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jaise: Rajesh Kumar"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="9818XXXXXX"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-r-xl border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Trade / Skills Multi-Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Aapka Kaam / Trade (Skills) *
            </label>
            <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-1 border border-slate-200 rounded-xl">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedSkills.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleSkill(cat.id)}
                    className={`p-2 rounded-lg text-left text-xs font-semibold border flex items-center justify-between transition ${
                      isSelected
                        ? "bg-brand-500 text-white border-brand-500"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{cat.title.split("&")[0]}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Operating Pincodes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Aap Kahan Kaam Karte Hain (Operating Pincodes)?
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_PINCODES.map((p) => {
                const isSelected = selectedPincodes.includes(p.pincode);
                return (
                  <button
                    key={p.pincode}
                    type="button"
                    onClick={() => togglePincode(p.pincode)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    📍 {p.area.split(" ")[0]} ({p.pincode})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience in years */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kitne Saal Ka Experience Hai?
            </label>
            <select
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
            >
              <option value={1}>1-2 Saal (Naya)</option>
              <option value={3}>3-5 Saal (Experienced)</option>
              <option value={8}>8-10 Saal (Master)</option>
              <option value={15}>15+ Saal (Senior Specialist)</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-black text-sm py-3 px-4 rounded-xl shadow-lg shadow-brand-500/25 transition active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <Wrench className="w-4 h-4" />
                  <span>Free Register Karein & Leads Dekhein</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
