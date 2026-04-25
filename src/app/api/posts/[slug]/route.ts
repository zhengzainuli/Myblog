import { getPostBySlug } from "@/lib/markdown";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return new NextResponse('Not Found', { status: 404 });
  }
  
  return NextResponse.json(post);
}