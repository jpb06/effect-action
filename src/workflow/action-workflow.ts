import { Effect, pipe } from 'effect';
import { runPromise } from 'effect-errors';

import { LoggerConsoleLive } from '@effects/logger';

import { collectErrorDetails } from './errors/collect-error-details.js';
import { task } from './task/task.js';

export const actionWorkflow = () =>
  runPromise(
    pipe(
      task,
      Effect.sandbox,
      Effect.catchAll(collectErrorDetails),
      Effect.provide(LoggerConsoleLive),
      Effect.withSpan('action-workflow'),
    ),
  );
