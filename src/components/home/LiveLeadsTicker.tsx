"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { getLeads } from "@/lib/storage";
import { ServiceRequest } from "@/types";
import { formatTimeAgo } from "@/lib/utils";

export function LiveLeadsTicker() {
  const [leads, setLeads] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    setLeads(getLeads().slice(0, 4));
    const handleUpdate = () => setLeads(getLeads().slice(0, 4));
    window.addEventListener("local-jobs-storage-updated", handleUpdate);
    return () => window.removeEventListener("local-jobs-storage-updated", handleUpdate);
  }, []);

  if (leads.length === 0) return null;

  return (
    <section className="py-8 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h3 className="font-bold text-sm sm:text-base text-white">
              Live Activity • Real-Time Customer Requests
            </h3>
          </div>
          <Link
            href="/worker/feed"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
          >
            <span>Mechanic Portal: Sabhi Leads Dekhein</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {leads.map((lead) => (
            <Link
              key={lead.id}
              href="/worker/feed"
              className="bg-slate-800/80 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/80 hover:border-slate-600 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{formatTimeAgo(lead.createdAt)}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                      lead.urgency === "urgent"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {lead.urgency === "urgent" ? "Urgent" : "Today"}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-brand-400 transition">
                  {lead.title}
                </h4>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{lead.location.area}</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-mono">#{lead.id}</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
