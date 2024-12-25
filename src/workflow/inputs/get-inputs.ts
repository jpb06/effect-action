import { getInput } from '@actions/core';
import { Effect, pipe } from 'effect';

import { ActionInputsError } from './errors/action-inputs.error.js';
import {
  type FailErrorType,
  isValidFailErrorType,
} from './logic/allowed-failed-error-types.js';

export type Inputs = {
  failErrorType: FailErrorType | null;
};

export const getInputs: Effect.Effect<Inputs, ActionInputsError> = pipe(
  Effect.gen(function* () {
    const value = getInput('fail-error-type');
    if (value === '') {
      return {
        failErrorType: null,
      };
    }

    const isFailErrorType = isValidFailErrorType(value);
    if (isFailErrorType) {
      return {
        failErrorType: value,
      };
    }

    return yield* Effect.fail(
      new ActionInputsError({
        cause: `Invalid type for fail-error-type; received ${value}`,
      }),
    );
  }),
  Effect.withSpan('get-inputs'),
);
