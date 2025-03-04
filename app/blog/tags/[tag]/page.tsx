import { NextBlogTag } from '../../../../src/index';
import { getAllTags } from '../../../../src/utils/posts';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  return <NextBlogTag tag={params.tag} />;
} 