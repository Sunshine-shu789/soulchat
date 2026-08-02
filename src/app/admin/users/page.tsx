"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Users, Copy, Check, QrCode } from "lucide-react";
import { useQQ } from "@/lib/store";

export default function QQManagePage() {
  const { entries, loaded, removeQQ } = useQQ();
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20 text-[#5a4f47]">
        加载中…
      </div>
    );
  }

  const filtered = entries.filter(
    (e) =>
      e.name.includes(query.trim()) ||
      e.qq.includes(query.trim()) ||
      e.intro.includes(query.trim()) ||
      e.tags.some((t) => t.includes(query.trim()))
  );

  const handleCopy = (id: string, qq: string) => {
    navigator.clipboard.writeText(qq);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold tracking-tight mb-1">QQ墙管理</h1>
        <p className="text-sm text-[#b0aea5]">
          管理在QQ交换墙留联系方式的交友用户
        </p>
      </motion.div>

      {/* Search */}
      <div className="glass-card rounded-xl p-1 mb-6 flex items-center gap-2">
        <Search className="w-4 h-4 text-[#5a4f47] ml-3" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索昵称 / QQ号 / 标签…"
          className="flex-1 bg-transparent py-2.5 text-sm outline-none placeholder-[#5a4f47]"
        />
        <span className="mr-3 text-xs text-[#5a4f47] flex items-center gap-1">
          <Users className="w-3 h-3" /> {entries.length}
        </span>
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((u) => (
            <motion.div
              key={u.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="glass-card rounded-2xl p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">
                  {u.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5">{u.name}</h3>
                  <p className="text-xs text-[#b0aea5] mb-2 truncate">
                    {u.intro}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {u.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-[10px] bg-accent/8 text-accent-light"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm font-bold tracking-wider text-accent">
                    {u.qq}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(u.id, u.qq)}
                      className={`p-2 rounded-xl transition-all ${
                        copiedId === u.id
                          ? "bg-green-500/20 text-green-500"
                          : "glass text-[#b0aea5] hover:text-[#faf9f5]"
                      }`}
                      title="复制QQ"
                    >
                      {copiedId === u.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`确定删除 ${u.name} 的QQ信息？`)) {
                          removeQQ(u.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <QrCode className="w-12 h-12 text-[#5a4f47] mx-auto mb-4" />
            <p className="text-[#5a4f47]">没有匹配的用户</p>
          </div>
        )}
      </div>
    </div>
  );
}
