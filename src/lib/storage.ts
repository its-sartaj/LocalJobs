"use client";

import { ServiceRequest, User, PlatformConfig, UserRole } from "@/types";
import { INITIAL_LEADS, INITIAL_WORKERS } from "./mockData";
import { DEFAULT_PLATFORM_CONFIG } from "./constants";
import {
  saveLeadToFirestore,
  updateLeadInFirestore,
  saveWorkerToFirestore,
  updateWorkerInFirestore,
  seedFirestoreIfEmpty,
  subscribeToFirestoreLeads,
} from "./firebaseService";

const STORAGE_KEYS = {
  LEADS: "local_jobs_leads_v2",
  WORKERS: "local_jobs_workers_v2",
  CONFIG: "local_jobs_config_v2",
  ACTIVE_USER: "local_jobs_active_user_v2",
};

export const DEFAULT_CUSTOMER_USER: User = {
  id: "usr-customer-1",
  name: "Grahak",
  phone: "",
  role: "customer",
  skills: [],
  operatingPincodes: [],
  isVerified: true,
  city: "Local Area",
  credits: 0,
  createdAt: new Date().toISOString(),
};

export const GUEST_WORKER_USER: User = {
  id: "guest-worker-1",
  name: "Mechanic Partner",
  phone: "9800000000",
  role: "worker",
  skills: ["ac_repair", "electrician", "plumber"],
  operatingPincodes: ["110075", "110085", "110092", "201301", "122001"],
  isVerified: false,
  city: "Local Area",
  credits: 100,
  createdAt: new Date().toISOString(),
};

export const DEFAULT_ADMIN_USER: User = {
  id: "usr-admin-1",
  name: "Admin Control",
  phone: "9999900000",
  role: "admin",
  skills: [],
  operatingPincodes: [],
  isVerified: true,
  city: "HQ",
  credits: 9999,
  createdAt: new Date().toISOString(),
};

