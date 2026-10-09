"use client";

import Link from "next/link";
import { CheckCircle2, MessageCircle, PhoneCall, ArrowRight, ShieldCheck, MapPin, Clock, Wrench } from "lucide-react";
import { ServiceRequest, User } from "@/types";
import { createCustomerWhatsAppLink, formatTimeAgo } from "@/lib/utils";
import { getWorkers } from "@/lib/storage";

interface TaskSuccessCardProps {
  lead: ServiceRequest;
  onPostAnother: () => void;
}

export function TaskSuccessCard({ lead, onPostAnother }: TaskSuccessCardProps) {
  const workers = getWorkers().filter((w) => w.skills.includes(lead.category));
  const nearbyWorkers = workers.length > 0 ? workers.slice(0, 3) : getWorkers().slice(0, 2);
  const waUrl = createCustomerWhatsAppLink(lead);

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6 animate-in zoom-in-95">
      {/* Header check icon */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
          Job ID: #{lead.id} • Status: Active
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Aapki Request Submit Ho Gayi Hai! 🎉
        </h2>

        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Aapke area ({lead.location.area}) ke <strong>verified mechanic</strong> ko notification bhej diya gaya hai. Agle <strong>10-15 minute</strong> mein direct call aayegi.
        </p>
      </div>

      {/* Primary Action Button: WhatsApp Handoff */}
      <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 text-center space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-900">
          <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
          <span>Zero-Barrier WhatsApp Backup</span>
        </div>

        <p className="text-xs text-emerald-800 leading-relaxed">
          Agar aapko turant confirm karna hai ya photos bhejne hain, toh WhatsApp par direct share karein:
        </p>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/25 transition w-full active:scale-95"
        >
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          <span>WhatsApp Par Direct Bhejein</span>
        </a>
      </div>

      {/* Summary of Submitted Lead */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold text-slate-700">
          <span>Request Details</span>
          <span className="text-brand-600 uppercase font-black">{lead.category.replace("_", " ")}</span>
        </div>

        <div className="space-y-1.5 text-slate-600">
          <p><strong>Problem:</strong> {lead.title}</p>
          <p className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span><strong>Location:</strong> {lead.location.area}, {lead.location.city} ({lead.location.pincode})</span>
          </p>
          <p className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span><strong>Urgency:</strong> {lead.urgency === "urgent" ? "Urgent (15-30 Min)" : "Today"}</span>
          </p>
          <p><strong>Customer:</strong> {lead.customerName} ({lead.customerPhone})</p>
        </div>
      </div>

      {/* Nearby Technicians Notified */}
      {nearbyWorkers.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-brand-500" />
              <span>In Technicians Ko Notify Kiya Gaya Hai:</span>
            </h4>
            <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              {nearbyWorkers.length} Active Pass Mein
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {nearbyWorkers.map((worker) => (
              <div
                key={worker.id}
                className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900 flex items-center gap-1">
                    <span>{worker.name}</span>
                    {worker.isVerified && (
                      <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1 rounded">✓ Verified</span>
                    )}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {worker.experienceYears || 5}+ yrs exp • ⭐ {worker.rating || 4.8} ({worker.completedJobs || 120}+ jobs)
                  </p>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                  Alert Sent ⚡
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
          <Wrench className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Aapke Area Ke Mechanics Ko Alert Bhej Diya Gaya Hai</p>
            <p className="text-[11px] text-amber-800 mt-0.5">
              Aapke pincode ({lead.location.pincode}) ke mechanics ko live feed par notify kar diya gaya hai. Agle 10-15 minute mein direct call aayegi.
            </p>
          </div>
        </div>
      )}

      {/* Bottom helper actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <button
          onClick={onPostAnother}
          className="text-slate-600 hover:text-slate-900 font-semibold underline"
        >
          Doosra Kaam Post Karein
        </button>

        <Link
          href="/worker/feed"
          className="text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1"
        >
          <span>Mechanic Feed Mein Lead Dekhein</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
