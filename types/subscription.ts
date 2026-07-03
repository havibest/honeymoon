// ==========================================
// File: types/subscription.ts
// ==========================================

export interface SubscriptionPlan {
  referralChoice: 0 | 1 | 2 | 5;

  amount: number;

  currency: string;

  paymentStatus: "pending" | "paid";

  subscriptionStatus: "inactive" | "active";
}
