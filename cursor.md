I understand that you need a cursor.md file containing a list of tasks for implementing the NextBlog MVP, based on the PRD.md and nextblog-mvp-rule.mdc files you provided. Since cursor.md is referenced but not included, I’ll create it for you by deriving actionable tasks from the requirements and guidelines in those documents. Below is the complete cursor.md file, structured to guide the development process clearly and comprehensively.
cursor.md
NextBlog MVP Implementation Tasks
This document outlines the tasks required to implement the NextBlog MVP, an npm package for Next.js that renders .md and .mdx files as blog posts with a modern UI styled using Tailwind CSS and Shadcn/UI components. The tasks are based on the requirements in PRD.md and the guidelines in nextblog-mvp-rule.mdc.
Setup and Infrastructure

    Initialize the Project
        Create a new Next.js 13+ project using the App Router (app/ directory).
        Configure TypeScript by setting up tsconfig.json.
        Install core dependencies:
            npm install next react react-dom marked @mdx-js/mdx @mdx-js/react gray-matter
        Install UI dependencies:
            npm install tailwindcss @shadcn/ui
            Initialize Shadcn/UI components: card, typography, button.
        Set up Tailwind CSS with the prose plugin for Markdown styling:
            Run npx tailwindcss init and update tailwind.config.js.
        Initialize package.json for the npm package:
            Set "name": "nextblog", "license": "MIT", and "version": "0.1.0".
    Define File Structure
        Create the following structure:
            nextblog.config.js: Configuration file with a postsDir option.
            src/: Source directory.
                src/utils/: For utility functions (e.g., posts.ts).
                src/components/: For reusable components (e.g., BlogIndex.tsx, BlogPost.tsx).
            app/: Test app directory.
                app/blog/: Blog index page.
                app/blog/[slug]/: Individual post pages.
            posts/: Default directory for Markdown files (for testing).
    Implement Configuration File
        Create nextblog.config.js:
        js

        module.exports = {
          postsDir: 'posts', // Default directory, overrideable by user
        };

        Ensure it’s optional; use /posts if no config is provided.

