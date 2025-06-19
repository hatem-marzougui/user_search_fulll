export type User = {
  id: number;
  login: string;
  avatar_url: string;
};

export type GithubUserResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
};
