import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { Router } from '@/rpc/router';

export const { TRPCProvider, useTRPC } = createTRPCContext<Router>();
