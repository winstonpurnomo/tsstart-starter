import { createIsomorphicFn, createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';

const getRequestHeaders_SERVER = createServerFn({ method: 'GET' }).handler(
  () => {
    const request = getWebRequest();
    const headers = new Headers(request?.headers);

    return Object.fromEntries(headers);
  }
);

export const getRequestHeaders = createIsomorphicFn()
  .client(() => ({}))
  .server(getRequestHeaders_SERVER);
