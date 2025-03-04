import '../src/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NextBlog Demo',
  description: 'A demo of the NextBlog package for Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
} 