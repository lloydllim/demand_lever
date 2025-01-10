export const AuthenticationError = class extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
};

export const UnauthenticatedError = class extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
};

export const UnauthorizedError = class extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
};
