import { Console, Effect, pipe } from 'effect';

import type { FailErrorType } from '@inputs';

import { MainTaskError } from './errors/main-task.error.js';
import { subTask } from './logic/sub-task.js';

export const mainTask = (maybeFailErrorType: FailErrorType | null) =>
  pipe(
    Effect.gen(function* () {
      if (maybeFailErrorType === 'main-task') {
        yield* Effect.fail(
          new MainTaskError({
            cause: 'Oh no!',
          }),
        );
      }

      yield* subTask(maybeFailErrorType);

      yield* Console.info('✅ Success!');
    }),
    Effect.withSpan('main-task', { attributes: { maybeFailErrorType } }),
  );
