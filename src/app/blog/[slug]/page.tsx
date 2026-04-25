"use client";

import { ArrowLeft, Image as ImageIcon, MessageSquare } from "lucide-react";
import { PixelContainer } from "@/components/ui/PixelContainer";
import { PixelButton } from "@/components/ui/PixelButton";
import { PixelBadge } from "@/components/ui/PixelBadge";
import { PageTransition } from "@/components/ui/PageTransition";
import { Post } from "@/lib/markdown";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pixel-bg relative">
        <div className="font-press-start text-accent animate-pulse">LOADING...</div>
      </div>
    );
  }

  if (!post) return notFound();

  return (
    <PageTransition>
      <div className="flex flex-col items-center min-h-screen p-4 md:p-8 pixel-bg relative">
      <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Back Button */}
        <div className="mb-6 flex justify-start">
          <PixelButton href="/" variant="secondary" className="flex items-center gap-2 px-3 py-2 text-[10px]">
            <ArrowLeft size={14} /> 返回主城
          </PixelButton>
        </div>

        <PixelContainer className="p-6 md:p-12">
          {/* Post Header */}
          <header className="mb-10 border-b-4 border-accent/20 border-dotted pb-6">
            <div className="flex items-center gap-3 mb-4">
              <PixelBadge variant="info">博文</PixelBadge>
              <span className="font-press-start text-[8px] text-accent/60">
                {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-press-start text-accent leading-snug">
              {post.title}
            </h1>
          </header>

          <div className="space-y-8 text-accent">
            <div 
              className="text-lg md:text-xl leading-relaxed markdown-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* NPC Dialog Blockquote */}
            {post.npcDialog && (
              <blockquote className="pixel-border bg-secondary p-4 md:p-6 my-10 relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Avatar Box */}
                <div className="w-16 h-16 bg-primary pixel-border flex-shrink-0 flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] relative">
                   <div className="absolute inset-0 bg-white/20"></div>
                   <MessageSquare size={28} className="text-accent relative z-10" />
                </div>
                {/* Dialog Content */}
                <div className="flex-1">
                   <h4 className="font-press-start text-[10px] text-accent mb-3 flex items-center gap-2">
                      神秘的 NPC 
                      <span className="w-2 h-2 bg-success animate-pulse rounded-full inline-block"></span>
                   </h4>
                   <p className="font-press-start text-xs md:text-sm leading-loose text-accent/90">
                     {post.npcDialog}
                   </p>
                   {/* Decorative blinking arrow */}
                   <div className="absolute bottom-4 right-4 animate-bounce">
                     <span className="font-press-start text-xs">▼</span>
                   </div>
                </div>
              </blockquote>
            )}
        </div>
        </PixelContainer>
      </div>
      </div>
    </PageTransition>
  );
}