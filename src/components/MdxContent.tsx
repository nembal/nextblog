"use client";

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Typography } from './ui/typography';

// MDX components mapping
const components = {
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <Typography variant="h2" {...props} />,
  h3: (props: any) => <Typography variant="h3" {...props} />,
  h4: (props: any) => <Typography variant="h4" {...props} />,
  p: (props: any) => <Typography variant="p" {...props} />,
  blockquote: (props: any) => <Typography variant="blockquote" {...props} />,
  ul: (props: any) => <Typography variant="list" {...props} />,
};

interface MdxContentProps {
  content: string;
}

/**
 * Client component for rendering MDX content
 * This is a client component because it uses MDXProvider which requires client-side React context
 */
export function MdxContent({ content }: MdxContentProps) {
  return (
    <MDXProvider components={components}>
      <div className="mt-6">
        {/* In a real implementation, we would render the MDX component here */}
        {/* For the MVP, we'll just use dangerouslySetInnerHTML */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </MDXProvider>
  );
} 