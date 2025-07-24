import { Link, useNavigate } from '@tanstack/react-router';
import { ChevronsUpDown, LogOut, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth';
import type { AuthData } from '@/rpc/init';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export function Profile({ authData }: { authData: AuthData | null }) {
  const navigate = useNavigate();

  if (authData === null) {
    <button
      className="flex items-center space-x-3 rounded-lg border bg-card p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
      disabled
      type="button"
    >
      <div className="h-8 w-8">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col items-start">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
    </button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <button
            className="flex items-center space-x-3 rounded-lg border bg-card p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
            type="button"
            {...props}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                alt={authData?.user?.name}
                src={authData?.user?.image ?? undefined}
              />
              <AvatarFallback className="text-sm">
                {authData?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="font-medium text-sm">
                {authData?.user?.name}
              </span>
              <span className="text-muted-foreground text-xs">
                {authData?.user?.email}
              </span>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">{authData?.user?.name}</p>
              <p className="text-muted-foreground text-xs">
                {authData?.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/app/settings">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await authClient.signOut(
                {},
                {
                  onSuccess: () => {
                    toast.success('Successfully logged out!');
                    navigate({ to: '/' });
                  },
                  onError: () => {
                    toast.error('Failed to log out');
                  },
                }
              );
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
