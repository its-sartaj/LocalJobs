import Link from "next/link";
import { ShieldCheck, CheckCircle2, MessageCircle } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800" data-agent="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo variant="dark" size="md" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Bharat ka sabse aasan hyperlocal service portal. Direct phone pe mechanic se baat karein, zero middleman commission, aur 15 minute mein verified assistance paayein.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>100% Free for Customers (No platform cut)</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Popular Services</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/post-task?category=ac_repair" className="hover:text-brand-400 transition">AC Repair & Gas Refill</Link></li>
              <li><Link href="/post-task?category=electrician" className="hover:text-brand-400 transition">Electrician & Wiring</Link></li>
              <li><Link href="/post-task?category=plumber" className="hover:text-brand-400 transition">Plumber & Water Leakage</Link></li>
              <li><Link href="/post-task?category=appliance" className="hover:text-brand-400 transition">Washing Machine & Fridge</Link></li>
              <li><Link href="/post-task?category=carpenter" className="hover:text-brand-400 transition">Carpenter & Bed Repair</Link></li>
              <li><Link href="/post-task?category=ro_service" className="hover:text-brand-400 transition">RO Filter Replacement</Link></li>
            </ul>
          </div>

          {/* For Workers & Technicians */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Mechanic & Technicians</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/worker/feed" className="hover:text-brand-400 font-semibold text-slate-200 transition">
                  ⚡ Live Leads Feed (Kaam Dekhein)
                </Link>
              </li>
              <li>
                <Link href="/worker/register" className="hover:text-brand-400 transition">
                  Naye Mechanic Register Karein
                </Link>
              </li>
              <li className="pt-2">
                <span className="inline-block bg-slate-800 text-amber-300 text-[11px] px-2.5 py-1 rounded-lg border border-amber-400/20 font-medium">
                  Direct Customer Connection
                </span>
              </li>
            </ul>
          </div>

          {/* Trust & Support */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Suraksha & Support</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Verified phone number validation & spam protection.</span>
              </div>
              <a
                href="https://wa.me/917979968347?text=Namaste%20Local%20Jobs!%20Mujhe%20help%20chahiye"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 font-bold hover:bg-[#25D366]/30 transition w-full"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: +91 79799 68347</span>
              </a>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Local Jobs connects customers directly with independent service providers in Delhi NCR.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Local Jobs - Apne Area Ka Kaam. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed for Bharat&apos;s local technicians &amp; homeowners
          </p>
        </div>
      </div>
    </footer>
  );
}
