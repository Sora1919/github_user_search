import type { GitHubSearchUser } from "../types/github";

interface UserCardProps {
    user: GitHubSearchUser;
    onSelect: (username: string) => void;
}

function UserCard({
                      user,
                      onSelect,
                  }: UserCardProps) {
    return (
        <button
            type="button"
            className="user-card"
            onClick={() => onSelect(user.login)}
        >
            <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                width={64}
                height={64}
            />

            <span>{user.login}</span>
        </button>
    );
}

export default UserCard;