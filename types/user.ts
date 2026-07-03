export interface UserProfile {
  uid: string;

  // Basic
  displayName: string;
  email: string;
  country: string;
  city?: string;
  age?: number;
  gender?: string;

  // About
  bio?: string;

  // Goals
  goal: string;

  // Languages
  speaks: string[];
  learning: string[];

  // Matching
  interestedIn?: string;
  ageMin?: number;
  ageMax?: number;

  // Profile
  photoURL?: string;
  profileCompleted: boolean;
  emailVerified: boolean;

  // Subscription
  subscriptionStatus: "inactive" | "active";

  // Referral
  referralCode?: string;
  referredBy?: string;
  referralCount: number;

  // Dates
  createdAt: any;
  updatedAt: any;
}