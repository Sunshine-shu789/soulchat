"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface WhisperCardProps {
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  time: string;
  index: number;
}

export function WhisperCard({
  content,
  likes,
  comments,
  tags,
  time,
  index,
}: WhisperCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-card rounded-[1.5rem] p-6 hover:shadow-[0_0_30px_rgba(217,119,87,0.06)] transition-shadow group"
    >
      {/* Content */}
      <p className="leading-relaxed mb-4 text-[#e8e6dc]">
        {content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent-light"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              liked ? "text-accent" : "text-[#5a4f47] hover:text-accent"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${liked ? "fill-accent" : ""}`}
            />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-[#5a4f47] hover:text-accent transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{comments}</span>
          </button>
        </div>
        <span className="text-xs text-[#5a4f47]">{time}</span>
      </div>
    </motion.div>
  );
}