import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export const metadata: Metadata = {
  title: "Local Jobs | Hyperlocal Service Marketplace",
  description:
    "Ghar ka koi bhi repair ya maintenance kaam? AC Repair, Electrician, Plumber, Fridge, Carpenter - Apne area ke verified mechanic ko direct call karein bina kisi commission ke.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
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
  themeColor: "#f97316",
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
          href="/images/mountain_bg_mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/mountain_bg.webp"
          media="(min-width: 769px)"
          fetchPriority="high"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/eagle.webp"
          fetchPriority="high"
          type="image/webp"
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
