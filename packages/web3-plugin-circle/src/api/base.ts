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
export class Api {
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
  ): Promise<ReturnType> {
    const response = (await res.json()) as unknown as ResponseData<ReturnType>;
    if (Number(response.code)) {
      throw new Error(response.message);
    }
    return response.data;
  }

  async postRequest<Params extends Record<string, unknown>, ReturnType>(
    url: string,
    params: Params,
  ): Promise<ReturnType> {
    return this.prepareResponseData<ReturnType>(
      await fetch(`${this.baseUrl}${url}`, {
        ...this.prepareRequestData<Params>(params),
        method: "post",
      }),
    );
  }
  async putRequest<Params extends Record<string, unknown>, ReturnType>(
    url: string,
    params: Params,
  ): Promise<ReturnType> {
    return this.prepareResponseData<ReturnType>(
      await fetch(`${this.baseUrl}${url}`, {
        ...this.prepareRequestData<Params>(params),
        method: "put",
      }),
    );
  }

  async getRequest<Params extends Record<string, unknown>, ReturnType>(
    url: string,
    params?: Params,
  ): Promise<ReturnType> {
    const urlParams = objectToUrlParams(params);
    return this.prepareResponseData<ReturnType>(
      await fetch(`${this.baseUrl}${url}${urlParams ? `?${urlParams}` : ""}`, {
        method: "get",
        headers: this.headers,
      }),
    );
  }
}
