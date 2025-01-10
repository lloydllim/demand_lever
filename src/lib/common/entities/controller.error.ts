export const InputParseError = class extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
};

export const NotFound = class extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
};
