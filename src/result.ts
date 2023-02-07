import chalk from "chalk";

type AbstractResult<Type> = {
  type: Type;
  display: (slug: string) => string;
};

type Success = AbstractResult<"SUCCESS">;

type Failure<T> = AbstractResult<"FAILURE"> & {
  reason: {
    expected: T;
    actual: T;
  };
};

type Error = AbstractResult<"ERROR"> & {
  reason: string;
};

type Result<T> = Success | Failure<T> | Error;

const createSuccess = (): Success => {
  const display = (slug: string) => {
    return chalk.bgGreenBright("SUCCESS") + " " + chalk.greenBright(slug);
  };
  return {
    type: "SUCCESS",
    display,
  };
};

const createFailure =
  <T>(expected: T) =>
  (actual: T): Failure<T> => {
    const display = (slug: string) => {
      return (
        chalk.bgRedBright("FAILURE") +
        " " +
        chalk.redBright(slug) +
        "\n" + //
        chalk.redBright(`↳ expected: ${expected}`) +
        "\n" +
        chalk.redBright(`↳ actual: ${actual}`) +
        "\n"
      );
    };
    return {
      type: "FAILURE",
      reason: {
        expected,
        actual,
      },
      display,
    };
  };

const createError = (reason: string): Error => {
  const display = (slug: string) => {
    return chalk.bgBlack.whiteBright("ERROR") + " " + slug;
  };
  return {
    type: "ERROR",
    reason,
    display,
  };
};

export { Success, Failure, Error, Result, createSuccess, createFailure, createError };
