import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Link, NavLink, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData, useParams } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { LayoutDashboard, User, Box, ArrowUp, ArrowDown, MoreVertical, DollarSign, Plus } from "lucide-react";
import * as React from "react";
import React__default from "react";
import crypto from "crypto";
import forge from "node-forge";
import fetch from "cross-fetch";
import { v4 } from "uuid";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Slot } from "@radix-ui/react-slot";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const circleLogo = "/assets/circle-logo-D9PjkPMG.svg";
function SidebarNavLink({ to, icon, label }) {
  return /* @__PURE__ */ jsxs(
    NavLink,
    {
      to,
      className: ({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-md ${isActive ? "bg-purple-100 text-purple-700" : "text-gray-600"} hover:bg-purple-50`,
      children: [
        React__default.cloneElement(icon, { size: 20 }),
        label
      ]
    }
  );
}
function Sidebar() {
  return /* @__PURE__ */ jsxs("aside", { className: "bg-white w-64 h-full shadow-md flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "p-6 max-w-[180px]", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("img", { src: circleLogo, alt: "Circle Logo" }) }) }),
    /* @__PURE__ */ jsxs("nav", { className: "flex-1 px-4", children: [
      /* @__PURE__ */ jsx(SidebarNavLink, { to: "/overview", icon: /* @__PURE__ */ jsx(LayoutDashboard, {}), label: "Overview" }),
      /* @__PURE__ */ jsx(SidebarNavLink, { to: "/customers", icon: /* @__PURE__ */ jsx(User, {}), label: "Customers" }),
      /* @__PURE__ */ jsx(SidebarNavLink, { to: "/products", icon: /* @__PURE__ */ jsx(Box, {}), label: "Products" })
    ] })
  ] });
}
const meta = () => {
  return [{ title: "Circle SDK Demo" }];
};
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsx("div", { className: "flex-1 p-12 overflow-y-auto bg-gray-50", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const BASE_URL = "https://api.circle.com/v1/w3s";
const objectToUrlParams = (params) => {
  if (!params)
    return "";
  const urlSearchParams = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== void 0 && params[key] !== null) {
      urlSearchParams.append(key, String(params[key]));
    }
  }
  return urlSearchParams.toString();
};
class BaseApi {
  constructor(apiKey2, baseUrl = BASE_URL) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey2;
  }
  get headers() {
    return {
      "Content-Type": "application/json",
      "X-Request-Id": v4(),
      Authorization: `Bearer ${this.apiKey}`
    };
  }
  addIdempotencyKeyToParams(params) {
    return {
      ...params,
      idempotencyKey: params.idempotencyKey ? params.idempotencyKey : v4()
    };
  }
  prepareRequestData(params) {
    return {
      headers: this.headers,
      body: JSON.stringify({
        ...params
      })
    };
  }
  async prepareResponseData(res, fieldName) {
    const response = await res.json();
    if (Number(response.code)) {
      console.log(response);
      let errorsMsgs = "";
      if (Array.isArray(response.errors)) {
        errorsMsgs = response.errors.map((error) => `${error.message}${error.location ? `(${error.location})` : ""}`).join(", ");
      }
      throw new Error(`${response.code}: ${response.message}.${errorsMsgs ? ` Errors: ${errorsMsgs}` : ""}`);
    }
    if (fieldName) {
      return response.data[fieldName];
    }
    return response.data;
  }
  async postRequest(endPoint, params, fieldName) {
    const response = await fetch(`${this.baseUrl}${endPoint}`, {
      ...this.prepareRequestData(params),
      method: "post"
    });
    return this.prepareResponseData(response, fieldName);
  }
  async putRequest(endPoint, params, fieldName) {
    const { id, ...rest } = params;
    const response = await fetch(`${this.baseUrl}${endPoint}/${id}`, {
      ...this.prepareRequestData(rest),
      method: "put"
    });
    return this.prepareResponseData(response, fieldName);
  }
  async patchRequest(endPoint, params, fieldName) {
    const { id, ...rest } = params;
    const response = await fetch(`${this.baseUrl}${endPoint}/${id}`, {
      ...this.prepareRequestData(rest),
      method: "patch"
    });
    return this.prepareResponseData(response, fieldName);
  }
  async deleteRequest(endPoint, params, fieldName) {
    const { id, ...rest } = params;
    const response = await fetch(`${this.baseUrl}${endPoint}/${id}`, {
      ...this.prepareRequestData(rest),
      method: "delete"
    });
    return this.prepareResponseData(response, fieldName);
  }
  async getRequest(endPoint, params, fieldName) {
    const urlParams = objectToUrlParams(params);
    const response = await fetch(`${this.baseUrl}${endPoint}${urlParams ? `?${urlParams}` : ""}`, {
      method: "get",
      headers: this.headers
    });
    return this.prepareResponseData(response, fieldName);
  }
}
class SecretApi extends BaseApi {
  static generateSecret() {
    return crypto.randomBytes(32).toString("hex");
  }
  static getEntitySecretCiphertext(secret2, pemKey) {
    const entitySecret = forge.util.hexToBytes(secret2);
    const publicKey = forge.pki.publicKeyFromPem(pemKey);
    const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create()
      }
    });
    return forge.util.encode64(encryptedData);
  }
  async getPublicKey() {
    return this.getRequest("/config/entity/publicKey", void 0, "publicKey");
  }
  async getConfig() {
    return this.getRequest("/config/entity");
  }
  async registerEntitySecretCiphertext(entitySecretCiphertext) {
    return this.postRequest("/config/entity/entitySecret", {
      entitySecretCiphertext
    });
  }
}
class DeveloperApi extends BaseApi {
  constructor(apiKey2, secret2, baseUrl = BASE_URL) {
    super(apiKey2, baseUrl);
    this.secret = secret2;
    this.secretApi = new SecretApi(apiKey2, baseUrl);
  }
  setPublicKey(publicKey) {
    this.publicKey = publicKey;
  }
  async generateCipherText() {
    if (!this.secret) {
      throw new Error("Secret key are not set");
    }
    if (!this.publicKey) {
      this.publicKey = await this.secretApi.getPublicKey();
    }
    return SecretApi.getEntitySecretCiphertext(this.secret, this.publicKey);
  }
  async addCipherTextToParams(params) {
    return {
      ...params,
      entitySecretCiphertext: params.entitySecretCiphertext ? params.entitySecretCiphertext : await this.generateCipherText()
    };
  }
  addCipherTextAndIdempotencyKeyToParams(params) {
    return this.addCipherTextToParams(this.addIdempotencyKeyToParams(params));
  }
}
class SignApi extends DeveloperApi {
  async signMessage(params) {
    return this.postRequest("/developer/sign/message", await this.addCipherTextToParams(params), "signature");
  }
  async signTypedData(params) {
    return this.postRequest("/developer/sign/typedData", await this.addCipherTextToParams(params), "signature");
  }
  async signTransaction(params) {
    return this.postRequest("/developer/sign/transaction", await this.addCipherTextToParams(params));
  }
  async signDelegateAction(params) {
    return this.postRequest("/developer/sign/delegateAction", await this.addCipherTextToParams(params));
  }
}
class SmartContractApi extends DeveloperApi {
  async list(params) {
    return this.getRequest("/contracts", params, "contracts");
  }
  async get(id) {
    return this.getRequest(`/contracts/${id}`, void 0, "contract");
  }
  async update(params) {
    return this.patchRequest(`/contracts`, params, "contract");
  }
  async importContract(params) {
    return this.postRequest("/contracts/import", params, "contract");
  }
  async estimateDeployment(params) {
    return this.postRequest("/contracts/deploy/estimateFee", this.prepareAbiParams(params));
  }
  prepareAbiParams(params) {
    const formattedParams = { ...params };
    if (typeof formattedParams.abiJson === "object" && Array.isArray(formattedParams.abiJson)) {
      {
        formattedParams.abiJson = JSON.stringify(formattedParams.abiJson);
      }
    }
    return formattedParams;
  }
  async deploy(params) {
    const data = await this.addCipherTextAndIdempotencyKeyToParams(params);
    return this.postRequest("/contracts/deploy", this.prepareAbiParams(data));
  }
  async query(params) {
    return this.postRequest("/contracts/query", params);
  }
}
class SmartContractEventMonitorApi extends BaseApi {
  async getEventMonitors(params) {
    return this.getRequest("/contracts/monitors", params, "eventMonitors");
  }
  async createEventMonitor(params) {
    return this.postRequest("/contracts/monitors", this.addIdempotencyKeyToParams(params), "eventMonitors");
  }
  async updateEventMonitor(params) {
    return this.putRequest("/contracts/monitors/", params, "eventMonitors");
  }
  async deleteEventMonitor(params) {
    return this.deleteRequest(`/contracts/monitors`, params);
  }
  async getEventLogs(params) {
    return this.getRequest("/contracts/events", params, "eventLogs");
  }
}
class SmartContractTemplateApi extends DeveloperApi {
  async estimateDeploymentFee(params) {
    const { id, ...rest } = params;
    return this.postRequest(`/templates/${id}/deploy/estimateFee`, rest);
  }
  async deployContract(params) {
    const { id, ...rest } = params;
    const data = await this.addCipherTextAndIdempotencyKeyToParams(rest);
    return this.postRequest(`/templates/${id}/deploy`, data);
  }
}
class TokenLookupApi extends BaseApi {
  async get(id) {
    return this.getRequest(`/tokens/${id}`, void 0, "token");
  }
}
class TransactionApi extends DeveloperApi {
  async list(params) {
    return this.getRequest("/transactions", params, "transactions");
  }
  async get(params) {
    const { id, ...rest } = params;
    return this.getRequest(`/transactions/${id}`, rest, "transaction");
  }
  async createTransfer(params) {
    return this.postRequest("/developer/transactions/transfer", await this.addCipherTextAndIdempotencyKeyToParams(params));
  }
  async validateAddress(params) {
    return this.postRequest("/transactions/validateAddress", params, "isValid");
  }
  async estimateContractExecutionFee(params) {
    return this.postRequest("/transactions/contractExecution/estimateFee", params);
  }
  async estimateTransferFee(params) {
    return this.postRequest("/transactions/transfer/estimateFee", params);
  }
  async createContractExecutionTransaction(params) {
    const data = await this.addCipherTextAndIdempotencyKeyToParams(params);
    return this.postRequest("/developer/transactions/contractExecution", data);
  }
  async cancelTransaction(params) {
    const { id, ...rest } = params;
    return this.postRequest(`/developer/transactions/${id}/cancel`, await this.addCipherTextAndIdempotencyKeyToParams(rest));
  }
  async accelerateTransaction(params) {
    const { id, ...rest } = params;
    return this.postRequest(`/developer/transactions/${id}/accelerate`, await this.addCipherTextAndIdempotencyKeyToParams(rest));
  }
}
class WalletApi extends DeveloperApi {
  async create(params) {
    return this.postRequest("/developer/wallets", await this.addCipherTextAndIdempotencyKeyToParams(params), "wallets");
  }
  async list(params) {
    return this.getRequest("/wallets", params, "wallets");
  }
  async get(id) {
    return this.getRequest(`/wallets/${id}`, void 0, "wallet");
  }
  async update(params) {
    return this.putRequest("/wallets", params, "wallet");
  }
  async balance(params) {
    const { id, ...rest } = params;
    return this.getRequest(`/wallets/${id}/balances`, rest, "tokenBalances");
  }
  async nfts(params) {
    const { id, ...rest } = params;
    return this.getRequest(`/wallets/${id}/nfts`, rest, "nfts");
  }
}
class WalletSetApi extends DeveloperApi {
  async create(params) {
    const data = await this.addCipherTextAndIdempotencyKeyToParams(params);
    if (params.name) {
      data.name = params.name;
    }
    return this.postRequest("/developer/walletSets", data, "walletSet");
  }
  async update(params) {
    return this.putRequest(`/developer/walletSets`, params, "walletSet");
  }
  async list(params) {
    return this.getRequest("/walletSets", params, "walletSets");
  }
  async get(id) {
    return this.getRequest(`/walletSets/${id}`, void 0, "walletSet");
  }
}
class CircleSDK {
  constructor(apiKey2, secret2, baseUrl = BASE_URL) {
    this._apiKey = apiKey2;
    this._secret = secret2;
    this._baseUrl = baseUrl;
    this.secret = new SecretApi(this._apiKey, this._baseUrl);
    this.sign = new SignApi(this._apiKey, this._secret, this._baseUrl);
    this.smartContract = new SmartContractApi(this._apiKey, this._secret, this._baseUrl);
    this.smartContractEventMonitor = new SmartContractEventMonitorApi(this._apiKey, this._baseUrl);
    this.smartContractTemplate = new SmartContractTemplateApi(this._apiKey, this._secret, this._baseUrl);
    this.tokenLookup = new TokenLookupApi(this._apiKey, this._baseUrl);
    this.transaction = new TransactionApi(this._apiKey, this._secret, this._baseUrl);
    this.wallet = new WalletApi(this._apiKey, this._secret, this._baseUrl);
    this.walletSet = new WalletSetApi(this._apiKey, this._secret, this._baseUrl);
  }
  async init() {
    try {
      const publicKey = await this.secret.getPublicKey();
      this.sign.setPublicKey(publicKey);
      this.smartContract.setPublicKey(publicKey);
      this.smartContractTemplate.setPublicKey(publicKey);
      this.transaction.setPublicKey(publicKey);
      this.wallet.setPublicKey(publicKey);
      this.walletSet.setPublicKey(publicKey);
    } catch (e) {
      throw new Error(`Circle SDK Init error: PublicKey fetch error. ${e.message}`);
    }
  }
}
const apiKey = process.env.CIRCLE_API_KEY;
const secret = process.env.CIRCLE_SECRET;
const sdk = new CircleSDK(apiKey, secret);
async function loader$1() {
  return sdk.walletSet.list();
}
function WalletOverview() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-16", children: data.map((walletSet) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { children: walletSet.name }) }, walletSet.id)) }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WalletOverview,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function loader({ params }) {
  const { id } = params;
  console.log("id", id);
  return [];
}
function WalletDetailsPage() {
  const { id } = useParams();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { children: "Details" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "You are viewing details for item with ID: ",
      id
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WalletDetailsPage,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function Page$2() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { children: "Customers" }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$2
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function BalanceChangeBadge({
  currentBalance,
  previousBalance
}) {
  if (currentBalance === previousBalance) {
    return /* @__PURE__ */ jsx(Badge, { className: "bg-gray-500 pointer-events-none hover:bg-transparent", children: "0%" });
  }
  const isBalanceIncreased = currentBalance > previousBalance;
  const difference = Number(
    (currentBalance - previousBalance) * BigInt(100) / previousBalance
  );
  const badgeColor = isBalanceIncreased ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
  return /* @__PURE__ */ jsxs(Badge, { className: cn(badgeColor, "px-1 pointer-events-none hover:bg-transparent"), children: [
    isBalanceIncreased ? /* @__PURE__ */ jsx(ArrowUp, { size: 12 }) : /* @__PURE__ */ jsx(ArrowDown, { size: 12 }),
    /* @__PURE__ */ jsx("span", { className: "ml-1", children: `${difference.toFixed(1)}%` })
  ] });
}
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-2xl bg-card text-card-foreground", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("flex flex-col space-y-1.5 p-6", className),
      ...props
    }
  )
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("text-2xl font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
function UsdcIcon({ size = 32 }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 223.576 223.576",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M111.788 0c61.74 0 111.788 50.05 111.788 111.788s-50.049 111.788-111.788 111.788S0 173.527 0 111.788 50.05 0 111.788 0Z",
            style: {
              fillRule: "evenodd",
              strokeWidth: 0,
              fill: "#2775ca"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M137.33 33.073c-2.52-.805-4.581.691-4.581 3.338v6.509c0 1.774 1.337 3.794 3.003 4.404 26.757 9.8 45.904 35.519 45.904 65.629s-19.147 55.827-45.904 65.628c-1.827.67-3.003 2.459-3.003 4.405v6.508c0 2.646 2.06 4.143 4.582 3.338 33.813-10.804 58.298-42.482 58.298-79.88s-24.485-69.075-58.298-79.878Zm-46.502 3.338c0-2.647-2.061-4.143-4.582-3.338-33.814 10.804-58.299 42.482-58.299 79.88s24.485 69.075 58.299 79.879c2.52.805 4.582-.692 4.582-3.338v-6.508c0-1.775-1.337-3.795-3.004-4.405-26.756-9.8-45.903-35.519-45.903-65.628s19.147-55.828 45.903-65.629c1.667-.61 3.004-2.63 3.004-4.404v-6.51Zm24.454 20.648h-6.987a3.493 3.493 0 0 0-3.493 3.493v10.823C90.95 73.344 81.997 82.56 81.997 94.386c0 15.307 9.253 21.246 28.783 23.874 13.25 2.17 17.021 5.024 17.021 12.564 0 7.539-6.4 12.565-15.42 12.565-12.197 0-16.211-5.338-17.692-12.246-.35-1.637-1.752-2.833-3.426-2.833h-7.969c-2.007 0-3.576 1.808-3.231 3.785 2.029 11.629 9.497 20.16 24.739 22.228v11.03a3.494 3.494 0 0 0 3.493 3.494h6.987a3.494 3.494 0 0 0 3.493-3.494v-11.035c14.429-2.292 23.647-12.337 23.647-24.75 0-16.334-9.938-21.818-29.13-24.444-14.163-2.056-16.902-5.37-16.902-11.995 0-6.28 4.796-10.737 14.049-10.737 8.369 0 13.182 2.92 15.17 9.656.444 1.503 1.79 2.566 3.357 2.566h7.349c2.049 0 3.644-1.883 3.207-3.886-2.327-10.644-9.5-17.031-20.747-19.046v-11.13a3.493 3.493 0 0 0-3.493-3.493Z",
            style: {
              fillRule: "evenodd",
              strokeWidth: 0,
              fill: "#fff"
            }
          }
        )
      ]
    }
  );
}
function formatBalance(balance) {
  return `$${balance.toString()}`;
}
function getInitials(fullName) {
  return fullName.split(" ").map((word) => word[0].toUpperCase()).join("");
}
const pieChart = "data:image/svg+xml,%3csvg%20width='200'%20height='200'%20viewBox='0%200%2042%2042'%20xmlns='http://www.w3.org/2000/svg'%20style='transform:%20rotate(-90deg)'%3e%3c!--%20Background%20circle%20--%3e%3ccircle%20cx='21'%20cy='21'%20r='15.915'%20fill='transparent'%20stroke='%23EDE9FE'%20stroke-width='5'%20/%3e%3c!--%20Filled%20segments%20--%3e%3ccircle%20cx='21'%20cy='21'%20r='15.915'%20fill='transparent'%20stroke='%23A78BFA'%20stroke-width='5'%20stroke-dasharray='75%2025'%20stroke-dashoffset='0'%20/%3e%3c/svg%3e";
function DonutChart() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { src: pieChart, alt: "Donut Chart" }) });
}
function MenuButton$1() {
  return /* @__PURE__ */ jsx("button", { className: "text-gray-400 hover:text-gray-600", "aria-label": "Menu", children: /* @__PURE__ */ jsx(MoreVertical, { size: 20 }) });
}
function WalletCard({
  title,
  user,
  currentBalance,
  previousBalance
}) {
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 flex items-center gap-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 max-w-[30%]", children: /* @__PURE__ */ jsx(DonutChart, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: title }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "w-8 h-8", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar }),
              /* @__PURE__ */ jsx(AvatarFallback, { children: getInitials(user.name) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: user.name })
          ] })
        ] }),
        /* @__PURE__ */ jsx(MenuButton$1, {})
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-gray-500", children: "Current balance" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(UsdcIcon, { size: 24 }),
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-semibold text-gray-900", children: formatBalance(currentBalance) }),
        previousBalance ? /* @__PURE__ */ jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsx(
          BalanceChangeBadge,
          {
            currentBalance,
            previousBalance
          }
        ) }) : null
      ] })
    ] })
  ] });
}
function BalanceCard({ balance }) {
  return /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Your balance (USDC)" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(UsdcIcon, { size: 32 }),
      /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-gray-900", children: formatBalance(balance) })
    ] })
  ] });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
function PageHeader() {
  return /* @__PURE__ */ jsxs("header", { className: "flex justify-between items-center mb-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Overview" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Welcome back!" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsx(DollarSign, {}),
        " Invest"
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsx(ArrowDown, {}),
        " Receive"
      ] }),
      /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(ArrowUp, {}),
        " Send"
      ] })
    ] })
  ] });
}
function MenuButton() {
  return /* @__PURE__ */ jsx("button", { className: "text-gray-400 hover:text-gray-600", "aria-label": "Menu", children: /* @__PURE__ */ jsx(MoreVertical, { size: 20 }) });
}
function TransactionRow({
  logo,
  title,
  subtitle,
  amount,
  isPositive
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 border-b last:border-b-0 border-gray-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: logo, alt: title, className: "w-10 h-10 rounded-full" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: `text-sm ${isPositive ? "text-green-600" : "text-red-600"}`, children: isPositive ? `+ ${formatBalance(amount)}` : `- ${formatBalance(amount)}` })
  ] });
}
const transactions = [
  {
    logo: "https://github.com/chainsafe.png",
    title: "Consulting Fee",
    subtitle: "Chainsafe",
    amount: BigInt(3244e3),
    // '$3,244.00',
    isPositive: true
  },
  {
    logo: "https://github.com/chainsafe.png",
    title: "DAO Treasury Payment",
    subtitle: "Arbitrum Foundation",
    amount: BigInt(2326e3),
    isPositive: false
  },
  {
    logo: "https://github.com/chainsafe.png",
    title: "Sprinter Consulting Fee",
    subtitle: "Sprinter",
    amount: BigInt(140800),
    isPositive: true
  },
  {
    logo: "https://github.com/chainsafe.png",
    title: "Sprinter Consulting Fee",
    subtitle: "Sprinter",
    amount: BigInt(628e3),
    isPositive: true
  }
];
function RecentTransactionsCard() {
  return /* @__PURE__ */ jsxs(Card, { className: "p-6 pb-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Recent Transactions" }),
      /* @__PURE__ */ jsx(MenuButton, {})
    ] }),
    transactions.map((transaction, index) => /* @__PURE__ */ jsx(TransactionRow, { ...transaction }, index))
  ] });
}
function WalletRow({
  gradient,
  name,
  address,
  leaderName,
  leaderAvatar,
  balance
}) {
  return /* @__PURE__ */ jsxs("tr", { className: "border-b last:border-0 border-gray-200", children: [
    /* @__PURE__ */ jsxs("td", { className: "flex items-center gap-3 py-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full", style: { background: gradient } }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900", children: name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: address })
      ] })
    ] }),
    /* @__PURE__ */ jsx("td", { className: "text-left", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: leaderAvatar, alt: leaderName, className: "w-8 h-8 rounded-full" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-900", children: leaderName })
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "text-right", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-green-600", children: formatBalance(balance) }) }),
    /* @__PURE__ */ jsx("td", { className: "text-right", children: /* @__PURE__ */ jsx(MenuButton, {}) })
  ] });
}
const wallets = [
  {
    gradient: "linear-gradient(135deg, #7DE2DC, #A5ECA7)",
    name: "Gaming Wallet",
    address: "0xF89b...2AdC58",
    leaderName: "Theresa Lambert",
    leaderAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
    balance: BigInt(323221)
  },
  {
    gradient: "linear-gradient(135deg, #7A7CF6, #9A73EA)",
    name: "DevTooling Wallet",
    address: "0xAc67...C02B50",
    leaderName: "Joseph Clinton",
    leaderAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    balance: BigInt(1404)
  },
  {
    gradient: "linear-gradient(135deg, #FA8C7A, #FDA87A)",
    name: "Protocol Wallet",
    address: "0xBf22...D91V67",
    leaderName: "Bill Mos",
    leaderAvatar: "https://randomuser.me/api/portraits/men/30.jpg",
    balance: BigInt(221335)
  }
];
function WalletsCard() {
  return /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Your Wallets" }),
        /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 text-green-700 px-1 pointer-events-none hover:bg-transparent", children: "10/20 Compliant" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, {}),
        " New Wallet"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "w-full table-auto", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-sm text-gray-500 border-b border-gray-200", children: [
        /* @__PURE__ */ jsx("th", { className: "py-2 font-normal", children: "Wallet" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 font-normal", children: "Program Leader" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 font-normal text-right", children: "Balance (USDC)" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: wallets.map((wallet, index) => /* @__PURE__ */ jsx(WalletRow, { ...wallet }, index)) })
    ] })
  ] });
}
function Overview() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, {}),
    /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(BalanceCard, { balance: BigInt(1e6) }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Active Wallets" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8", children: [
        /* @__PURE__ */ jsx(
          WalletCard,
          {
            title: "Interop Wallet",
            user: { name: "Rob McIntosh", avatar: "https://github.com/shadcn.png" },
            currentBalance: BigInt(121e3),
            previousBalance: BigInt(1e5)
          }
        ),
        /* @__PURE__ */ jsx(
          WalletCard,
          {
            title: "R&D Wallet",
            user: { name: "Theresa Lambert", avatar: "https://github.com/chainsafe.png" },
            currentBalance: BigInt(11e4),
            previousBalance: BigInt(12e4)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx(WalletsCard, {}) }),
      /* @__PURE__ */ jsx(RecentTransactionsCard, {})
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Overview
}, Symbol.toStringTag, { value: "Module" }));
function Page$1() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { children: "Products" }) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$1
}, Symbol.toStringTag, { value: "Module" }));
function Page() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { children: "Welcome to Circle" }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CiGFc_th.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/index-BlA7Mg33.js", "/assets/index-BvnfiDyM.js", "/assets/components-DLJPF6N_.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-BsX9ihH9.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/index-BlA7Mg33.js", "/assets/index-BvnfiDyM.js", "/assets/components-DLJPF6N_.js", "/assets/createLucideIcon-C4w8rdXb.js"], "css": ["/assets/root-mJg7LaeT.css"] }, "routes/overview-tmp": { "id": "routes/overview-tmp", "parentId": "root", "path": "overview-tmp", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/overview-tmp-DuN8bptK.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/components-DLJPF6N_.js", "/assets/index-BlA7Mg33.js", "/assets/index-BvnfiDyM.js"], "css": [] }, "routes/details.$id": { "id": "routes/details.$id", "parentId": "root", "path": "details/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/details._id-DfnVKQdK.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/index-BvnfiDyM.js"], "css": [] }, "routes/customers": { "id": "routes/customers", "parentId": "root", "path": "customers", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/customers-BKt1EHzn.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js"], "css": [] }, "routes/overview": { "id": "routes/overview", "parentId": "root", "path": "overview", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-CX3_wn2O.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/createLucideIcon-C4w8rdXb.js", "/assets/index-BlA7Mg33.js"], "css": [] }, "routes/products": { "id": "routes/products", "parentId": "root", "path": "products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/products-BN1ZX69m.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-lO4ih-Wp.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js"], "css": [] } }, "url": "/assets/manifest-e2d0f559.js", "version": "e2d0f559" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/overview-tmp": {
    id: "routes/overview-tmp",
    parentId: "root",
    path: "overview-tmp",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/details.$id": {
    id: "routes/details.$id",
    parentId: "root",
    path: "details/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/customers": {
    id: "routes/customers",
    parentId: "root",
    path: "customers",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/overview": {
    id: "routes/overview",
    parentId: "root",
    path: "overview",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/products": {
    id: "routes/products",
    parentId: "root",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
