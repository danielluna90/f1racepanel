import type { ZodType } from "astro/zod";
import { getSecret } from "astro:env/server";
import { ErrorResponse } from "f1racepanel-server";

interface APIResult<T> {
  status: number,
  content: T
}

export const getFromV1API = async <T extends ZodType>(endpoint: string, schema: T): Promise<APIResult<T | ErrorResponse>> => {
  const API_URL = getSecret("API_URL");
  const API_ENDPOINT_URL = `${API_URL}/${endpoint}`;

  const res = await fetch(API_ENDPOINT_URL);
  const resJSON = await res.json();

  console.log(resJSON);

  if (res.status != 200) {
    return {
      status: res.status,
      content: ErrorResponse.parse(resJSON)
    }
  }

  return {
    status: res.status,
    content: schema.parse(resJSON)
  };
}
