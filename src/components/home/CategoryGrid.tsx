import Link from "next/link";
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
  Clock,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

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

const CATEGORY_THEMES: Record<string, { bg: string; text: string; badgeBg: string }> = {
  ac_repair: { bg: "bg-sky-50", text: "text-sky-600", badgeBg: "bg-sky-100 text-sky-800" },
  electrician: { bg: "bg-amber-50", text: "text-amber-600", badgeBg: "bg-amber-100 text-amber-800" },
  plumber: { bg: "bg-blue-50", text: "text-blue-600", badgeBg: "bg-blue-100 text-blue-800" },
  appliance: { bg: "bg-indigo-50", text: "text-indigo-600", badgeBg: "bg-indigo-100 text-indigo-800" },
  carpenter: { bg: "bg-orange-50", text: "text-orange-600", badgeBg: "bg-orange-100 text-orange-800" },
  painter: { bg: "bg-rose-50", text: "text-rose-600", badgeBg: "bg-rose-100 text-rose-800" },
  cleaning: { bg: "bg-emerald-50", text: "text-emerald-600", badgeBg: "bg-emerald-100 text-emerald-800" },
  ro_service: { bg: "bg-teal-50", text: "text-teal-600", badgeBg: "bg-teal-100 text-teal-800" },
};

export function CategoryGrid() {
  return (
    <section id="categories" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
              <span>Verified Home Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Aapko kis kaam ke liye mechanic chahiye?
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select category — pass ke verified technician 15 minute mein direct connect honge.
            </p>
          </div>
          <Link
            href="/post-task"
            className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0 group"
          >
            <span>Naya Kaam Post Karein</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (Polished, Urban Company Aesthetic) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {CATEGORIES.map((category) => {
            const IconComponent = ICON_MAP[category.iconName] || Wrench;
            const theme = CATEGORY_THEMES[category.id] || { bg: "bg-slate-50", text: "text-slate-600", badgeBg: "bg-slate-100 text-slate-700" };

            return (
              <Link
                key={category.id}
                href={`/post-task?category=${category.id}`}
                className="group relative bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Rate */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-2xl ${theme.bg} ${theme.text} flex items-center justify-center transition-transform group-hover:scale-105`}>
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>
                    {category.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {category.badge.replace(/[🔥⚡]/g, "").trim()}
                      </span>
                    )}
                  </div>

                  {/* Title & Hindi Title */}
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                    {category.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 font-medium mb-2.5">
                    {category.hindiTitle}
                  </p>

                  {/* Popular tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {category.popularTags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100 font-medium"
                      >
                        {tag.split("(")[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer strip: Rate & Arrival */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{category.avgRate}</span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-600">
                    <Clock className="w-3 h-3 text-slate-600" />
                    <span>{category.estimatedArrival}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
