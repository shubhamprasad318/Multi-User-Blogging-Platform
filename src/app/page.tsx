import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/Button';
import { BookOpen, PenTool, Users, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Share Your Stories with the World
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern blogging platform built with Next.js 15, tRPC, and PostgreSQL. 
            Create, manage, and publish your content effortlessly.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/blog">
              <Button size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Read Blog
              </Button>
            </Link>
            <Link href="/dashboard/create">
              <Button size="lg" variant="outline">
                <PenTool className="mr-2 h-5 w-5" />
                Start Writing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BlogHub?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border bg-white hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Built with Next.js 15 and edge computing for blazing fast performance.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border bg-white hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PenTool className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Intuitive markdown editor with live preview and category management.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border bg-white hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Type-Safe</h3>
              <p className="text-gray-600">
                End-to-end type safety with tRPC ensures robust, error-free development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built with Next.js 15, tRPC, Drizzle ORM, and PostgreSQL
          </p>
          <p className="text-gray-500 mt-2">
            © 2025 BlogHub. Full-Stack Technical Assessment.
          </p>
        </div>
      </footer>
    </div>
  );
}
