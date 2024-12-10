import { Effect, pipe } from 'effect';
import { runPromise } from 'effect-errors';
import { TaggedError } from 'effect/Data';

import { Console, ConsoleLive } from '@effects/console';

export class CustomError extends TaggedError('custom-error')<{
  cause?: unknown;
  message?: string;
}> {}

const task = pipe(
  Effect.gen(function* () {
    const console = yield* Console;

    yield* console.info('yolo');

    yield* Effect.fail(
      new CustomError({
        cause: 'Oh no',
      }),
    );
  }),
  Effect.withSpan('task'),
);

export const actionWorkflow = () =>
  runPromise(
    pipe(
      Effect.gen(function* () {
        yield* task;
      }),
      Effect.provide(ConsoleLive),
      Effect.withSpan('action-workflow'),
    ),
  );
