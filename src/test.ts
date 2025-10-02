import { Result } from "./result";

export type Scenario<T> = () => Result<T>;

export type Modulator = "NONE" | "SKIP" | "ONLY";

export type Test<T> = {
  slug: string;
  scenario: Scenario<T>;
  modulator: Modulator;
};

const createTest = <T>(slug: string, scenario: Scenario<T>, modulator: Modulator) => ({
  slug,
  scenario,
  modulator,
});

const test = <T>(slug: string, scenario: Scenario<T>) => createTest(slug, scenario, "NONE");

test.skip = <T>(slug: string, scenario: Scenario<T>) => createTest(slug, scenario, "SKIP");

test.only = <T>(slug: string, scenario: Scenario<T>) => createTest(slug, scenario, "ONLY");

export default test;
