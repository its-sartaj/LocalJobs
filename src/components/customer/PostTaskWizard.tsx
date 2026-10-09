"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Wind,
  Zap,
  Wrench,
  Tv,
  Hammer,
  Paintbrush,
  Droplets,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  User as UserIcon,
  Check,
  AlertCircle,
} from "lucide-react";
import { CATEGORIES, POPULAR_PINCODES } from "@/lib/constants";
import { addLead, getCurrentUser } from "@/lib/storage";
import { ServiceRequest, JobUrgency } from "@/types";
import { isValidIndianPhone, cleanIndianPhone } from "@/lib/utils";
import { TaskSuccessCard } from "./TaskSuccessCard";
import { SpamShieldBadge } from "../common/SpamShieldBadge";

const ICON_MAP: Record<string, any> = {
  Wind,
  Zap,
  Wrench,
  Tv,
  Hammer,
  Paintbrush,
  Droplets,
  Sparkles,
};

export function PostTaskWizard() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "ac_repair";
  const initialPincode = searchParams.get("pincode") || "110075";
  const initialQuery = searchParams.get("query") || "";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [createdLead, setCreatedLead] = useState<ServiceRequest | null>(null);

  // Form State
  const [category, setCategory] = useState<string>(initialCategory);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [problemDescription, setProblemDescription] = useState<string>(initialQuery);
  const [urgency, setUrgency] = useState<JobUrgency>("urgent");
  const [estimatedBudget, setEstimatedBudget] = useState<string>("");

  // Location State
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState(initialPincode || "");
  const [landmark, setLandmark] = useState("");
  const [houseFlat, setHouseFlat] = useState("");

  // Contact State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Auto-populate customer info if already logged in with saved phone
  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role === "customer" && user.phone) {
      setCustomerName(user.name);
      setCustomerPhone(user.phone);
    }
  }, []);

  // Update selected tag if category changes
  const activeCategoryObj = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];

  const handlePincodePillClick = (pin: string, areaName: string, cityName: string) => {
    setPincode(pin);
    setArea(areaName);
    setCity(cityName);
  };


  const validateStep1 = () => {
    if (!category) {
      setErrorMessage("Kripya category select karein.");
      return false;
    }
    if (!problemDescription.trim() && !selectedTag) {
      setErrorMessage("Kripya problem describe karein ya koi option select karein.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const validateStep2 = () => {
    if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      setErrorMessage("Kripya sahi 6-digit Pincode dalein (e.g. 110075).");
      return false;
    }
    if (!area.trim()) {
      setErrorMessage("Kripya apna Area / Colony name dalein.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const validateStep3 = () => {
    if (!customerName.trim()) {
      setErrorMessage("Kripya apna naam dalein.");
      return false;
    }
    if (!isValidIndianPhone(customerPhone)) {
      setErrorMessage("Kripya valid 10-digit mobile number dalein (e.g. 9810123456).");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    // Simulate anti-bot verification and network request
    setTimeout(() => {
      const finalTitle = selectedTag
        ? `${selectedTag} - ${problemDescription.slice(0, 50)}`
        : problemDescription.slice(0, 60) || `${activeCategoryObj.title} Service`;

      const newLead = addLead({
        category,
        subCategory: selectedTag || activeCategoryObj.popularTags[0],
        title: finalTitle,
        description: problemDescription || selectedTag || `${activeCategoryObj.title} required urgently.`,
        urgency,
        location: {
          area,
          pincode,
          city,
          landmark,
          houseFlat,
        },
        customerName: customerName.trim(),
        customerPhone: cleanIndianPhone(customerPhone),
        estimatedBudget: estimatedBudget || activeCategoryObj.avgRate,
        preferredTime: urgency === "urgent" ? "15-30 Minute Mein" : "Aaj hi",
        spamScore: 0.01,
      });

      setIsSubmitting(false);
      setCreatedLead(newLead);
    }, 700);
  };

  if (createdLead) {
    return (
      <TaskSuccessCard
        lead={createdLead}
        onPostAnother={() => {
          setCreatedLead(null);
          setStep(1);
          setProblemDescription("");
          setSelectedTag("");
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl max-w-2xl mx-auto overflow-hidden">
      {/* Wizard Progress Header */}
      <div className="bg-slate-900 text-white p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Quick Request Wizard
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">Kaam Post Karein</h2>
          </div>
          <span className="text-xs font-bold bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
            Step {step} of 3
          </span>
        </div>

        {/* Progress Bar Steps */}
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
          <div
            className={`py-1.5 rounded-lg transition ${
              step >= 1 ? "bg-brand-500 text-white" : "bg-slate-800 text-slate-500"
            }`}
          >
            1. Problem & Kaam
          </div>
          <div
            className={`py-1.5 rounded-lg transition ${
              step >= 2 ? "bg-brand-500 text-white" : "bg-slate-800 text-slate-500"
            }`}
          >
            2. Area & Pincode
          </div>
          <div
            className={`py-1.5 rounded-lg transition ${
              step === 3 ? "bg-brand-500 text-white" : "bg-slate-800 text-slate-500"
            }`}
          >
            3. Contact Info
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mx-5 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Step Content */}
      <div className="p-5 sm:p-7">
        {/* STEP 1: CATEGORY & PROBLEM */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Category Selector Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Service Category Chunein *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = ICON_MAP[cat.iconName] || Wrench;
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        setSelectedTag("");
                      }}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                        isSelected
                          ? "border-brand-500 bg-brand-50/80 text-brand-900 ring-2 ring-brand-500/20 font-bold"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? "text-brand-600" : "text-slate-500"}`} />
                        {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                      </div>
                      <span className="text-xs font-bold leading-snug line-clamp-2 min-h-[2rem]">{cat.title}</span>
                      <span className="text-[10px] text-slate-500 mt-1">{cat.avgRate}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Complaint / Tag Chips */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Aam Shikayat (Quick Select Chip)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activeCategoryObj.popularTags.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedTag(tag);
                      if (!problemDescription) setProblemDescription(tag);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                      selectedTag === tag
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Description Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Problem Describe Karein *
              </label>
              <textarea
                rows={3}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Jaise: AC thanda nahi kar raha hai, gas check karni hai ya motor se awaaz aa rahi hai..."
                className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Jitna saaf batayenge, mechanic sahi tools aur samaan le kar aayega.
              </p>
            </div>

            {/* Urgency Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Kitni Jaldi Kaam Chahiye? *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency("urgent")}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition ${
                    urgency === "urgent"
                      ? "border-red-500 bg-red-50 text-red-800 ring-2 ring-red-500/20"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-sm mb-0.5">⚡ Urgent</span>
                  <span className="text-[10px] text-red-600 font-semibold">15-30 Min Mein</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency("today")}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition ${
                    urgency === "today"
                      ? "border-brand-500 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-sm mb-0.5">📅 Aaj Hi</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Today (2-4 Hrs)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency("flexible")}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition ${
                    urgency === "flexible"
                      ? "border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-sm mb-0.5">🕒 Flexible</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Kal ya Week-end</span>
                </button>
              </div>
            </div>

            {/* Forward to Step 2 */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>Aage Badhein: Location Dalein</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Quick popular pincode buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Popular Areas (1-Tap Select)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_PINCODES.slice(0, 5).map((p) => (
                  <button
                    key={p.pincode}
                    type="button"
                    onClick={() => handlePincodePillClick(p.pincode, p.area, p.city)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                      pincode === p.pincode
                        ? "bg-brand-500 text-white border-brand-500"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                    }`}
                  >
                    📍 {p.area.split(" ")[0]} ({p.pincode})
                  </button>
                ))}
              </div>
            </div>

            {/* Pincode and Area Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  6-Digit Pincode *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 110075"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  City Name *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. New Delhi"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Area / Colony Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Colony / Sector / Area Name *
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Jaise: Dwarka Sector 10, Pocket 2"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Landmark and Flat Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Landmark (Pass Ki Jagah)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Jaise: Near Metro Station / Shiv Mandir"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  House / Flat No. (Optional)
                </label>
                <input
                  type="text"
                  value={houseFlat}
                  onChange={(e) => setHouseFlat(e.target.value)}
                  placeholder="Jaise: Flat 402, 3rd Floor"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Back & Next Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="p-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-1.5 shrink-0 px-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Piche</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="flex-1 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>Aage: Phone Number Dalein</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT & SUBMISSION */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Direct Verification Trust Banner */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Direct Contact Verification</p>
                <p className="text-[11px] text-slate-600">Apna naam aur phone number dalein — seedha pass ke verified mechanic se call aayegi (Zero OTP delay).</p>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Aapka Naam *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Jaise: Aman Verma"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                10-Digit Mobile Number * (No SMS OTP Required)
              </label>
              <div className="relative flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-sm font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="98XXXXXXXX"
                  className="w-full px-3 py-2.5 rounded-r-xl border border-slate-300 text-sm font-bold text-slate-900 tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">
                ✓ Verified mechanic is number par direct call karega. Koi OTP nahi aayega!
              </p>
            </div>

            {/* WhatsApp Updates Checkbox */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappUpdates}
                onChange={(e) => setWhatsappUpdates(e.target.checked)}
                className="mt-0.5 rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
              />
              <span className="text-xs text-slate-700">
                <strong>WhatsApp par update paayein:</strong> Mechanic ka naam, number aur arrival status WhatsApp par bhejein.
              </span>
            </label>

            {/* Invisible reCAPTCHA / Anti-Spam Badge */}
            <SpamShieldBadge />

            {/* Back & Submit Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="p-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-1.5 shrink-0 px-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Piche</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-black text-base py-3.5 px-6 rounded-2xl shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Mechanic Ko Call Request Bhejein</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
