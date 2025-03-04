import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className=" text-gray-900">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to NextBlogX</h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-6">
          A modern blog platform built with Next.js, showcasing the latest in web development, 
          design, and technology trends.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No blog posts found. Create your first post in the <code className="font-mono bg-yellow-100 px-1 py-0.5 rounded">src/content/posts</code> directory.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
