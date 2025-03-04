import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500">© {new Date().getFullYear()} NextBlogX. All rights reserved.</p>
            <p className="text-gray-500">Package made with ❤️ and 🤖</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 