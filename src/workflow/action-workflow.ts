import { Effect, pipe } from 'effect';
import { runPromise } from 'effect-errors';

import { Console, ConsoleLive } from '@effects/console';

const task = pipe(
  Effect.gen(function* () {
    const console = yield* Console;

    yield* console.info('yolo');
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
