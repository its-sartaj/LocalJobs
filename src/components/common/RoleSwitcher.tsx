"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, switchRole, getWorkers } from "@/lib/storage";
import { User, UserRole } from "@/types";
import { ShieldCheck, UserCheck, Wrench, ChevronDown } from "lucide-react";

export function RoleSwitcher() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [workers, setWorkers] = useState<User[]>([]);

  const refreshUser = () => {
    setCurrentUser(getCurrentUser());
    setWorkers(getWorkers());
  };

  useEffect(() => {
    refreshUser();
    const handleStorageUpdate = () => refreshUser();
    window.addEventListener("local-jobs-storage-updated", handleStorageUpdate);
    return () => window.removeEventListener("local-jobs-storage-updated", handleStorageUpdate);
  }, []);

  if (!currentUser) return null;

  const handleSelect = (role: UserRole, workerId?: string) => {
    switchRole(role, workerId);
    setIsOpen(false);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return {
          icon: ShieldCheck,
          label: "Admin Panel",
          color: "bg-purple-100 text-purple-800 border-purple-300",
        };
      case "worker":
        return {
          icon: Wrench,
          label: `Mechanic: ${currentUser.name.split(" ")[0]}`,
          color: "bg-amber-100 text-amber-900 border-amber-300",
        };
      case "customer":
      default:
        return {
          icon: UserCheck,
          label: `Customer: ${currentUser.name.split(" ")[0]}`,
          color: "bg-emerald-100 text-emerald-900 border-emerald-300",
        };
    }
  };

  const badge = getRoleBadge(currentUser.role);
  const Icon = badge.icon;

  return (
    <div className="relative inline-block text-left text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border font-semibold shadow-sm transition hover:shadow ${badge.color}`}
        title="Role Switcher (Test multiple user journeys)"
      >
        <Icon className="w-3.5 h-3.5" />
        <span>{badge.label}</span>
        {currentUser.role === "worker" && (
          <span className="bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded-full font-bold text-[10px]">
            🪙 {currentUser.credits}
          </span>
        )}
        <ChevronDown className="w-3 h-3 text-slate-500 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 p-2 animate-in fade-in slide-in-from-top-2">
          <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Switch User Perspective
          </div>

          <div className="space-y-1">
            <button
              onClick={() => handleSelect("customer")}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-xs transition ${
                currentUser.role === "customer"
                  ? "bg-emerald-50 text-emerald-900 font-bold border border-emerald-200"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <div>
                  <p className="font-semibold">Customer Mode</p>
                  <p className="text-[10px] text-slate-500">Kaam Karwana Hai</p>
                </div>
              </div>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">Client</span>
            </button>

            {workers.map((worker) => (
              <button
                key={worker.id}
                onClick={() => handleSelect("worker", worker.id)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-xs transition ${
                  currentUser.role === "worker" && currentUser.id === worker.id
                    ? "bg-amber-50 text-amber-950 font-bold border border-amber-200"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <div>
                    <p className="font-semibold">{worker.name} {worker.isVerified ? "✓" : ""}</p>
                    <p className="text-[10px] text-slate-500 capitalize">
                      {worker.skills[0]?.replace("_", " ")} ({worker.city})
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                  🪙 {worker.credits}
                </span>
              </button>
            ))}

            <button
              onClick={() => handleSelect("admin")}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-xs transition ${
                currentUser.role === "admin"
                  ? "bg-purple-50 text-purple-900 font-bold border border-purple-200"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <div>
                  <p className="font-semibold">Admin Panel</p>
                  <p className="text-[10px] text-slate-500">Full Moderation & Leads</p>
                </div>
              </div>
              <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Control</span>
            </button>
          </div>

          <div className="border-t border-slate-100 mt-2 pt-2 px-1 text-[11px] text-slate-400 text-center">
            Zero-Cost No-SMS-OTP Demo
          </div>
        </div>
      )}
    </div>
  );
}
