export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  slug: string;
  createdAt: Date;
}

export interface PostWithCategories {
  post: Post;
  categories: Category[];
}

export interface CreatePostInput {
  title: string;
  content: string;
  published: boolean;
  categoryIds?: number[];
}

export interface UpdatePostInput {
  id: number;
  title?: string;
  content?: string;
  published?: boolean;
  categoryIds?: number[];
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export interface UpdateCategoryInput {
  id: number;
  name?: string;
  description?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
}

export interface CategoryFilter {
  id: number;
  name: string;
  slug: string;
  count?: number;
}
