"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Wrench,
  Coins,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { CATEGORIES, POPULAR_PINCODES } from "@/lib/constants";
import { addWorker, setCurrentUser } from "@/lib/storage";
import { isValidIndianPhone, cleanIndianPhone } from "@/lib/utils";

export default function WorkerRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["ac_repair"]);
  const [selectedPincodes, setSelectedPincodes] = useState<string[]>(["110075", "110085"]);
  const [city, setCity] = useState("New Delhi");
  const [experienceYears, setExperienceYears] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setErrorMessage("Kripya valid 10-digit mobile number dalein.");
      return;
    }
    if (selectedSkills.length === 0) {
      setErrorMessage("Kam se kam 1 skill select karein.");
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
        isVerified: true,
      });

      setCurrentUser(newWorker);
      setIsSubmitting(false);
      router.push("/worker/feed");
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home Par Wapas</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Wrench className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Mechanic Partner Banein
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Apne pados ke naye customers se direct connect karein • Zero Commission!
            </p>
          </div>

          {/* Bonus callout */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Coins className="w-6 h-6 text-amber-500 shrink-0" />
              <div>
                <p className="font-extrabold text-sm text-amber-950">100 Free Welcome Coins</p>
                <p className="text-xs text-amber-800">
                  Register karte hi wallet mein credit honge
                </p>
              </div>
            </div>
            <span className="text-xs bg-amber-200 text-amber-950 font-black px-2.5 py-1 rounded-lg">
              ₹0 Registration
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Aapka Pura Naam *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jaise: Rajesh Kumar Mechanic"
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number * (Grahak ispar call karenge)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-sm font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="9818XXXXXX"
                  className="w-full px-3 py-2.5 text-sm rounded-r-xl border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
                />
              </div>
            </div>

            {/* Skills selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Aapka Kaam / Trade (Skills select karein) *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedSkills.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleSkill(cat.id)}
                      className={`p-2.5 rounded-xl text-left text-xs font-bold border flex items-center justify-between transition ${
                        isSelected
                          ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="truncate">{cat.title.split("&")[0]}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pincodes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Aap Kin Pincodes / Areas Mein Kaam Karte Hain?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_PINCODES.map((p) => {
                  const isSelected = selectedPincodes.includes(p.pincode);
                  return (
                    <button
                      key={p.pincode}
                      type="button"
                      onClick={() => togglePincode(p.pincode)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
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

            {/* Experience */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kitne Saal Ka Kaam Ka Anubhav (Experience)?
              </label>
              <select
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
              >
                <option value={1}>1-2 Saal</option>
                <option value={4}>3-5 Saal (Experienced)</option>
                <option value={8}>8-10 Saal (Master)</option>
                <option value={15}>15+ Saal (Senior Specialist)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-black text-base py-3.5 px-6 rounded-2xl shadow-xl shadow-brand-500/25 transition active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Creating Partner Profile...</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-5 h-5" />
                    <span>Free Register Karein & Leads Paayein</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
