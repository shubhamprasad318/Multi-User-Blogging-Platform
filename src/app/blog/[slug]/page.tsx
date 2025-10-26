import { Navigation } from '@/components/Navigation';
import { BlogPostClient } from './BlogPostClient';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  // This is a simplified version - in a real app, you'd fetch the post data here
  // For now, we'll return basic metadata
  return {
    title: 'Blog Post | BlogHub',
    description: 'Read our latest blog post on BlogHub',
    openGraph: {
      title: 'Blog Post | BlogHub',
      description: 'Read our latest blog post on BlogHub',
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <BlogPostClient params={params} />
    </div>
  );
}
