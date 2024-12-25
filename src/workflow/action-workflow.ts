import { Effect, pipe } from 'effect';

import { LoggerConsoleLive } from '@effects/logger';

import { collectErrorDetails } from './errors/collect-error-details.js';
import { task } from './task/task.js';

export const actionWorkflow = () =>
  Effect.runPromise(
    pipe(
      task,
      Effect.sandbox,
      Effect.catchAll(collectErrorDetails),
      Effect.provide(LoggerConsoleLive),
      Effect.withSpan('action-workflow'),
    ),
  );
