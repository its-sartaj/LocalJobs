"use client";

import { FileText, PhoneCall, CheckCircle2, ShieldAlert, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Problem & Area Batayein",
      desc: "AC cooling, switchboard ya nal leakage — service chunein aur apna pincode/colony dalein. Sirf 1 minute lagta hai.",
      icon: FileText,
      badge: "No OTP / No App Install",
    },
    {
      step: "02",
      title: "Pass Ke Mechanic Se Direct Call",
      desc: "Aapke 3-5 km ke daayre ke verified mechanic ko notification milti hai. Vo turant call karke rate aur timing discuss karte hain.",
      icon: PhoneCall,
      badge: "Seedha Phone Connection",
    },
    {
      step: "03",
      title: "Kaam Done & Direct Payment",
      desc: "Mechanic ghar aakar repair karega. Kaam check karein aur seedha mechanic ko pay karein — bina kisi platform cut ke.",
      icon: CheckCircle2,
      badge: "₹0 Middleman Fee",
    },
  ];

  const comparison = [
    { feature: "Mechanic Se Baat", localJobs: "Direct Phone Call", others: "Call center & Chatbot" },
    { feature: "Platform Commission", localJobs: "₹0 (100% Free)", others: "25% se 35% commission" },
    { feature: "Response Time", localJobs: "15 se 30 Minute", others: "Agley din ka slot" },
    { feature: "Login / Registration", localJobs: "No OTP required", others: "App download & OTP" },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-2">
            Simple 3-Step Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Local Jobs Kaise Kaam Karta Hai?
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Bina kisi app download ya lambe form ke — seedha aur transparent tarika.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                      STEP {st.step}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{st.badge}</span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Comparison Card (Human Touch) */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
          <div className="text-center mb-5">
            <h3 className="font-extrabold text-lg text-slate-900">
              Local Jobs vs Badi Service Apps
            </h3>
            <p className="text-xs text-slate-500">Kyun lakho log pados ke local mechanic ko prefer karte hain:</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                  <th className="py-2.5 px-3">Suvidha</th>
                  <th className="py-2.5 px-3 text-brand-600 font-extrabold bg-brand-50/50 rounded-t-lg">Local Jobs</th>
                  <th className="py-2.5 px-3 text-slate-500">Heavy Service Apps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparison.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-3 font-medium text-slate-700">{item.feature}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 bg-brand-50/30">
                      ✓ {item.localJobs}
                    </td>
                    <td className="py-3 px-3 text-slate-400">✗ {item.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/post-task"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              <span>Abhi Apni Service Request Bhejein</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
