// ==========================================
// File: services/subscription.service.ts
// ==========================================

import {
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function chooseSubscriptionPlan(
  uid: string,
  plan: {
    referralChoice: 0 | 1 | 2 | 5;
    amount: number;
    currency: string;
  }
) {
  await updateDoc(doc(db, "users", uid), {
    referralChoice: plan.referralChoice,

    membershipPrice: plan.amount,

    currency: plan.currency,

    paymentStatus: "pending",

    updatedAt: serverTimestamp(),
  });
}
