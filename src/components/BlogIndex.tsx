import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { getPosts, getAllTags } from '../utils/posts';

// Try to load the config file
let config: any;
try {
  config = require('../../nextblog.config.js');
} catch (error) {
  // Default config if file doesn't exist
  config = { 
    basePath: '/blog',
    postsPerPage: 10,
    features: {
      tags: true,
      readingTime: true,
      mdx: true,
      socialSharing: true
    }
  };
}

export interface BlogIndexProps {
  /**
   * The path to render the blog at (default: '/blog')
   */
  path?: string;
  /**
   * The tag to filter by (optional)
   */
  tag?: string;
  /**
   * The page number for pagination (default: 1)
   */
  page?: number;
}

/**
 * BlogIndex component that displays a list of blog posts
 */
export async function BlogIndex({ path = config.basePath || '/blog', tag, page = 1 }: BlogIndexProps) {
  const posts = tag ? 
    (await getPosts()).filter(post => post.tags.includes(tag)) : 
    await getPosts();
  
  // Pagination
  const startIndex = (page - 1) * config.postsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + config.postsPerPage);
  const totalPages = Math.ceil(posts.length / config.postsPerPage);
  
  // Get all tags if the feature is enabled
  const allTags = config.features.tags ? await getAllTags() : [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {tag ? `Posts tagged with "${tag}"` : 'Blog'}
        </h1>
        {tag && (
          <Button variant="outline" asChild>
            <Link href={path}>View All Posts</Link>
          </Button>
        )}
      </div>

      {/* Tags navigation - only show if tags feature is enabled */}
      {config.features.tags && allTags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tagName => (
              <Button 
                key={tagName} 
                variant={tag === tagName ? "default" : "outline"} 
                size="sm"
                asChild
              >
                <Link href={`${path}/tags/${tagName}`}>
                  {tagName}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {paginatedPosts.length === 0 ? (
          <p className="text-muted-foreground">No posts found. Add some Markdown files to your posts directory.</p>
        ) : (
          paginatedPosts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>
                  <Link href={`${path}/${post.slug}`} className="text-blue-600 hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              {post.tags.length > 0 && config.features.tags && (
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tagName => (
                      <Button 
                        key={tagName} 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <Link href={`${path}/tags/${tagName}`}>
                          {tagName}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardFooter>
              )}
            </Card>
          ))
        )}
      </div>
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button 
              key={pageNum}
              variant={pageNum === page ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href={`${path}${tag ? `/tags/${tag}` : ''}${pageNum > 1 ? `/page/${pageNum}` : ''}`}>
                {pageNum}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
} 