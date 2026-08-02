"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, X, User, Clock, Heart } from "lucide-react";

interface FriendRequest {
  id: number;
  name: string;
  avatar: string;
  reason: string;
  time: string;
  status: "pending" | "accepted" | "rejected";
}

const initialRequests: FriendRequest[] = [
  {
    id: 1, name: "流浪的猫", avatar: "🐱",
    reason: "看到你的吐槽，觉得我们好像",
    time: "2分钟前", status: "pending",
  },
  {
    id: 2, name: "梦的捕手", avatar: "✨",
    reason: "在聊天室聊得很开心，想加好友",
    time: "15分钟前", status: "pending",
  },
  {
    id: 3, name: "夜的诗人", avatar: "🌙",
    reason: "你的签名打动了我",
    time: "1小时前", status: "pending",
  },
  {
    id: 4, name: "星星收藏家", avatar: "⭐",
    reason: "想认识一下",
    time: "3小时前", status: "pending",
  },
];

export default function FriendRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);

  const handleAction = (id: number, action: "accepted" | "rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");

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
              好友请求
            </h1>
            <p className="text-sm text-[#b0aea5]">
              {pendingRequests.length} 个待处理
            </p>
          </div>
        </motion.div>

        {/* Request List */}
        <div className="space-y-3">
          {requests.map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card rounded-[1.5rem] p-4 transition-all ${
                req.status === "accepted"
                  ? "border border-green-500/20"
                  : req.status === "rejected"
                  ? "opacity-50"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {req.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5">{req.name}</h3>
                  <p className="text-xs text-[#b0aea5] mb-1">{req.reason}</p>
                  <div className="flex items-center gap-1 text-[10px] text-[#5a4f47]">
                    <Clock className="w-3 h-3" />
                    {req.time}
                  </div>
                </div>

                {req.status === "pending" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction(req.id, "accepted")}
                      className="p-2.5 rounded-xl bg-accent text-white hover:shadow-[0_0_20px_rgba(217,119,87,0.3)] transition-all"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "rejected")}
                      className="p-2.5 rounded-xl glass text-[#b0aea5] hover:text-red-400 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {req.status === "accepted" && (
                  <span className="text-xs text-green-500 font-medium">已接受</span>
                )}
                {req.status === "rejected" && (
                  <span className="text-xs text-[#5a4f47]">已忽略</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 text-[#5a4f47] mx-auto mb-4" />
            <p className="text-[#5a4f47]">暂无好友请求</p>
          </div>
        )}
      </div>
    </div>
  );
}