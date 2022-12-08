# jest-gist

```typescript
type Expect = (actual: boolean, expected: boolean) => void;

type TestCase = (expect: Expect) => void;

type Test = {
  slug: string;
  testCase: TestCase;
};

const tests: Test[] = [];

export const test = (slug: string, testCase: TestCase): void => {
  tests.push({
    slug,
    testCase,
  });
};

export const run = () => {
  tests.forEach(({ slug, testCase }) => {
    let status;
    const expect: Expect = (actual, expected) => {
      status = actual === expected;
    };
    testCase(expect);
    console.log({
      slug,
      status,
    });
  });
};
```

Usage:

```typescript
test("Test #1", (expect) => {
  expect(true, true);
});

test("Test #2", (expect) => {
  expect(false, true);
});

run();
```
