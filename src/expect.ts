import {
  createFailure,
  createSuccess,
  Result,
  Success,
  createNoExceptionWasThrown,
  NoExceptionWasThrown,
  createWrongExceptionWasThrown,
  WrongExceptionWasThrown,
} from "./result";

export const expect = <T>(actual: T) => {
  const equal = (expected: T): Result<T> => {
    if (actual !== expected) {
      return createFailure(expected)(actual);
    }
    return createSuccess();
  };

  return {
    equal,
  };
};

export const arrayExpect = <T>(actual: T[]) => {
  const equal = (expected: T[]): Result<T[]> => {
    if (actual.length !== expected.length) {
      return createFailure(expected)(actual);
    }

    for (let index = 0; index < expected.length; index++) {
      if (actual[index] !== expected[index]) {
        return createFailure(expected)(actual);
      }
    }

    return createSuccess();
  };

  return {
    equal,
  };
};

export const expectThrows = (
  callback: () => void,
  expectedMessage: string
): Success | NoExceptionWasThrown | WrongExceptionWasThrown => {
  try {
    callback();
    return createNoExceptionWasThrown();
  } catch (error) {
    if (error.message === expectedMessage) {
      return createSuccess();
    }
    return createWrongExceptionWasThrown(expectedMessage)(error.message);
  }
};

export default expect;
