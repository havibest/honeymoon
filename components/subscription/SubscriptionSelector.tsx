// ==========================================
// File: components/subscription/SubscriptionSelector.tsx
// ==========================================
"use client";

import PlanCard from "./PlanCard";

interface SubscriptionSelectorProps {
  onSelectPlan?: (referralChoice: 0 | 1 | 2 | 5, amount: number) => void;
}

export default function SubscriptionSelector({ onSelectPlan }: SubscriptionSelectorProps) {
  const handleChoose = (referralChoice: 0 | 1 | 2 | 5, amount: number) => {
    if (onSelectPlan) {
      onSelectPlan(referralChoice, amount);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Choose Membership</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <PlanCard
          title="Pay Now"
          price={180}
          currency="KES"
          description="Immediate Access"
          buttonText="Choose"
          onClick={() => handleChoose(0, 180)}
        />

        <PlanCard
          title="Refer 1 Friend"
          price={150}
          currency="KES"
          description="Invite 1 paying friend."
          buttonText="Choose"
          onClick={() => handleChoose(1, 150)}
        />

        <PlanCard
          title="Refer 2 Friends"
          price={100}
          currency="KES"
          description="Invite 2 paying friends."
          buttonText="Choose"
          onClick={() => handleChoose(2, 100)}
        />

        <PlanCard
          title="Refer 5 Friends"
          price={70}
          currency="KES"
          description="Invite 5 paying friends."
          buttonText="Choose"
          onClick={() => handleChoose(5, 70)}
        />
      </div>
    </div>
  );
}
