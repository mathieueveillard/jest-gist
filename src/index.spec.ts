import { test, run } from ".";

test("Test #1", (expect) => {
  expect(true, true);
});

test("Test #2", (expect) => {
  expect(false, true);
});

run();
