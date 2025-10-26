'use client';

import { Navigation } from '@/components/Navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/Button';
import { trpc } from '@/lib/trpc/client';
import Link from 'next/link';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { useState } from 'react';
import { Clock, Calendar, Tag } from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  
  const { data: posts, isLoading: postsLoading, error: postsError } = trpc.post.getAll.useQuery({
    published: true,
    categoryId: selectedCategory,
  });

  const { data: categories } = trpc.category.getAll.useQuery();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-gray-600">Explore our latest articles and insights</p>
        </div>

        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === undefined
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Posts */}
        {postsLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}
        
        {postsError && (
          <div className="mb-8">
            <ErrorMessage message={postsError.message} />
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        )}
        
        {!postsLoading && !postsError && posts && posts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-500 mb-4">
              {selectedCategory ? 'No posts found in this category.' : 'No posts have been published yet.'}
            </p>
            {selectedCategory && (
              <Button 
                onClick={() => setSelectedCategory(undefined)}
                variant="outline"
              >
                View all posts
              </Button>
            )}
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((postData: any) => (
              <div key={postData.post.id}>
                <Link href={`/blog/${postData.post.slug}`}>
                  <article className="bg-white rounded-lg border hover:shadow-lg transition p-6 h-full flex flex-col">
                    <h2 className="text-2xl font-bold mb-3 hover:text-primary transition">
                      {postData.post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                      {postData.post.content ? postData.post.content.substring(0, 150) + '...' : 'No content available'}
                    </p>

                    {postData.categories && postData.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {postData.categories.map((cat: any) => (
                          <span
                            key={cat.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(postData.post.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {calculateReadingTime(postData.post.content || '')} min
                      </span>
                    </div>
                  </article>
                </Link>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
