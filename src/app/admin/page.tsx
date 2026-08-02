"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquareText,
  Clock,
  CheckCircle2,
  Users,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { useWhispers, useQQ } from "@/lib/store";

export default function AdminDashboard() {
  const { whispers, loaded: wLoaded } = useWhispers();
  const { entries, loaded: qLoaded } = useQQ();

  const total = whispers.length;
  const pending = whispers.filter((w) => w.status === "pending").length;
  const approved = whispers.filter((w) => w.status === "approved").length;
  const rejected = whispers.filter((w) => w.status === "rejected").length;
  const totalLikes = whispers.reduce((s, w) => s + w.likes, 0);
  const qqCount = entries.length;

  const stats = [
    {
      label: "吐槽总数",
      value: total,
      icon: MessageSquareText,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "待审核",
      value: pending,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "已通过",
      value: approved,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "QQ墙用户",
      value: qqCount,
      icon: Users,
      color: "text-sky-400",
      bg: "bg-sky-400/10",
    },
  ];

  const recent = [...whispers]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  if (!wLoaded || !qLoaded) {
    return (
      <div className="flex items-center justify-center py-20 text-[#5a4f47]">
        加载中…
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold tracking-tight mb-1">仪表盘</h1>
        <p className="text-sm text-[#b0aea5]">
          社区内容概览与管理入口
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card rounded-2xl p-5"
            >
              <div
                className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}
              >
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-3xl font-bold mb-0.5">{s.value}</div>
              <div className="text-xs text-[#5a4f47]">{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Alerts & quick actions */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass-card rounded-2xl p-5 ${
            pending > 0 ? "ring-1 ring-amber-400/30" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle
              className={`w-4 h-4 ${pending > 0 ? "text-amber-400" : "text-[#5a4f47]"}`}
            />
            <h3 className="text-sm font-semibold">审核提醒</h3>
          </div>
          {pending > 0 ? (
            <p className="text-sm text-[#b0aea5] mb-3">
              有 <span className="text-amber-400 font-semibold">{pending}</span>{" "}
              条吐槽等待审核
            </p>
          ) : (
            <p className="text-sm text-[#b0aea5] mb-3">暂无待审核内容 🎉</p>
          )}
          <Link
            href="/admin/whispers"
            className="inline-flex items-center gap-1 text-xs text-accent hover:gap-2 transition-all"
          >
            去审核 <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold">互动数据</h3>
          </div>
          <p className="text-sm text-[#b0aea5] mb-3">
            累计获得{" "}
            <span className="text-accent font-semibold">{totalLikes}</span>{" "}
            次点赞 · 已拒绝 {rejected} 条
          </p>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full"
              style={{
                width: `${total ? (approved / total) * 100 : 0}%`,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Recent whispers */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">最新吐槽</h3>
          <Link
            href="/admin/whispers"
            className="text-xs text-accent hover:gap-2 transition-all inline-flex items-center gap-1"
          >
            全部 <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {recent.map((w) => (
            <div
              key={w.id}
              className="flex items-start gap-3 pb-3 border-b border-white/[0.04] last:border-0 last:pb-0"
            >
              <span
                className={`mt-1 px-2 py-0.5 rounded-full text-[10px] shrink-0 ${
                  w.status === "approved"
                    ? "bg-green-400/10 text-green-400"
                    : w.status === "pending"
                    ? "bg-amber-400/10 text-amber-400"
                    : "bg-red-400/10 text-red-400"
                }`}
              >
                {w.status === "approved"
                  ? "已通过"
                  : w.status === "pending"
                  ? "待审核"
                  : "已拒绝"}
              </span>
              <p className="text-sm text-[#b0aea5] line-clamp-2 flex-1">
                {w.content}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <p className="text-[10px] text-[#5a4f47] text-center mt-8 leading-relaxed">
        数据为本地演示（localStorage），仅在你当前浏览器生效。
        <br />
        要真正对所有访客生效，需接入后端存储（第二步）。
      </p>
    </div>
  );
}
