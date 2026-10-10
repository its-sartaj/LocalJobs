import Link from "next/link";
import { Wrench, PhoneCall, ArrowRight, ShieldCheck, Coins } from "lucide-react";

export function WorkerPromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-lg border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-bold border border-slate-700">
              <Wrench className="w-3.5 h-3.5" />
              <span>Mechanic & Technician Onboarding</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white">
              Apne Pados Ke Grahak Paayein — Har Mahine Naye Kaam Ki Guarantee
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Agar aap AC Mechanic, Electrician, Plumber, Painter ya Carpenter hain, toh Local Jobs par apna free profile register karein. Customer ka seedha call aapke mobile par aayega.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Zero Commission (Poori kamai aapki)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Direct Customer Phone Call</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/worker/register"
              className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-sm transition text-center flex items-center justify-center gap-2 group active:scale-95"
            >
              <Wrench className="w-4 h-4" />
              <span>Mechanic Profile Banayein</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/worker/feed"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-6 py-3 rounded-2xl transition text-center border border-slate-700"
            >
              Area Ki Live Leads Dekhein
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
