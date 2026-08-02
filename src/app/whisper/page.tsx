"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Hash, Sparkles, Info } from "lucide-react";
import { WhisperCard } from "@/components/WhisperCard";
import { useWhispers } from "@/lib/store";

const popularTags = ["求职", "暗恋", "亲情", "友情", "焦虑", "温暖", "日常", "治愈"];

export default function WhisperPage() {
  const { whispers, loaded, addWhisper } = useWhispers();
  const [newWhisper, setNewWhisper] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [justPosted, setJustPosted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWhisper.trim()) return;
    addWhisper(newWhisper, []);
    setNewWhisper("");
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 4000);
  };

  // 前台只展示已通过的内容
  const approved = loaded
    ? whispers.filter((w) => w.status === "approved")
    : whispers.filter((w) => w.status === "approved");

  const filteredWhispers = activeTag
    ? approved.filter((w) => w.tags.includes(activeTag))
    : approved;

  return (
    <div className="min-h-[100dvh] pt-24 pb-16 animated-bg">
      <div className="max-w-[800px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-4">
            吐槽<span className="text-gradient">墙</span>
          </h1>
          <p className="text-[#b0aea5] max-w-lg mx-auto">
            这里没有熟人，没有评判。把心事说出来，你会发现——
            原来有这么多人跟你一样。
          </p>
        </motion.div>

        {/* Post Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-[2rem] p-6 mb-8"
        >
          <form onSubmit={handleSubmit}>
            <textarea
              value={newWhisper}
              onChange={(e) => setNewWhisper(e.target.value)}
              placeholder="此刻你想说什么？"
              className="w-full bg-transparent border-none outline-none resize-none text-[#faf9f5] placeholder-[#5a4f47] text-sm leading-relaxed min-h-[100px]"
              maxLength={500}
            />
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <span className="text-xs text-[#5a4f47]">
                {newWhisper.length}/500 · 匿名发布
              </span>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(217,119,87,0.3)] transition-all disabled:opacity-50"
                disabled={!newWhisper.trim()}
              >
                <Send className="w-3.5 h-3.5" />
                发布心声
              </button>
            </div>
          </form>

          <AnimatePresence>
            {justPosted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 mt-3 text-xs text-amber-400"
              >
                <Info className="w-3.5 h-3.5" />
                发布成功！内容将在管理员审核通过后展示
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              !activeTag
                ? "bg-accent text-white"
                : "glass text-[#b0aea5] hover:text-[#faf9f5]"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            全部
          </button>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTag === tag
                  ? "bg-accent text-white"
                  : "glass text-[#b0aea5] hover:text-[#faf9f5]"
              }`}
            >
              <Hash className="w-3 h-3" />
              {tag}
            </button>
          ))}
        </div>

        {/* Whisper List */}
        <div className="space-y-4">
          {filteredWhispers.map((whisper, i) => (
            <WhisperCard
              key={whisper.id}
              content={whisper.content}
              likes={whisper.likes}
              comments={whisper.comments}
              tags={whisper.tags}
              time={whisper.time}
              index={i}
            />
          ))}
        </div>

        {!loaded ? (
          <div className="text-center py-20 text-[#5a4f47]">加载中…</div>
        ) : (
          filteredWhispers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#5a4f47]">暂无该标签的心声</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
