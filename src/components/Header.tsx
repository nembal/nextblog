import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-6 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-400 hover:text-gray-300 transition-colors">
          NextBlogX
        </Link>
        <nav className="flex space-x-6">
          <Link href="/" className="text-gray-400 hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-400 hover:text-gray-300 transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
} 