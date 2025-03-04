# NextBlog Basic Example

This is a basic example of how to use NextBlog in a Next.js application.

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000/blog](http://localhost:3000/blog) in your browser to see the result.

## Project Structure

- `app/blog/page.tsx`: The blog index page
- `app/blog/[slug]/page.tsx`: The individual blog post page
- `app/blog/tags/[tag]/page.tsx`: The tag page for filtering posts by tag
- `nextblog.config.js`: Configuration file for NextBlog
- `posts/`: Directory containing Markdown and MDX files

## Learn More

To learn more about NextBlog, check out the [NextBlog documentation](https://github.com/yourusername/nextblog). 