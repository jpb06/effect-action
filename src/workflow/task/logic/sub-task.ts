import { Effect, pipe } from 'effect';

import { SubTaskError } from '@errors';
import type { FailErrorType } from '@inputs';

export const subTask = (maybeFailErrorType: FailErrorType | null) =>
  pipe(
    Effect.gen(function* () {
      if (maybeFailErrorType === 'sub-task') {
        yield* Effect.fail(
          new SubTaskError({
            cause: 'This sucks, bro',
          }),
        );
      }
    }),
    Effect.withSpan('sub-task', { attributes: { maybeFailErrorType } }),
  );
