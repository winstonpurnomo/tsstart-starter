/** biome-ignore-all lint/style/useBlockStatements: succinct */
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getSession } from '@/server/get-session';

export const Route = createFileRoute('/app')({
  beforeLoad: async () => {
    const { authData } = await getSession();
    if (!authData) {
      throw redirect({ to: '/login' });
    }
    return {
      authData,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;

    const unsubNav = router.subscribe('onBeforeNavigate', (evt) => {
      // Only show loading for actual route changes, not theme changes
      if (evt.pathChanged) {
        setIsLoading(true);
      }
    });

    const unsubLoad = router.subscribe('onBeforeLoad', (evt) => {
      // Only show loading for actual route changes
      if (evt.pathChanged) {
        setIsLoading(true);
      }
    });

    const unsubDone = router.subscribe('onRendered', () => {
      setIsLoading(false);
      if (loadingTimeout) clearTimeout(loadingTimeout);
    });

    // Fallback timeout to prevent infinite loading
    const unsubResolved = router.subscribe('onResolved', () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 50);
    });

    return () => {
      unsubNav();
      unsubLoad();
      unsubDone();
      unsubResolved();
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };
  }, [router]);

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-300 ${isLoading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
