import { createTRPCRouter } from './init';
import { resourceRouter } from './routers/resource.router';

export const rootRouter = createTRPCRouter({
  resources: resourceRouter,
});

export type Router = typeof rootRouter;