Markdown Detection and Rendering

    Implement Markdown File Detection
        Create src/utils/posts.ts with a getPosts function:
            Read .md and .mdx files from postsDir using fs (Node.js file system module).
            Use gray-matter to extract front matter (title, date).
            Fallback to filename for slug if no front matter is present.
            Sort posts by file modification time (newest first using fs.stat).
            Define TypeScript interface:
            ts

            interface Post {
              slug: string;
              title: string;
              date: string;
              content: string;
            }

        Example:
        ts

        import fs from 'fs/promises';
        import path from 'path';
        import matter from 'gray-matter';

        export async function getPosts(): Promise<Post[]> {
          const postsDir = path.join(process.cwd(), 'posts');
          const files = await fs.readdir(postsDir);
          const posts = await Promise.all(
            files
              .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
              .map(async (file) => {
                const filePath = path.join(postsDir, file);
                const content = await fs.readFile(filePath, 'utf-8');
                const { data, content: markdown } = matter(content);
                const stats = await fs.stat(filePath);
                return {
                  slug: data.slug || file.replace(/\.(md|mdx)$/, ''),
                  title: data.title || file.replace(/\.(md|mdx)$/, ''),
                  date: data.date || stats.mtime.toISOString().split('T')[0],
                  content: markdown,
                };
              })
          );
          return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

    Render Markdown Content
        In src/utils/posts.ts, add a getPostBySlug function:
            Parse .md files with marked:
            ts

            import { marked } from 'marked';
            const htmlContent = marked(markdownContent);

            Parse .mdx files with @mdx-js/mdx (for JSX support).
            Return post data as { slug, title, date, content: htmlContent }.
        Example:
        ts

        export async function getPostBySlug(slug: string): Promise<Post> {
          const postsDir = path.join(process.cwd(), 'posts');
          const filePath = path.join(postsDir, `${slug}.md`) || path.join(postsDir, `${slug}.mdx`);
          const content = await fs.readFile(filePath, 'utf-8');
          const { data, content: markdown } = matter(content);
          const stats = await fs.stat(filePath);
          const htmlContent = marked(markdown);
          return {
            slug,
            title: data.title || slug,
            date: data.date || stats.mtime.toISOString().split('T')[0],
            content: htmlContent,
          };
        }

User Interface

    Create Blog Index Page
        Implement app/blog/page.tsx:
            Fetch posts with getPosts.
            Use Shadcn/UI Card for post previews.
            Style with Tailwind CSS.
        Example:
        tsx

        import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
        import { getPosts } from "@/utils/posts";

        export default async function BlogIndex() {
          const posts = await getPosts();
          return (
            <div className="max-w-2xl mx-auto p-4">
              <h1 className="text-3xl font-bold mb-6">Blog</h1>
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.slug}>
                    <CardHeader>
                      <CardTitle>
                        <a href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                          {post.title}
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{post.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        }

    Create Individual Post Page
        Implement app/blog/[slug]/page.tsx:
            Use generateStaticParams for static routes.
            Fetch post with getPostBySlug.
            Use Shadcn/UI Typography for Markdown content.
        Example:
        tsx

        import { Typography } from "@/components/ui/typography";
        import { getPostBySlug, getPosts } from "@/utils/posts";

        export async function generateStaticParams() {
          const posts = await getPosts();
          return posts.map((post) => ({ slug: post.slug }));
        }

        export default async function BlogPost({ params }: { params: { slug: string } }) {
          const post = await getPostBySlug(params.slug);
          return (
            <div className="max-w-2xl mx-auto p-4 prose">
              <Typography variant="h1">{post.title}</Typography>
              <Typography variant="muted">{post.date}</Typography>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          );
        }

Routing

    Set Up Dynamic Routing
        Ensure /blog serves the index page (app/blog/page.tsx).
        Ensure /blog/[slug] serves individual posts using dynamic routes.
        Use generateStaticParams to pre-generate routes at build time.

Deployment and Testing

    Test with Sample Markdown Files
        Create posts/ directory.
        Add a sample file, e.g., posts/hello-world.md:
        ```md
        title: "Hello World"
        date: "2025-03-03"
        This is my first blog post!

        Run the app locally (npm run dev) and verify:
            Index page lists the post.
            Post page renders the content.
    Package and Publish
        Update package.json:
            Set "main": "dist/index.js".
            Add "build": "tsc" script.
            List files in "files": ["dist/", "nextblog.config.js"].
        Compile TypeScript: npm run build.
        Publish to npm: npm publish.
        Test in a new Next.js app and deploy to Vercel.
    Verify Success Criteria
        Confirm setup takes under 5 minutes.
        Verify Vercel deployment with static generation.
        Check UI uses Card for previews and Typography for content.

Documentation

    Write Basic README
        Create README.md:
        md

        # NextBlog
        An npm package for Next.js to render `.md` and `.mdx` files as blog posts.

        ## Installation
        ```bash
        npm install nextblog

        Setup
            Create nextblog.config.js:
            js

            module.exports = { postsDir: 'posts' };

            Add Markdown files to posts/.
        Usage
        tsx

        import { NextBlog } from 'nextblog';
        export default function BlogPage() {
          return <NextBlog />;
        }

        Deployment
        Deploy to Vercel with vercel --prod.
        ```

Notes

    These tasks align with PRD.md’s functional (Markdown rendering, UI, routing) and technical (Next.js, TypeScript, Vercel) requirements.
    They follow nextblog-mvp-rule.mdc guidelines: App Router, TypeScript types, Tailwind + Shadcn/UI, minimal dependencies, and simplicity.
    Code examples ensure clarity and adherence to the provided BlogIndex example.

This cursor.md provides a step-by-step roadmap to build the NextBlog MVP. Let me know if you need adjustments!