"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Search, UserPlus, UserCheck, Clock, Sparkles } from "lucide-react";

interface FoundUser {
  id: number;
  name: string;
  avatar: string;
  intro: string;
  tags: string[];
  status: "none" | "pending" | "friends";
}

const suggestedUsers: FoundUser[] = [
  {
    id: 1, name: "吉他少年", avatar: "🎸",
    intro: "喜欢民谣和猫，想找个一起弹琴的朋友",
    tags: ["音乐", "民谣", "猫"], status: "none",
  },
  {
    id: 2, name: "读书人阿卷", avatar: "📚",
    intro: "一年读100本书，想找人一起分享读后感",
    tags: ["读书", "写作", "哲学"], status: "none",
  },
  {
    id: 3, name: "跑步的蜗牛", avatar: "🐌",
    intro: "从跑1公里到跑马拉松，你也可以",
    tags: ["运动", "跑步", "自律"], status: "none",
  },
  {
    id: 4, name: "摄影爱好者", avatar: "📷",
    intro: "用镜头记录生活的美好瞬间",
    tags: ["摄影", "旅行", "生活"], status: "none",
  },
];

export default function SearchFriendsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(suggestedUsers);
  const [sentRequests, setSentRequests] = useState<number[]>([]);

  const handleAddFriend = (id: number) => {
    setSentRequests((prev) => [...prev, id]);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "pending" as const } : u))
    );
  };

  const filteredUsers = searchQuery
    ? users.filter(
        (u) =>
          u.name.includes(searchQuery) ||
          u.tags.some((t) => t.includes(searchQuery)) ||
          u.intro.includes(searchQuery)
      )
    : users;

  return (
    <div className="min-h-[100dvh] pt-24 pb-16 animated-bg">
      <div className="max-w-[600px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link
            href="/friends"
            className="p-2 rounded-xl glass text-[#b0aea5] hover:text-[#faf9f5] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              添加好友
            </h1>
            <p className="text-sm text-[#b0aea5]">发现有趣的灵魂</p>
          </div>
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
              placeholder="搜索用户名、兴趣标签..."
              className="w-full bg-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent/30 transition-all placeholder-[#5a4f47]"
            />
          </div>
        </motion.div>

        {/* Suggested Users */}
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
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {user.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5">{user.name}</h3>
                  <p className="text-xs text-[#b0aea5] mb-2 line-clamp-2">
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

                <button
                  onClick={() => handleAddFriend(user.id)}
                  disabled={user.status === "pending"}
                  className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                    user.status === "pending"
                      ? "glass text-[#5a4f47] cursor-not-allowed"
                      : "bg-accent text-white hover:shadow-[0_0_20px_rgba(217,119,87,0.3)]"
                  }`}
                >
                  {user.status === "pending" ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-20">
            <Sparkles className="w-12 h-12 text-[#5a4f47] mx-auto mb-4" />
            <p className="text-[#5a4f47]">没有找到匹配的用户</p>
          </div>
        )}
      </div>
    </div>
  );
}