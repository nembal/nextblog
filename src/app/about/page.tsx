import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About | NextBlogX',
  description: 'Learn more about NextBlogX, a modern blog platform built with Next.js',
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About NextBlogX</h1>
      
      <div className="prose prose-lg max-w-none">
        <p>
          NextBlogX is a modern blog platform built with Next.js, showcasing the latest in web development, 
          design, and technology trends. This platform demonstrates the power and flexibility of Next.js 
          for building content-focused websites.
        </p>
        
        <h2>Features</h2>
        <ul>
          <li>Markdown-based content management</li>
          <li>Responsive design with Tailwind CSS</li>
          <li>Fast page loads with Next.js App Router</li>
          <li>SEO-friendly with metadata optimization</li>
          <li>Typography-focused reading experience</li>
        </ul>
        
        <h2>Technology Stack</h2>
        <p>
          This blog is built with the following technologies:
        </p>
        <ul>
          <li>Next.js 15 with App Router</li>
          <li>TypeScript for type safety</li>
          <li>Tailwind CSS for styling</li>
          <li>Markdown processing with gray-matter and remark</li>
        </ul>
        
        <h2>Get Started</h2>
        <p>
          To create your own blog posts, simply add Markdown files to the <code>src/content/posts</code> directory.
          Each post should include frontmatter with metadata like title, date, excerpt, and optional tags.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg my-8">
          <h3 className="text-xl font-semibold mb-4">Example Post Frontmatter</h3>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
            {`---
title: "Getting Started with Next.js"
date: "2023-04-15T05:35:07.322Z"
excerpt: "Learn how to build modern web applications with Next.js"
coverImage: "/images/posts/nextjs.jpg"
author:
  name: "Jane Doe"
tags:
  - nextjs
  - react
  - tutorial
---`}
          </pre>
        </div>
      </div>
      
      <div className="mt-12">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
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
          Back to Home
        </Link>
      </div>
    </div>
  );
} 