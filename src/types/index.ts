export type UserRole = 'customer' | 'worker' | 'admin';

export type JobUrgency = 'urgent' | 'today' | 'flexible';

export type JobStatus = 'open' | 'assigned' | 'completed' | 'spam';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  skills: string[]; // e.g. ["ac_repair", "electrician"]
  operatingPincodes: string[];
  isVerified: boolean;
  city?: string;
  avatar?: string;
  experienceYears?: number;
  completedJobs?: number;
  rating?: number;
  credits: number;
  createdAt: string;
}

export interface ServiceLocation {
  area: string;
  pincode: string;
  city: string;
  landmark?: string;
  houseFlat?: string;
}

export interface ServiceRequest {
  id: string;
  category: string;
  subCategory?: string;
  title: string;
  description: string;
  urgency: JobUrgency;
  location: ServiceLocation;
  customerName: string;
  customerPhone: string;
  status: JobStatus;
  unlockedBy: string[]; // worker user IDs
  preferredTime?: string;
  estimatedBudget?: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  spamScore?: number;
  createdAt: string;
}

export interface Category {
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

export interface PlatformConfig {
  freeUnlockMode: boolean; // if true, leads unlock without charging credits
  costPerLeadCredits: number;
  supportWhatsAppNumber: string;
  supportPhoneNumber: string;
  activePincodes: string[];
}
