import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { categories } from '@/db/schema';
import { db } from '@/db';
import { eq, sql, and } from 'drizzle-orm';
import slugify from 'slugify';
import { TRPCError } from '@trpc/server';

const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().optional(),
});

const updateCategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
});

export const categoryRouter = router({
  create: publicProcedure
    .input(createCategorySchema)
    .mutation(async ({ input }) => {
      const slug = slugify(input.name, { lower: true, strict: true });
      
      const existing = await db.select().from(categories).where(eq(categories.slug, slug));
      if (existing.length > 0) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A category with this name already exists',
        });
      }

      const [category] = await db.insert(categories).values({
        name: input.name,
        description: input.description,
        slug,
      }).returning();

      return category;
    }),

  update: publicProcedure
    .input(updateCategorySchema)
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      if (updateData.name) {
        const slug = slugify(updateData.name, { lower: true, strict: true });
        const existing = await db.select().from(categories)
          .where(sql`${categories.slug} = ${slug} AND ${categories.id} != ${id}`);
        
        if (existing.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'A category with this name already exists',
          });
        }
        
        (updateData as any).slug = slug;
      }

      const [updated] = await db.update(categories)
        .set(updateData)
        .where(eq(categories.id, id))
        .returning();

      if (!updated) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      return updated;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const [deleted] = await db.delete(categories)
        .where(eq(categories.id, input.id))
        .returning();

      if (!deleted) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      return { success: true };
    }),

  getAll: publicProcedure.query(async () => {
    return await db.select().from(categories);
  }),
});
