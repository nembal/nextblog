import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export type PostMetadata = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: {
    name: string;
    picture?: string;
  };
  tags?: string[];
};

export async function getPostBySlug(slug: string): Promise<{ content: string; metadata: PostMetadata }> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);
  
  const htmlContent = processedContent.toString();

  return {
    content: htmlContent,
    metadata: {
      id: realSlug,
      title: data.title || realSlug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      coverImage: data.coverImage,
      author: data.author,
      tags: data.tags || [],
    },
  };
}

export function getAllPosts(): PostMetadata[] {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .filter((slug) => slug.endsWith('.md'))
    .map((slug) => {
      const realSlug = slug.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, slug);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        id: realSlug,
        title: data.title || realSlug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        coverImage: data.coverImage,
        author: data.author,
        tags: data.tags || [],
      };
    })
    .sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));

  return posts;
} 