import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchStreamLink } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import superjson from 'superjson';
import { TRPCProvider } from '@/lib/trpc';
import type { Router } from '@/rpc/router';
import { getRequestHeaders } from '@/server/get-request-headers';

const queryClient = new QueryClient();

// This is what the client will use to send requests to the server
const trpcClient = createTRPCClient<Router>({
  links: [
    httpBatchStreamLink({
      url: '/api/rpc',
      transformer: superjson,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
      headers() {
        return getRequestHeaders();
      },
    }),
  ],
});

// This is what the server will use to make requests within its own environment
export const trpc = createTRPCOptionsProxy<Router>({
  client: trpcClient,
  queryClient,
});

// Client-side Provider
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
      {children}
    </TRPCProvider>
  );
}

// Server-side Provider
export function getContext() {
  return {
    queryClient,
    trpc,
  };
}
