# BlogHub - Modern Blogging Platform

A full-stack blogging platform built with Next.js 15, tRPC, Drizzle ORM, and PostgreSQL. Features a modern UI with markdown editing, category management, and responsive design.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, tRPC, Drizzle ORM
- **Database**: PostgreSQL with type-safe queries
- **UI Components**: Custom UI components built with Radix UI and Tailwind CSS
- **Markdown Editor**: Live preview markdown editor for blog posts
- **Category Management**: Create and manage blog categories
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: End-to-end type safety with tRPC and TypeScript
- **SEO Optimized**: Proper metadata and SEO optimization

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 app directory
│   ├── api/trpc/          # tRPC API routes
│   ├── blog/              # Blog pages
│   │   ├── [slug]/        # Individual blog post pages
│   │   └── page.tsx       # Blog listing page
│   ├── dashboard/         # Admin dashboard
│   │   ├── categories/    # Category management
│   │   ├── create/        # Create new post
│   │   ├── edit/[id]/     # Edit existing post
│   │   └── page.tsx       # Dashboard overview
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Dialog.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   └── Badge.tsx
│   ├── ErrorBoundary.tsx
│   ├── ErrorMessage.tsx
│   ├── LoadingSpinner.tsx
│   ├── MarkdownEditor.tsx
│   └── Navigation.tsx
├── db/                   # Database configuration
│   ├── index.ts          # Database connection
│   ├── schema.ts         # Database schema
│   └── seed.ts           # Database seeding
├── lib/                  # Utility libraries
│   ├── trpc/            # tRPC configuration
│   │   ├── client.ts    # tRPC client
│   │   └── Provider.tsx # tRPC provider
│   └── utils.ts         # Utility functions
├── server/              # Server-side code
│   ├── routers/         # tRPC routers
│   │   ├── _app.ts      # Main app router
│   │   ├── category.ts  # Category router
│   │   └── post.ts      # Post router
│   └── trpc.ts          # tRPC configuration
├── store/               # State management
│   └── useEditorStore.ts
└── types/               # TypeScript type definitions
    └── index.ts
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **API**: tRPC for type-safe APIs
- **State Management**: Zustand
- **Markdown**: React Markdown with GFM support
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogging-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/blogging_platform"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate database migrations
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Drizzle Studio

## 🗄️ Database Schema

### Posts Table
- `id` - Primary key
- `title` - Post title
- `content` - Post content (Markdown)
- `slug` - URL-friendly slug
- `published` - Publication status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Categories Table
- `id` - Primary key
- `name` - Category name
- `description` - Category description
- `slug` - URL-friendly slug
- `createdAt` - Creation timestamp

### Post Categories Table (Junction)
- `postId` - Foreign key to posts
- `categoryId` - Foreign key to categories

## 🎨 UI Components

The project includes a comprehensive set of reusable UI components:

- **Button** - Various button variants and sizes
- **Card** - Content containers with header, content, and footer
- **Dialog** - Modal dialogs for forms and confirmations
- **Input** - Form input fields
- **Label** - Form labels
- **Select** - Dropdown select components
- **Textarea** - Multi-line text input
- **Badge** - Status and category badges

## 🔧 Key Features

### Blog Management
- Create, edit, and delete blog posts
- Markdown editor with live preview
- Category assignment and filtering
- Publication status management
- SEO-optimized URLs with slugs

### Category Management
- Create and manage blog categories
- Category-based post filtering
- Category descriptions and metadata

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### Type Safety
- End-to-end TypeScript
- tRPC for type-safe API calls
- Drizzle ORM for type-safe database queries
- Comprehensive type definitions

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- tRPC for type-safe APIs
- Drizzle team for the excellent ORM
- Radix UI for accessible components
- Tailwind CSS for utility-first styling