import { ShieldCheck, CheckCircle2 } from "lucide-react";

export function SpamShieldBadge({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>SpamShield Protected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
      </div>
      <div>
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <span>100% Genuine Leads Spam Shield</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Google reCAPTCHA v3 & 10-Digit Mobile verification enabled. Fake / spam leads filtered automatically.
        </p>
      </div>
    </div>
  );
}
