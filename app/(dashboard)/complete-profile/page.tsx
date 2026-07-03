"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { completeProfile } from "@/services/user.service";
import { ProfileFormData } from "@/lib/validators/profile";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProfileForm from "@/components/profile/ProfileForm";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("No user authenticated");
      
      await completeProfile(uid, data);
      router.push("/subscription");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-500 mt-1">Let the world know who you are before matching.</p>
        </div>
        <ProfileForm onSubmit={handleSubmit} loading={loading} />
      </main>
    </ProtectedRoute>
  );
}
