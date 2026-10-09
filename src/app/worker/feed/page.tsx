"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Coins,
  MapPin,
  Plus,
  RefreshCw,
  ShieldCheck,
  UserCheck,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ServiceRequest, User, PlatformConfig } from "@/types";
import { getLeads, getWorkers, getCurrentUser, getPlatformConfig, setCurrentUser } from "@/lib/storage";
import { LeadCard } from "@/components/worker/LeadCard";
import { WorkerFilters } from "@/components/worker/WorkerFilters";
import { WorkerWalletModal } from "@/components/worker/WorkerWalletModal";
import { WorkerRegisterModal } from "@/components/worker/WorkerRegisterModal";

export default function WorkerFeedPage() {
  const [leads, setLeads] = useState<ServiceRequest[]>([]);
  const [workers, setWorkers] = useState<User[]>([]);
  const [currentWorker, setCurrentWorker] = useState<User | null>(null);
  const [config, setConfig] = useState<PlatformConfig | null>(null);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPincode, setSelectedPincode] = useState<string>("all");
  const [selectedUrgency, setSelectedUrgency] = useState<string>("all");
  const [showUnlockedOnly, setShowUnlockedOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const loadData = () => {
    const allLeads = getLeads();
    const allWorkers = getWorkers();
    const user = getCurrentUser();
    const platConfig = getPlatformConfig();

    setLeads(allLeads);
    setWorkers(allWorkers);
    setConfig(platConfig);

    // If current user is a worker, use it; otherwise default to first worker or guest
    if (user && user.role === "worker") {
      const liveWorker = allWorkers.find((w) => w.id === user.id) || user;
      setCurrentWorker(liveWorker);
    } else {
      const defaultWorker = allWorkers[0] || {
        id: "mechanic-guest",
        name: "Mechanic Partner",
        phone: "",
        role: "worker" as const,
        skills: ["ac_repair", "electrician", "plumber"],
        operatingPincodes: [],
        isVerified: false,
        city: "",
        credits: 100,
        createdAt: new Date().toISOString(),
      };
      setCurrentWorker(defaultWorker);
    }
  };

  useEffect(() => {
    loadData();
    const handleStorageUpdate = () => loadData();
    window.addEventListener("local-jobs-storage-updated", handleStorageUpdate);
    return () => window.removeEventListener("local-jobs-storage-updated", handleStorageUpdate);
  }, []);

  if (!currentWorker || !config) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-8 bg-slate-50">
        <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    // Exclude spam leads
    if (lead.status === "spam") return false;

    // Filter by Category
    if (selectedCategory !== "all" && lead.category !== selectedCategory) {
      return false;
    }

    // Filter by Pincode
    if (selectedPincode !== "all" && lead.location.pincode !== selectedPincode) {
      return false;
    }

    // Filter by Urgency
    if (selectedUrgency !== "all" && lead.urgency !== selectedUrgency) {
      return false;
    }

    // Filter by Unlocked by current worker
    if (showUnlockedOnly && !lead.unlockedBy.includes(currentWorker.id)) {
      return false;
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        lead.title.toLowerCase().includes(q) ||
        lead.description.toLowerCase().includes(q) ||
        lead.location.area.toLowerCase().includes(q) ||
        lead.category.toLowerCase().includes(q);
      if (!matches) return false;
    }

    return true;
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100/70 pt-4 pb-28 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Worker Profile Header Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Worker Avatar & Info */}
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 shrink-0">
                <Wrench className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentWorker.name}
                  </h1>
                  {currentWorker.isVerified && (
                    <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Mechanic</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600">
                  <span className="font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded uppercase text-[10px]">
                    {currentWorker.skills.map((s) => s.replace("_", " ")).join(", ")}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <strong>{currentWorker.rating ? currentWorker.rating : "5.0"}</strong> ({currentWorker.completedJobs || 0} Jobs Done)
                  </span>
                  <span>•</span>
                  <span>{currentWorker.city || "New Delhi"}</span>
                </div>
              </div>
            </div>

            {/* Wallet Balance & Action Buttons */}
            <div className="flex items-center gap-2.5 sm:self-center">
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="bg-amber-50 hover:bg-amber-100 text-amber-950 border-2 border-amber-300 px-3.5 py-2 rounded-2xl flex items-center gap-2 font-black text-xs sm:text-sm shadow-sm transition active:scale-95"
                title="View Wallet & Recharge Coins"
              >
                <Coins className="w-4 h-4 text-amber-600" />
                <span>🪙 {currentWorker.credits} Coins</span>
                <span className="bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded text-[10px]">
                  + Recharge
                </span>
              </button>

              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Naya Mechanic</span>
              </button>
            </div>
          </div>

          {/* Rollout Notice Banner */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500 shrink-0" />
              <span className="text-slate-700">
                {config.freeUnlockMode ? (
                  <>
                    <strong className="text-emerald-700">Rollout Offer Active:</strong> Sabhi leads bilkul free unlock ho rahi hain (0 Coins). Direct call karke kaam lein!
                  </>
                ) : (
                  <>
                    <strong className="text-purple-700">Coins Mode Active:</strong> Har lead unlock par {config.costPerLeadCredits} coins charge honge.
                  </>
                )}
              </span>
            </div>

            <span className="text-[11px] text-slate-500 font-medium">
              Real-time auto updates enabled
            </span>
          </div>
        </div>

        {/* Filters Section */}
        <WorkerFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedPincode={selectedPincode}
          onSelectPincode={setSelectedPincode}
          selectedUrgency={selectedUrgency}
          onSelectUrgency={setSelectedUrgency}
          showUnlockedOnly={showUnlockedOnly}
          onToggleUnlockedOnly={setShowUnlockedOnly}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Leads Feed Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Live Leads ({filteredLeads.length})
            </h2>
            <span className="text-xs bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
              Pados Ka Kaam
            </span>
          </div>

          <button
            onClick={() => loadData()}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Leads Grid */}
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border-2 border-slate-200 space-y-3">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-600">
              <Wrench className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">
              {leads.length === 0 ? "Abhi Koi Active Lead Nahi Hai" : "Is filter par koi lead nahi mili"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {leads.length === 0
                ? "Jaise hi koi grahak kaam post karega, aapke area ki leads yahan live aayengi."
                : 'Category ya Pincode filter change karein ya "Sabhi Trades" select karein.'}
            </p>
            {leads.length === 0 ? (
              <Link
                href="/post-task"
                className="inline-flex items-center gap-1.5 bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md hover:bg-brand-600 transition"
              >
                <span>Naya Kaam Post Karein</span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedPincode("all");
                  setSelectedUrgency("all");
                  setShowUnlockedOnly(false);
                  setSearchQuery("");
                }}
                className="bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm hover:bg-brand-600 transition"
              >
                Sabhi Filters Reset Karein
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                currentWorker={currentWorker}
                isFreeRollout={config.freeUnlockMode}
                costPerLead={config.costPerLeadCredits}
                onLeadUpdated={loadData}
              />
            ))}
          </div>
        )}
      </div>

      {/* Wallet Modal */}
      <WorkerWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        worker={currentWorker}
        onBalanceUpdated={loadData}
      />

      {/* Register Modal */}
      <WorkerRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
