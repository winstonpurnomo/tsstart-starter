import { Progress as BaseProgress } from '@base-ui-components/react/progress';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Progress({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root className="relative" data-slot="progress" {...props}>
      <BaseProgress.Track
        className={cn(
          'block h-2 w-full overflow-hidden rounded-full bg-primary/20',
          className
        )}
        data-slot="progress-track"
      >
        <BaseProgress.Indicator
          className="block h-full w-full bg-primary transition-all"
          data-slot="progress-indicator"
        />
      </BaseProgress.Track>
      {children}
    </BaseProgress.Root>
  );
}

function ProgressValue({
  className,
  ...props
}: React.ComponentProps<typeof BaseProgress.Value>) {
  return (
    <BaseProgress.Value
      className={cn(
        'mt-2 flex justify-end font-medium text-foreground text-sm',
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  );
}

export { Progress, ProgressValue };
