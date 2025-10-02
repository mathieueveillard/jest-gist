import suite from "./suite";
import test from "./test";
import { expect, expectThrows } from "./expect";

suite("Basics of testing", [
  test("A test that succeeds", () => {
    return expect(true).equal(true);
  }),

  test("A test that fails", () => {
    return expect(true).equal(false);
  }),

  test("A test that throws an unexpected error", () => {
    throw Error("This is unexpected!");
  }),
]);

suite("Expecting an exception", [
  test("The function throws an exception, as expected", () => {
    return expectThrows(() => {
      throw new Error("Throws an error, as expected");
    }, "Throws an error, as expected");
  }),

  test("The function doesn't throw an exception", () => {
    return expectThrows(() => {}, "Throws an error, as expected");
  }),

  test("The function throws an exception, but not the correct one", () => {
    return expectThrows(() => {
      throw new Error("Throws another error");
    }, "Throws an error, as expected");
  }),
]);

suite("Test of the 'SKIP' flag", [
  test("A test that should run", () => {
    return expect(true).equal(true);
  }),

  test.skip("A test that should NOT run (test.skip)", () => {
    return expect(false).equal(true);
  }),
]);

suite("Test of the 'ONLY' flag", [
  test.only("A test that should run (test.only)", () => {
    return expect(true).equal(true);
  }),

  test.only("Another test that should run (test.only)", () => {
    return expect(true).equal(true);
  }),

  test("A test that should NOT run", () => {
    return expect(false).equal(true);
  }),
]);
