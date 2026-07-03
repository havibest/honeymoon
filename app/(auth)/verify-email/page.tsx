"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/config";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  const handleRefreshStatus = async () => {
    try {
      setLoadingRefresh(true);
      
      // Manually force Firebase to fetch the latest user token data
      await auth.currentUser?.reload();

      if (auth.currentUser?.emailVerified) {
        router.push("/complete-profile");
      } else {
        alert("Email is still not verified. Please check your inbox.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to refresh status. Please try again.");
    } finally {
      setLoadingRefresh(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      setLoadingResend(true);
      
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        alert("Verification email sent successfully!");
      } else {
        alert("No user found. Please log in again.");
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to send verification email right now.");
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-rose-50 p-6">
      <Card className="w-full max-w-md text-center">
        <div className="mb-6">
          <Logo />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
        <p className="mt-3 text-gray-600">
          We've sent you a verification link. Please click it to secure your account.
        </p>

        <div className="mt-8 space-y-4">
          <Button onClick={handleRefreshStatus} loading={loadingRefresh}>
            Refresh Status
          </Button>

          <div className="pt-2">
            <p className="text-sm text-gray-500">Didn't receive it?</p>
            <button
              onClick={handleResendEmail}
              disabled={loadingResend}
              className="mt-1 text-sm font-semibold text-rose-600 hover:underline disabled:opacity-50"
            >
              {loadingResend ? "Sending..." : "Resend Email"}
            </button>
          </div>
        </div>
      </Card>
    </main>
  );
}
