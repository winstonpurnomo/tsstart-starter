import { createFileRoute } from '@tanstack/react-router';
import { Profile } from '@/components/profile';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Route = createFileRoute('/app/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { authData } = Route.useRouteContext();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Card className="mx-auto w-lg p-6">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription> Hello {authData?.user?.name}</CardDescription>
        </CardHeader>
      </Card>
      <Profile authData={authData} />
    </div>
  );
}
