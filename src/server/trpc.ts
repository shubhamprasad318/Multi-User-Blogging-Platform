import { initTRPC, TRPCError } from '@trpc/server';
import { db } from '@/db';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
