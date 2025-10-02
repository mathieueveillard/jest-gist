import suite, { ExecutionResult, run, selectTestsToRun } from "./suite";
import test, { Modulator } from "./test";
import { arrayExpect, expect } from "./expect";
import { createSkipped, createSuccess, createWrongExceptionWasThrown } from "./result";

suite("Test of selectTestsToRun()", [
  test("If there is no modulator, all tests should be executed", () => {
    // Given
    const tests = [
      test("Test 1", () => createSuccess()),
      test("Test 2", () => createSuccess()),
      test("Test 3", () => createSuccess()),
    ];

    // When
    const actual = selectTestsToRun(tests).map(({ modulator }) => modulator);

    // Then
    const expected: Modulator[] = ["NONE", "NONE", "NONE"];
    return arrayExpect(actual).equal(expected);
  }),

  test("Skipped tests should NOT be executed", () => {
    // Given
    const tests = [
      test.skip("Test 1", () => createSuccess()),
      test("Test 2", () => createSuccess()),
      test("Test 3", () => createSuccess()),
    ];

    // When
    const actual = selectTestsToRun(tests).map(({ modulator }) => modulator);

    // Then
    const expected: Modulator[] = ["SKIP", "NONE", "NONE"];
    return arrayExpect(actual).equal(expected);
  }),

  test("If there are ONLY modifiers, only those tests should be executed", () => {
    // Given
    const tests = [
      test.only("Test 1", () => createSuccess()),
      test.only("Test 2", () => createSuccess()),
      test("Test 3", () => createSuccess()),
      test.skip("Test 4", () => createSuccess()),
    ];

    // When
    const actual = selectTestsToRun(tests).map(({ modulator }) => modulator);

    // Then
    const expected: Modulator[] = ["ONLY", "ONLY", "SKIP", "SKIP"];
    return arrayExpect(actual).equal(expected);
  }),
]);
