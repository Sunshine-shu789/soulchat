"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: string;
  isSelf: boolean;
  time: string;
}

const randomNames = [
  "匿名小星星", "深海鲸鱼", "月亮邮差", "云朵收藏家", "森林旅人",
  "风中的信", "雨后的虹", "夜的诗人", "流浪的猫", "梦的捕手",
];

const greetings = [
  "大家好，今天心情有点低落...",
  "有人想聊聊天吗？",
  "刚下班，感觉好累啊",
  "今天遇到了一件开心的事！",
  "有没有人跟我一样失眠的...",
];

const initialMessages: Message[] = [
  {
    id: 1,
    text: "欢迎来到 SoulChat 聊天室 🌙",
    sender: "系统",
    isSelf: false,
    time: "刚刚",
  },
];

export function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [username] = useState(
    randomNames[Math.floor(Math.random() * randomNames.length)]
  );
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate other users sending messages
  useEffect(() => {
    const interval = setInterval(() => {
      const otherNames = randomNames.filter((n) => n !== username);
      const randName = otherNames[Math.floor(Math.random() * otherNames.length)];
      const randMsg = greetings[Math.floor(Math.random() * greetings.length)];

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: randMsg,
            sender: randName,
            isSelf: false,
            time: "刚刚",
          },
        ]);
      }, 1500);
    }, 8000);

    return () => clearInterval(interval);
  }, [username]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        sender: username,
        isSelf: true,
        time: "刚刚",
      },
    ]);
    setInput("");
  };

  return (
    <div className="glass-card rounded-[2rem] overflow-hidden flex flex-col h-[600px] sm:h-[700px]">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold tracking-tight">🌙 深夜聊天室</h3>
            <p className="text-xs text-[#5a4f47] mt-0.5">
              你的身份：{username}
            </p>
          </div>
          <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
            {messages.length - 1} 条消息
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.isSelf ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] ${
                  msg.isSelf
                    ? "bg-accent/20 rounded-2xl rounded-br-md"
                    : msg.sender === "系统"
                    ? "bg-white/5 rounded-2xl"
                    : "bg-white/5 rounded-2xl rounded-bl-md"
                } px-4 py-3`}
              >
                {!msg.isSelf && msg.sender !== "系统" && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <User className="w-3 h-3 text-accent" />
                    <span className="text-xs text-accent-light font-medium">
                      {msg.sender}
                    </span>
                  </div>
                )}
                {msg.sender === "系统" && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-xs text-accent font-medium">
                      {msg.sender}
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-xs text-[#5a4f47]"
            >
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              有人正在输入...
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-white/[0.06] flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="说说你的心事..."
          className="flex-1 bg-white/5 rounded-full px-5 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent/30 transition-all placeholder-[#5a4f47]"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-full bg-accent text-white disabled:opacity-50 hover:shadow-[0_0_20px_rgba(217,119,87,0.3)] transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}