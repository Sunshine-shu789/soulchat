"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { adminLogin, isAdmin } from "@/lib/store";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isAdmin()) router.replace("/admin");
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(pwd.trim())) {
      setRedirecting(true);
      router.replace("/admin");
    } else {
      setError("密码错误，请重试");
      setPwd("");
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center animated-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Soul<span className="text-accent">Chat</span> 管理后台
          </h1>
          <p className="text-sm text-[#b0aea5] mt-2">
            请输入管理员密码进入
          </p>
        </div>

        <form onSubmit={handleLogin} className="glass-card rounded-[2rem] p-6 space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a4f47]" />
            <input
              type="password"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                setError("");
              }}
              placeholder="管理员密码"
              autoFocus
              className="w-full bg-white/5 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-1 focus:ring-accent/30 transition-all placeholder-[#5a4f47]"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={!pwd.trim() || redirecting}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(217,119,87,0.3)] transition-all disabled:opacity-50"
          >
            {redirecting ? "进入中…" : "登录"}
            {!redirecting && <ArrowRight className="w-4 h-4" />}
          </button>

          <p className="text-[10px] text-[#5a4f47] text-center leading-relaxed">
            演示密码：<span className="text-accent-light">soulchat888</span>
            <br />
            生产环境请改用服务端校验
          </p>
        </form>
      </motion.div>
    </div>
  );
}
