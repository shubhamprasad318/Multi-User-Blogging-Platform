'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { trpc } from '@/lib/trpc/client';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { use } from 'react';

export function BlogPostClient({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { data: postData, isLoading, error } = trpc.post.getBySlug.useQuery({ 
    slug: resolvedParams.slug 
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !postData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorMessage message="Post not found" />
        <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
          ← Back to blog
        </Link>
      </div>
    );
  }

  const post = postData.post;
  const categories = postData.categories as any[];

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-primary hover:underline mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to blog
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {calculateReadingTime(post.content)} min read
          </span>
        </div>

        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.filter(c => c).map((category: any) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
              >
                <Tag className="h-3 w-3 mr-1" />
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="bg-white rounded-lg border p-8 md:p-12">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all posts
        </Link>
      </div>
    </article>
  );
}
