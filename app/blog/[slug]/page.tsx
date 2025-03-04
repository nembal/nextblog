import { NextBlogPost } from '../../../src/index';
import { getPosts } from '../../../src/utils/posts';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <NextBlogPost slug={params.slug} />;
} 