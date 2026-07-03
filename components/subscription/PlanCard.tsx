// ==========================================
// File: components/subscription/PlanCard.tsx
// ==========================================
"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface PlanCardProps {
  title: string;
  price: number;
  currency: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export default function PlanCard({
  title,
  price,
  currency,
  description,
  buttonText,
  onClick,
}: PlanCardProps) {
  return (
    <Card className="flex flex-col justify-between items-center text-center p-6 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-3xl font-extrabold text-rose-600 mt-2">
          {price} {currency}
        </p>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>

      <div className="w-full pt-4">
        <Button onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </Card>
  );
}