// Helpers for localStorage
function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Storage error for ${key}:`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Trigger custom event so reactive components can update
    window.dispatchEvent(new Event("local-jobs-storage-updated"));
  } catch (err) {
    console.error(`Error saving to storage key ${key}:`, err);
  }
}

// Leads
export function getLeads(): ServiceRequest[] {
  return getFromStorage<ServiceRequest[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
}

export function saveLeads(leads: ServiceRequest[]): void {
  saveToStorage(STORAGE_KEYS.LEADS, leads);
}

export function addLead(newLeadData: Omit<ServiceRequest, "id" | "createdAt" | "unlockedBy" | "status">): ServiceRequest {
  const leads = getLeads();
  const newId = `LJ-${Math.floor(1000 + Math.random() * 9000)}`;
  const newLead: ServiceRequest = {
    ...newLeadData,
    id: newId,
    status: "open",
    unlockedBy: [],
    createdAt: new Date().toISOString(),
  };

  const updated = [newLead, ...leads];
  saveLeads(updated);

  // Sync to Google Firebase Firestore
  saveLeadToFirestore(newLead).catch((e) => console.warn("Firestore sync background:", e));

  return newLead;
}

export function updateLeadStatus(leadId: string, status: ServiceRequest["status"], workerId?: string, workerName?: string): void {
  const leads = getLeads();
  const updated = leads.map((l) => {
    if (l.id === leadId) {
      return {
        ...l,
        status,
        ...(workerId ? { assignedWorkerId: workerId } : {}),
        ...(workerName ? { assignedWorkerName: workerName } : {}),
      };
    }
    return l;
  });
  saveLeads(updated);

  // Sync to Google Firebase Firestore
  updateLeadInFirestore(leadId, {
    status,
    ...(workerId ? { assignedWorkerId: workerId } : {}),
    ...(workerName ? { assignedWorkerName: workerName } : {}),
  }).catch((e) => console.warn("Firestore status update:", e));
}

// Workers
export function getWorkers(): User[] {
  return getFromStorage<User[]>(STORAGE_KEYS.WORKERS, INITIAL_WORKERS);
}

export function saveWorkers(workers: User[]): void {
  saveToStorage(STORAGE_KEYS.WORKERS, workers);
}

export function addWorker(workerData: Omit<User, "id" | "role" | "createdAt" | "credits">): User {
  const workers = getWorkers();
  const newWorker: User = {
    ...workerData,
    id: `wrk-${Math.floor(100 + Math.random() * 900)}`,
    role: "worker",
    credits: 100, // 100 Free Welcome bonus credits
    createdAt: new Date().toISOString(),
  };
  const updated = [newWorker, ...workers];
  saveWorkers(updated);

  // Sync to Google Firebase Firestore
  saveWorkerToFirestore(newWorker).catch((e) => console.warn("Firestore worker save:", e));

  return newWorker;
}

export function toggleWorkerVerification(workerId: string): void {
  const workers = getWorkers();
  let updatedStatus = false;
  const updated = workers.map((w) => {
    if (w.id === workerId) {
      updatedStatus = !w.isVerified;
      return { ...w, isVerified: updatedStatus };
    }
    return w;
  });
  saveWorkers(updated);

  // Sync to Google Firebase Firestore
  updateWorkerInFirestore(workerId, { isVerified: updatedStatus }).catch((e) =>
    console.warn("Firestore worker verify update:", e)
  );
}

// Config
export function getPlatformConfig(): PlatformConfig {
  return getFromStorage<PlatformConfig>(STORAGE_KEYS.CONFIG, DEFAULT_PLATFORM_CONFIG);
}

export function savePlatformConfig(config: PlatformConfig): void {
  saveToStorage(STORAGE_KEYS.CONFIG, config);
}

// Active User & Role Management
export function getCurrentUser(): User {
  const workers = getWorkers();
  return getFromStorage<User>(STORAGE_KEYS.ACTIVE_USER, workers[0] || DEFAULT_CUSTOMER_USER);
}

export function setCurrentUser(user: User): void {
  saveToStorage(STORAGE_KEYS.ACTIVE_USER, user);
}

export function switchRole(role: UserRole, specificWorkerId?: string): User {
  let userToSet: User;
  if (role === "customer") {
    userToSet = DEFAULT_CUSTOMER_USER;
  } else if (role === "admin") {
    userToSet = DEFAULT_ADMIN_USER;
  } else {
    const workers = getWorkers();
    userToSet =
      (specificWorkerId ? workers.find((w) => w.id === specificWorkerId) : null) ||
      workers[0] ||
      GUEST_WORKER_USER;
  }
  setCurrentUser(userToSet);
  return userToSet;
}

// Lead Unlock Logic (Worker Flow + Monetization)
export function unlockLead(leadId: string, workerId: string): { success: boolean; message: string; remainingCredits?: number } {
  const config = getPlatformConfig();
  const leads = getLeads();
  const workers = getWorkers();
  const worker = workers.find((w) => w.id === workerId);
  const lead = leads.find((l) => l.id === leadId);

  if (!lead) return { success: false, message: "Lead nahi mili" };
  if (!worker) return { success: false, message: "Worker profile verify nahi hui" };

  if (lead.unlockedBy.includes(workerId)) {
    return { success: true, message: "Already unlocked! Phone details available.", remainingCredits: worker.credits };
  }

  // Check monetization mode
  if (!config.freeUnlockMode) {
    if (worker.credits < config.costPerLeadCredits) {
      return {
        success: false,
        message: `Coins kam hain! Is lead ko unlock karne ke liye ₹${config.costPerLeadCredits} / ${config.costPerLeadCredits} coins chahiye. Aapke paas sirf ${worker.credits} coins hain.`,
      };
    }
    // Deduct coins
    worker.credits -= config.costPerLeadCredits;
  }

  // Record unlock
  lead.unlockedBy.push(workerId);
  saveLeads(leads);
  saveWorkers(workers);

  // Sync to Google Firebase Firestore
  updateLeadInFirestore(lead.id, { unlockedBy: lead.unlockedBy }).catch((e) =>
    console.warn("Firestore unlockLead sync:", e)
  );
  updateWorkerInFirestore(worker.id, { credits: worker.credits }).catch((e) =>
    console.warn("Firestore worker credits sync:", e)
  );

  // Update current user state if matching
  const currentUser = getCurrentUser();
  if (currentUser.id === worker.id) {
    setCurrentUser(worker);
  }

  return {
    success: true,
    message: config.freeUnlockMode ? "Lead unlocked successfully (Free Rollout Mode)!" : `Lead unlocked! ${config.costPerLeadCredits} credits deducted.`,
    remainingCredits: worker.credits,
  };
}

export function resetToDefaults(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.LEADS);
  localStorage.removeItem(STORAGE_KEYS.WORKERS);
  localStorage.removeItem(STORAGE_KEYS.CONFIG);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
  window.dispatchEvent(new Event("local-jobs-storage-updated"));
}
