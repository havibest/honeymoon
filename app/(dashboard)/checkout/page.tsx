"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface CheckoutDetails {
  country: string;
  currency: string;
  amountDue: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [checkoutData, setCheckoutData] = useState<CheckoutDetails | null>(null);

  useEffect(() => {
    async function fetchCheckoutDetails() {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) {
          router.push("/login");
          return;
        }

        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) {
          const data = userSnap.data();
          setCheckoutData({
            country: data.country || "Kenya",
            currency: data.currency || "KES",
            amountDue: data.amountDue ?? 180,
          });
        }
      } catch (error) {
        console.error("Error fetching checkout details:", error);
      } finally {
        setFetching(false);
      }
    }

    fetchCheckoutDetails();
  }, [router]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      // Update subscription status to active upon payment simulation
      await updateDoc(doc(db, "users", uid), {
        subscriptionStatus: "active",
        updatedAt: new Date(),
      });

      alert("Payment successful! Welcome to HONEYMOON.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Payment registration failure:", error);
      alert("Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500 font-medium">Loading checkout details...</p>
      </main>
    );
  }

  if (!checkoutData) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-500 font-medium">Checkout details unavailable.</p>
      </main>
    );
  }

  const isKenya = checkoutData.country.toLowerCase() === "kenya";

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen items-center justify-center bg-rose-50 p-6">
        <Card className="w-full max-w-md p-6 space-y-6">
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
            <p className="text-sm text-gray-500 mt-1">Review your membership details below</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Country</span>
              <span className="font-semibold text-gray-900">{checkoutData.country}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Currency</span>
              <span className="font-semibold text-gray-900">{checkoutData.currency}</span>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-gray-900 font-medium text-base">Membership</span>
              <span className="text-xl font-extrabold text-rose-600">
                {checkoutData.currency} {checkoutData.amountDue}
              </span>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold text-gray-900">
                {isKenya ? "M-Pesa" : "Visa / MasterCard"}
              </span>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handlePayment} loading={loading}>
              {isKenya ? "Pay Now" : "Pay"}
            </Button>
          </div>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
