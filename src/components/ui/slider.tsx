import { Slider as BaseSlider } from '@base-ui-components/react/slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <BaseSlider.Root
      className={cn(
        'relative w-full touch-none select-none data-[disabled]:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50',
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...props}
    >
      <BaseSlider.Control
        className="flex w-full items-center"
        data-slot="slider-control"
      >
        <BaseSlider.Track
          className="relative grow rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5"
          data-slot="slider-track"
        >
          <BaseSlider.Indicator
            className="absolute rounded-full bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            data-slot="slider-indicator"
          />
          {Array.from({ length: _values.length }, (_, index) => (
            <BaseSlider.Thumb
              className="block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4"
              data-slot="slider-thumb"
              key={index}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
      {children}
    </BaseSlider.Root>
  );
}

function SliderValue({
  className,
  ...props
}: React.ComponentProps<typeof BaseSlider.Value>) {
  return (
    <BaseSlider.Value
      className={cn(
        'mt-2 flex justify-end font-medium text-foreground text-sm',
        className
      )}
      data-slot="slider-value"
      {...props}
    />
  );
}

export { Slider, SliderValue };
