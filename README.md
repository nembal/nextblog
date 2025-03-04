# NextBlogX

A modern blog platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📝 Markdown-based content management
- 🎨 Responsive design with Tailwind CSS
- 🚀 Fast page loads with Next.js App Router
- 🔍 SEO-friendly with metadata optimization
- 📱 Mobile-first approach
- 🖋 Typography-focused reading experience

## Installation

### Option 1: Use as an npm package

```bash
npm install nextblogx
# or
yarn add nextblogx
```

After installation, you can create a new Next.js project with NextBlogX:

```bash
npx create-next-app my-blog --example https://github.com/nembal/nextblogx
```

### Option 2: Clone the repository

1. Clone the repository:

```bash
git clone https://github.com/nembal/nextblogx.git
cd nextblogx
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Creating Blog Posts

To create a new blog post, add a Markdown file to the `src/content/posts` directory. Each post should have a `.md` extension and include frontmatter metadata at the top of the file.

### Frontmatter Format

```yaml
---
title: "Your Post Title"
date: "2023-05-15T09:35:07.322Z"
excerpt: "A brief summary of your post"
coverImage: "/images/posts/your-image.jpg" # Optional
author:
  name: "Your Name"
  picture: "/images/authors/your-picture.jpg" # Optional
tags: # Optional
  - tag1
  - tag2
---
```

## Project Structure

```
nextblogx/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── content/        # Blog content
│   │   └── posts/      # Markdown blog posts
│   └── lib/            # Utility functions
├── tailwind.config.ts  # Tailwind CSS configuration
├── next.config.ts      # Next.js configuration
└── package.json        # Project dependencies
```

## API Documentation

For detailed API documentation and information on how to extend NextBlogX, see the [API.md](API.md) file.

## Customization

### Styling

This project uses Tailwind CSS for styling. You can customize the design by modifying the `tailwind.config.ts` file.

### Components

The main components are located in the `src/components` directory. You can modify these components to change the layout and appearance of the blog.

### Metadata

Update the site metadata in the `src/app/layout.tsx` file to change the site title, description, and other metadata.

## Deployment

This is a Next.js project, so it can be easily deployed to platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [remark](https://github.com/remarkjs/remark)
