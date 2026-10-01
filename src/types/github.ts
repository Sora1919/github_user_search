export interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name: string | null;
    bio: string | null;
    location: string | null;
    followers: number;
    following: number;
    public_repos: number;
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    updated_at: string;
}

export interface GitHubSearchResult {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubSearchUser[];
}

export interface GitHubSearchUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

export type FetchState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; message: string };