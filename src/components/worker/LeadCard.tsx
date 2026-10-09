"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  PhoneCall,
  MessageCircle,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Coins,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { ServiceRequest, User } from "@/types";
import {
  formatTimeAgo,
  maskPhoneNumber,
  createWorkerToCustomerWhatsAppLink,
} from "@/lib/utils";
import { unlockLead, updateLeadStatus } from "@/lib/storage";

interface LeadCardProps {
  lead: ServiceRequest;
  currentWorker: User;
  isFreeRollout: boolean;
  costPerLead: number;
  onLeadUpdated: () => void;
}

export function LeadCard({
  lead,
  currentWorker,
  isFreeRollout,
  costPerLead,
  onLeadUpdated,
}: LeadCardProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isUnlocked = lead.unlockedBy.includes(currentWorker.id);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setErrorMessage(null);
    setUnlockMessage(null);

    setTimeout(() => {
      const result = unlockLead(lead.id, currentWorker.id);
      setIsUnlocking(false);

      if (result.success) {
        setUnlockMessage(result.message);
        onLeadUpdated();
      } else {
        setErrorMessage(result.message);
      }
    }, 400);
  };

  const handleStatusChange = (status: ServiceRequest["status"]) => {
    updateLeadStatus(lead.id, status, currentWorker.id, currentWorker.name);
    onLeadUpdated();
  };

  const waLink = createWorkerToCustomerWhatsAppLink(
    {
      id: lead.id,
      title: lead.title,
      customerName: lead.customerName,
      customerPhone: lead.customerPhone,
      area: lead.location.area,
    },
    currentWorker.name
  );

  return (
    <div
      className={`bg-white rounded-2xl border-2 transition shadow-sm overflow-hidden ${
        lead.status === "completed"
          ? "border-slate-200 opacity-70"
          : isUnlocked
          ? "border-emerald-500/80 shadow-md ring-2 ring-emerald-500/10"
          : lead.urgency === "urgent"
          ? "border-orange-300 hover:border-orange-500"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Top Card Banner: Urgency + Time Posted + Status */}
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {/* Urgency Badge */}
          <span
            className={`px-2 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wide flex items-center gap-1 ${
              lead.urgency === "urgent"
                ? "bg-red-500 text-white animate-urgent shadow-sm"
                : lead.urgency === "today"
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : "bg-blue-100 text-blue-900 border border-blue-200"
            }`}
          >
            {lead.urgency === "urgent" ? "⚡ Urgent (15-30 Min)" : "📅 Aaj Hi (Today)"}
          </span>

          <span className="text-slate-500 text-[11px] flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{formatTimeAgo(lead.createdAt)}</span>
          </span>
        </div>

        {/* Lead Status / Unlocked Tag */}
        <div className="flex items-center gap-1.5">
          {isUnlocked ? (
            <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Unlock className="w-3 h-3 text-emerald-600" />
              <span>Unlocked</span>
            </span>
          ) : (
            <span className="bg-slate-200 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-500" />
              <span>Locked</span>
            </span>
          )}

          <span className="text-[10px] text-slate-400 font-mono">#{lead.id}</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* Category & Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
              {lead.category.replace("_", " ")}
            </span>
            {lead.subCategory && (
              <span className="text-[11px] font-semibold text-slate-500">
                • {lead.subCategory}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {lead.title}
          </h3>

          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {lead.description}
          </p>
        </div>

        {/* Location & Budget Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
          <div className="flex items-start gap-1.5 text-slate-700">
            <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">{lead.location.area}</p>
              <p className="text-[11px] text-slate-500">
                {lead.location.city} • Pincode: <strong>{lead.location.pincode}</strong>
              </p>
              {lead.location.landmark && (
                <p className="text-[10px] text-slate-400 italic">Landmark: {lead.location.landmark}</p>
              )}
            </div>
          </div>

          <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-200/60 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-amber-800">Customer Budget / Estimate</p>
              <p className="text-xs font-black text-amber-950">{lead.estimatedBudget || "₹300 - ₹1,500"}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded font-bold border border-amber-200">
                Direct Cash/UPI
              </span>
            </div>
          </div>
        </div>

        {/* Alerts / Error Messages */}
        {errorMessage && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {unlockMessage && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{unlockMessage}</span>
          </div>
        )}

        {/* Phone Number Display & Action Section */}
        <div className="pt-2 border-t border-slate-100">
          {!isUnlocked ? (
            /* LOCKED STATE: Customer phone hidden */
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <div className="flex items-center gap-2 text-xs">
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold text-slate-600">Grahak Ka Mobile Number:</span>
                  <span className="font-mono font-bold tracking-wider text-slate-800">
                    {maskPhoneNumber(lead.customerPhone)}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Hidden
                </span>
              </div>

              {/* Unlock Action Button */}
              <button
                type="button"
                onClick={handleUnlock}
                disabled={isUnlocking}
                className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75"
              >
                {isUnlocking ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Unlocking Lead...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 text-amber-400" />
                    <span>Connect with Customer (Unlock Phone)</span>
                    {isFreeRollout ? (
                      <span className="ml-1 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                        FREE (Rollout)
                      </span>
                    ) : (
                      <span className="ml-1 bg-amber-400 text-amber-950 text-[10px] px-2 py-0.5 rounded-full font-black flex items-center gap-0.5">
                        <Coins className="w-3 h-3" /> {costPerLead} Coins
                      </span>
                    )}
                  </>
                )}
              </button>
            </div>
          ) : (
            /* UNLOCKED STATE: Full Contact Information & Action Buttons */
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    Grahak Details (Direct Contact)
                  </p>
                  <p className="text-sm font-black text-slate-900">
                    {lead.customerName} • <span className="font-mono text-emerald-700">{lead.customerPhone}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Number</span>
                </div>
              </div>

              {/* High Contrast 1-Tap Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {/* 1. Direct Call Now Button */}
                <a
                  href={`tel:${lead.customerPhone}`}
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-sm py-3 px-3 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 active:scale-95 text-center"
                >
                  <PhoneCall className="w-4 h-4 fill-white" />
                  <span>Direct Call Now</span>
                </a>

                {/* 2. Direct WhatsApp Button */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] text-white font-black text-sm py-3 px-3 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 active:scale-95 text-center"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Status Update Strip for Worker */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-500 font-medium">Update Status:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleStatusChange("assigned")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                      lead.status === "assigned"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300"
                    }`}
                  >
                    Kaam Le Liya (Assigned)
                  </button>
                  <button
                    onClick={() => handleStatusChange("completed")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                      lead.status === "completed"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300"
                    }`}
                  >
                    Done (Completed)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
