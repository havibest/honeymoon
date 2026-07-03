// =====================================================
// File: components/layout/Topbar.tsx
// =====================================================

"use client";

import MobileMenu from "./MobileMenu";

export default function Topbar() {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">

      <MobileMenu />

      <div className="font-semibold">
        Welcome to Honeymoon
      </div>

      <div className="text-sm text-gray-500">
        Global Connections
      </div>

    </header>
  );
}