import { initTRPC } from '@trpc/server';
import type { Session, User } from 'better-auth';
import superjson from 'superjson';

interface Context {
  authData: AuthData | null;
}

export interface AuthData {
  session: Session | null;
  user: User | null;
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(({ ctx, next }) => {
  // biome-ignore lint/complexity/useOptionalChain: ignore
  if (!(ctx.authData && ctx.authData.session && ctx.authData.user)) {
    throw new Error('Not authenticated');
  }
  return next({
    ctx: {
      ...ctx,
      authData: ctx.authData,
    },
  });
});
