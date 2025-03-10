import { Config, Effect, pipe } from 'effect';

export const loadEnv = pipe(
  Effect.all([
    Config.string('GITHUB_HEAD_REF'),
    Config.string('GITHUB_REF_NAME'),
  ]),
  Effect.map(([githubHeadRef, githubRefName]) => ({
    githubHeadRef,
    githubRefName,
  })),
  Effect.withSpan('load-env'),
);
