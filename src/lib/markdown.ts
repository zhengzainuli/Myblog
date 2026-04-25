import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostMetaData {
  slug: string;
  title: string;
  date: string;
  icon: string; // The name of the icon to render
  npcDialog?: string;
}

export interface Post extends PostMetaData {
  content: string;
}

// Get all slugs
export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML string
  const htmlContent = (await remark().use(html).process(content)).toString();

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    icon: data.icon || 'ImageIcon',
    npcDialog: data.npcDialog,
    content: htmlContent,
  };
}

// Get all posts sorted by date
export async function getAllPosts(): Promise<PostMetaData[]> {
  const slugs = getPostSlugs();
  const postsPromises = slugs.map(async (slug) => {
    const post = await getPostBySlug(slug);
    return post as Post;
  });
  
  const posts = await Promise.all(postsPromises);
  const validPosts = posts.filter((p): p is Post => p !== null);

  // Sort posts by date in descending order
  return validPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1)).map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    icon: p.icon,
    npcDialog: p.npcDialog
  }));
}
