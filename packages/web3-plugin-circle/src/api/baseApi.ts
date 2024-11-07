import fetch from "cross-fetch";
import { v4 } from "uuid";
import { objectToUrlParams } from "./utils";

const headers = { "Content-Type": "application/json" };
type ResponseData<ReturnType> = {
  code: number;
  message?: string;
  data: ReturnType;
};
type RequestData = { headers: HeadersInit; body: BodyInit };

interface BaseParams {
  [key: string]: unknown; // Allows any other properties
}
interface PutBaseParams {
  id: string;
  [key: string]: unknown; // Allows any other properties
}
export class BaseApi {
  private baseUrl: string;
  private apiKey: string;
  protected cipherText?: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  get headers(): HeadersInit {
    return {
      ...headers,
      "X-Request-Id": v4(),
      Authorization: `Bearer ${this.apiKey}`,
    };
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
    const response = (await res.json()) as unknown as ResponseData<ReturnType>;
    if (Number(response.code)) {
      throw new Error(response.message);
    }
    if (fieldName) {
      return (response.data as unknown as Record<string, ReturnType>)[
        fieldName
      ];
    }
    return response.data;
  }

  async postRequest<ReturnType>(
    endPoint: string,
    params: BaseParams,
    fieldName?: string,
  ): Promise<ReturnType> {
    const response = await fetch(`${this.baseUrl}${endPoint}`, {
      ...this.prepareRequestData<BaseParams>(params),
      method: "post",
    });

    return this.prepareResponseData<ReturnType>(response, fieldName);
  }
  async putRequest<ReturnType>(
    endPoint: string,
    params: PutBaseParams,
    fieldName?: string,
  ): Promise<ReturnType> {
    const { id, ...rest } = params;

    const response = await fetch(`${this.baseUrl}${endPoint}/${id}`, {
      ...this.prepareRequestData<Omit<PutBaseParams, "id">>(rest),
      method: "put",
    });

    return this.prepareResponseData<ReturnType>(response, fieldName);
  }

  async getRequest<ReturnType>(
    endPoint: string,
    params?: BaseParams,
    fieldName?: string,
  ): Promise<ReturnType> {
    const urlParams = objectToUrlParams(params);

    const response = await fetch(
      `${this.baseUrl}${endPoint}${urlParams ? `?${urlParams}` : ""}`,
      {
        method: "get",
        headers: this.headers,
      },
    );

    return this.prepareResponseData<ReturnType>(response, fieldName);
  }
}
