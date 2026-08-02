"use client";

import { motion } from "framer-motion";
import { ChatRoom } from "@/components/ChatRoom";
import { Heart, Shield, Sparkles } from "lucide-react";

const vibeTags = [
  "深夜emo", "开心分享", "感情困惑", "职场吐槽", "生活日常",
  "读书电影", "音乐推荐", "随便聊聊",
];

export default function ChatPage() {
  return (
    <div className="min-h-[100dvh] pt-24 pb-16 animated-bg">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-4">
            聊天<span className="text-gradient">室</span>
          </h1>
          <p className="text-[#b0aea5] max-w-lg mx-auto">
            和匿名的陌生人，从一句话开始一段温暖的对话。
            没人知道你是谁，但都懂你的心情。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Info Cards */}
            <div className="glass-card rounded-[1.5rem] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">匿名保障</h3>
                  <p className="text-xs text-[#5a4f47]">身份完全保密</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">温暖氛围</h3>
                  <p className="text-xs text-[#5a4f47]">友善交流的社区</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">随机匹配</h3>
                  <p className="text-xs text-[#5a4f47]">遇见有趣的灵魂</p>
                </div>
              </div>
            </div>

            {/* Vibe Tags */}
            <div className="glass-card rounded-[1.5rem] p-6">
              <h3 className="font-semibold text-sm mb-4">话题标签</h3>
              <div className="flex flex-wrap gap-2">
                {vibeTags.map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs bg-white/5 text-[#b0aea5] hover:bg-accent/10 hover:text-accent-light transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Online Count */}
            <div className="glass-card rounded-[1.5rem] p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">128</div>
              <p className="text-xs text-[#5a4f47]">当前在线</p>
            </div>
          </motion.div>

          {/* Chat Room */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ChatRoom />
          </motion.div>
        </div>
      </div>
    </div>
  );
}