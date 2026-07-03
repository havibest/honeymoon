"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "@/components/ui/Spinner";
import DashboardLock from "@/components/subscription/DashboardLock";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [dbLoading, setDbLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    async function checkUserProfile() {
      if (authLoading) return;
      
      if (!user) {
        setProfileData(null);
        setDbLoading(false);
        router.replace("/login");
        return;
      }

      try {
        // Fetch the profile settings using getDoc matching your tier optimization rules
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      } catch (error) {
        console.error("Failed to load guard user details:", error);
      } finally {
        setDbLoading(false);
      }
    }

    checkUserProfile();
  }, [user, authLoading, router]);

  useEffect(() => {
    if (authLoading || dbLoading || !user) return;

    // 1. Evaluate verification configurations
    if (!user.emailVerified && pathname !== "/verify-email") {
      router.replace("/verify-email");
      return;
    }

    if (user.emailVerified && pathname === "/verify-email") {
      router.replace("/complete-profile");
      return;
    }

    if (!profileData) return;

    // 2. Evaluate profile configuration rules
    if (!profileData.profileCompleted && pathname !== "/complete-profile") {
      router.replace("/complete-profile");
      return;
    }

    if (profileData.profileCompleted && pathname === "/complete-profile") {
      router.replace("/subscription");
      return;
    }
  }, [authLoading, dbLoading, user, profileData, pathname, router]);

  if (authLoading || dbLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Spinner />
      </main>
    );
  }

  if (!user) return null;

  // Intercept and block access to general dashboard items if subscription status is inactive
  const isSubscriptionRoute = pathname === "/subscription" || pathname === "/checkout";
  const isCoreOnboardingRoute = pathname === "/verify-email" || pathname === "/complete-profile";
  
  if (
    profileData && 
    profileData.subscriptionStatus !== "active" && 
    !isSubscriptionRoute && 
    !isCoreOnboardingRoute
  ) {
    return <DashboardLock />;
  }

  return <>{children}</>;
}
