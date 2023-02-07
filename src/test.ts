import { Result } from "./result";

type Scenario<T> = () => Result<T>;

type Modulator = "NONE" | "SKIP" | "ONLY";

export type Test<T> = {
  slug: string;
  scenario: Scenario<T>;
  modulator: Modulator;
};

const createInternalTest = <T>(slug: string, scenario: Scenario<T>, modulator: Modulator) => {
  return {
    slug,
    scenario,
    modulator,
  };
};

const createTest = <T>(slug: string, scenario: Scenario<T>) => {
  return createInternalTest(slug, scenario, "NONE");
};

createTest.skip = <T>(slug: string, scenario: Scenario<T>) => {
  return createInternalTest(slug, scenario, "SKIP");
};

createTest.only = <T>(slug: string, scenario: Scenario<T>) => {
  return createInternalTest(slug, scenario, "ONLY");
};

export default createTest;
