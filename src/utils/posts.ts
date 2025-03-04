import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Default configuration
const defaultConfig = {
  postsDir: 'posts',
  basePath: '/blog',
  postsPerPage: 10,
  wordsPerMinute: 200,
  excerptLength: 150,
  dateFormat: 'YYYY-MM-DD',
  features: {
    tags: true,
    readingTime: true,
    mdx: true,
    socialSharing: true
  }
};

// Try to load the config file
let config: typeof defaultConfig;
try {
  const userConfig = require('../../nextblog.config.js');
  // Merge with default config
  config = {
    ...defaultConfig,
    ...userConfig,
    features: {
      ...defaultConfig.features,
      ...(userConfig.features || {})
    }
  };
} catch (error) {
  // Use default config if file doesn't exist
  config = defaultConfig;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  isMdx: boolean;
  excerpt: string;
  tags: string[];
  readingTime: string;
}

/**
 * Calculate reading time for a post
 * @param content The post content
 * @returns Reading time in minutes
 */
function calculateReadingTime(content: string): string {
  if (!config.features.readingTime) {
    return '';
  }
  
  const wordsPerMinute = config.wordsPerMinute;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Generate an excerpt from post content
 * @param content The post content
 * @param length Maximum length of the excerpt
 * @returns The excerpt
 */
function generateExcerpt(content: string, length: number = config.excerptLength): string {
  // Remove Markdown formatting
  const plainText = content
    .replace(/#+\s+(.*)/g, '$1') // Remove headings
    .replace(/\*\*(.*)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim();

  if (plainText.length <= length) {
    return plainText;
  }

  return plainText.substring(0, length).trim() + '...';
}

/**
 * Get all blog posts
 * @returns Array of posts sorted by date (newest first)
 */
export async function getPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), config.postsDir);
  
  try {
    const files = fs.readdirSync(postsDir);
    
    const posts = files
      .filter(file => file.endsWith('.md') || (config.features.mdx && file.endsWith('.mdx')))
      .map((file) => {
        try {
          const filePath = path.join(postsDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const { data, content: markdown } = matter(content);
          const stats = fs.statSync(filePath);
          const isMdx = file.endsWith('.mdx');
          
          // Extract tags from front matter or default to empty array
          const tags = config.features.tags 
            ? (Array.isArray(data.tags) ? data.tags : 
               (typeof data.tags === 'string' ? [data.tags] : []))
            : [];
          
          return {
            slug: data.slug || file.replace(/\.(md|mdx)$/, ''),
            title: data.title || file.replace(/\.(md|mdx)$/, ''),
            date: data.date || stats.mtime.toISOString().split('T')[0],
            content: markdown,
            isMdx,
            excerpt: data.excerpt || generateExcerpt(markdown),
            tags,
            readingTime: calculateReadingTime(markdown)
          } as Post;
        } catch (error) {
          console.error(`Error processing file ${file}:`, error);
          return null;
        }
      });
    
    // Filter out null values and sort by date
    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 * @param slug The post slug
 * @returns Post data or null if not found
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const postsDir = path.join(process.cwd(), config.postsDir);
  
  try {
    // Try both .md and .mdx extensions
    let filePath = path.join(postsDir, `${slug}.md`);
    let fileExists = fileExistsSync(filePath);
    let isMdx = false;
    
    if (!fileExists && config.features.mdx) {
      filePath = path.join(postsDir, `${slug}.mdx`);
      fileExists = fileExistsSync(filePath);
      isMdx = true;
      
      if (!fileExists) {
        return null;
      }
    } else if (!fileExists) {
      return null;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: markdown } = matter(content);
    const stats = fs.statSync(filePath);
    
    // Extract tags from front matter or default to empty array
    const tags = config.features.tags 
      ? (Array.isArray(data.tags) ? data.tags : 
         (typeof data.tags === 'string' ? [data.tags] : []))
      : [];
    
    let htmlContent: string;
    
    try {
      // For both MD and MDX files, use marked for the MVP
      htmlContent = marked(markdown);
    } catch (error) {
      console.error(`Error rendering content for ${slug}:`, error);
      htmlContent = `<p>Error rendering content: ${(error as Error).message}</p>`;
    }
    
    return {
      slug,
      title: data.title || slug,
      date: data.date || stats.mtime.toISOString().split('T')[0],
      content: htmlContent,
      isMdx,
      excerpt: data.excerpt || generateExcerpt(markdown),
      tags,
      readingTime: calculateReadingTime(markdown)
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get posts by tag
 * @param tag The tag to filter by
 * @returns Array of posts with the specified tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  if (!config.features.tags) {
    return [];
  }
  
  const posts = await getPosts();
  return posts.filter(post => post.tags.includes(tag));
}

/**
 * Get all unique tags from all posts
 * @returns Array of unique tags
 */
export async function getAllTags(): Promise<string[]> {
  if (!config.features.tags) {
    return [];
  }
  
  const posts = await getPosts();
  const tags = posts.flatMap(post => post.tags);
  return Array.from(new Set(tags));
}

/**
 * Check if a file exists
 * @param filePath Path to the file
 * @returns Boolean indicating if the file exists
 */
function fileExistsSync(filePath: string): boolean {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
} 