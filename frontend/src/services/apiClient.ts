import type { ApiResponse } from "../types/dashboard";

const DEFAULT_API_BASE_URL = "http://localhost:8090/api";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? DEFAULT_API_BASE_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getJson<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${apiBaseUrl}${path}`);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new ApiError(error instanceof Error ? error.message : "Network request failed");
  }

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const body = (await response.json()) as ApiResponse<unknown>;
      errorMessage = body.error ?? errorMessage;
    } catch {
      // Keep the status-based message when an error response is not JSON.
    }
    throw new ApiError(errorMessage, response.status);
  }

  const body = (await response.json()) as ApiResponse<T>;
  if (body.success !== true) {
    throw new ApiError(body.error ?? "API response reported failure");
  }
  if (body.data === undefined) {
    throw new ApiError("API response did not include data");
  }
  return body.data;
}
