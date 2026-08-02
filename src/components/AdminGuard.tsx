"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/store";
import { ShieldAlert } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center animated-bg">
        <div className="flex flex-col items-center gap-3 text-[#5a4f47]">
          <ShieldAlert className="w-8 h-8 animate-pulse" />
          <p className="text-sm">正在校验管理员身份…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
