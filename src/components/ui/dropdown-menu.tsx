import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof BaseMenu.Portal>) {
  return <BaseMenu.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof BaseMenu.Trigger>) {
  return <BaseMenu.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuPositioner({
  ...props
}: React.ComponentProps<typeof BaseMenu.Positioner>) {
  return (
    <BaseMenu.Positioner data-slot="dropdown-menu-positioner" {...props} />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  align = 'center',
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup> & {
  align?: BaseMenu.Positioner.Props['align'];
  sideOffset?: BaseMenu.Positioner.Props['sideOffset'];
}) {
  return (
    <DropdownMenuPortal>
      <DropdownMenuPositioner
        align={align}
        className="max-h-[var(--available-height)]"
        sideOffset={sideOffset}
      >
        <BaseMenu.Popup
          className={cn(
            'data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-[var(--transform-origin)] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-closed:animate-out data-open:animate-in',
            className
          )}
          data-slot="dropdown-menu-content"
          {...props}
        />
      </DropdownMenuPositioner>
    </DropdownMenuPortal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof BaseMenu.Group>) {
  return <BaseMenu.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof BaseMenu.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <BaseMenu.Item
      className={cn(
        "data-[variant=destructive]:*:[svg]:!text-destructive focus:data-[variant=destructive]:*:[svg]:!text-destructive-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-all focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-all",
        className
      )}
      data-inset={inset}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'ml-auto text-muted-foreground text-xs tracking-widest',
        className
      )}
      data-slot="dropdown-menu-shortcut"
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof BaseMenu.GroupLabel> & {
  inset?: boolean;
}) {
  return (
    <BaseMenu.GroupLabel
      className={cn(
        'px-2 py-1.5 font-medium text-xs data-[inset]:pl-8',
        className
      )}
      data-inset={inset}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem
      checked={checked}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot="dropdown-menu-checkbox-item"
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <BaseMenu.CheckboxItemIndicator>
          <CheckIcon className="size-4" />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioGroup>) {
  return (
    <BaseMenu.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot="dropdown-menu-radio-item"
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <BaseMenu.RadioItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuRoot>) {
  return (
    <BaseMenu.SubmenuRoot
      closeDelay={0}
      data-slot="dropdown-menu-sub"
      delay={0}
      {...props}
    />
  );
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger> & {
  inset?: boolean;
}) {
  return (
    <BaseMenu.SubmenuTrigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-popup-open:bg-accent data-[inset]:pl-8 data-popup-open:text-accent-foreground',
        className
      )}
      data-inset={inset}
      data-slot="dropdown-menu-sub-trigger"
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </BaseMenu.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  sideOffset = 0,
  align = 'start',
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup> & {
  align?: BaseMenu.Positioner.Props['align'];
  sideOffset?: BaseMenu.Positioner.Props['sideOffset'];
}) {
  return (
    <DropdownMenuPortal>
      <DropdownMenuPositioner
        align={align}
        className="max-h-[var(--available-height)]"
        sideOffset={sideOffset}
      >
        <BaseMenu.Popup
          className={cn(
            'data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-[var(--transform-origin)] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-closed:animate-out data-open:animate-in',
            className
          )}
          data-slot="dropdown-menu-content"
          {...props}
        />
      </DropdownMenuPositioner>
    </DropdownMenuPortal>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
