"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const helplineNumber = "917979968347";
  const message = encodeURIComponent(
    "Namaste Local Jobs! Mujhe mechanic chahiye / Mera kaam post karna hai. Kripya help karein."
  );
  const waUrl = `https://wa.me/${helplineNumber}?text=${message}`;

  return (
    <aside aria-label="Support chat" className="hidden md:flex fixed bottom-8 right-8 z-40">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-transform active:scale-95 group border-2 border-white"
        aria-label="Direct WhatsApp Helpline 7979968347"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366] shrink-0" />
        <div className="flex flex-col text-left pr-1">
          <span className="text-[10px] uppercase font-bold tracking-wider leading-none text-emerald-100">
            24/7 Helpline
          </span>
          <span className="text-xs font-black tracking-wide leading-tight">
            +91 79799 68347
          </span>
        </div>
      </a>
    </aside>
  );
}
