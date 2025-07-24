import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import type { Theme } from '@/integrations/theme-provider';

const storageKey = 'ui-theme';

export const getThemeServerFn = createServerFn().handler(() => {
  return (getCookie(storageKey) || 'light') as Theme;
});

export const setThemeServerFn = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    if (typeof data !== 'string' || (data !== 'dark' && data !== 'light')) {
      throw new Error('Invalid theme provided');
    }
    return data as Theme;
  })
  .handler(({ data }) => {
    setCookie(storageKey, data);
  });
