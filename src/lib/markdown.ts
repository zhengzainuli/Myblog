import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const GITHUB_REPO = 'zhengzainuli/Myblog';
const GITHUB_BRANCH = 'main';
const CONTENT_PATH = 'content/blog';

// GitHub API base URLs
const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}?ref=${GITHUB_BRANCH}`;
const RAW_URL_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${CONTENT_PATH}`;

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

// Get all slugs from GitHub
export async function getPostSlugs(): Promise<string[]> {
  try {
    const res = await fetch(API_URL, { 
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      console.error('Failed to fetch from GitHub API:', await res.text());
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data
      .filter((file: any) => file.name.endsWith('.md'))
      .map((file: any) => file.name);
  } catch (error) {
    console.error('Error fetching slugs from GitHub:', error);
    return [];
  }
}

// Get single post by slug from GitHub
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.md$/, '');
  const rawUrl = `${RAW_URL_BASE}/${realSlug}.md`;

  try {
    const res = await fetch(rawUrl, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!res.ok) return null;

    const fileContents = await res.text();
    const { data, content } = matter(fileContents);

    // Automatically rewrite relative image URLs to point to the GitHub Raw URL
    // e.g. ![alt](my-image.png) -> ![alt](https://raw.githubusercontent.com/.../content/blog/my-image.png)
    // It ignores URLs that already start with http://, https://, or /
    let rewrittenContent = content.replace(
      /!\[([^\]]*)\]\((?!http|\/)([^)]+)\)/g,
      (match, alt, src) => {
        try {
          const absoluteUrl = new URL(src, `${RAW_URL_BASE}/`).href;
          return `![${alt}](${absoluteUrl})`;
        } catch (e) {
          return match; // Fallback to original if URL parsing fails
        }
      }
    );

    // Also handle HTML <img> tags with relative paths
    rewrittenContent = rewrittenContent.replace(
      /<img([^>]+)src=["'](?!http|\/)([^"']+)["']([^>]*)>/gi,
      (match, prefix, src, suffix) => {
        try {
          const absoluteUrl = new URL(src, `${RAW_URL_BASE}/`).href;
          return `<img${prefix}src="${absoluteUrl}"${suffix}>`;
        } catch (e) {
          return match;
        }
      }
    );

    // Convert markdown to HTML string
    const htmlContent = (await remark().use(html).process(rewrittenContent)).toString();

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      icon: data.icon || 'ImageIcon',
      npcDialog: data.npcDialog,
      content: htmlContent,
    };
  } catch (error) {
    console.error(`Error fetching post ${slug} from GitHub:`, error);
    return null;
  }
}

// Get all posts sorted by date
export async function getAllPosts(): Promise<PostMetaData[]> {
  const slugs = await getPostSlugs();
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
