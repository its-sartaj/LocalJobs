import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://its-sartaj.github.io/LocalJobs"),
  title: "Local Jobs | Hyperlocal Service Marketplace",
  description:
    "Ghar ka koi bhi repair ya maintenance kaam? AC Repair, Electrician, Plumber, Fridge, Carpenter - Apne area ke verified mechanic ko direct call karein bina kisi commission ke.",
  manifest: "/LocalJobs/manifest.json",
  icons: {
    icon: "/LocalJobs/icon.svg",
    apple: "/LocalJobs/icon.svg",
  },
  alternates: {
    canonical: "https://its-sartaj.github.io/LocalJobs/",
  },
  openGraph: {
    title: "Local Jobs | Hyperlocal Service Marketplace",
    description:
      "Ghar ka koi bhi repair ya maintenance kaam? AC Repair, Electrician, Plumber, Fridge, Carpenter - Apne area ke verified mechanic ko direct call karein bina kisi commission ke.",
    url: "https://its-sartaj.github.io/LocalJobs/",
    siteName: "Local Jobs",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "/LocalJobs/logo.png",
        width: 1024,
        height: 1024,
        alt: "Local Jobs Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Local Jobs | Hyperlocal Service Marketplace",
    description: "Apne area ke verified mechanic ko direct call karein bina kisi commission ke.",
    images: ["/LocalJobs/logo.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Local Jobs",
  },
  keywords: [
    "Local Jobs",
    "Apne Area Ka Kaam",
    "AC repair",
    "Electrician near me",
    "Plumber near me",
    "Mechanic connect",
    "Hyperlocal services",
  ],
  verification: {
    google: "Y6Z2hIP4vgOZNvtMoI8xXYrHMZMwjA1wslDM8VKO4qg",
  },
};

export const viewport: Viewport = {
  themeColor: "#c2410c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi-IN" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          as="image"
          href="/LocalJobs/images/mountain_bg_mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/LocalJobs/images/mountain_bg.webp"
          media="(min-width: 769px)"
          fetchPriority="high"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://its-sartaj.github.io/LocalJobs/#website",
                  "url": "https://its-sartaj.github.io/LocalJobs/",
                  "name": "Local Jobs",
                  "description": "Hyperlocal verified technician marketplace in Delhi NCR",
                  "inLanguage": "hi-IN",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://its-sartaj.github.io/LocalJobs/post-task?query={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "HomeAndConstructionBusiness",
                  "@id": "https://its-sartaj.github.io/LocalJobs/#organization",
                  "name": "Local Jobs",
                  "url": "https://its-sartaj.github.io/LocalJobs/",
                  "logo": "https://its-sartaj.github.io/LocalJobs/logo.png",
                  "telephone": "+91-7979968347",
                  "priceRange": "₹149 - ₹1499",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Delhi NCR",
                    "addressCountry": "IN",
                  },
                  "areaServed": [
                    "Dwarka",
                    "Rohini",
                    "Janakpuri",
                    "Noida",
                    "Gurugram",
                    "Delhi NCR",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-500 selection:text-white pb-28 md:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
        <WhatsAppButton />
      </body>
    </html>
  );
}
