# NextBlogX API Documentation

This document provides detailed information about the NextBlogX API and how to extend the project.

## Table of Contents

1. [Core API Functions](#core-api-functions)
2. [Data Types](#data-types)
3. [Utility Functions](#utility-functions)
4. [Extending NextBlogX](#extending-nextblogx)
   - [Adding New Features](#adding-new-features)
   - [Customizing Components](#customizing-components)
   - [Styling](#styling)
5. [Advanced Usage](#advanced-usage)

## Core API Functions

### `getAllPosts()`

Retrieves all blog posts from the `src/content/posts` directory.

```typescript
import { getAllPosts } from '@/lib/api';

// Get all posts
const posts = getAllPosts();
```

**Returns**: An array of `PostMetadata` objects sorted by date (newest first).

### `getPostBySlug(slug: string)`

Retrieves a specific blog post by its slug.

```typescript
import { getPostBySlug } from '@/lib/api';

// Get a specific post
const { content, metadata } = await getPostBySlug('my-post-slug');
```

**Parameters**:
- `slug`: The slug of the post to retrieve (without the `.md` extension)

**Returns**: A Promise that resolves to an object containing:
- `content`: The HTML content of the post
- `metadata`: The post's metadata as a `PostMetadata` object

## Data Types

### `PostMetadata`

```typescript
type PostMetadata = {
  id: string;         // The post slug (filename without .md extension)
  title: string;      // The post title
  date: string;       // The post date in ISO format
  excerpt: string;    // A brief summary of the post
  coverImage?: string; // Optional URL to the post's cover image
  author?: {
    name: string;     // Author's name
    picture?: string; // Optional URL to the author's picture
  };
  tags?: string[];    // Optional array of tags
};
```

## Utility Functions

### Date Formatting

```typescript
import { formatDate, formatDateISO } from '@/lib/date-utils';

// Format a date string to "Month DD, YYYY"
const formattedDate = formatDate('2023-05-15T09:35:07.322Z');
// Result: "May 15, 2023"

// Format a date string to ISO format (YYYY-MM-DD)
const isoDate = formatDateISO('2023-05-15T09:35:07.322Z');
// Result: "2023-05-15"
```

## Extending NextBlogX

### Adding New Features

#### 1. Adding a Search Feature

To add a search feature to your blog:

1. Create a new component in `src/components/Search.tsx`:

```tsx
import { useState } from 'react';
import { PostMetadata } from '@/lib/api';

interface SearchProps {
  posts: PostMetadata[];
  onSearch: (results: PostMetadata[]) => void;
}

export default function Search({ posts, onSearch }: SearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    onSearch(results);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
```

2. Update your home page to use the search component:

```tsx
import { useState } from 'react';
import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Search from '@/components/Search';

export default function Home() {
  const allPosts = getAllPosts();
  const [displayedPosts, setDisplayedPosts] = useState(allPosts);

  return (
    <div>
      {/* ... existing code ... */}
      
      <Search posts={allPosts} onSearch={setDisplayedPosts} />
      
      {displayedPosts.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-700">
            No posts found matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
```

#### 2. Adding Pagination

To add pagination to your blog:

1. Create a new component in `src/components/Pagination.tsx`:

```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center mt-12">
      <nav className="inline-flex">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border-t border-b border-gray-300 ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
```

2. Update your home page to use pagination:

```tsx
import { useState } from 'react';
import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';

const POSTS_PER_PAGE = 6;

export default function Home() {
  const allPosts = getAllPosts();
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const displayedPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div>
      {/* ... existing code ... */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
```

### Customizing Components

You can customize any component in the `src/components` directory to match your design preferences. For example, to customize the header:

1. Edit `src/components/Header.tsx`:

```tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="py-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-100 transition-colors flex items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="mr-2" />
          NextBlogX
        </Link>
        <nav className="flex space-x-6">
          <Link href="/" className="text-white hover:text-blue-100 transition-colors">
            Home
          </Link>
          <Link href="/categories" className="text-white hover:text-blue-100 transition-colors">
            Categories
          </Link>
          <Link href="/about" className="text-white hover:text-blue-100 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-blue-100 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

### Styling

NextBlogX uses Tailwind CSS for styling. You can customize the design by modifying the `tailwind.config.ts` file:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... add your custom color palette
          900: '#0c4a6e',
        },
        // Add more custom colors
      },
      typography: {
        DEFAULT: {
          css: {
            // Customize typography
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            // Add more typography customizations
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
```

## Advanced Usage

### Adding a Comments System

To add a comments system to your blog posts:

1. Install a comments service like Disqus or create your own using a database.
2. Create a new component in `src/components/Comments.tsx`:

```tsx
import { useEffect } from 'react';

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  useEffect(() => {
    // Initialize Disqus
    const script = document.createElement('script');
    script.src = 'https://your-disqus-shortname.disqus.com/embed.js';
    script.setAttribute('data-timestamp', Date.now().toString());
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, [slug]);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Comments</h2>
      <div id="disqus_thread"></div>
    </div>
  );
}
```

3. Add the Comments component to your blog post page:

```tsx
import Comments from '@/components/Comments';

export default async function Post({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  try {
    const { content, metadata } = await getPostBySlug(slug);

    return (
      <article className="max-w-4xl mx-auto">
        {/* ... existing code ... */}
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        {/* Add comments section */}
        <Comments slug={slug} />
        
        {/* ... existing code ... */}
      </article>
    );
  } catch (error) {
    notFound();
  }
}
```

### Adding Analytics

To add analytics to your blog:

1. Create a new component in `src/components/Analytics.tsx`:

```tsx
import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_ID');
          `,
        }}
      />
    </>
  );
}
```

2. Add the Analytics component to your layout:

```tsx
import Analytics from '@/components/Analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
```

### Creating an RSS Feed

To add an RSS feed to your blog:

1. Install the `feed` package:

```bash
npm install feed
```

2. Create a new file in `src/lib/rss.ts`:

```typescript
import { Feed } from 'feed';
import { getAllPosts } from './api';
import fs from 'fs';

export function generateRssFeed() {
  const posts = getAllPosts();
  const siteURL = 'https://your-site-url.com';
  const date = new Date();
  
  const author = {
    name: 'Your Name',
    email: 'your-email@example.com',
    link: 'https://your-site-url.com',
  };

  const feed = new Feed({
    title: 'NextBlogX',
    description: 'A modern blog platform built with Next.js',
    id: siteURL,
    link: siteURL,
    language: 'en',
    image: `${siteURL}/logo.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Your Name`,
    updated: date,
    generator: 'NextBlogX',
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const url = `${siteURL}/posts/${post.id}`;
    
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.excerpt,
      author: [
        {
          name: post.author?.name || author.name,
          link: author.link,
        },
      ],
      date: new Date(post.date),
    });
  });

  // Write the RSS feed to public directory
  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
```

3. Call the function during build time in a script or in your Next.js config. 