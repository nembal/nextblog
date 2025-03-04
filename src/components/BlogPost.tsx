import React from 'react';
import Link from 'next/link';
import { Typography } from './ui/typography';
import { Button } from './ui/button';
import { getPostBySlug } from '../utils/posts';
import { MdxContent } from './MdxContent';

// Try to load the config file
let config: any;
try {
  config = require('../../nextblog.config.js');
} catch (error) {
  // Default config if file doesn't exist
  config = { 
    basePath: '/blog',
    features: {
      tags: true,
      readingTime: true,
      mdx: true,
      socialSharing: true
    }
  };
}

export interface BlogPostProps {
  /**
   * The slug of the post to display
   */
  slug: string;
  /**
   * The path to the blog index (default: '/blog')
   */
  path?: string;
}

/**
 * BlogPost component that displays a single blog post
 * This is a server component that fetches the post data
 */
export async function BlogPost({ slug, path = config.basePath || '/blog' }: BlogPostProps) {
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Typography variant="h1">Post Not Found</Typography>
        <p className="my-4">The post you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href={path}>Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <article className="prose prose-slate mx-auto">
        <Typography variant="h1">{post.title}</Typography>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
          <span>{post.date}</span>
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime}</span>
            </>
          )}
          {post.isMdx && config.features.mdx && (
            <>
              <span>•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">MDX</span>
            </>
          )}
        </div>
        
        {post.tags.length > 0 && config.features.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <Button 
                key={tag} 
                variant="outline" 
                size="sm"
                asChild
              >
                <Link href={`${path}/tags/${tag}`}>
                  {tag}
                </Link>
              </Button>
            ))}
          </div>
        )}
        
        {post.isMdx && config.features.mdx ? (
          <MdxContent content={post.content} />
        ) : (
          <div 
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        )}
      </article>
      <div className="mt-8 flex justify-between">
        <Button asChild>
          <Link href={path}>Back to Blog</Link>
        </Button>
        
        {config.features.socialSharing && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${path}/${post.slug}`)}`} target="_blank" rel="noopener noreferrer">
                Share on Twitter
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${path}/${post.slug}`)}`} target="_blank" rel="noopener noreferrer">
                Share on LinkedIn
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 