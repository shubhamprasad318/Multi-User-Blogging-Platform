import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { posts, postCategories, categories } from '@/db/schema';
import { db } from '@/db';
import { eq, inArray, desc, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { TRPCError } from '@trpc/server';

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().default(false),
  categoryIds: z.array(z.number()).optional(),
});

const updatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  published: z.boolean().optional(),
  categoryIds: z.array(z.number()).optional(),
});

export const postRouter = router({
  create: publicProcedure
    .input(createPostSchema)
    .mutation(async ({ input }) => {
      const slug = slugify(input.title, { lower: true, strict: true });
      
      // Check for duplicate slug
      const existing = await db.select().from(posts).where(eq(posts.slug, slug));
      if (existing.length > 0) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A post with this title already exists',
        });
      }

      const [post] = await db.insert(posts).values({
        title: input.title,
        content: input.content,
        slug,
        published: input.published,
      }).returning();

      // Assign categories if provided
      if (input.categoryIds && input.categoryIds.length > 0) {
        await db.insert(postCategories).values(
          input.categoryIds.map(categoryId => ({
            postId: post.id,
            categoryId,
          }))
        );
      }

      return post;
    }),

  update: publicProcedure
    .input(updatePostSchema)
    .mutation(async ({ input }) => {
      const { id, categoryIds, ...updateData } = input;

      // Update slug if title changed
      if (updateData.title) {
        const slug = slugify(updateData.title, { lower: true, strict: true });
        
        // Check for duplicate slug (excluding current post)
        const existing = await db.select().from(posts)
          .where(sql`${posts.slug} = ${slug} AND ${posts.id} != ${id}`);
        
        if (existing.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'A post with this title already exists',
          });
        }
        
        (updateData as any).slug = slug;
      }

      (updateData as any).updatedAt = new Date();

      const [updatedPost] = await db.update(posts)
        .set(updateData)
        .where(eq(posts.id, id))
        .returning();

      if (!updatedPost) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }

      // Update categories if provided
      if (categoryIds !== undefined) {
        // Remove existing categories
        await db.delete(postCategories).where(eq(postCategories.postId, id));
        
        // Add new categories
        if (categoryIds.length > 0) {
          await db.insert(postCategories).values(
            categoryIds.map(categoryId => ({
              postId: id,
              categoryId,
            }))
          );
        }
      }

      return updatedPost;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const [deleted] = await db.delete(posts)
        .where(eq(posts.id, input.id))
        .returning();

      if (!deleted) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }

      return { success: true };
    }),

  getAll: publicProcedure
    .input(z.object({
      categoryId: z.number().optional(),
      published: z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      let query = db.select({
        post: posts,
        categories: sql`json_agg(json_build_object('id', ${categories.id}, 'name', ${categories.name}, 'slug', ${categories.slug})) FILTER (WHERE ${categories.id} IS NOT NULL)`,
      })
      .from(posts)
      .leftJoin(postCategories, eq(posts.id, postCategories.postId))
      .leftJoin(categories, eq(postCategories.categoryId, categories.id))
      .groupBy(posts.id)
      .orderBy(desc(posts.createdAt));

      if (input?.published !== undefined) {
        query = query.where(eq(posts.published, input.published)) as any;
      }

      const results = await query;

      // Filter by category if specified
      if (input?.categoryId) {
        return results.filter(r => {
          const cats = r.categories as any[];
          return cats && cats.some((c: any) => c && c.id === input.categoryId);
        });
      }

      return results;
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const result = await db.select({
        post: posts,
        categories: sql`json_agg(json_build_object('id', ${categories.id}, 'name', ${categories.name}, 'slug', ${categories.slug})) FILTER (WHERE ${categories.id} IS NOT NULL)`,
      })
      .from(posts)
      .leftJoin(postCategories, eq(posts.id, postCategories.postId))
      .leftJoin(categories, eq(postCategories.categoryId, categories.id))
      .where(eq(posts.slug, input.slug))
      .groupBy(posts.id)
      .limit(1);

      if (result.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }

      return result[0];
    }),


    getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const result = await db.select({
        post: posts,
        categories: sql`json_agg(json_build_object('id', ${categories.id}, 'name', ${categories.name}, 'slug', ${categories.slug})) FILTER (WHERE ${categories.id} IS NOT NULL)`,
      })
      .from(posts)
      .leftJoin(postCategories, eq(posts.id, postCategories.postId))
      .leftJoin(categories, eq(postCategories.categoryId, categories.id))
      .where(eq(posts.id, input.id))
      .groupBy(posts.id)
      .limit(1);

      if (result.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }

      return result[0];
    }),

  updateStatus: publicProcedure
    .input(z.object({
      id: z.number(),
      published: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      const [updated] = await db.update(posts)
        .set({ published: input.published, updatedAt: new Date() })
        .where(eq(posts.id, input.id))
        .returning();

      if (!updated) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }

      return updated;
    }),
});
