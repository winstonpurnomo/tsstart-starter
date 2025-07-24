import { NumberField as BaseNumberField } from '@base-ui-components/react/number-field';
import { MinusIcon, MoveHorizontalIcon, PlusIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type NumberFieldContextType = {
  id: string;
};

const NumberFieldContext = React.createContext<NumberFieldContextType | null>(
  null
);

const useNumberField = () => {
  const context = React.useContext(NumberFieldContext);

  if (!context) {
    throw new Error('useNumberField must be used within a NumberField');
  }

  return context;
};

function NumberField({
  id,
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) {
  let fieldId = React.useId();

  if (id) {
    fieldId = id;
  }

  const controllerClassName =
    'hover:bg-input/50 bg-input flex size-9 items-center justify-center border transition-colors select-none disabled:opacity-50 disabled:pointer-events-none';

  return (
    <NumberFieldContext.Provider value={{ id: fieldId }}>
      <BaseNumberField.Root
        className={cn('flex flex-col items-start gap-1', className)}
        data-slot="number-field"
        id={fieldId}
        {...props}
      >
        {children}
        <BaseNumberField.Group className="flex text-foreground">
          <BaseNumberField.Decrement
            className={cn(controllerClassName, 'rounded-l-md')}
            data-slot="number-field-decrement"
          >
            <MinusIcon />
          </BaseNumberField.Decrement>
          <BaseNumberField.Input
            className="focus:-outline-offset-1 h-9 w-20 border-y text-center text-sm tabular-nums focus:z-1 focus:outline-3 focus:outline-ring/50 disabled:pointer-events-none disabled:opacity-50"
            data-slot="number-field-input"
          />
          <BaseNumberField.Increment
            className={cn(controllerClassName, 'rounded-r-md')}
            data-slot="number-field-increment"
          >
            <PlusIcon />
          </BaseNumberField.Increment>
        </BaseNumberField.Group>
      </BaseNumberField.Root>
    </NumberFieldContext.Provider>
  );
}

function NumberFieldScrubArea({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubArea>) {
  const { id: fieldId } = useNumberField();

  return (
    <BaseNumberField.ScrubArea
      className={cn('cursor-ew-resize', className)}
      data-slot="number-field-scrub-area"
      {...props}
    >
      <label
        className="cursor-ew-resize font-medium text-foreground text-sm"
        data-slot="number-field-label"
        htmlFor={fieldId}
      >
        Amount
      </label>
      <BaseNumberField.ScrubAreaCursor
        className="drop-shadow-sm filter"
        data-slot="number-field-scrub-area-cursor"
      >
        <MoveHorizontalIcon className="size-4.5" />
      </BaseNumberField.ScrubAreaCursor>
    </BaseNumberField.ScrubArea>
  );
}

export { NumberField, NumberFieldScrubArea };
