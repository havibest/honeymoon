import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { ProfileFormData } from "@/lib/validators/profile";

export async function getUserProfile(uid: string) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    uid,
    ...snapshot.data(),
  };
}

export async function updateUserProfile(
  uid: string,
  data: Record<string, unknown>
) {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function completeProfile(
  uid: string,
  data: ProfileFormData
) {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    profileCompleted: true,
    updatedAt: serverTimestamp(),
  });
}
