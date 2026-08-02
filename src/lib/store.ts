"use client";

import { useEffect, useState, useCallback } from "react";

export type WhisperStatus = "approved" | "pending" | "rejected";

export interface Whisper {
  id: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  time: string;
  status: WhisperStatus;
  createdAt: number;
}

export interface QQEntry {
  id: string;
  name: string;
  avatar: string;
  intro: string;
  qq: string;
  tags: string[];
  createdAt: number;
}

const W_KEY = "soulchat_whispers_v1";
const Q_KEY = "soulchat_qq_v1";

const AVATARS = ["🐋", "🌙", "☁️", "🌲", "🍃", "🌈", "⭐", "🔥", "🌸", "🍂"];

const seedWhispers: Whisper[] = [
  {
    id: "w1",
    content:
      "今天面试又挂了，连续第五次了。坐在回家的地铁上突然觉得好累，但看到车窗里自己的倒影，还是挤出了一个微笑。加油啊，明天的我。",
    likes: 234,
    comments: 56,
    tags: ["求职", "加油"],
    time: "2分钟前",
    status: "approved",
    createdAt: Date.now() - 2 * 60 * 1000,
  },
  {
    id: "w2",
    content:
      "暗恋了三年，今天终于说出口了。她说「我们做朋友就好」。意料之中，但还是好难过。不过这三年，能默默喜欢一个人，本身就很美好吧。",
    likes: 892,
    comments: 143,
    tags: ["暗恋", "青春"],
    time: "15分钟前",
    status: "approved",
    createdAt: Date.now() - 15 * 60 * 1000,
  },
  {
    id: "w3",
    content:
      "和妈妈视频，她说「你瘦了，别太省」。挂了电话才发现，她鬓角的白发又多了。突然好想回家。",
    likes: 1567,
    comments: 289,
    tags: ["亲情", "想家"],
    time: "32分钟前",
    status: "approved",
    createdAt: Date.now() - 32 * 60 * 1000,
  },
  {
    id: "w4",
    content:
      "今天辞职了。所有人都觉得我疯了，放弃高薪去追什么梦想。但只有我自己知道，每天早上对着镜子涂口红的时候，那个笑容有多假。",
    likes: 2045,
    comments: 412,
    tags: ["辞职", "勇气"],
    time: "1小时前",
    status: "approved",
    createdAt: Date.now() - 60 * 60 * 1000,
  },
  {
    id: "w5",
    content:
      "养了三年的猫丢了，贴了寻猫启事，在小区找了三天三夜。今天凌晨三点，它自己从窗户回来了，还带着一身桂花香。我抱着它哭了好久。",
    likes: 3210,
    comments: 567,
    tags: ["宠物", "失而复得"],
    time: "2小时前",
    status: "approved",
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    id: "w6",
    content:
      "确诊抑郁症的第三个月。今天第一次主动出门晒太阳，买了束向日葵放在床头。生活很难，但我想再试试。",
    likes: 4567,
    comments: 891,
    tags: ["抑郁症", "希望"],
    time: "3小时前",
    status: "approved",
    createdAt: Date.now() - 3 * 60 * 60 * 1000,
  },
];

const seedQQ: QQEntry[] = [
  { id: "q1", name: "深海鲸鱼", avatar: "🐋", intro: "喜欢音乐和旅行，想找同好", qq: "123456789", tags: ["音乐", "旅行"], createdAt: Date.now() - 5 * 60 * 60 * 1000 },
  { id: "q2", name: "月亮邮差", avatar: "🌙", intro: "夜猫子，喜欢聊天", qq: "987654321", tags: ["读书", "电影"], createdAt: Date.now() - 4 * 60 * 60 * 1000 },
  { id: "q3", name: "云朵收藏家", avatar: "☁️", intro: "摄影爱好者，欢迎交流", qq: "456789123", tags: ["摄影", "美食"], createdAt: Date.now() - 3 * 60 * 60 * 1000 },
  { id: "q4", name: "森林旅人", avatar: "🌲", intro: "户外运动达人", qq: "789123456", tags: ["户外", "运动"], createdAt: Date.now() - 2 * 60 * 60 * 1000 },
  { id: "q5", name: "风中的信", avatar: "🍃", intro: "一起听歌吧", qq: "321654987", tags: ["音乐", "写作"], createdAt: Date.now() - 90 * 60 * 1000 },
  { id: "q6", name: "雨后的虹", avatar: "🌈", intro: "画画是生活的一部分", qq: "654987321", tags: ["绘画", "治愈"], createdAt: Date.now() - 30 * 60 * 1000 },
];

