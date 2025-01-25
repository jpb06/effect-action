import { Effect, pipe } from 'effect';

import { loadEnv } from '@effects/env';
import { collectErrorDetails } from '@effects/errors';
import { Logger, LoggerConsoleLive } from '@effects/logger';
import { getInputs } from '@inputs';

import { mainTask } from './task/index.js';

export const starter = pipe(
  Effect.gen(function* () {
    const { info } = yield* Logger;

    yield* info('🎬 Starting effect-action workflow ...');

    const env = yield* loadEnv;
    yield* info('env', env);

    const { failErrorType } = yield* getInputs;

    yield* mainTask(failErrorType);
  }),
  Effect.withSpan('starter'),
);

export const actionWorkflow = () =>
  Effect.runPromise(
    pipe(
      starter,
      Effect.sandbox,
      Effect.catchAll(collectErrorDetails),
      Effect.provide(LoggerConsoleLive),
      Effect.withSpan('action-workflow'),
    ),
  );
