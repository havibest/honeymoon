// =====================================================
// File: components/layout/Sidebar.tsx
// =====================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Search,
  MessageCircle,
  User,
  CreditCard,
  Users,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Discover",
    href: "/discover",
    icon: Search,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageCircle,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Membership",
    href: "/subscription",
    icon: CreditCard,
  },
  {
    name: "Referrals",
    href: "/referrals",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r flex-col">

      <div className="p-6 border-b">

        <h1 className="text-2xl font-bold text-pink-600">
          Honeymoon
        </h1>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {links.map((link) => {

          const Icon = link.icon;

          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition

              ${
                active
                  ? "bg-pink-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />

              {link.name}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}