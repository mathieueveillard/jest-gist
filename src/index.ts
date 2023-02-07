import { Result, createError } from "./result";
import { Test } from "./test";

type ExecutionResult<T> = {
  slug: string;
  result: Result<T>;
};

const selectTestsToRun = (tests: Test<any>[]): Test<any>[] => {
  const testsWithoutSkipFlag = tests.filter(({ modulator }) => modulator !== "SKIP");

  const testsWithOnlyFlag = testsWithoutSkipFlag.filter(({ modulator }) => modulator === "ONLY");

  if (testsWithOnlyFlag.length > 0) {
    return testsWithOnlyFlag;
  }

  return testsWithoutSkipFlag;
};

const run = <T>({ slug, scenario }: Test<T>): ExecutionResult<T> => {
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
  console.log(`-- TEST SUITE: ${slug}`);
  callback();
  console.log("\n");
};

const runTestSuite = (slug: string, tests: Test<any>[]) => {
  const results = selectTestsToRun(tests).map(run);

  displayTestSuite(slug, () => {
    results.forEach(displayTest);
  });

  const testSuiteHasFailed = results.some(({ result }) => result.type !== "SUCCESS");
  if (testSuiteHasFailed) {
    process.exit(1);
  }
};

export default runTestSuite;
