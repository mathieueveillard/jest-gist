import { Result, createError, createSkipped } from "./result";
import { Test } from "./test";
import chalk from "chalk";

export type ExecutionResult<T> = {
  slug: string;
  result: Result<T>;
};

export const selectTestsToRun = (tests: Test<any>[]): Test<any>[] => {
  const testsWithOnlyFlag = tests.filter(({ modulator }) => modulator === "ONLY");

  if (testsWithOnlyFlag.length > 0) {
    return tests.map((test) => {
      if (test.modulator === "ONLY") {
        return test;
      }

      return {
        ...test,
        modulator: "SKIP",
      };
    });
  }

  return tests;
};

export const run = <T>({ slug, scenario, modulator }: Test<T>): ExecutionResult<T> => {
  if (modulator === "SKIP") {
    return {
      slug,
      result: createSkipped(),
    };
  }

  try {
    const result = scenario();
    return {
      slug,
      result,
    };
  } catch (error) {
    return {
      slug,
      result: createError(error),
    };
  }
};

const displayTest = <T>({ slug, result }: ExecutionResult<T>): void => {
  console.log(result.display(slug));
};

const displayTestSuite = (slug: string, callback: () => void): void => {
  console.log(chalk.black.bgWhiteBright("SUITE") + " " + chalk.whiteBright(slug)) + "\n";
  callback();
  console.log("\n");
};

export const suite = (slug: string, tests: Test<any>[]) => {
  const results = selectTestsToRun(tests).map(run);

  displayTestSuite(slug, () => {
    results.forEach(displayTest);
  });
};

export default suite;
