import UserCard from "./UserCard";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import type {
    GitHubSearchResult,
} from "../types/github";

interface UserListProps {
    query: string;
    onSelectUser: (username: string) => void;
}

function UserList({
                      query,
                      onSelectUser,
                  }: UserListProps) {
    const trimmedQuery = query.trim();

    const debouncedQuery = useDebounce(
        trimmedQuery,
        400
    );

    const searchUrl = debouncedQuery
        ? `https://api.github.com/search/users?q=${encodeURIComponent(
            debouncedQuery
        )}`
        : null;

    const searchState =
        useFetch<GitHubSearchResult>(searchUrl);

    if (!debouncedQuery) {
        return (
            <section className="user-list">
                <div className="state-card">
                    <div className="state-icon">⌕</div>

                    <h2>Find GitHub developers</h2>

                    <p>
                        Search by username or keyword to discover
                        GitHub users and explore their repositories.
                    </p>
                </div>
            </section>
        );
    }

    if (searchState.status === "loading") {
        return (
            <section className="user-list">
                <div className="state-card">
                    <div className="loading-spinner" />

                    <h2>Searching GitHub...</h2>

                    <p>
                        Looking for matching developers.
                    </p>
                </div>
            </section>
        );
    }

    if (searchState.status === "error") {
        return (
            <section className="user-list">
                <div className="state-card state-card-error">
                    <div className="state-icon">!</div>

                    <h2>Something went wrong</h2>

                    <p>
                        {searchState.message}
                    </p>

                    <p className="state-hint">
                        Please try again in a moment.
                    </p>
                </div>
            </section>
        );
    }

    if (searchState.status === "success") {
        if (searchState.data.items.length === 0) {
            return (
                <section className="user-list">
                    <div className="state-card">
                        <div className="state-icon">⌕</div>

                        <h2>No users found</h2>

                        <p>
                            We couldn't find any GitHub users matching
                            "{debouncedQuery}".
                        </p>

                        <p className="state-hint">
                            Try a different username or search term.
                        </p>
                    </div>
                </section>
            );
        }

        return (
            <section className="user-list">
                <p>
                    Found {searchState.data.total_count.toLocaleString()} users.
                </p>

                <div className="user-list-grid">
                    {searchState.data.items.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onSelect={onSelectUser}
                        />
                    ))}
                </div>
            </section>
        );
    }

    return null;
}

export default UserList;