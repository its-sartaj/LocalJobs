"use client";

import { useState } from "react";
import { Coins, X, CheckCircle2, ArrowRight, ShieldCheck, Plus } from "lucide-react";
import { User } from "@/types";
import { saveWorkers, getWorkers, setCurrentUser } from "@/lib/storage";

interface WorkerWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: User;
  onBalanceUpdated: () => void;
}

export function WorkerWalletModal({
  isOpen,
  onClose,
  worker,
  onBalanceUpdated,
}: WorkerWalletModalProps) {
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleRecharge = (addedCoins: number, price: number) => {
    const workers = getWorkers();
    const updated = workers.map((w) => {
      if (w.id === worker.id) {
        return { ...w, credits: w.credits + addedCoins };
      }
      return w;
    });

    saveWorkers(updated);
    const updatedWorker = { ...worker, credits: worker.credits + addedCoins };
    setCurrentUser(updatedWorker);
    setSuccessMsg(`Mubarak! ₹${price} ke recharge se ${addedCoins} Coins add ho gaye!`);
    onBalanceUpdated();

    setTimeout(() => {
      setSuccessMsg("");
    }, 2500);
  };

  const coinPackages = [
    { coins: 50, price: 99, popular: false, tag: "Starter Pack" },
    { coins: 150, price: 249, popular: true, tag: "Best Value 🔥" },
    { coins: 350, price: 499, popular: false, tag: "Pro Mechanic Pack" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Coins className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Mechanic Wallet & Coins
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Lead unlock karne ke liye recharge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Balance Card */}
        <div className="my-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-extrabold text-amber-100 tracking-wider">
              Available Balance
            </p>
            <p className="text-3xl font-black mt-0.5 flex items-center gap-1.5">
              <span>🪙 {worker.credits}</span>
              <span className="text-sm font-semibold opacity-90">Coins</span>
            </p>
            <p className="text-[11px] text-amber-100 mt-1">
              {Math.floor(worker.credits / 25)} Leads unlock karne ke barabar
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full font-bold">
              Active Wallet
            </span>
          </div>
        </div>

        {successMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Recharge Packages */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Recharge Pack Chunein:
          </p>

          {coinPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border-2 flex items-center justify-between transition ${
                pkg.popular
                  ? "border-amber-500 bg-amber-50/50"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-slate-900">
                    🪙 {pkg.coins} Coins
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      pkg.popular
                        ? "bg-amber-200 text-amber-900"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {pkg.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  ₹{pkg.price} (₹{(pkg.price / pkg.coins).toFixed(1)} per coin)
                </p>
              </div>

              <button
                onClick={() => handleRecharge(pkg.coins, pkg.price)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition active:scale-95 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>₹{pkg.price} Pay</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Secure Instant Topup</span>
          </span>
          <span>Zero Commission Platform</span>
        </div>
      </div>
    </div>
  );
}
