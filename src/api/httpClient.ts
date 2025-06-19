const BASE_URL = "https://api.github.com";

export const httpClient = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error! ${response.status}: ${errorBody}`);
  }

  return response.json() as Promise<T>;
};
