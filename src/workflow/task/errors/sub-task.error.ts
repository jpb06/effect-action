import { TaggedError } from 'effect/Data';

export class SubTaskError extends TaggedError('sub-task-error')<{
  cause?: unknown;
  message?: string;
}> {}
