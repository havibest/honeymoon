import {
  LayoutDashboard,
  Compass,
  MessageCircle,
  User,
  CreditCard,
  Users,
  Settings,
} from "lucide-react";

export const NAVIGATION = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Discover",
    href: "/discover",
    icon: Compass,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: MessageCircle,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Subscription",
    href: "/subscription",
    icon: CreditCard,
  },
  {
    label: "Referrals",
    href: "/referrals",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
