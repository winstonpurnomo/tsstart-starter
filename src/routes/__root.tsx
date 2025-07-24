import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { Session, User } from 'better-auth';
import { Toaster } from 'sonner';
import type { trpc } from '@/integrations/tanstack-query/provider';
import { ThemeProvider, useTheme } from '@/integrations/theme-provider';
import type { authClient } from '@/lib/auth';
import { getThemeServerFn } from '@/server/theme';
import appCss from '../styles.css?url';

interface RouterContext {
  queryClient: QueryClient;
  trpc: typeof trpc;
  authClient: typeof authClient;
  authData: {
    session: Session | null;
    user: User | null;
  } | null;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  loader: () => getThemeServerFn(),
  component: RootComponent,
});

function RootComponent() {
  const theme = Route.useLoaderData();
  return (
    <ThemeProvider theme={theme}>
      <RootDocument>
        <Outlet />
        <TanStackRouterDevtools />
      </RootDocument>
    </ThemeProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <html className={theme} lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <main className="root">
          {children}
          <Scripts />
          <Toaster />
        </main>
      </body>
    </html>
  );
}
