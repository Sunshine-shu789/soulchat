"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Trash2,
  Search,
  Filter,
  Heart,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useWhispers, type WhisperStatus } from "@/lib/store";

type FilterKey = "all" | WhisperStatus;

const filterTabs: { key: FilterKey; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "pending", label: "待审核" },
  { key: "approved", label: "已通过" },
  { key: "rejected", label: "已拒绝" },
];

export default function WhisperModerationPage() {
  const { whispers, loaded, setStatus, removeWhisper } = useWhispers();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20 text-[#5a4f47]">
        加载中…
      </div>
    );
  }

  const filtered = whispers.filter((w) => {
    const matchFilter = filter === "all" || w.status === filter;
    const matchQuery =
      !query.trim() ||
      w.content.includes(query.trim()) ||
      w.tags.some((t) => t.includes(query.trim()));
    return matchFilter && matchQuery;
  });

  const counts = {
    all: whispers.length,
    pending: whispers.filter((w) => w.status === "pending").length,
    approved: whispers.filter((w) => w.status === "approved").length,
    rejected: whispers.filter((w) => w.status === "rejected").length,
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold tracking-tight mb-1">吐槽审核</h1>
        <p className="text-sm text-[#b0aea5]">
          审核用户发布的心声，通过后将展示在吐槽墙
        </p>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              filter === tab.key
                ? "bg-accent text-white"
                : "glass text-[#b0aea5] hover:text-[#faf9f5]"
            }`}
          >
            {tab.label}
            <span
              className={`px-1.5 rounded-full text-[10px] ${
                filter === tab.key
                  ? "bg-white/20"
                  : "bg-white/5 text-[#5a4f47]"
              }`}
            >
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="glass-card rounded-xl p-1 mb-6 flex items-center gap-2">
        <Search className="w-4 h-4 text-[#5a4f47] ml-3" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索内容或标签…"
          className="flex-1 bg-transparent py-2.5 text-sm outline-none placeholder-[#5a4f47]"
        />
        <Filter className="w-4 h-4 text-[#5a4f47] mr-3" />
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((w) => (
            <motion.div
              key={w.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 px-2.5 py-1 rounded-full text-[10px] shrink-0 ${
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

                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed text-[#faf9f5] mb-3 whitespace-pre-wrap">
                    {w.content}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex gap-1.5">
                      {w.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full text-[10px] bg-accent/8 text-accent-light"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-[#5a4f47]">
                      <Heart className="w-3 h-3" /> {w.likes}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#5a4f47]">
                      <MessageCircle className="w-3 h-3" /> {w.comments}
                    </span>
                    <span className="text-xs text-[#5a4f47]">{w.time}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                {w.status !== "approved" && (
                  <button
                    onClick={() => setStatus(w.id, "approved")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-500/15 text-green-400 text-xs font-medium hover:bg-green-500/25 transition-all"
                  >
                    <Check className="w-3.5 h-3.5" /> 通过
                  </button>
                )}
                {w.status !== "rejected" && (
                  <button
                    onClick={() => setStatus(w.id, "rejected")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 text-[#b0aea5] text-xs font-medium hover:bg-white/10 transition-all"
                  >
                    <X className="w-3.5 h-3.5" /> 拒绝
                  </button>
                )}
                {w.status === "approved" && (
                  <button
                    onClick={() => setStatus(w.id, "pending")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-400/10 text-amber-400 text-xs font-medium hover:bg-amber-400/20 transition-all"
                  >
                    <Clock className="w-3.5 h-3.5" /> 撤回
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm("确定删除这条吐槽？此操作不可恢复。")) {
                      removeWhisper(w.id);
                    }
                  }}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#5a4f47]">
            没有符合条件的吐槽
          </div>
        )}
      </div>
    </div>
  );
}
