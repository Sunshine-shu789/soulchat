"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Copy, Check, Users, QrCode } from "lucide-react";
import { QQModal } from "@/components/QQModal";
import { useQQ } from "@/lib/store";

export default function QQWallPage() {
  const { entries, loaded } = useQQ();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredUsers = entries.filter(
    (u) =>
      u.name.includes(searchQuery) ||
      u.tags.some((t) => t.includes(searchQuery)) ||
      u.intro.includes(searchQuery)
  );

  const selectedUser = entries.find((u) => u.id === selectedId) || null;

  const handleCopy = (id: string, qq: string) => {
    navigator.clipboard.writeText(qq);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!loaded) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center text-[#5a4f47]">
        加载中…
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[100dvh] pt-24 pb-16 animated-bg">
        <div className="max-w-[800px] mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-3">
              QQ<span className="text-gradient">交换墙</span>
            </h1>
            <p className="text-sm text-[#b0aea5] max-w-md mx-auto">
              留下QQ号，认识更多朋友。在这里找到聊得来的人，加QQ继续聊！
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card rounded-[1.5rem] p-4 mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a4f47]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索用户或兴趣标签..."
                className="w-full bg-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent/30 transition-all placeholder-[#5a4f47]"
              />
            </div>
          </motion.div>

          {/* User List */}
          <div className="space-y-3">
            {filteredUsers.map((user, i) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass-card rounded-[1.5rem] p-4 hover:shadow-[0_0_30px_rgba(217,119,87,0.06)] transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {user.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-0.5">{user.name}</h3>
                    <p className="text-xs text-[#b0aea5] mb-2 truncate">
                      {user.intro}
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {user.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] bg-accent/8 text-accent-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* QQ button */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleCopy(user.id, user.qq)}
                      className={`p-2.5 rounded-xl transition-all ${
                        copiedId === user.id
                          ? "bg-green-500/20 text-green-500"
                          : "glass text-[#b0aea5] hover:text-[#faf9f5]"
                      }`}
                    >
                      {copiedId === user.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedId(user.id)}
                      className="p-2.5 rounded-xl bg-accent text-white hover:shadow-[0_0_20px_rgba(217,119,87,0.3)] transition-all"
                    >
                      <Users className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-20">
              <QrCode className="w-12 h-12 text-[#5a4f47] mx-auto mb-4" />
              <p className="text-[#5a4f47]">没有找到匹配的用户</p>
            </div>
          )}
        </div>
      </div>

      {/* QQ Modal */}
      {selectedUser && (
        <QQModal
          open={!!selectedUser}
          onClose={() => setSelectedId(null)}
          username={selectedUser.name}
          qqNumber={selectedUser.qq}
          mode="view"
        />
      )}
    </>
  );
}