function genId(prefix: string): string {
  return prefix + Math.random().toString(36).slice(2, 8) + Date.now().toString(36);
}

export function loadWhispers(): Whisper[] {
  if (typeof window === "undefined") return seedWhispers;
  try {
    const raw = localStorage.getItem(W_KEY);
    if (!raw) {
      localStorage.setItem(W_KEY, JSON.stringify(seedWhispers));
      return seedWhispers;
    }
    return JSON.parse(raw) as Whisper[];
  } catch {
    return seedWhispers;
  }
}

export function saveWhispers(w: Whisper[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(W_KEY, JSON.stringify(w));
}

export function loadQQ(): QQEntry[] {
  if (typeof window === "undefined") return seedQQ;
  try {
    const raw = localStorage.getItem(Q_KEY);
    if (!raw) {
      localStorage.setItem(Q_KEY, JSON.stringify(seedQQ));
      return seedQQ;
    }
    return JSON.parse(raw) as QQEntry[];
  } catch {
    return seedQQ;
  }
}

export function saveQQ(q: QQEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(Q_KEY, JSON.stringify(q));
}

// ---------- Hooks ----------

export function useWhispers() {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setWhispers(loadWhispers());
    setLoaded(true);
  }, []);

  const commit = useCallback((next: Whisper[]) => {
    setWhispers(next);
    saveWhispers(next);
  }, []);

  const addWhisper = useCallback(
    (content: string, tags: string[]) => {
      const w: Whisper = {
        id: genId("w_"),
        content,
        likes: 0,
        comments: 0,
        tags: tags.length ? tags : ["新的心声"],
        time: "刚刚",
        status: "pending",
        createdAt: Date.now(),
      };
      setWhispers((prev) => {
        const next = [w, ...prev];
        saveWhispers(next);
        return next;
      });
    },
    []
  );

  const setStatus = useCallback(
    (id: string, status: WhisperStatus) => {
      setWhispers((prev) => {
        const next = prev.map((w) => (w.id === id ? { ...w, status } : w));
        saveWhispers(next);
        return next;
      });
    },
    []
  );

  const removeWhisper = useCallback((id: string) => {
    setWhispers((prev) => {
      const next = prev.filter((w) => w.id !== id);
      saveWhispers(next);
      return next;
    });
  }, []);

  return { whispers, loaded, addWhisper, setStatus, removeWhisper };
}

export function useQQ() {
  const [entries, setEntries] = useState<QQEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEntries(loadQQ());
    setLoaded(true);
  }, []);

  const commit = useCallback((next: QQEntry[]) => {
    setEntries(next);
    saveQQ(next);
  }, []);

  const addQQ = useCallback(
    (data: { name: string; qq: string; intro: string; tags: string[] }) => {
      const entry: QQEntry = {
        id: genId("q_"),
        name: data.name || "匿名旅人",
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
        intro: data.intro || "这个人很神秘，什么都没留下~",
        qq: data.qq,
        tags: data.tags.length ? data.tags : ["新人"],
        createdAt: Date.now(),
      };
      setEntries((prev) => {
        const next = [entry, ...prev];
        saveQQ(next);
        return next;
      });
    },
    []
  );

  const removeQQ = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveQQ(next);
      return next;
    });
  }, []);

  return { entries, loaded, addQQ, removeQQ };
}

// ---------- Admin auth ----------

const AUTH_KEY = "soulchat_admin_auth";
// 演示用密码，生产环境务必替换为服务端校验
const ADMIN_PASSWORD = "soulchat888";

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function adminLogin(pwd: string): boolean {
  if (typeof window === "undefined") return false;
  if (pwd === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  return false;
}

export function adminLogout() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
}
