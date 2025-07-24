import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  type RegisteredRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import { type ComponentRenderOptions, render } from 'vitest-browser-react';

type Routes = RegisteredRouter['routesByPath'];

interface MockedRouterProps<T extends keyof Routes = keyof Routes> {
  initialLocation?: string;
  mockRoute?: MockRoute<T>;
  children: React.ReactNode;
}

type MockRoute<T extends keyof Routes> = {
  path: T;
  loaderData?: Routes[T] extends { types: { loaderData: infer LoaderData } }
    ? LoaderData
    : never;
  context?: Routes[T] extends { types: { routeContext: infer Context } }
    ? Context
    : never;
};

/**
 * Router wrapper component for use with renderHook and testing
 */
export const MockedRouter: React.FC<MockedRouterProps> = ({
  initialLocation = '/',
  mockRoute,
  children,
}) => {
  const memoryHistory = createMemoryHistory({
    initialEntries: [initialLocation],
  });

  const testRouteTree = createRootRoute({
    component: () => (mockRoute ? <Outlet /> : children),
  });

  if (mockRoute) {
    testRouteTree.addChildren([
      createRoute({
        getParentRoute: () => testRouteTree,
        path: mockRoute.path,
        component: () => children,
        beforeLoad: () => mockRoute.context,
        loader: () => mockRoute.loaderData,
      }),
    ]);
  }

  const router = createRouter({
    routeTree: testRouteTree,
    defaultPendingMs: 0,
    history: memoryHistory,
  });

  return <RouterProvider router={router} />;
};

export const renderWithRouter = async <R extends keyof Routes>(
  component: React.ReactElement,
  {
    initialLocation = '/',
    mockRoute,
    ...options
  }: {
    initialLocation?: string;
    mockRoute?: MockRoute<R>;
  } & ComponentRenderOptions = {}
): Promise<void> => {
  render(
    <MockedRouter initialLocation={initialLocation} mockRoute={mockRoute}>
      {component}
    </MockedRouter>,
    options
  );

  await waitFor(() => {
    // TSR renders async, so we wait for it here
    expect(document.body).toBeInTheDocument();
  });
};
