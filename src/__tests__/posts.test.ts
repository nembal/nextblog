import { getPosts, getPostBySlug } from '../utils/posts';

// Mock the MDX modules
jest.mock('@mdx-js/mdx', () => ({
  compile: jest.fn().mockResolvedValue('Compiled MDX content'),
  evaluate: jest.fn(),
}));

// Mock React
jest.mock('react', () => ({
  default: {},
}));

// Mock React JSX Runtime
jest.mock('react/jsx-runtime', () => ({
  jsx: jest.fn(),
  jsxs: jest.fn(),
}));

// Mock the fs module
jest.mock('fs/promises', () => ({
  readdir: jest.fn().mockResolvedValue(['hello-world.md', 'using-mdx.mdx']),
  readFile: jest.fn().mockImplementation((path: string) => {
    if (path.includes('hello-world.md')) {
      return Promise.resolve(`---
title: "Hello World"
date: "2025-03-03"
---

# Hello World!

This is a test post.`);
    } else if (path.includes('using-mdx.mdx')) {
      return Promise.resolve(`---
title: "Using MDX with NextBlog"
date: "2025-03-04"
---

# MDX Support in NextBlog

This is a sample MDX file.`);
    }
    return Promise.reject(new Error('File not found'));
  }),
  stat: jest.fn().mockResolvedValue({
    mtime: new Date('2025-03-03'),
  }),
  access: jest.fn().mockImplementation((path: string) => {
    if (path.includes('hello-world.md') || path.includes('using-mdx.mdx')) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('File not found'));
  }),
}));

// Mock path module
jest.mock('path', () => ({
  join: jest.fn().mockImplementation((...args: string[]) => args.join('/')),
}));

// Mock process.cwd()
jest.mock('process', () => ({
  cwd: jest.fn().mockReturnValue('/test'),
}));

// Mock marked
jest.mock('marked', () => ({
  marked: jest.fn().mockReturnValue('<h1>Marked content</h1>'),
}));

// Mock gray-matter
jest.mock('gray-matter', () => {
  return jest.fn().mockImplementation((content: string) => {
    if (content.includes('Hello World')) {
      return {
        data: {
          title: 'Hello World',
          date: '2025-03-03',
        },
        content: '# Hello World!\n\nThis is a test post.',
      };
    } else if (content.includes('MDX Support')) {
      return {
        data: {
          title: 'Using MDX with NextBlog',
          date: '2025-03-04',
        },
        content: '# MDX Support in NextBlog\n\nThis is a sample MDX file.',
      };
    }
    return {
      data: {},
      content: '',
    };
  });
});

describe('Posts Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      const posts = await getPosts();
      
      expect(posts).toHaveLength(2);
      expect(posts[0].title).toBe('Using MDX with NextBlog');
      expect(posts[0].slug).toBe('using-mdx');
      expect(posts[0].date).toBe('2025-03-04');
      expect(posts[0].isMdx).toBe(true);
      
      expect(posts[1].title).toBe('Hello World');
      expect(posts[1].slug).toBe('hello-world');
      expect(posts[1].date).toBe('2025-03-03');
      expect(posts[1].isMdx).toBe(false);
    });
  });

  describe('getPostBySlug', () => {
    it('should return a post by slug for Markdown files', async () => {
      const post = await getPostBySlug('hello-world');
      
      expect(post).not.toBeNull();
      expect(post?.title).toBe('Hello World');
      expect(post?.slug).toBe('hello-world');
      expect(post?.date).toBe('2025-03-03');
      expect(post?.isMdx).toBe(false);
    });

    it('should return a post by slug for MDX files', async () => {
      const post = await getPostBySlug('using-mdx');
      
      expect(post).not.toBeNull();
      expect(post?.title).toBe('Using MDX with NextBlog');
      expect(post?.slug).toBe('using-mdx');
      expect(post?.date).toBe('2025-03-04');
      expect(post?.isMdx).toBe(true);
    });

    it('should return null for non-existent slugs', async () => {
      const post = await getPostBySlug('non-existent');
      
      expect(post).toBeNull();
    });
  });
}); 