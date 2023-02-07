const toString = <T>(input: T) => {
  try {
    return JSON.stringify(input, (_, value) => {
      if (typeof value === "function") {
        return value.toString();
      }
      return value;
    });
  } catch {
    return input;
  }
};

export default toString;
