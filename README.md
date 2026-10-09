# Local Jobs - अपने एरिया का काम 🇮🇳
### Hyperlocal Service Marketplace for Bharat

> **Brand Name:** Local Jobs  
> **Tagline:** "Apne Area Ka Kaam"  
> **Target Audience:** Hyperlocal customers with urgent repair/maintenance needs + local mechanics & technicians (AC mechanics, electricians, plumbers, appliances, carpenters, painters). Mobile-first (95% budget Android users).

---

## 🚀 Key Features & Highlights

1. **Mobile-First & Outdoor Sunlight Readability:**
   - Designed with high-contrast color palette, bold headings, and large thumb-friendly touch targets.
   - Sticky mobile bottom navigation (`Home`, `Post`, `Leads`).

2. **Zero-Cost / Direct Phone & WhatsApp Workflow:**
   - **Zero SMS gateway expenditure:** Direct phone and WhatsApp communication ($0.00 infrastructure).
   - **Direct Indian Phone Validation:** 10-digit validation (`^[6-9]\d{9}$`) with automated country code formatting (+91).
   - **Direct WhatsApp Handoff:** 1-click `wa.me` prefilled link generation enabling customers and technicians to exchange details directly.

3. **Customer Journey ("Kaam Karwana Hai"):**
   - **Hero Search & Pincode Selector:** Real-time selector for popular areas (Dwarka 110075, Rohini 110085, Laxmi Nagar 110092, Noida 201301, Gurugram 122001, etc.).
   - **Hyperlocal Category Grid:** 8 services (AC Repair, Electrician, Plumber, Appliance, Carpenter, Painter, RO Water, Cleaning).
   - **3-Step Lightweight Form Wizard (`/post-task`):**
     - *Step 1:* Category & problem description with 1-click complaint chips. Urgency options (⚡ Urgent 15-30m, 📅 Today, 🕒 Flexible).
     - *Step 2:* Location (Colony/Sector, 6-digit Pincode, Landmark).
     - *Step 3:* Contact info (Name, 10-digit mobile) + WhatsApp updates toggle.
   - **Success Confirmation (`TaskSuccessCard`):**
     - Job Reference ID (e.g., `#LJ-9041`).
     - Nearby verified technicians notification with ETA.
     - Direct WhatsApp backup button.

4. **Service Provider / Technician Journey ("Kaam Chahiye"):**
   - **Local Leads Feed (`/worker/feed` or `/leads`):**
     - Real-time job requests with time elapsed ("12 minute pehle"), urgency badge, location, and problem description.
     - Customer phone numbers masked by default for privacy.
     - **"Connect with Customer" (Lead Unlock):**
       - Unlocks full customer phone number.
       - Reveals direct **"📞 Call Now"** (`tel:`) and **"💬 WhatsApp Chat"** (`wa.me:`).
   - **Worker Registration (`/worker/register`):**
     - Free registration with trade multi-select, operating pincodes, and experience.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS (Optimized for outdoor daylight readability and budget Android screens)
- **Icons:** `lucide-react`
- **Data & State Management:** Reactive local storage layer with full mock seed data and cross-tab event synchronization. Compatible with Firebase Firestore.

---

## 🏃 Running the Application

```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser or smartphone.

### Key URLs to Test:
- **Homepage:** `http://localhost:3000/`
- **Post a Task (Customer):** `http://localhost:3000/post-task`
- **Technician Leads Feed:** `http://localhost:3000/worker/feed` (or `/leads`)
- **Technician Registration:** `http://localhost:3000/worker/register`
