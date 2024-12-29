import { circuitsRouter } from './routes/circuits';
import { driversRouter } from './routes/drivers';
import { router } from './trpc';

export const appRouter = router({
  drivers: driversRouter,
  circuits: circuitsRouter,
});

export type AppRouter = typeof appRouter;
