// =====================================================
// File: app/(dashboard)/dashboard/page.tsx
// =====================================================

"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Welcome to Honeymoon
      </h1>

      <div className="rounded-xl bg-white p-6 shadow">
        <p>
          <strong>Name:</strong>{" "}
          {user?.displayName || "Not set"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.email}
        </p>

        <p>
          <strong>Email Verified:</strong>{" "}
          {user?.emailVerified ? "Yes" : "No"}
        </p>

        <p className="mt-4 text-green-600">
          Dashboard is working successfully.
        </p>
      </div>
    </div>
  );
}