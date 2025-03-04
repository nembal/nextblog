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
}

/**
 * NextBlog component that renders a blog from Markdown files
 * This is a wrapper for use in Next.js App Router
 */
export function NextBlog({ path = '/blog' }: NextBlogProps) {
  return (
    <div className="nextblog">
      <BlogIndex path={path} />
    </div>
  );
}

/**
 * NextBlogTag component that renders posts filtered by tag
 * This is a wrapper for use in Next.js App Router
 */
export function NextBlogTag({ path = '/blog', tag }: { path?: string; tag: string }) {
  return (
    <div className="nextblog">
      <BlogIndex path={path} tag={tag} />
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
      <BlogPost path={path} slug={slug} />
    </div>
  );
}

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