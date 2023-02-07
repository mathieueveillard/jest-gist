# jest-gist

Usage:

```typescript
import suite from ".";
import test from "./test";
import expect from "./expect";

suite("Basics of testing", [
  test("A test that succeeds", () => {
    return expect(true).equal(true);
  }),

  test("A test that fails", () => {
    return expect(true).equal(false);
  }),

  test("A test that throws an unexpected error", () => {
    throw Error("This is unexpected");
  }),

  test("Comparison of objects", () => {
    const createPerson = (name: string) => ({
      name,
      greet: () => `Hello, my name is ${name}`,
    });

    return expect(createPerson("Darth Vader")) //
      .equal(createPerson("Darth Vader"));
  }),
]);

suite("Test of the 'SKIP' flag", [
  test("A test that should run", () => {
    return expect(true).equal(true);
  }),

  test(
    "A test that should NOT run",
    () => {
      return expect(false).equal(true);
    },
    "SKIP"
  ),
]);

suite("Test of the 'ONLY' flag", [
  test(
    "The ONLY test that should run",
    () => {
      return expect(true).equal(true);
    },
    "ONLY"
  ),

  test(
    "OK, this one should also run",
    () => {
      return expect(true).equal(true);
    },
    "ONLY"
  ),

  test("A test that should NOT run", () => {
    return expect(false).equal(true);
  }),
]);
```
