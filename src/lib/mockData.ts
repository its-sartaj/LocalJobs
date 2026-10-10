import { ServiceRequest, User } from "@/types";

export const INITIAL_WORKERS: User[] = [];

export const INITIAL_LEADS: ServiceRequest[] = [
  {
    id: "LJ-8021",
    category: "ac_repair",
    title: "Split AC Cooling Issue & Gas Refill",
    description: "1.5 Ton AC cooling nahi kar raha, fan chal raha hai but thandi hawa nahi aa rahi.",
    urgency: "urgent",
    location: {
      area: "Dwarka Sector 10",
      pincode: "110075",
      city: "Delhi",
    },
    customerName: "Rohit Verma",
    customerPhone: "9811223344",
    status: "open",
    unlockedBy: [],
    createdAt: "2026-10-10T14:30:00.000Z",
  },
  {
    id: "LJ-8022",
    category: "electrician",
    title: "Main MCB Trip & Switchboard Spark",
    description: "Living room ka switchboard spark kar raha hai aur MCB baar baar trip ho rahi hai.",
    urgency: "urgent",
    location: {
      area: "Janakpuri B-Block",
      pincode: "110058",
      city: "Delhi",
    },
    customerName: "Pooja Aggarwal",
    customerPhone: "9811556677",
    status: "open",
    unlockedBy: [],
    createdAt: "2026-10-10T14:15:00.000Z",
  },
  {
    id: "LJ-8023",
    category: "plumber",
    title: "Bathroom Tap Leakage & Tanki Overflow",
    description: "Wall mixer tap lagatar tapak raha hai aur overhead tanki sensor kaam nahi kar raha.",
    urgency: "today",
    location: {
      area: "Rohini Sector 7",
      pincode: "110085",
      city: "Delhi",
    },
    customerName: "Sanjay Kumar",
    customerPhone: "9811778899",
    status: "open",
    unlockedBy: [],
    createdAt: "2026-10-10T13:45:00.000Z",
  },
  {
    id: "LJ-8024",
    category: "appliance",
    title: "Washing Machine Spin Tub Not Working",
    description: "Front load washing machine me wash cycle theek hai par spin/dry tub nahi ghoom raha.",
    urgency: "today",
    location: {
      area: "Noida Sector 62",
      pincode: "201301",
      city: "Noida",
    },
    customerName: "Vikas Sharma",
    customerPhone: "9811990011",
    status: "open",
    unlockedBy: [],
    createdAt: "2026-10-10T13:00:00.000Z",
  },
];
