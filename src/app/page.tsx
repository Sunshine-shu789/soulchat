"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  ArrowRight,
  Quote,
  Star,
  Users,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

const features = [
  {
    icon: Shield,
    title: "完全匿名",
    desc: "无需注册，不记名发帖。你的心事只有你知，我们守护每一个秘密。",
  },
  {
    icon: MessageCircle,
    title: "随心吐槽",
    desc: "不开心的事说出来就好了。这里有温暖的陌生人愿意倾听。",
  },
  {
    icon: Heart,
    title: "走心交友",
    desc: "根据兴趣和心境匹配聊得来的朋友，从心开始一段缘分。",
  },
  {
    icon: Sparkles,
    title: "暖心社区",
    desc: "每一个回复都是一份善意。在这里，温柔是最强大的力量。",
  },
];

const testimonials = [
  {
    text: "在这个喧嚣的世界里，终于有一个地方可以让我说出心里话，而不用担心被评判。",
    author: "匿名用户",
    tag: "常驻居民",
  },
  {
    text: "在这里遇到了一个懂我的人，从吐槽到交心，我们成了彼此的光。",
    author: "匿名用户",
    tag: "幸运邂逅",
  },
  {
    text: "每次心情不好的时候就来这里看看，发现原来很多人和我一样，就不那么孤单了。",
    author: "匿名用户",
    tag: "温暖常客",
  },
];

export default function Home() {
  return (
    <div className="animated-bg">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-sm text-[#b0aea5]">你的心灵树洞</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
              在这里，<br />
              <span className="text-gradient">每一颗心</span>
              <br />
              都值得被倾听
            </h1>

            <p className="text-lg sm:text-xl text-[#b0aea5] max-w-2xl mx-auto mb-12 leading-relaxed">
              一个温暖、安全的匿名社区。你可以尽情吐槽、敞开心扉交心、
              遇见懂你的朋友。不必伪装，做真实的自己。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/whisper"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(217,119,87,0.3)]"
              >
                <span className="relative z-10">开始倾诉</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-accent-dark"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </Link>

              <Link
                href="/chat"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-[#faf9f5] font-medium hover:bg-white/10 transition-all"
              >
                <Users className="w-4 h-4" />
                去聊天室
              </Link>
            </div>
          </motion.div>

          {/* Floating particles decoration */}
          <motion.div
            className="absolute -top-20 -left-20 w-32 h-32 rounded-full bg-accent/10 blur-[60px]"
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-10 -right-20 w-40 h-40 rounded-full bg-accent/8 blur-[80px]"
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div className="text-center mb-20" {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              为什么选择 <span className="text-gradient">SoulChat</span>
            </h2>
            <p className="text-lg text-[#b0aea5] max-w-2xl mx-auto">
              我们相信每个人都需要一个安全的角落，放下防备，做回真实的自己。
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-card rounded-[2.5rem] p-8 hover:shadow-[0_0_40px_rgba(217,119,87,0.08)] transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[#b0aea5] leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-32 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div className="text-center mb-20" {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              听听他们怎么说
            </h2>
            <p className="text-lg text-[#b0aea5] max-w-2xl mx-auto">
              每一个真实的反馈，都是我们继续前行的动力。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card rounded-[2rem] p-8 relative"
              >
                <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
                <p className="text-[#b0aea5] leading-relaxed mb-8 relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{t.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="text-xs text-[#b0aea5]">{t.tag}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="glass-card rounded-[3rem] p-12 sm:p-16 glow-ring">
              <Heart className="w-12 h-12 text-accent mx-auto mb-8" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                准备好倾诉了吗？
              </h2>
              <p className="text-lg text-[#b0aea5] max-w-xl mx-auto mb-10 leading-relaxed">
                无论你此刻是开心、难过还是迷茫，都有一个人愿意倾听。
                来这里，说说话吧。
              </p>
              <Link
                href="/whisper"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium hover:shadow-[0_0_30px_rgba(217,119,87,0.3)] transition-all"
              >
                开始倾诉
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-4 py-12">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-sm text-[#b0aea5]">
              SoulChat - 你的心灵树洞
            </span>
          </div>
          <p className="text-xs text-[#5a4f47]">
            在这里，每一颗心都值得被倾听。
          </p>
        </div>
      </footer>
    </div>
  );
}