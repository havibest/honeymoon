"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DashboardLock() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/subscription");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md text-center p-8 space-y-6">
        <div className="text-4xl">🔒</div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Membership Required</h1>
          <p className="text-sm text-gray-500">
            Complete your subscription to unlock:
          </p>
        </div>

        <ul className="text-left text-sm text-gray-600 bg-gray-50 p-4 rounded-xl space-y-2 border">
          <li className="flex items-center gap-2">❤️ Discover</li>
          <li className="flex items-center gap-2">💬 Messages</li>
          <li className="flex items-center gap-2">🌍 Language Exchange</li>
          <li className="flex items-center gap-2">💼 Remote Work</li>
          <li className="flex items-center gap-2">✈️ Travel Partners</li>
        </ul>

        <div className="pt-2">
          <Button onClick={handleContinue}>
            Continue Membership
          </Button>
        </div>
      </Card>
    </main>
  );
}
