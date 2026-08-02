"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, MessageCircle, QrCode } from "lucide-react";

interface QQModalProps {
  open: boolean;
  onClose: () => void;
  username: string;
  qqNumber?: string;
  mode: "view" | "edit";
  onSave?: (qq: string) => void;
}

export function QQModal({ open, onClose, username, qqNumber, mode, onSave }: QQModalProps) {
  const [inputQQ, setInputQQ] = useState(qqNumber || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (qqNumber) {
      navigator.clipboard.writeText(qqNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (onSave && inputQQ.trim()) {
      onSave(inputQQ.trim());
      onClose();
    }
  };

  const openQQChat = () => {
    if (qqNumber) {
      window.open(`https://wpa.qq.com/msgrd?v=3&uin=${qqNumber}&site=qq&menu=yes`, "_blank");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm glass-card rounded-[2rem] p-6 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#5a4f47] hover:text-[#faf9f5] hover:bg-white/5 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                {mode === "edit" ? "填写QQ号" : `${username} 的QQ`}
              </h3>
              <p className="text-xs text-[#b0aea5] mt-1">
                {mode === "edit"
                  ? "填写后其他用户可以看到你的QQ号"
                  : "点击复制或直接加好友聊起来"}
              </p>
            </div>

            {mode === "edit" ? (
              /* Edit mode */
              <div className="space-y-4">
                <div className="glass rounded-xl p-1">
                  <input
                    type="text"
                    value={inputQQ}
                    onChange={(e) => setInputQQ(e.target.value.replace(/\D/g, ""))}
                    placeholder="请输入QQ号..."
                    maxLength={15}
                    className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder-[#5a4f47]"
                  />
                </div>
                <button
                  onClick={handleSave}
                  disabled={!inputQQ.trim()}
                  className="w-full py-3 rounded-xl bg-accent text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(217,119,87,0.3)] transition-all disabled:opacity-50"
                >
                  保存
                </button>
              </div>
            ) : (
              /* View mode */
              <div className="space-y-4">
                {qqNumber ? (
                  <>
                    {/* QQ Display */}
                    <div className="glass rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold tracking-wider text-accent mb-2">
                        {qqNumber}
                      </p>
                      <p className="text-xs text-[#5a4f47]">QQ号</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleCopy}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass text-sm font-medium hover:bg-white/5 transition-all"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">已复制</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            复制QQ
                          </>
                        )}
                      </button>
                      <button
                        onClick={openQQChat}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(217,119,87,0.3)] transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        QQ聊天
                      </button>
                    </div>

                    <p className="text-[10px] text-[#5a4f47] text-center">
                      点击「QQ聊天」将打开QQ临时会话窗口
                    </p>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <QrCode className="w-10 h-10 text-[#5a4f47] mx-auto mb-3" />
                    <p className="text-sm text-[#b0aea5]">TA还没有填写QQ号</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}