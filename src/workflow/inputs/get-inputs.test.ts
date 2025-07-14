import { Effect, pipe } from 'effect';
import { runPromise } from 'effect-errors';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockActionsCore } from '@test/mocks';

import { ActionInputsError } from './errors/action-inputs.error.js';

describe('getInputs function', () => {
  const { getInput } = mockActionsCore();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should resolve failErrorType as null', async () => {
    getInput.calledWith('fail-error-type').mockReturnValueOnce('');

    const { getInputs } = await import('./get-inputs.js');

    const result = await runPromise(getInputs);

    expect(result).toMatchInlineSnapshot(`
      {
        "failErrorType": null,
      }
    `);
  });

  it('should fail with an ActionInputsError', async () => {
    getInput.calledWith('fail-error-type').mockReturnValueOnce('no');

    const { getInputs } = await import('./get-inputs.js');

    const error = await Effect.runPromise(pipe(getInputs, Effect.flip));

    expect(error).toBeInstanceOf(ActionInputsError);
  });
});
