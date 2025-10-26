'use client';

import { Navigation } from '@/components/Navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/Button';
import { trpc } from '@/lib/trpc/client';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { PenSquare, Trash2, Edit, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  
  const { data: posts, isLoading, error, refetch } = trpc.post.getAll.useQuery({});
  const deleteMutation = trpc.post.delete.useMutation({
    onSuccess: () => {
      refetch();
      setDeletingId(null);
    },
  });
  const updateStatusMutation = trpc.post.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setDeletingId(id);
      deleteMutation.mutate({ id });
    }
  };

  const togglePublished = (id: number, currentStatus: boolean) => {
    updateStatusMutation.mutate({ id, published: !currentStatus });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your blog posts</p>
          </div>
          <Link href="/dashboard/create">
            <Button>
              <PenSquare className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}
        
        {error && (
          <div className="mb-8">
            <ErrorMessage message={error.message} />
            <Button 
              onClick={() => refetch()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        )}

        {posts && posts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500 mb-4">No posts yet. Create your first post!</p>
            <Link href="/dashboard/create">
              <Button>Create Post</Button>
            </Link>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {posts.map((postData: any) => (
                  <tr key={postData.post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{postData.post.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">
                        {postData.post.content ? postData.post.content.substring(0, 100) + '...' : 'No content'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublished(postData.post.id, postData.post.published)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          postData.post.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {postData.post.published ? (
                          <>
                            <Eye className="h-3 w-3 mr-1" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" />
                            Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {postData.categories && postData.categories.length > 0 ? (
                          postData.categories.map((cat: any) => (
                            <span
                              key={cat.id}
                              className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700"
                            >
                              {cat.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">No categories</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(postData.post.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/dashboard/edit/${postData.post.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(postData.post.id)}
                        disabled={deletingId === postData.post.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
