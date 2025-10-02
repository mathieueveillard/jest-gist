import chalk from "chalk";

type AbstractResult<Type> = {
  type: Type;
  display: (slug: string) => string;
};

export type Skipped = AbstractResult<"SKIPPED">;

export type Success = AbstractResult<"SUCCESS">;

export type Failure<T> = AbstractResult<"FAILURE"> & {
  reason: {
    expected: T;
    actual: T;
  };
};

export type Error = AbstractResult<"ERROR"> & {
  reason: string;
};

export type NoExceptionWasThrown = AbstractResult<"NO_EXCEPTION_WAS_THROWN">;

export type WrongExceptionWasThrown = AbstractResult<"WRONG_EXCEPTION_WAS_THROWN"> & {
  message: {
    expected: string;
    actual: string;
  };
};

export type Result<T> = Skipped | Success | Failure<T> | Error | NoExceptionWasThrown | WrongExceptionWasThrown;

export const createSkipped = (): Skipped => {
  const display = (slug: string) => chalk.grey("SKIP") + " " + chalk.grey(slug);

  return {
    type: "SKIPPED",
    display,
  };
};

export const createSuccess = (): Success => {
  const display = (slug: string) => chalk.black.bgGreenBright("PASS") + " " + chalk.greenBright(slug);

  return {
    type: "SUCCESS",
    display,
  };
};

export const createFailure =
  <T>(expected: T) =>
  (actual: T): Failure<T> => {
    const display = (slug: string) =>
      chalk.black.bgRedBright("FAIL") +
      " " +
      chalk.redBright(slug) +
      "\n" + //
      chalk.redBright(`   ↳ expected: ${expected}`) +
      "\n" +
      chalk.redBright(`   ↳ actual: ${actual}`);

    return {
      type: "FAILURE",
      reason: {
        expected,
        actual,
      },
      display,
    };
  };

export const createError = (reason: string): Error => {
  const display = (slug: string) =>
    chalk.black.bgRedBright("FAIL") +
    " " +
    chalk.redBright(slug) +
    "\n" +
    chalk.redBright(`   ↳ This test threw an unexpected error and could not make any assertions.`) +
    "\n" +
    chalk.redBright(`   ↳ ${reason}`);

  return {
    type: "ERROR",
    reason,
    display,
  };
};

export const createNoExceptionWasThrown = (): NoExceptionWasThrown => {
  const display = (slug: string) =>
    chalk.black.bgRedBright("FAIL") +
    " " +
    chalk.redBright(slug) +
    "\n" +
    chalk.redBright(`   ↳ No exception was thrown, while an exception was expected.`);

  return {
    type: "NO_EXCEPTION_WAS_THROWN",
    display,
  };
};

export const createWrongExceptionWasThrown =
  (expected: string) =>
  (actual: string): WrongExceptionWasThrown => {
    const display = (slug: string) =>
      chalk.black.bgRedBright("FAIL") +
      " " +
      chalk.redBright(slug) +
      "\n" +
      chalk.redBright(`   ↳ An exception was thrown, but not the correct one.`);
    "\n" + chalk.redBright(`   ↳ Expected message: ${expected}`);
    "\n" + chalk.redBright(`   ↳ Actual message: ${actual}`);

    return {
      type: "WRONG_EXCEPTION_WAS_THROWN",
      message: {
        expected,
        actual,
      },
      display,
    };
  };
