import { getAllPosts, getPostBySlug } from '@/lib/api';
import { formatDate } from '@/lib/date-utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const slug = params.slug;
  
  try {
    const { metadata } = await getPostBySlug(slug);
    return {
      title: `${metadata.title} | NextBlogX`,
      description: metadata.excerpt,
    };
  } catch (error) {
    return {
      title: 'Post Not Found | NextBlogX',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function Post({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const slug = params.slug;
  
  try {
    const { content, metadata } = await getPostBySlug(slug);

    return (
      <article className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-flex items-center group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all posts
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {metadata.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-6">{metadata.title}</h1>
          <div className="flex items-center text-gray-600 mb-8">
            <time dateTime={metadata.date} className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(metadata.date)}
            </time>
            {metadata.author && (
              <div className="flex items-center ml-6">
                <span className="mx-2">•</span>
                {metadata.author.picture ? (
                  <Image
                    src={metadata.author.picture}
                    alt={metadata.author.name}
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-sm text-gray-500">
                    {metadata.author.name.charAt(0)}
                  </span>
                )}
                <span>{metadata.author.name}</span>
              </div>
            )}
          </div>
          {metadata.coverImage && (
            <div className="relative h-96 w-full mb-10">
              <Image
                src={metadata.coverImage}
                alt={metadata.title}
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          <p className="text-xl text-gray-600 leading-relaxed">{metadata.excerpt}</p>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {metadata.tags && metadata.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Related Topics</h2>
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>
    );
  } catch (error) {
    notFound();
  }
} 