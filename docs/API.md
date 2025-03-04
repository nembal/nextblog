# NextBlog API Reference

This document provides detailed information about the NextBlog API.

## Components

### `NextBlog`

The main component that renders a blog index page.

```jsx
import { NextBlog } from 'nextblog';

export default function BlogPage() {
  return <NextBlog path="/blog" />;
}
```

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `path` | `string` | `/blog` | The base path for the blog |

### `BlogPost`

Component to render an individual blog post.

```jsx
import { BlogPost } from 'nextblog';

export default function PostPage({ params }) {
  return <BlogPost slug={params.slug} path="/blog" />;
}
```

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `slug` | `string` | - | The slug of the post to display |
| `path` | `string` | `/blog` | The base path for the blog |

### `NextBlogTag`

Component to render posts filtered by a specific tag.

```jsx
import { NextBlogTag } from 'nextblog';

export default function TagPage({ params }) {
  return <NextBlogTag tag={params.tag} path="/blog" />;
}
```

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `string` | - | The tag to filter by |
| `path` | `string` | `/blog` | The base path for the blog |

## Utility Functions

### `getPosts()`

Get all blog posts.

```jsx
import { getPosts } from 'nextblog';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

#### Returns

`Promise<Post[]>` - Array of post objects with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `slug` | `string` | The post slug |
| `title` | `string` | The post title |
| `date` | `string` | The post date |
| `content` | `string` | The post content |
| `isMdx` | `boolean` | Whether the post is an MDX file |
| `excerpt` | `string` | The post excerpt |
| `tags` | `string[]` | Array of tags |
| `readingTime` | `string` | Estimated reading time |

### `getPostBySlug(slug)`

Get a single post by slug.

```jsx
import { getPostBySlug } from 'nextblog';

const post = await getPostBySlug('hello-world');
```

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `slug` | `string` | The post slug |

#### Returns

`Promise<Post | null>` - Post object or null if not found

### `getAllTags()`

Get all unique tags from all posts.

```jsx
import { getAllTags } from 'nextblog';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}
```

#### Returns

`Promise<string[]>` - Array of unique tags

### `getPostsByTag(tag)`

Get all posts with a specific tag.

```jsx
import { getPostsByTag } from 'nextblog';

const posts = await getPostsByTag('react');
```

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `tag` | `string` | The tag to filter by |

#### Returns

`Promise<Post[]>` - Array of post objects with the specified tag

## Configuration

### `nextblog.config.js`

```js
module.exports = {
  postsDir: 'posts', // Default directory for blog posts
};
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `postsDir` | `string` | `posts` | Directory where blog posts are stored | 