// ==========================================
// File: components/subscription/MembershipSummary.tsx
// ==========================================
"use client";

import Card from "@/components/ui/Card";

interface MembershipSummaryProps {
  country: string;
  currency: string;
  membershipPrice: number;
  referralGoal: number;
  completed: number;
}

export default function MembershipSummary({
  country,
  currency,
  membershipPrice,
  referralGoal,
  completed,
}: MembershipSummaryProps) {
  const remaining = Math.max(0, referralGoal - completed);

  return (
    <Card className="w-full max-w-md p-6 space-y-4">
      <div className="flex justify-between items-center text-sm border-b pb-2">
        <span className="text-gray-500">Country</span>
        <span className="font-semibold text-gray-900">{country}</span>
      </div>

      <div className="flex justify-between items-center text-sm border-b pb-2">
        <span className="text-gray-500">Currency</span>
        <span className="font-semibold text-gray-900">{currency}</span>
      </div>

      <div className="flex justify-between items-center text-sm border-b pb-2">
        <span className="text-gray-500">Membership</span>
        <span className="font-semibold text-gray-900">
          {currency} {membershipPrice}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm border-b pb-2">
        <span className="text-gray-500">Referral Goal</span>
        <span className="font-semibold text-gray-900">{referralGoal}</span>
      </div>

      <div className="flex justify-between items-center text-sm border-b pb-2">
        <span className="text-gray-500 text-green-600">Completed</span>
        <span className="font-semibold text-green-700">{completed}</span>
      </div>

      <div className="flex justify-between items-center text-sm pt-2">
        <span className="text-gray-500 text-rose-600">Remaining</span>
        <span className="font-semibold text-rose-700">{remaining}</span>
      </div>
    </Card>
  );
}
