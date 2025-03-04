import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/date-utils';
import type { PostMetadata } from '@/lib/api';

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  // Default cover image if none is provided
  const coverImage = post.coverImage || '/images/default-cover.jpg';
  
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-100">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="text-4xl font-bold text-gray-300">{post.title.charAt(0)}</div>
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
              {post.title}
            </h2>
          </Link>
          <div className="text-sm text-gray-500 mb-3 flex items-center">
            {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
            {post.author && (
              <span className="flex items-center ml-3">
                <span className="mx-1">•</span>
                {post.author.picture ? (
                  <Image
                    src={post.author.picture}
                    alt={post.author.name}
                    width={20}
                    height={20}
                    className="rounded-full mr-1"
                  />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-1 text-xs text-gray-500">
                    {post.author.name.charAt(0)}
                  </span>
                )}
                <span>{post.author.name}</span>
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        </div>
        <div className="mt-auto">
          <Link
            href={`/posts/${post.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
} 