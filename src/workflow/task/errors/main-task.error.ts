import { TaggedError } from 'effect/Data';

export class MainTaskError extends TaggedError('main-task-error')<{
  cause?: unknown;
  message?: string;
}> {}
