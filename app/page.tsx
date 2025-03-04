import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mt-12 mb-6">Welcome to NextBlog</h1>
      <p className="text-lg mb-8">
        A Next.js package to render Markdown files as blog posts with a clean, modern UI.
      </p>
      <Button asChild>
        <Link href="/blog">View Blog</Link>
      </Button>
    </div>
  );
} 