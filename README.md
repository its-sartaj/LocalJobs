# Local Jobs - अपने एरिया का काम 🇮🇳
### Hyperlocal Service Marketplace for Bharat

> **Brand Name:** Local Jobs  
> **Tagline:** "Apne Area Ka Kaam"  
> **Target Audience:** Hyperlocal customers with urgent repair/maintenance needs + local mistris/technicians (AC mechanics, electricians, plumbers, appliances, carpenters, painters). Mobile-first (95% budget Android users).

---

## 🚀 Key Features & Highlights

1. **Mobile-First & Outdoor Sunlight Readability:**
   - Designed with high-contrast color palette, bold headings, and large thumb-friendly touch targets (48px+ min-height).
   - Sticky mobile bottom navigation (`Home`, `Kaam Post`, `Mistri Feed`, `Admin`).

2. **Zero-Cost / No-SMS-OTP Authentication Strategy:**
   - **Zero SMS gateway expenditure:** Eliminates expensive transactional SMS / OTP costs ($0.00 infrastructure).
   - **Direct Indian Phone Validation:** 10-digit regex check (`^[6-9]\d{9}$`) with automated country code formatting (+91).
   - **Google 1-Tap / OAuth Simulation:** Instant 1-click name & phone autofill for friction-free submissions.
   - **SpamShield Anti-Bot Token:** Invisible Google reCAPTCHA v3 verification scoring to block bots and bogus numbers.
   - **Direct WhatsApp Handoff:** 1-click `wa.me` prefilled link generation enabling customers and technicians to exchange details and media directly.

3. **Customer Journey ("Kaam Karwana Hai"):**
   - **Hero Search & Pincode Selector:** Real-time selector for popular areas (Dwarka 110075, Rohini 110085, Laxmi Nagar 110092, Noida 201301, Gurugram 122001, Andheri West 400053, Koramangala 560034).
   - **Hyperlocal Category Grid:** 8 services (AC Repair, Electrician, Plumber, Appliance, Carpenter, Painter, RO Water, Cleaning).
   - **3-Step Lightweight Form Wizard (`/post-task`):**
     - *Step 1:* Category & problem description with 1-click complaint chips (e.g., "AC thanda nahi kar raha", "Gas leak", "MCB trip", "Water leak"). Urgency options (⚡ Urgent 15-30m, 📅 Today, 🕒 Flexible).
     - *Step 2:* Location (Colony/Sector, 6-digit Pincode, Landmark, Flat number).
     - *Step 3:* Contact info (Name, 10-digit mobile) + WhatsApp updates toggle + SpamShield.
   - **Success Confirmation (`TaskSuccessCard`):**
     - Job Reference ID (e.g., `#LJ-9041`).
     - List of nearby verified technicians notified with ETA.
     - Big Green 1-Tap WhatsApp Backup Handoff Button.

4. **Service Provider / Technician Journey ("Kaam Chahiye / Mistri"):**
   - **Local Leads Feed (`/worker/feed` or `/leads`):**
     - Real-time job requests with time elapsed ("12 minute pehle"), urgency badge, location, and problem description.
     - Customer phone numbers are masked by default (`98104 - XXXXX`) for privacy.
     - **"Connect with Customer" (Lead Unlock):**
       - Unlocks full customer phone number.
       - Reveals direct **"📞 Call Now"** (`tel:`) and **"💬 WhatsApp Chat"** (`wa.me:`) with prefilled technician greetings.
   - **Monetization Engine (Configurable):**
     - **Free Rollout Mode:** 100% free unlocks during launch to rapidly build supply-side density.
     - **Pay-Per-Lead Mode:** Configurable cost (e.g., 25 coins / ₹25 per unlock). Technicians get **100 Free Welcome Coins** upon registration.
   - **Worker Registration (`/worker/register`):**
     - Free registration with trade multi-select, operating pincodes, and experience.
   - **Worker Wallet Modal:** Coin balance tracking and simulated top-up packs.

5. **Admin Moderation Portal (`/admin`):**
   - **Overview KPI Cards:** Total tasks posted, active leads, registered mistris, unlocked connections, and monetization status.
   - **Leads Moderation Table:** Filter by status (Open, Assigned, Completed, Spam), quick status dropdown, spam flagging, and deletion.
   - **Technician Directory (`/admin/workers`):** Toggle worker "Verified ✓" badge with 1-click.
   - **Platform Configuration Modal:** Live toggle between "Free Rollout Mode" and "Paid Coins Mode", custom cost per lead, and support helpline numbers.
   - **Quick Database Reset:** 1-click button to reset mock leads and technicians to default states for demonstrations.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS (Optimized for outdoor daylight readability and budget Android screens)
- **Icons:** `lucide-react`
- **Data & State Management:** Reactive local storage layer with full mock seed data and cross-tab event synchronization. Compatible with Firebase Firestore & Supabase PostgreSQL schemas.

---

## 🗄️ Database Schema Mapping

```typescript
// 1. users (Customer, Worker, Admin)
interface User {
  id: string;
  name: string;
  phone: string;
  role: "customer" | "worker" | "admin";
  skills: string[]; // ["ac_repair", "electrician"]
  operatingPincodes: string[];
  isVerified: boolean;
  city?: string;
  experienceYears?: number;
  completedJobs?: number;
  rating?: number;
  credits: number;
  createdAt: string;
}

// 2. service_requests (Job Leads)
interface ServiceRequest {
  id: string; // e.g. "LJ-9041"
  category: string;
  subCategory?: string;
  title: string;
  description: string;
  urgency: "urgent" | "today" | "flexible";
  location: {
    area: string;
    pincode: string;
    city: string;
    landmark?: string;
    houseFlat?: string;
  };
  customerName: string;
  customerPhone: string;
  status: "open" | "assigned" | "completed" | "spam";
  unlockedBy: string[]; // worker IDs
  estimatedBudget?: string;
  preferredTime?: string;
  spamScore?: number;
  createdAt: string;
}

// 3. categories
interface Category {
  id: string;
  title: string;
  hindiTitle: string;
  tagline: string;
  iconName: string;
  popularTags: string[];
  avgRate: string;
  estimatedArrival: string;
  badge?: string;
}
```

---

## 🏃 Running the Application

The development server is running locally:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser or smartphone.

### Key URLs to Test:
- **Homepage:** `http://localhost:3000/`
- **Post a Task (Customer):** `http://localhost:3000/post-task`
- **Technician Leads Feed:** `http://localhost:3000/worker/feed` (or `http://localhost:3000/leads`)
- **Technician Registration:** `http://localhost:3000/worker/register`
- **Admin Dashboard:** `http://localhost:3000/admin`
- **Role Switcher:** Look at the top right of the navigation bar to switch between **Customer Mode**, **Mistri Mode (Ramesh Sharma)**, and **Admin Mode** with a single click!
