import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { ServiceRequest, User } from "@/types";
import { INITIAL_LEADS, INITIAL_WORKERS } from "./mockData";

export async function saveLeadToFirestore(lead: ServiceRequest): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    const leadRef = doc(db, "service_requests", lead.id);
    await setDoc(leadRef, lead, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore saveLead error (falling back to local):", error);
    return false;
  }
}

export async function updateLeadInFirestore(
  leadId: string,
  updates: Partial<ServiceRequest>
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    const leadRef = doc(db, "service_requests", leadId);
    await updateDoc(leadRef, updates);
    return true;
  } catch (error) {
    console.warn("Firestore updateLead error:", error);
    return false;
  }
}

export async function deleteLeadFromFirestore(leadId: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    const leadRef = doc(db, "service_requests", leadId);
    await deleteDoc(leadRef);
    return true;
  } catch (error) {
    console.warn("Firestore deleteLead error:", error);
    return false;
  }
}

export async function saveWorkerToFirestore(worker: User): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    const workerRef = doc(db, "users", worker.id);
    await setDoc(workerRef, worker, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore saveWorker error:", error);
    return false;
  }
}

export async function updateWorkerInFirestore(
  workerId: string,
  updates: Partial<User>
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    const workerRef = doc(db, "users", workerId);
    await updateDoc(workerRef, updates);
    return true;
  } catch (error) {
    console.warn("Firestore updateWorker error:", error);
    return false;
  }
}

// Seed initial data to user's Firebase if Firestore is empty
export async function seedFirestoreIfEmpty(): Promise<{ seeded: boolean; message: string }> {
  if (!isFirebaseConfigured || !db) {
    return { seeded: false, message: "Firebase credentials not configured" };
  }

  try {
    const leadsColl = collection(db, "service_requests");
    const snapshot = await getDocs(leadsColl);

    if (snapshot.empty) {
      // Seed initial leads
      for (const lead of INITIAL_LEADS) {
        await setDoc(doc(db, "service_requests", lead.id), lead);
      }
      // Seed initial workers
      for (const worker of INITIAL_WORKERS) {
        await setDoc(doc(db, "users", worker.id), worker);
      }
      return { seeded: true, message: "Successfully seeded initial leads and workers to Firebase Firestore!" };
    }

    return { seeded: false, message: "Firestore already contains data" };
  } catch (error: any) {
    console.warn("seedFirestoreIfEmpty warning:", error);
    return { seeded: false, message: error?.message || "Firestore connection error" };
  }
}

// Setup real-time listener for leads
export function subscribeToFirestoreLeads(
  onUpdate: (leads: ServiceRequest[]) => void
): () => void {
  if (!isFirebaseConfigured || !db) {
    return () => {};
  }

  try {
    const leadsQuery = query(collection(db, "service_requests"));
    const unsubscribe = onSnapshot(
      leadsQuery,
      (snapshot) => {
        const remoteLeads: ServiceRequest[] = [];
        snapshot.forEach((docSnap) => {
          remoteLeads.push(docSnap.data() as ServiceRequest);
        });
        if (remoteLeads.length > 0) {
          // Sort latest first
          remoteLeads.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          onUpdate(remoteLeads);
        }
      },
      (error) => {
        console.warn("Firestore subscription note (running with local cache fallback):", error.message);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn("subscribeToFirestoreLeads error:", err);
    return () => {};
  }
}
