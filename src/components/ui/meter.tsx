import { Meter as BaseMeter } from '@base-ui-components/react/meter';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Meter({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root>) {
  return (
    <BaseMeter.Root
      className={cn('w-full space-y-1.5', className)}
      data-slot="meter"
      {...props}
    >
      {children}
      <BaseMeter.Track
        className={cn(
          'h-2 w-full overflow-hidden rounded-xs bg-primary/20',
          className
        )}
        data-slot="meter-track"
        {...props}
      >
        <BaseMeter.Indicator
          className="bg-primary"
          data-slot="meter-indicator"
        />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}

function MeterLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Label>) {
  return (
    <BaseMeter.Label
      className={cn('font-medium text-sm', className)}
      data-slot="meter-label"
      {...props}
    />
  );
}

function MeterValue({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Value>) {
  return (
    <BaseMeter.Value
      className={cn('text-sm', className)}
      data-slot="meter-value"
      {...props}
    />
  );
}

export { Meter, MeterLabel, MeterValue };
