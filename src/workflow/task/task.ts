import { Effect, pipe } from 'effect';
import { TaggedError } from 'effect/Data';

import { Logger } from '@effects/logger';

export class CustomError extends TaggedError('custom-error')<{
  cause?: unknown;
  message?: string;
}> {}

export const task = pipe(
  Effect.gen(function* () {
    const { info } = yield* Logger;

    yield* info('yolo');

    yield* Effect.fail(
      new CustomError({
        cause: 'Oh no',
      }),
    );
  }),
  Effect.withSpan('task'),
);
