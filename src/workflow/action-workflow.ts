import { context as githubContext } from '@actions/github';
import { Console, Effect, pipe } from 'effect';
import { OctokitLayer, OctokitLayerLive } from 'effect-octokit-layer';

import { loadEnv } from '@effects/deps/env';
import { collectErrorDetails } from '@effects/errors';
import { getInputs } from '@inputs';

import { mainTask } from './task/index.js';

export const starter = pipe(
  Effect.gen(function* () {
    yield* Console.info('🎬 Starting effect-action workflow ...');

    const env = yield* loadEnv;

    const repo = githubContext.repo;
    const pulls = yield* OctokitLayer.repo(repo).pulls.getAll({
      state: 'open',
    });

    const maybePull = pulls.find(({ head }) => head.ref === env.githubRefName);
    if (maybePull) {
      const number = maybePull.number;
      const baseRef = maybePull.base.ref;
      const current = maybePull.head.ref;

      yield* Console.info('Pull request', number, baseRef, current);
    }

    const { failErrorType } = yield* getInputs;

    yield* mainTask(failErrorType);
  }),
  Effect.withSpan('starter'),
);

export const actionWorkflow = () =>
  Effect.runPromise(
    pipe(
      starter,
      Effect.sandbox,
      Effect.catchAll(collectErrorDetails),
      Effect.provide(OctokitLayerLive),
      Effect.withSpan('action-workflow'),
    ),
  );
