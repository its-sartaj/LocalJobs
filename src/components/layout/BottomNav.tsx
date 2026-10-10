"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Wrench } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Post",
      href: "/post-task",
      icon: PlusCircle,
      isActive: pathname === "/post-task",
    },
    {
      label: "Leads",
      href: "/worker/feed",
      icon: Wrench,
      isActive: pathname.startsWith("/worker") || pathname.startsWith("/leads"),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2 shadow-[0_-2px_10px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition active:scale-95 ${
                item.isActive ? "text-brand-600 font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              <span className="text-[11px] font-medium mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
