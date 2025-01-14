import { CircleError, ErrorResponse, SuccessResponse } from './responses';

function jsonResponse<T>(data: T, status = 200): Response {
  return Response.json(data, {
    status,
  });
}

export function successResponse(message: string): Response {
  return jsonResponse<SuccessResponse>({ message }, 200);
}

export function errorResponse(error: string, status = 400): Response {
  return jsonResponse<ErrorResponse>({ error }, status);
}

export interface CircleErrorResponse {
  response: {
    data: CircleError;
  };
}

export function assertCircleErrorResponse(
  error: unknown,
): asserts error is CircleErrorResponse {
  if (
    typeof error !== 'object' ||
    error === null ||
    !('response' in error) ||
    typeof (error as { response: unknown }).response !== 'object' ||
    !('data' in (error as { response: { data: unknown } }).response) ||
    typeof (error as { response: { data: unknown } }).response.data !== 'object'
  ) {
    throw new Error('Not a CircleErrorResponse');
  }
}
