"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Heart,
  MessageCircle,
  Settings,
  LogOut,
  Moon,
  Bell,
  Shield,
  ChevronRight,
  MessageCircle as QQIcon,
} from "lucide-react";
import { QQModal } from "@/components/QQModal";
import { useQQ } from "@/lib/store";

const randomNames = [
  "匿名小星星", "深海鲸鱼", "月亮邮差", "云朵收藏家", "森林旅人",
];

const moodQuotes = [
  "今天也要好好爱自己 💪",
  "慢慢来，一切都会好的",
  "你比想象中更坚强",
  "允许一切发生",
  "温柔地对待自己",
];

const stats = [
  { label: "发送的心声", value: "23", icon: MessageCircle },
  { label: "收到的点赞", value: "156", icon: Heart },
  { label: "聊天次数", value: "12", icon: User },
];

export default function ProfilePage() {
  const [username] = useState(
    randomNames[Math.floor(Math.random() * randomNames.length)]
  );
  const [mood] = useState(
    moodQuotes[Math.floor(Math.random() * moodQuotes.length)]
  );
  const [myQQ, setMyQQ] = useState("");
  const [showQQModal, setShowQQModal] = useState(false);
  const { addQQ } = useQQ();

  return (
    <>
      <div className="min-h-[100dvh] pt-24 pb-16 animated-bg">
        <div className="max-w-[600px] mx-auto px-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 rounded-full glass mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              {username}
            </h1>
            <p className="text-sm text-[#b0aea5]">{mood}</p>
            {myQQ && (
              <p className="text-xs text-accent mt-2">
                QQ号已设置 · 可在QQ墙被看到
              </p>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-[2rem] p-6 mb-6"
          >
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gradient mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#5a4f47]">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-[2rem] overflow-hidden"
          >
            {/* QQ设置 - 放在最前面 */}
            <button
              onClick={() => setShowQQModal(true)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors border-b border-white/[0.06]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <QQIcon className="w-4 h-4 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">QQ号设置</p>
                  <p className="text-xs text-[#5a4f47]">
                    {myQQ ? `已设置: ${myQQ}` : "未设置"}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#5a4f47]" />
            </button>

            {[
              { icon: Bell, label: "消息通知", desc: "开启消息提醒" },
              { icon: Moon, label: "深色模式", desc: "已开启" },
              { icon: Shield, label: "隐私设置", desc: "管理匿名状态" },
              { icon: Settings, label: "其他设置", desc: "语言、关于等" },
            ].map((item, i) => (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors ${
                  i < 3 ? "border-b border-white/[0.06]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-[#5a4f47]">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#5a4f47]" />
              </button>
            ))}
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <button className="inline-flex items-center gap-2 text-sm text-[#5a4f47] hover:text-accent transition-colors">
              <LogOut className="w-4 h-4" />
              退出登录（匿名）
            </button>
          </motion.div>
        </div>
      </div>

      {/* QQ Modal */}
      <QQModal
        open={showQQModal}
        onClose={() => setShowQQModal(false)}
        username={username}
        qqNumber={myQQ}
        mode="edit"
        onSave={(qq) => {
          setMyQQ(qq);
          if (qq.trim()) addQQ({ name: username, qq, intro: mood, tags: ["新人"] });
        }}
      />
    </>
  );
}