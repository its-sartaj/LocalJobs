import { ShieldCheck, PhoneCall, Zap, Star, CheckCircle2, UserCheck } from "lucide-react";

export function TrustSection() {
  const testimonials = [
    {
      name: "Rohit Verma",
      area: "Dwarka Sector 10",
      service: "AC Service & Gas Refill",
      rating: 5,
      review:
        "AC bilkul thanda nahi kar raha tha. Request submit karne ke 10 minute me local AC mechanic ka call aa gaya. 1 ghante ke andar gas top-up ho gayi aur market rate se 30% kam kharcha hua.",
      time: "2 din pehle",
    },
    {
      name: "Pooja Aggarwal",
      area: "Janakpuri B-Block",
      service: "Electrician (MCB Trip)",
      rating: 5,
      review:
        "Badi apps me book karo toh visiting fee hi ₹300 mangte hain. Yahan direct pados ke electrician se phone par baat hui. 15 minute me switchboard theek kar diya bina kisi jhanjhat ke.",
      time: "Isi hafte",
    },
    {
      name: "Sanjay Kumar",
      area: "Rohini Sector 7",
      service: "Plumber (Tanki Overflow)",
      rating: 5,
      review:
        "Direct mechanic ka contact milna sabse best feature hai. Beech me koi middleman ya call center ka wait nahi karna pada. Kaam bhi badhiya aur rate bhi genuine.",
      time: "4 din pehle",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bharosemand Local Grahak</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Log Local Jobs Par Kyun Bharosa Karte Hain?
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Delhi NCR ke aam logon ke real anubhav aur direct phone connection ki suvidha.
          </p>
        </div>

        {/* 3 Genuine Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{t.time}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.area}</p>
                </div>
                <span className="text-[10px] font-semibold bg-white text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Suraksha & Vishwas Ki Guarantee
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Har registered mechanic ka phone number aur area verify hota hai. Customer ke liye yeh service hamesha 100% free rahegi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Mechanics</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Direct Phone Connect</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Zero Middleman Cut</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
