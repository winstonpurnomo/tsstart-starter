import { EmojiPicker as BaseEmojiPicker } from 'frimousse';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function EmojiPicker({
  className,
  ...props
}: React.ComponentProps<typeof BaseEmojiPicker.Root>) {
  return (
    <BaseEmojiPicker.Root
      className={cn(
        'isolate flex h-80 w-fit flex-col rounded-md border bg-popover shadow-md',
        className
      )}
      data-slot="emoji-picker"
      {...props}
    />
  );
}

function EmojiPickerSearch({
  className,
  wrapperClassName,
  ...props
}: React.ComponentProps<typeof BaseEmojiPicker.Search> & {
  wrapperClassName?: string;
}) {
  return (
    <div
      className={cn('p-2', wrapperClassName)}
      data-slot="emoji-picker-search-wrapper"
    >
      <BaseEmojiPicker.Search
        className={cn(
          'z-50 flex h-9 w-full min-w-0 rounded-md border bg-input px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/50',
          className
        )}
        {...props}
      />
    </div>
  );
}

function EmojiPickerContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseEmojiPicker.Viewport>) {
  return (
    <BaseEmojiPicker.Viewport
      className={cn('relative flex-1 outline-hidden', className)}
      data-slot="emoji-picker-content"
      {...props}
    />
  );
}

function EmojiPickerLoading({
  className,
  ...props
}: React.ComponentProps<typeof BaseEmojiPicker.Loading>) {
  return (
    <BaseEmojiPicker.Loading
      className={cn(
        'absolute inset-0 flex items-center justify-center text-muted-foreground text-sm',
        className
      )}
      data-slot="emoji-picker-loading"
      {...props}
    />
  );
}

function EmojiPickerEmpty({
  className,
  ...props
}: React.ComponentProps<typeof BaseEmojiPicker.Empty>) {
  return (
    <BaseEmojiPicker.Empty
      className={cn(
        'absolute inset-0 flex items-center justify-center text-muted-foreground text-sm',
        className
      )}
      data-slot="emoji-picker-empty"
      {...props}
    />
  );
}

function EmojiPickerList({
  className,
  ...props
}: React.ComponentProps<typeof BaseEmojiPicker.List>) {
  return (
    <BaseEmojiPicker.List
      className={cn('select-none pb-2', className)}
      components={{
        CategoryHeader: ({ category, ...props }) => (
          <div
            className="bg-popover px-3 pb-1.5 font-medium text-muted-foreground text-xs"
            data-slot="emoji-picker-list-category-header"
            {...props}
          >
            {category.label}
          </div>
        ),
        Row: ({ children, ...props }) => (
          <div
            className="scroll-my-1.5 px-1.5"
            data-slot="emoji-picker-list-row"
            {...props}
          >
            {children}
          </div>
        ),
        Emoji: ({ emoji, ...props }) => (
          <button
            className="flex size-8 items-center justify-center rounded-md text-lg data-active:bg-accent"
            data-slot="emoji-picker-list-emoji"
            {...props}
          >
            {emoji.emoji}
          </button>
        ),
      }}
      data-slot="emoji-picker-list"
      {...props}
    />
  );
}

function EmojiPickerSkinToneSelector({
  className,
  ...props
}: React.ComponentProps<typeof BaseEmojiPicker.SkinToneSelector>) {
  return (
    <BaseEmojiPicker.SkinToneSelector
      className={cn(
        'mx-2 mb-1.5 size-8 rounded-md bg-popover text-lg hover:bg-accent',
        className
      )}
      data-slot="emoji-picker-skin-tone-selector"
      {...props}
    />
  );
}

export {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerLoading,
  EmojiPickerEmpty,
  EmojiPickerList,
  EmojiPickerSkinToneSelector,
};
