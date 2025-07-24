import { createServerFileRoute } from '@tanstack/react-start/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { rootRouter } from '@/rpc/router';
import { getSession } from '@/server/get-session';

const trpcFetchHandler = ({ request }: { request: Request }) =>
  fetchRequestHandler({
    endpoint: '/api/rpc',
    req: request,
    router: rootRouter,
    async createContext() {
      const data = await getSession();
      return data;
    },
  });

export const ServerRoute = createServerFileRoute('/api/rpc/$').methods({
  GET: trpcFetchHandler,
  POST: trpcFetchHandler,
});
