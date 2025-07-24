import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

import './styles.css';
import { getContext, Provider } from './integrations/tanstack-query/provider';
import { authClient } from './lib/auth';

// Create a new router instance
export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: {
        ...getContext(),
        authClient,
        authData: null,
      },
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
      Wrap({ children }) {
        return <Provider>{children}</Provider>;
      },
    }),
    getContext().queryClient
  );

  return router;
};

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
