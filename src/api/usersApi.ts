import { USERS_API_ENDPOINT } from "../Constants";
import { GithubUserResponse } from "../types/user";
import { httpClient } from "./httpClient";

export const getUsers = async (query: string): Promise<GithubUserResponse> => {
  const encodedQuery = encodeURIComponent(query);
  const response = await httpClient<GithubUserResponse>(
    `${USERS_API_ENDPOINT}?q=${encodedQuery}`,
    {
      method: "GET",
    }
  );
  return response;
};
