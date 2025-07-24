import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function TooltipProvider({
  delay = 0,
  closeDelay = 0,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Provider>) {
  return (
    <BaseTooltip.Provider
      closeDelay={closeDelay}
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

function Tooltip({ ...props }: React.ComponentProps<typeof BaseTooltip.Root>) {
  return (
    <TooltipProvider>
      <BaseTooltip.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Trigger>) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipPortal({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Portal>) {
  return <BaseTooltip.Portal data-slot="tooltip-portal" {...props} />;
}

function TooltipPositioner({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Positioner>) {
  return <BaseTooltip.Positioner data-slot="tooltip-positioner" {...props} />;
}

function TooltipArrow({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Arrow>) {
  return <BaseTooltip.Arrow data-slot="tooltip-arrow" {...props} />;
}

function TooltipContent({
  className,
  align = 'center',
  sideOffset = 8,
  side = 'top',
  children,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Popup> & {
  align?: BaseTooltip.Positioner.Props['align'];
  side?: BaseTooltip.Positioner.Props['side'];
  sideOffset?: BaseTooltip.Positioner.Props['sideOffset'];
}) {
  return (
    <TooltipPortal>
      <TooltipPositioner align={align} side={side} sideOffset={sideOffset}>
        <BaseTooltip.Popup
          className={cn(
            '-outline-offset-1 z-50 w-fit origin-[var(--transform-origin)] text-balance rounded-md bg-popover px-3 py-1.5 text-popover-foreground text-xs shadow-sm outline outline-border transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
            className
          )}
          data-slot="tooltip-content"
          {...props}
        >
          {children}
          <TooltipArrow className="data-[side=right]:-rotate-90 data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=left]:rotate-90 data-[side=top]:rotate-180">
            <svg fill="none" height="10" viewBox="0 0 20 10" width="20">
              <path
                className="fill-popover"
                d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V9H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
              />
              <path
                className="fill-border"
                d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
              />
              <title>Tooltip arrow</title>
            </svg>
          </TooltipArrow>
        </BaseTooltip.Popup>
      </TooltipPositioner>
    </TooltipPortal>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipArrow,
  TooltipProvider,
};
