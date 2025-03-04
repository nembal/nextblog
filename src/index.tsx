import React from 'react';
import { BlogIndex } from './components/BlogIndex';
import { BlogPost } from './components/BlogPost';
import { MdxContent } from './components/MdxContent';
import { 
  getPosts, 
  getPostBySlug, 
  getAllTags, 
  getPostsByTag
} from './utils/posts';

export interface NextBlogProps {
  /**
   * The path to render the blog at (default: '/blog')
   */
  path?: string;
  /**
   * The page number for pagination
   */
  page?: number;
}

/**
 * NextBlog component that renders a blog from Markdown files
 * This is a wrapper for use in Next.js App Router
 */
export function NextBlog({ path = '/blog', page }: NextBlogProps) {
  return (
    <div className="nextblog">
      {/* @ts-expect-error Async Server Component */}
      <BlogIndex path={path} page={page} />
    </div>
  );
}

/**
 * NextBlogTag component that renders posts filtered by tag
 * This is a wrapper for use in Next.js App Router
 */
export function NextBlogTag({ path = '/blog', tag, page }: { path?: string; tag: string; page?: number }) {
  return (
    <div className="nextblog">
      {/* @ts-expect-error Async Server Component */}
      <BlogIndex path={path} tag={tag} page={page} />
    </div>
  );
}

/**
 * NextBlogPost component that renders a single blog post
 * This is a wrapper for use in Next.js App Router
 */
export function NextBlogPost({ path = '/blog', slug }: { path?: string; slug: string }) {
  return (
    <div className="nextblog">
      {/* @ts-expect-error Async Server Component */}
      <BlogPost path={path} slug={slug} />
    </div>
  );
}

// Create server component versions for direct usage in RSC
export const NextBlogServer = NextBlog;
export const NextBlogTagServer = NextBlogTag;
export const NextBlogPostServer = NextBlogPost;

// Export components for direct usage
export { 
  BlogIndex, 
  BlogPost,
  MdxContent
}; 

// Export utilities for direct usage
export {
  getPosts,
  getPostBySlug,
  getAllTags,
  getPostsByTag
};

// Export types
export type { Post } from './utils/posts';