export const objectToUrlParams = (params?: Record<string, unknown>): string => {
  if (!params) return "";
  const urlSearchParams = new URLSearchParams();

  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      urlSearchParams.append(key, String(params[key]));
    }
  }

  return urlSearchParams.toString();
};
