import { FetchHttpClient } from '@effect/platform';
import { NodeFileSystem } from '@effect/platform-node';
import { Logger } from '@effects/deps/logger';
import { Effect, Layer, pipe } from 'effect';
import type { Cause } from 'effect/Cause';
import { TaggedError } from 'effect/Data';
import { captureErrors, prettyPrintFromCapturedErrors } from 'effect-errors';

export class ActionError extends TaggedError('action-error')<{
  cause?: unknown;
  message?: string;
}> {}

export const collectErrorDetails = <E>(cause: Cause<E>) =>
  pipe(
    Effect.gen(function* () {
      const { error } = yield* Logger;

      const captured = yield* captureErrors(cause, {
        stripCwd: true,
      });
      const message = prettyPrintFromCapturedErrors(captured, {
        hideStackTrace: true,
        stripCwd: true,
      });

      yield* error(message);

      yield* Effect.fail(
        new ActionError({ message: '❌ Github action workflow failure' }),
      );
    }),
    Effect.scoped,
    Effect.provide(Layer.mergeAll(FetchHttpClient.layer, NodeFileSystem.layer)),
    Effect.withSpan('collect-error-details'),
  );
