import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SoulChat - 你的心灵树洞",
  description: "一个可以匿名倾诉、交心、交友的温暖角落。在这里，每一颗心都值得被倾听。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#141413] text-[#faf9f5]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}