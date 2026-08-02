"use client";

import { usePathname } from "next/navigation";
import { AdminGuard } from "@/components/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The login page handles its own auth redirect; never guard it.
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminGuard>{children}</AdminGuard>;
}
