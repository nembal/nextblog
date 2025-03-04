# NextBlog MVP Product Requirements Document (PRD)

## Overview
**NextBlog** is an open-source npm package designed for Next.js developers to add blogging functionality to their projects. It automatically renders `.md` and `.mdx` files as blog posts, styled with a modern UI using Tailwind CSS and Shadcn/UI components. The MVP focuses on delivering a simple, functional blog with minimal setup, optimized for Vercel deployment.

- **Name**: NextBlog
- **Type**: npm package
- **License**: MIT
- **Date**: March 03, 2025

## Objectives
- Enable Next.js developers to create a blog by adding Markdown files with minimal configuration.
- Provide a clean, customizable UI using Tailwind CSS and Shadcn/UI components (`Card`, `Typography`, `Button`).
- Ensure seamless deployment on Vercel with static generation.

## Target Audience
- Next.js developers building personal sites, portfolios, or documentation blogs.
- Vercel users seeking a lightweight, file-based blogging solution.
- Developers who value simplicity and UI customization.

## Scope
- **Markdown Rendering**: Detect and render `.md` and `.mdx` files from a configurable directory (`/posts` by default).
- **Blog Organization**: Sort posts by file modification time.
- **UI**: Display posts with Tailwind CSS and Shadcn/UI components:
  - Use `Card` for post previews on the index page.
  - Use `Typography` for Markdown content rendering (headings, paragraphs, etc.).
  - Use `Button` for navigation links (optional).
- **Routing**: Generate dynamic routes for a blog index (`/blog`) and individual posts (`/blog/[slug]`).
- **Metadata**: Parse `title` and `date` from front matter, with filename fallback for slugs.
- **Deployment**: Package as an npm module, deployable on Vercel.

## Non-Scope
- GitHub commit history sorting for post organization.
- Advanced features: search, tags, RSS feed, comments, analytics, multi-language support, drafts, related posts, table of contents, syntax highlighting, image optimization, SEO enhancements, custom 404 page, dark mode.
- AI-driven features: content generation, smart search, metadata extraction, personalization, comment moderation.
- Extensive documentation or community setup beyond a basic README.

## Functional Requirements
1. **Markdown Detection and Rendering**:
   - Detect `.md` and `.mdx` files in a user-specified directory.
   - Render Markdown content to React components, supporting JSX embeds in `.mdx` files.

2. **Blog Organization**:
   - Sort posts by file modification time.
   - Store post data as objects with `slug`, `title`, `date`, and `content`.

3. **User Interface**:
   - Create a blog index page listing all posts with titles and dates, using Shadcn/UI `Card` components for each post preview.
   - Render individual posts with Shadcn/UI `Typography` for headings, paragraphs, and other Markdown elements.
   - Style with Tailwind CSS (e.g., `prose` for Markdown content, `max-w-2xl mx-auto p-4` for layout).
   - Support basic Markdown elements: headings, paragraphs, lists, code blocks, images.

4. **Routing**:
   - Generate a blog index page at `/blog`.
   - Create dynamic routes for posts at `/blog/[slug]`.

5. **Metadata Handling**:
   - Parse `title` and `date` from YAML front matter.
   - Fallback to filename for the slug if front matter is missing.

## Technical Requirements
- **Framework**: Next.js 13+ (App Router).
- **Languages**: TypeScript for type safety.
- **Dependencies**:
  - Core: `next`, `react`, `react-dom`, `marked`, `@mdx-js/mdx`, `@mdx-js/react`, `gray-matter`.
  - UI: `tailwindcss`, `@shadcn/ui` (components: `card`, `typography`, `button`).
- **Config**: A `nextblog.config.js` file with a `postsDir` option.
- **Deployment**: Optimized for Vercel static generation.

## User Flow
1. Install the package: `npm install nextblog`.
2. Configure by creating `nextblog.config.js`:
   ```js
   module.exports = {
     postsDir: 'posts',
   };

    Add .md or .mdx files to the posts/ directory (e.g., hello-world.md with front matter).
    Import and use the component in a Next.js page:
    tsx

    import { NextBlog } from 'nextblog';

    export default function BlogPage() {
      return <NextBlog />;
    }

    Deploy to Vercel with static generation.

Success Criteria

    A developer can install NextBlog, add sample Markdown files, and see a rendered blog with Tailwind + Shadcn/UI styling in under 5 minutes.
    The blog deploys to Vercel with static generation, rendering posts correctly.
    The UI uses Shadcn/UI Card for post previews and Typography for content, styled with Tailwind CSS.

Dependencies

    next
    react
    react-dom
    marked
    @mdx-js/mdx
    @mdx-js/react
    gray-matter
    tailwindcss
    @shadcn/ui

Next Steps

    Follow the implementation tasks in prd.md (Setup and Infrastructure first).
    Test with sample Markdown files in a Next.js app.
    Publish to npm and deploy a demo on Vercel.
