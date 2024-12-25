import { Effect, pipe } from 'effect';

import { Logger } from '@effects/logger';
import { GithubActionWorkflowError } from '@errors';

export const task = pipe(
  Effect.gen(function* () {
    const { info } = yield* Logger;

    yield* info('yolo');

    yield* Effect.fail(
      new GithubActionWorkflowError({
        cause: 'Oh no',
      }),
    );
  }),
  Effect.withSpan('task'),
);
