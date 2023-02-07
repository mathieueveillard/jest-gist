import { createFailure, createSuccess } from "./result";
import toString from "./utils/toString";

const expect = <T>(actual: T) => {
  const equal = (expected: T) => {
    if (toString(actual) !== toString(expected)) {
      return createFailure(actual)(expected);
    }
    return createSuccess();
  };

  return {
    equal,
  };
};

export default expect;
