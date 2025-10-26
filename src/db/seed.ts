import { config } from 'dotenv';
import { db } from './index';
import { posts, categories, postCategories } from './schema';

// Load .env.local explicitly
config({ path: '.env.local' });

async function seed() {
  console.log('🌱 Seeding database...');
  console.log('Using DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');

  try {
    // Create categories
    console.log('Creating categories...');
    const [tech, lifestyle, travel, design, business] = await db.insert(categories).values([
      { 
        name: 'Technology', 
        description: 'Latest tech news, tutorials, and insights', 
        slug: 'technology' 
      },
      { 
        name: 'Lifestyle', 
        description: 'Tips and tricks for better living', 
        slug: 'lifestyle' 
      },
      { 
        name: 'Travel', 
        description: 'Travel guides and adventure stories', 
        slug: 'travel' 
      },
      { 
        name: 'Design', 
        description: 'UI/UX design principles and trends', 
        slug: 'design' 
      },
      { 
        name: 'Business', 
        description: 'Business strategies and entrepreneurship', 
        slug: 'business' 
      },
    ]).returning();

    // Create sample posts
    console.log('Creating posts...');
    const [post1, post2, post3, post4, post5] = await db.insert(posts).values([
      {
        title: 'Getting Started with Next.js 15',
        content: `# Introduction to Next.js 15

Next.js 15 brings exciting new features that make building full-stack applications easier than ever. In this comprehensive guide, we'll explore the latest additions to the framework.

## What's New in Next.js 15

### App Router Enhancements
The App Router continues to evolve with improved performance and developer experience.

### Performance Improvements
Next.js 15 introduces several performance optimizations including faster builds and improved caching.

## Getting Started

Start building amazing applications today!`,
        slug: 'getting-started-with-nextjs-15',
        published: true,
      },
      {
        title: 'The Future of Web Development',
        content: `# The Future of Web Development

The web development landscape is evolving rapidly. Let's explore the trends shaping our industry.

## Key Trends for 2025

### AI Integration
Artificial Intelligence is becoming integral to web development.

### Edge Computing
Moving computation closer to users for better performance.

## Conclusion

The future is bright for web developers!`,
        slug: 'future-of-web-development',
        published: true,
      },
      {
        title: 'Mastering tRPC for Type-Safe APIs',
        content: `# Mastering tRPC for Type-Safe APIs

tRPC enables building fully type-safe APIs without code generation.

## Why tRPC?

Traditional REST APIs require manual type definitions and documentation. tRPC solves all of these problems.

## Best Practices

1. Use Zod for validation
2. Organize routers by domain
3. Leverage middleware for auth

tRPC is a game-changer!`,
        slug: 'mastering-trpc-type-safe-apis',
        published: true,
      },
      {
        title: '10 UI/UX Design Principles',
        content: `# 10 Essential UI/UX Design Principles

Great design is invisible. Here are 10 principles that will elevate your designs.

## 1. Clarity
Make your interface obvious and easy to understand.

## 2. Consistency
Use consistent patterns throughout your application.

## 3. Feedback
Provide immediate feedback for user actions.

Remember: Good design serves the user!`,
        slug: '10-ui-ux-design-principles',
        published: false,
      },
      {
        title: 'Building a Successful SaaS Product',
        content: `# Building a Successful SaaS Product

Launching a SaaS product requires more than just good code.

## Market Research

Identify the problem and validate demand.

## MVP Strategy

Build the minimum viable product and iterate.

## Conclusion

Success comes from solving real problems for real people!`,
        slug: 'building-successful-saas-product',
        published: true,
      },
    ]).returning();

    // Assign categories to posts
    console.log('Assigning categories to posts...');
    await db.insert(postCategories).values([
      { postId: post1.id, categoryId: tech.id },
      { postId: post2.id, categoryId: tech.id },
      { postId: post2.id, categoryId: business.id },
      { postId: post3.id, categoryId: tech.id },
      { postId: post4.id, categoryId: design.id },
      { postId: post5.id, categoryId: business.id },
      { postId: post5.id, categoryId: tech.id },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`
Created:
- 5 categories
- 5 blog posts (4 published, 1 draft)
- Multiple category assignments
    `);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
