import { FetchHttpClient } from '@effect/platform';
import { NodeFileSystem } from '@effect/platform-node';
import { Logger } from '@effects/deps/logger';
import { Effect, Layer, pipe } from 'effect';
import type { Cause } from 'effect/Cause';
import { captureErrors, prettyPrintFromCapturedErrors } from 'effect-errors';

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
    }),
    Effect.scoped,
    Effect.provide(Layer.mergeAll(FetchHttpClient.layer, NodeFileSystem.layer)),
    Effect.withSpan('collect-error-details'),
  );
