import { TaggedError } from 'effect/Data';

export class ActionInputsError extends TaggedError('action-inputs-error')<{
  cause?: unknown;
  message?: string;
}> {}
