import type { z } from "astro/zod";
import { getSecret } from "astro:env/server";
import { ErrorResponse } from "f1racepanel-server";

interface APIResult<T> {
  status: number,
  content?: T,
  error?: ErrorResponse
}

export const getFromV1API = async <T extends z.ZodTypeAny>(endpoint: string, schema: T): Promise<APIResult<z.infer<T>>> => {
  const API_URL = getSecret("API_URL");
  const API_ENDPOINT_URL = `${API_URL}/${endpoint}`;

  const res = await fetch(API_ENDPOINT_URL);
  const resJSON = await res.json();

  if (res.status != 200) {
    return {
      status: res.status,
      error: ErrorResponse.parse(resJSON)
    }
  }

  return {
    status: res.status,
    content: schema.parse(resJSON) as z.infer<T>
  };
}
