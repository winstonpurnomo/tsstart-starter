import { eq } from 'drizzle-orm';
import * as v from 'valibot';
import { db } from '@/db';
import { resource as resourceTable } from '@/db/schema/resource.schema';
import { resource } from '@/models/resource.model';
import { createTRPCRouter, publicProcedure } from '../init';

export const resourceRouter = createTRPCRouter({
  get: publicProcedure
    .input(v.number())
    .output(resource)
    .query(async ({ input }) => {
      const [result] = await db
        .select()
        .from(resourceTable)
        .where(eq(resourceTable.id, input));

      return result;
    }),
});
