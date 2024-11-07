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
export class BaseApi {
  private baseUrl: string;
  private apiKey: string;
  protected cipherText?: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }
  registerEntitySecretCiphertext(cipherText: string): void {
    this.cipherText = cipherText;
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

  async postRequest<Params extends Record<string, unknown>, ReturnType>(
    url: string,
    params: Params,
    fieldName?: string,
  ): Promise<ReturnType> {
    return this.prepareResponseData<ReturnType>(
      await fetch(`${this.baseUrl}${url}`, {
        ...this.prepareRequestData<Params>(params),
        method: "post",
      }),
      fieldName,
    );
  }
  async putRequest<
    Params extends { id: string } & Record<string, unknown>,
    ReturnType,
  >(url: string, params: Params, fieldName?: string): Promise<ReturnType> {
    const { id, ...rest } = params;
    return this.prepareResponseData<ReturnType>(
      await fetch(`${this.baseUrl}${url}/${id}`, {
        ...this.prepareRequestData<Omit<Params, "id">>(rest),
        method: "put",
      }),
      fieldName,
    );
  }

  async getRequest<Params extends Record<string, unknown>, ReturnType>(
    url: string,
    params?: Params,
    fieldName?: string,
  ): Promise<ReturnType> {
    const urlParams = objectToUrlParams(params);
    return this.prepareResponseData<ReturnType>(
      await fetch(`${this.baseUrl}${url}${urlParams ? `?${urlParams}` : ""}`, {
        method: "get",
        headers: this.headers,
      }),
      fieldName,
    );
  }
}
