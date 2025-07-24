import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { auth } from '@/server/auth';

export const getSession = createServerFn().handler(async () => {
  const req = getWebRequest();

  const data = await auth.api.getSession({
    headers: req.headers,
  });

  return {
    authData: data,
  };
});
