import { Context, Effect, Layer, pipe } from 'effect';

export class Console extends Context.Tag('Console')<
  Console,
  {
    readonly info: (message: string) => Effect.Effect<void>;
    readonly error: (message: string) => Effect.Effect<void>;
  }
>() {}
export type ConsoleLayer = (typeof Console)['Service'];

export const ConsoleLive = Layer.succeed(Console, {
  info: (message: string) =>
    pipe(
      Effect.succeed(console.info(message)),
      Effect.withSpan('console/info'),
    ),
  error: (message: string) =>
    pipe(
      Effect.succeed(console.error(message)),
      Effect.withSpan('console/error'),
    ),
});
