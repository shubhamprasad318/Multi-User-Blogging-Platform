'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/Button';
import { PenSquare, Home, BookOpen, LayoutDashboard } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <PenSquare className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">BlogHub</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className={`flex items-center space-x-2 ${pathname === '/' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link href="/blog" className={`flex items-center space-x-2 ${pathname?.startsWith('/blog') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </Link>
            
            <Link href="/dashboard" className={`flex items-center space-x-2 ${pathname?.startsWith('/dashboard') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <Link href="/dashboard/create">
              <Button size="sm">
                <PenSquare className="h-4 w-4 mr-2" />
                Write
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
