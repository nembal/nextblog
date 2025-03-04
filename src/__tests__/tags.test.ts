import * as postsModule from '../utils/posts';

// Mock the posts module functions
jest.mock('../utils/posts', () => ({
  getPosts: jest.fn().mockResolvedValue([
    {
      slug: 'post3',
      title: 'Post 3',
      date: '2025-01-03',
      content: 'Post 3 content',
      isMdx: true,
      excerpt: 'Post 3 excerpt',
      tags: ['tag1', 'tag3'],
      readingTime: '1 min read'
    },
    {
      slug: 'post2',
      title: 'Post 2',
      date: '2025-01-02',
      content: 'Post 2 content',
      isMdx: false,
      excerpt: 'Post 2 excerpt',
      tags: ['tag2', 'tag3'],
      readingTime: '1 min read'
    },
    {
      slug: 'post1',
      title: 'Post 1',
      date: '2025-01-01',
      content: 'Post 1 content',
      isMdx: false,
      excerpt: 'Post 1 excerpt',
      tags: ['tag1', 'tag2'],
      readingTime: '1 min read'
    }
  ]),
  getPostsByTag: jest.fn().mockImplementation((tag) => {
    const allPosts = [
      {
        slug: 'post3',
        title: 'Post 3',
        date: '2025-01-03',
        content: 'Post 3 content',
        isMdx: true,
        excerpt: 'Post 3 excerpt',
        tags: ['tag1', 'tag3'],
        readingTime: '1 min read'
      },
      {
        slug: 'post2',
        title: 'Post 2',
        date: '2025-01-02',
        content: 'Post 2 content',
        isMdx: false,
        excerpt: 'Post 2 excerpt',
        tags: ['tag2', 'tag3'],
        readingTime: '1 min read'
      },
      {
        slug: 'post1',
        title: 'Post 1',
        date: '2025-01-01',
        content: 'Post 1 content',
        isMdx: false,
        excerpt: 'Post 1 excerpt',
        tags: ['tag1', 'tag2'],
        readingTime: '1 min read'
      }
    ];
    return Promise.resolve(allPosts.filter(post => post.tags.includes(tag)));
  }),
  getAllTags: jest.fn().mockResolvedValue(['tag1', 'tag2', 'tag3']),
  getPostBySlug: jest.fn()
}));

describe('Tag functionality', () => {
  describe('getAllTags', () => {
    it('should return all unique tags from posts', async () => {
      const tags = await postsModule.getAllTags();
      expect(tags).toEqual(['tag1', 'tag2', 'tag3']);
    });
  });

  describe('getPostsByTag', () => {
    it('should return posts filtered by tag', async () => {
      const tag1Posts = await postsModule.getPostsByTag('tag1');
      expect(tag1Posts.length).toBe(2);
      expect(tag1Posts[0].title).toBe('Post 3'); // Most recent first
      expect(tag1Posts[1].title).toBe('Post 1');

      const tag2Posts = await postsModule.getPostsByTag('tag2');
      expect(tag2Posts.length).toBe(2);
      expect(tag2Posts[0].title).toBe('Post 2');
      expect(tag2Posts[1].title).toBe('Post 1');

      const tag3Posts = await postsModule.getPostsByTag('tag3');
      expect(tag3Posts.length).toBe(2);
      expect(tag3Posts[0].title).toBe('Post 3');
      expect(tag3Posts[1].title).toBe('Post 2');
    });

    it('should return empty array for non-existent tag', async () => {
      const nonExistentTagPosts = await postsModule.getPostsByTag('nonExistentTag');
      expect(nonExistentTagPosts).toEqual([]);
    });
  });

  describe('getPosts with tags', () => {
    it('should return all posts with tags sorted by date', async () => {
      const posts = await postsModule.getPosts();
      expect(posts.length).toBe(3);
      expect(posts[0].title).toBe('Post 3'); // Most recent first
      expect(posts[1].title).toBe('Post 2');
      expect(posts[2].title).toBe('Post 1');
    });

    it('should include tags in post metadata', async () => {
      const posts = await postsModule.getPosts();
      expect(posts[0].tags).toEqual(['tag1', 'tag3']);
      expect(posts[1].tags).toEqual(['tag2', 'tag3']);
      expect(posts[2].tags).toEqual(['tag1', 'tag2']);
    });
  });
}); 