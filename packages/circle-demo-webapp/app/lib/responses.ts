export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export interface CircleError extends Error {
  code: number;
  message: string;
  errors: {
    message: string;
    constraints: unknown;
    error: string;
    invalidValue: string;
    location: string;
  }[];
}
