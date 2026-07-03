"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface ReferralStats {
  referralGoal: number;
  completed: number;
  amountDue: number;
  currency: string;
  referralCode: string;
  referralLink: string;
}

export default function ReferralProgress() {
  const router = useRouter();
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [stats, setStats] = useState<ReferralStats | null>(null);

  const fetchReferralStatus = async (showAlert = false) => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userSnap = await getDoc(doc(db, "users", uid));
      if (userSnap.exists()) {
        const data = userSnap.data();
        setStats({
          referralGoal: data.referralChoice ?? 0,
          completed: data.referralCount ?? 0,
          amountDue: data.amountDue ?? 180,
          currency: data.currency || "KES",
          referralCode: data.referralCode || "",
          referralLink: data.referralLink || "",
        });
        if (showAlert) {
          alert("Referral progress updated!");
        }
      }
    } catch (error) {
      console.error("Error fetching referral status:", error);
    }
  };

  useEffect(() => {
    fetchReferralStatus();
  }, []);

  const handleRefresh = async () => {
    setLoadingRefresh(true);
    await fetchReferralStatus(true);
    setLoadingRefresh(false);
  };

  const handleCopy = (text: string, type: "Link" | "Code") => {
    navigator.clipboard.writeText(text);
    alert(`${type} copied to clipboard!`);
  };

  const handlePayRemaining = () => {
    router.push("/checkout");
  };

  if (!stats) {
    return <p className="text-gray-500 text-center">Loading referral metrics...</p>;
  }

  const remaining = Math.max(0, stats.referralGoal - stats.completed);

  return (
    <Card className="w-full max-w-xl mx-auto p-6 space-y-6">
      <div className="border-b pb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Referral Progress</h2>
        <p className="text-sm text-gray-500 mt-1">Track your invites to lower your membership price</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 p-3 rounded-xl border">
          <p className="text-xs text-gray-500 font-medium uppercase">Referral Goal</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.referralGoal}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-xl border border-green-100">
          <p className="text-xs text-green-600 font-medium uppercase">Completed</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{stats.completed}</p>
        </div>
        <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
          <p className="text-xs text-rose-600 font-medium uppercase">Remaining</p>
          <p className="text-2xl font-bold text-rose-700 mt-1">{remaining}</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border text-sm">
        <span className="text-gray-600 font-medium">Membership Price</span>
        <span className="text-xl font-extrabold text-rose-600">
          {stats.currency} {stats.amountDue}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button variant="outline" onClick={() => handleCopy(stats.referralLink, "Link")}>
          Copy Link
        </Button>
        <Button variant="outline" onClick={() => handleCopy(stats.referralCode, "Code")}>
          Copy Code
        </Button>
      </div>

      <div className="space-y-3 pt-2 border-t">
        <Button onClick={handleRefresh} loading={loadingRefresh} variant="secondary">
          Refresh Progress
        </Button>
        <Button onClick={handlePayRemaining}>
          Pay Remaining Balance
        </Button>
      </div>
    </Card>
  );
}
