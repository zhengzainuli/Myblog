"use client";

import { Code, BookOpen, Coffee, HomeIcon, User, FileText, Mail, Image as ImageIcon } from "lucide-react";
import { PixelButton } from "@/components/ui/PixelButton";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelBadge } from "@/components/ui/PixelBadge";
import { PixelContainer } from "@/components/ui/PixelContainer";
import { PageTransition } from "@/components/ui/PageTransition";
import { AnimatedNavIcon } from "@/components/ui/AnimatedNavIcon";
import { ContactModal } from "@/components/ui/ContactModal";
import { SquishyButton } from "@/components/ui/SquishyButton";
import { TavernEmbers } from "@/components/ui/TavernEmbers";
import { PixelTorch } from "@/components/ui/PixelTorch";
import { RumorBoard } from "@/components/ui/RumorBoard";
import { useState, useEffect } from "react";
import { PostMetaData } from "@/lib/markdown";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  ImageIcon: <ImageIcon size={32} />,
  Code: <Code size={32} />,
  BookOpen: <BookOpen size={32} />,
  Coffee: <Coffee size={32} />
};

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [posts, setPosts] = useState<PostMetaData[]>([]);

  useEffect(() => {
    // Fetch posts from our API route
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Failed to load posts", err));
  }, []);

  return (
    <PageTransition>
      <TavernEmbers />
      <div className="flex flex-col items-center min-h-screen p-4 md:p-8 pixel-bg relative">
      {/* Subtle CRT Scanline overlay */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none z-0"></div>

      <header className="mb-8 text-center mt-4 relative z-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-press-start text-accent mb-4 tracking-widest drop-shadow-md">
          冒险日志
        </h1>
        <p className="font-silkscreen text-accent/80 mb-4">我的复古编程之旅</p>
      </header>

      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8 relative z-10">
        {/* Left Sidebar (1/3 width on desktop) */}
        <aside className="w-full md:w-1/3 flex flex-col gap-6">
          <PixelContainer className="p-4 flex flex-col items-center">
            {/* Header/Banner Area */}
            <div className="text-center mb-8 w-full bg-[#3e2731] text-[#f4e4ba] py-3 pixel-border shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] transform -rotate-1 hover:rotate-0 transition-transform">
              <h1 className="font-press-start text-sm md:text-base tracking-widest">ADVENTURE LOG</h1>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-10 w-full">
              <div className="relative w-32 h-32 pixel-border border-[#5c3a21] bg-[#1a1216] flex items-center justify-center overflow-hidden mb-4 shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] z-10 group">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Dong_Zhiqiang.jpg/750px-Dong_Zhiqiang.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ imageRendering: 'auto' }}
                />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none"></div>
              </div>
              
              <div className="w-full max-w-[200px] bg-[#fffdf0] p-3 pixel-border shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] z-20 -mt-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#8b5a2b] pixel-border border-b-0"></div>
                <h2 className="font-press-start text-[10px] text-center mb-2 text-[#3e2731]">Dong Zhiqiang</h2>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-[#b91c1c]">HP</span>
                  <span className="font-silkscreen font-bold">99/99</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#f59e0b]">LV</span>
                  <span className="font-silkscreen font-bold">22</span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="w-full flex flex-col gap-3">
              <PixelButton variant="primary" className="w-full flex justify-start">
                <AnimatedNavIcon icon={<HomeIcon size={16} />} label="回到主城" />
              </PixelButton>
              <PixelButton variant="secondary" className="w-full flex justify-start">
                <AnimatedNavIcon icon={<User size={16} />} label="关于勇者" />
              </PixelButton>
              <PixelButton variant="secondary" className="w-full flex justify-start">
                <AnimatedNavIcon icon={<FileText size={16} />} label="冒险日志" />
              </PixelButton>
              <PixelButton variant="secondary" className="w-full flex justify-start" onClick={() => setIsContactOpen(true)}>
                <AnimatedNavIcon icon={<Mail size={16} />} label="联系酒馆" />
              </PixelButton>
            </nav>

            {/* Squishy Button Easter Egg */}
            <div className="mt-12 flex justify-center w-full relative z-10">
              <SquishyButton />
            </div>
          </PixelContainer>
        </aside>

        {/* Right Main Content (2/3 width on desktop) */}
        <main className="w-full md:w-2/3">
          <PixelContainer className="h-full flex flex-col p-6">
            <RumorBoard />
            
            <div className="flex justify-between items-center border-b-4 border-accent/20 border-dotted pb-4 mb-6">
              <div className="flex items-center gap-4">
                <PixelTorch />
                <h2 className="font-press-start text-xl md:text-2xl text-accent">最新任务</h2>
                <PixelTorch />
              </div>
              <span className="font-press-start text-xs hidden sm:block">PAGE 1/5</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, type: 'spring', stiffness: 200, damping: 20 }}
                  className="h-full"
                >
                  <PixelCard className="h-full flex flex-col justify-between">
                    {/* Thumbnail Placeholder */}
                    <div className="w-full h-24 bg-[#3e2731] pixel-border border-[#2a1a21] flex items-center justify-center mb-3 text-[#ffb703] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjM2UyNzMxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjNDUydDYzIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-20"></div>
                      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                        {iconMap[post.icon] || <ImageIcon size={32} />}
                      </motion.div>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <span className="font-press-start text-[8px] text-[#8b5a2b] mb-2">
                        {new Date(post.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                      </span>
                      <h3 className="font-press-start text-[11px] leading-relaxed mb-4 flex-1 text-[#3e2731]">
                        {post.title}
                      </h3>
                      <PixelButton href={`/blog/${post.slug}`} variant="primary" className="w-full text-[10px] py-2 mt-auto">
                        继续阅读
                      </PixelButton>
                    </div>
                  </PixelCard>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <PixelButton variant="secondary" className="px-2 py-1">&lt;</PixelButton>
              <PixelButton variant="primary" className="px-3 py-1">1</PixelButton>
              <PixelButton variant="secondary" className="px-3 py-1">2</PixelButton>
              <PixelButton variant="secondary" className="px-3 py-1">3</PixelButton>
              <PixelButton variant="secondary" className="px-2 py-1">&gt;</PixelButton>
            </div>
          </PixelContainer>
        </main>
      </div>
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </PageTransition>
  );
}
