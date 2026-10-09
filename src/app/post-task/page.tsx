import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { PostTaskWizard } from "@/components/customer/PostTaskWizard";

export const metadata = {
  title: "Kaam Post Karein | Local Jobs",
  description: "Apne ghar ka repair kaam post karein. 15 minute mein verified mechanic se direct call paayein.",
};

export default function PostTaskPage() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      {/* Top Navigation Strip */}
      <div className="max-w-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-2xs transition active:scale-95 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home Par </span>
          <span>Wapas</span>
        </Link>

        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Free For Customers</span>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm font-bold text-slate-700">Form Load Ho Raha Hai...</p>
          </div>
        }
      >
        <PostTaskWizard />
      </Suspense>
    </div>
  );
}
