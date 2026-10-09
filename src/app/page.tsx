import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { LiveLeadsTicker } from "@/components/home/LiveLeadsTicker";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustSection } from "@/components/home/TrustSection";
import { WorkerPromoBanner } from "@/components/home/WorkerPromoBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Search & Dual CTAs */}
      <Hero />

      {/* 2. 8-Category Hyperlocal Grid */}
      <CategoryGrid />

      {/* 3. Real-time Live Leads Ticker */}
      <LiveLeadsTicker />

      {/* 4. Dual Workflow Explanation (Customer & Mechanic) */}
      <HowItWorks />

      {/* 5. Trust & Competitive Edge (No OTP, Zero Commission) */}
      <TrustSection />

      {/* 6. Technician Registration CTA Banner */}
      <WorkerPromoBanner />
    </div>
  );
}
