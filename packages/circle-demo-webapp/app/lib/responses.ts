export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export interface CircleError extends Error {
  error: {
    code: number;
    message: string;
    errors: {
      message: string;
    }[];
  };
}
