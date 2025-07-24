import { NavigationMenu as BaseNavigationMenu } from '@base-ui-components/react/navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDownIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Root>) {
  return (
    <BaseNavigationMenu.Root
      className={cn('min-w-max', className)}
      data-slot="navigation-menu"
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </BaseNavigationMenu.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.List>) {
  return (
    <BaseNavigationMenu.List
      className={cn(
        'relative flex items-center justify-center gap-1',
        className
      )}
      data-slot="navigation-menu-list"
      {...props}
    />
  );
}

function NavigationMenuItem({
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Item>) {
  return (
    <BaseNavigationMenu.Item data-slot="navigation-menu-item" {...props} />
  );
}

function NavigationMenuIcon({
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Icon>) {
  return (
    <BaseNavigationMenu.Icon data-slot="navigation-menu-icon" {...props} />
  );
}

const navigationMenuTriggerStyle = cva(
  "inline-flex h-9 w-max shrink-0 select-none items-center justify-center gap-1.5 rounded-md bg-background px-4 py-2 font-medium text-sm no-underline outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[popup-open]:bg-accent/50 data-[popup-open]:text-accent-foreground data-[popup-open]:focus:bg-accent data-[popup-open]:hover:bg-accent [&_svg:not([class*='size-'])]:size-3 [&_svg]:shrink-0"
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Trigger>) {
  return (
    <BaseNavigationMenu.Trigger
      className={cn(navigationMenuTriggerStyle(), className)}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}
      <NavigationMenuIcon className="transition-transform duration-300 data-[popup-open]:rotate-180">
        <ChevronDownIcon aria-hidden="true" />
      </NavigationMenuIcon>
    </BaseNavigationMenu.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Content>) {
  return (
    <BaseNavigationMenu.Content
      className={cn('w-full p-2 md:w-auto', className)}
      data-slot="navigation-menu-content"
      {...props}
    />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Link>) {
  return (
    <BaseNavigationMenu.Link
      className={cn(
        "flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      data-slot="navigation-menu-link"
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Popup>) {
  return (
    <BaseNavigationMenu.Portal data-slot="navigation-menu-portal">
      <BaseNavigationMenu.Positioner
        align="start"
        className="h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] duration-300"
        data-slot="navigation-menu-positioner"
        sideOffset={4}
      >
        <BaseNavigationMenu.Popup
          className={cn(
            'data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md duration-300 data-closed:animate-out data-open:animate-in',
            className
          )}
          data-slot="navigation-menu-popup"
          {...props}
        >
          <BaseNavigationMenu.Viewport data-slot="navigation-menu-viewport" />
        </BaseNavigationMenu.Popup>
      </BaseNavigationMenu.Positioner>
    </BaseNavigationMenu.Portal>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
};
