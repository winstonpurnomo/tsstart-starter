import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      className={cn(
        'peer flex size-4 items-center justify-center rounded-[4px] border bg-input outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:text-destructive aria-invalid:focus:ring-destructive/50 data-checked:border-primary data-checked:bg-primary data-[indeterminate]:text-foreground data-checked:text-primary-foreground',
        className
      )}
      data-slot="checkbox"
      {...props}
    >
      <BaseCheckbox.Indicator
        className="block data-[unchecked]:hidden"
        data-slot="checkbox-indicator"
      >
        {props.indeterminate ? (
          <MinusIcon className="size-3.5" />
        ) : (
          <CheckIcon className="size-3.5" />
        )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

export { Checkbox };
