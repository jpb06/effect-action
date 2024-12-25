import { TaggedError } from 'effect/Data';

export class GithubActionWorkflowError extends TaggedError(
  'github-action-workflow-error',
)<{
  cause?: unknown;
  message?: string;
}> {}
