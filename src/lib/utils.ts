import { CATEGORIES } from "./constants";

export function formatTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Abhi abhi (Just now)";
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute pehle`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ghante pehle`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} din pehle`;
}

export function maskPhoneNumber(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  if (clean.length >= 10) {
    return `${clean.slice(0, 5)} - XXXXX`;
  }
  return "XXXXX - XXXXX";
}

export function isValidIndianPhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, "");
  return /^[6-9]\d{9}$/.test(clean);
}

export function cleanIndianPhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-10);
}

export function getCategoryById(categoryId: string) {
  return CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
}

export function createCustomerWhatsAppLink(lead: {
  id: string;
  category: string;
  customerName: string;
  location: {
    area: string;
    pincode: string;
  };
  description: string;
}, supportNumber: string = "917979968347"): string {
  const text = `Namaste Local Jobs Support! 👋\n\nMaine website par kaam post kiya hai:\n*Job ID:* #${lead.id}\n*Service:* ${lead.category}\n*Area:* ${lead.location.area} (${lead.location.pincode})\n*Problem:* ${lead.description}\n*Naam:* ${lead.customerName}\n\nKripya pass ke verified mechanic se connect karwayein.`;
  return `https://wa.me/${supportNumber}?text=${encodeURIComponent(text)}`;
}

export function createWorkerToCustomerWhatsAppLink(lead: {
  id: string;
  title: string;
  customerName: string;
  customerPhone: string;
  area: string;
}, workerName: string): string {
  const text = `Namaste ${lead.customerName} ji! 👋\n\nMai ${workerName}, *Local Jobs* se bol raha hoon aapki *${lead.title}* ke regarding.\nMaine aapka request dekha hai jo aapne ${lead.area} ke liye post kiya tha. Kab aa kar check kar sakte hain?`;
  const cleanPhone = `91${cleanIndianPhone(lead.customerPhone)}`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
