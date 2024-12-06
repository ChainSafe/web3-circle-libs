import fetch from 'cross-fetch';

type ResponseData<ReturnType> = {
  code: number;
  message?: string;
  data: ReturnType;
  errors?: {
    message: string;
    location: string;
    invalidValue: string;
    error: string;
  }[];
};
type RequestData = { headers: HeadersInit; body: BodyInit };

interface BaseParams {
  [key: string]: unknown; // Allows any other properties
}

/**
 * Methods for sending requests to the Circle REST API
 */
export class BaseApi {
  private baseUrl: string;
  private authToken?: string;

  /**
   * Constructs a new `BaseApi` instance
   * @param baseUrl the base URL for the Circle REST API
   * @param authToken the API key to include with requests
   */
  constructor(baseUrl: string, authToken?: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  /**
   * Get a set of headers (including the API key) that will be used by this `BaseApi`
   */
  protected get headers(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  private prepareRequestData<Params extends Record<string, unknown>>(
    params: Params,
  ): RequestData {
    return {
      headers: this.headers,
      body: JSON.stringify({
        ...params,
      }),
    } as RequestData;
  }

  private async prepareResponseData<ReturnType>(
    res: Response,
    fieldName?: string,
  ): Promise<ReturnType> {
    // case when empty body is returned
    if (String(res.statusText).toLowerCase() === 'no content') {
      return undefined as unknown as ReturnType;
    }
    const response = (await res.json()) as unknown as ResponseData<ReturnType>;
    if (Number(response.code)) {
      let errorsMsgs = '';
      if (Array.isArray(response.errors)) {
        errorsMsgs = response.errors
          .map(
            (error) => `${error.message}${error.location ? `(${error.location})` : ''}`,
          )
          .join(', ');
      }
      throw new Error(
        `${response.code}: ${response.message}.${errorsMsgs ? ` Errors: ${errorsMsgs}` : ''}`,
      );
    }
    if (fieldName) {
      return (response.data as unknown as Record<string, ReturnType>)[fieldName];
    }
    return response.data;
  }

  /**
   * Send a POST request to the Circle SDK API and return the response
   * @param endPoint the API endpoint for the POST request
   * @param params the parameters for the POST request
   * @param fieldName the response field to return (all fields will be returned if omitted)
   * @returns the requested POST response field or the entire response if the `fieldName` parameter was omitted
   */
  protected async postRequest<ReturnType>(
    endPoint: string,
    params: BaseParams,
    fieldName?: string,
  ): Promise<ReturnType> {
    const response = await fetch(`${this.baseUrl}${endPoint}`, {
      ...this.prepareRequestData<BaseParams>(params),
      method: 'post',
    });
    return this.prepareResponseData<ReturnType>(response, fieldName);
  }

  protected async execute<ReturnType>(
    className: string,
    methodName: string,
    methodParams?: any,
  ) {
    return this.postRequest<ReturnType>('/execute', {
      className,
      methodName,
      methodParams,
    });
  }
}
