# NextBlog

A modern, feature-rich blog framework built with Next.js, Tailwind CSS, and Shadcn/UI.

![NextBlog](https://img.shields.io/badge/NextBlog-1.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-13.5+-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)
![CI Status](https://github.com/nextblog/nextblog/workflows/NextBlog%20CI/badge.svg)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)

<p align="center">
  <img src="https://github.com/nextblog/nextblog/raw/main/docs/images/nextblog-screenshot.png" alt="NextBlog Screenshot" width="600">
</p>

## Features

- **Markdown & MDX Support**: Write your posts in Markdown or MDX for enhanced content with React components
- **Tag System**: Categorize your posts with tags and allow readers to filter by tag
- **Reading Time Estimation**: Automatically calculate and display estimated reading time for each post
- **Pagination**: Built-in pagination for your blog index pages
- **Responsive Design**: Beautiful, mobile-friendly UI built with Tailwind CSS and Shadcn/UI
- **SEO Optimized**: Built-in SEO features to help your content rank better
- **Fast Performance**: Leverages Next.js for optimal loading speeds and performance
- **Fully Typed**: Written in TypeScript for better developer experience and type safety
- **Highly Configurable**: Extensive configuration options to customize your blog
- **Dual Package Support**: Supports both ESM and CommonJS for maximum compatibility

## Demo

Check out the [live demo](https://nextblog-demo.vercel.app) to see NextBlog in action.

## Getting Started

### Installation

```bash
npm install nextblog
# or
yarn add nextblog
# or
pnpm add nextblog
```

### Prerequisites

NextBlog requires:
- Next.js 13.5 or higher (with App Router)
- React 18 or higher
- Node.js 18 or higher

### Basic Usage

1. Create a new Next.js project or use an existing one
2. Install NextBlog
3. Create a `posts` directory in your project root
4. Add Markdown or MDX files to the `posts` directory
5. Import and use NextBlog components in your pages

```jsx
// app/blog/page.tsx
import { NextBlog } from 'nextblog';

export default function BlogPage() {
  return <NextBlog />;
}
```

```jsx
// app/blog/[slug]/page.tsx
import { BlogPost } from 'nextblog';
import { getPosts } from 'nextblog';

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default function PostPage({ params }) {
  return <BlogPost slug={params.slug} />;
}
```

```jsx
// app/blog/tags/[tag]/page.tsx
import { NextBlogTag } from 'nextblog';
import { getAllTags } from 'nextblog';

// Generate static paths for all tags
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(tag => ({ tag }));
}

export default function TagPage({ params }) {
  return <NextBlogTag tag={params.tag} />;
}
```

```jsx
// app/blog/page/[page]/page.tsx
import { NextBlog } from 'nextblog';
import { getPosts } from 'nextblog';

// Generate static paths for pagination
export async function generateStaticParams() {
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / 10); // 10 is the default postsPerPage
  return Array.from({ length: totalPages }, (_, i) => ({ 
    page: String(i + 1) 
  }));
}

export default function PaginatedBlogPage({ params }) {
  return <NextBlog page={parseInt(params.page)} />;
}
```

## Post Format

Create Markdown or MDX files in the `posts` directory with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-03-10"
tags: ["nextjs", "react", "tutorial"]
excerpt: "A brief description of your post that will appear in the post list."
---

Your post content goes here...
```

## Configuration

You can customize NextBlog by creating a `nextblog.config.js` file in your project root:

```js
module.exports = {
  // Directory where blog posts are stored
  postsDir: 'posts',
  
  // Base path for the blog
  basePath: '/blog',
  
  // Number of posts to show per page (for pagination)
  postsPerPage: 10,
  
  // Default reading speed (words per minute) for calculating reading time
  wordsPerMinute: 200,
  
  // Maximum length of post excerpts
  excerptLength: 150,
  
  // Date format for displaying post dates
  dateFormat: 'YYYY-MM-DD',
  
  // Enable or disable features
  features: {
    // Enable or disable tag system
    tags: true,
    
    // Enable or disable reading time estimation
    readingTime: true,
    
    // Enable or disable MDX support
    mdx: true,
    
    // Enable or disable social sharing buttons
    socialSharing: true
  }
};
```

## API Reference

### Components

#### `NextBlog`

The main component that renders a blog index page.

```jsx
<NextBlog path="/blog" page={1} />
```

Props:
- `path` (optional): The base path for the blog (default: '/blog')
- `page` (optional): The page number for pagination (default: 1)
- `tag` (optional): Filter posts by tag

#### `BlogPost`

Component to render an individual blog post.

```jsx
<BlogPost slug="hello-world" path="/blog" />
```

Props:
- `slug`: The slug of the post to display
- `path` (optional): The base path for the blog (default: '/blog')

#### `NextBlogTag`

Component to render posts filtered by a specific tag.

```jsx
<NextBlogTag tag="react" path="/blog" page={1} />
```

Props:
- `tag`: The tag to filter by
- `path` (optional): The base path for the blog (default: '/blog')
- `page` (optional): The page number for pagination (default: 1)

### Utility Functions

- `getPosts()`: Get all blog posts
- `getPostBySlug(slug)`: Get a single post by slug
- `getAllTags()`: Get all unique tags from all posts
- `getPostsByTag(tag)`: Get all posts with a specific tag

## Security

NextBlog follows best practices for security:

- No dangerous eval() or new Function()
- Proper sanitization of user inputs
- Safe handling of file operations
- No unnecessary dependencies

## Performance

NextBlog is designed for optimal performance:

- Static site generation (SSG) for fast page loads
- Minimal client-side JavaScript
- Optimized bundle size
- Efficient data fetching

## Testing

NextBlog includes Jest for testing. Run tests with:

```bash
npm test
# or
yarn test
# or
pnpm test
```

## Deployment

### Vercel Deployment

NextBlog is optimized for deployment on Vercel. To deploy your NextBlog site:

1. Fork this repository
2. Connect your fork to Vercel
3. Configure the build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm ci`

The repository includes a `vercel.json` configuration file that optimizes the deployment process.

### GitHub Actions CI/CD

This repository includes GitHub Actions workflows for continuous integration and deployment:

- **CI Workflow**: Automatically runs tests and builds the package on push and pull requests
- **Vercel Deployment**: Automatically deploys to Vercel when changes are pushed to the main branch

To set up the Vercel deployment workflow:

1. Generate a Vercel API token from your Vercel account settings
2. Add the token as a repository secret named `VERCEL_TOKEN`
3. Push changes to the main branch to trigger the deployment

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to NextBlog.

## Roadmap

Future features we're planning to add:

- [ ] Search functionality
- [ ] RSS feed generation
- [ ] Comment system integration
- [ ] Dark mode support
- [ ] Image optimization
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] Table of contents generation
- [ ] Draft post support
- [ ] Related posts suggestions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [MDX](https://mdxjs.com/) 