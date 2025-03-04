---
title: "Getting Started with NextBlogX"
date: "2023-05-15T09:35:07.322Z"
excerpt: "Learn how to create and manage content on your NextBlogX platform"
author:
  name: "NextBlogX Team"
tags:
  - nextjs
  - markdown
  - tutorial
---

# Getting Started with NextBlogX

Welcome to NextBlogX! This guide will help you understand how to create and manage content on your new blog platform.

## Creating New Posts

To create a new blog post, simply add a Markdown file to the `src/content/posts` directory. Each post should have a `.md` extension and include frontmatter metadata at the top of the file.

### Frontmatter Format

The frontmatter is a YAML block at the beginning of your Markdown file, enclosed by triple dashes (`---`). It contains metadata about your post:

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

## Markdown Formatting

NextBlogX supports standard Markdown syntax for formatting your content:

### Headers

```markdown
# H1 Header
## H2 Header
### H3 Header
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
```

### Lists

```markdown
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2
```

### Links and Images

```markdown
[Link text](https://example.com)
![Alt text](/path/to/image.jpg)
```

### Code Blocks

````markdown
```javascript
function hello() {
  console.log("Hello, world!");
}
```
````

## Deploying Your Blog

NextBlogX is built with Next.js, which means it can be easily deployed to platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.

To deploy to Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings

## Customizing Your Blog

You can customize various aspects of your blog:

- Edit the header and footer components in `src/components/`
- Modify the styling using Tailwind CSS classes
- Update site metadata in the layout files

## Conclusion

NextBlogX provides a simple yet powerful platform for your blogging needs. With Markdown support and a clean, responsive design, you can focus on creating great content while providing an excellent experience for your readers.

Happy blogging! 