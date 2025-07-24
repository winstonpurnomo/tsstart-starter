import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { authData } = Route.useRouteContext();

  return (
    <div className="relative min-h-screen bg-gray-900">
      <div className="absolute top-4 right-4">
        {authData?.session ? (
          <Link
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            to="/app/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <div className="space-x-2">
            <Link
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              to="/register"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-center font-bold text-6xl text-white">Welcome</h1>
      </div>
    </div>
  );
}
