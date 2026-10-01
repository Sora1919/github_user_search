import RepoList from "./RepoList";
import type {
    GitHubRepo,
    GitHubUser,
} from "../types/github";

interface ProfileViewProps {
    user: GitHubUser;
    repos: GitHubRepo[];
    onBack: () => void;
}

function ProfileView({
                         user,
                         repos,
                         onBack,
                     }: ProfileViewProps) {
    return (
        <section className="profile-view">
            <button
                type="button"
                onClick={onBack}
            >
                ← Back to search
            </button>

            <div className="profile-header">
                <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    width={120}
                    height={120}
                />

                <div>
                    <h1>
                        {user.name ?? user.login}
                    </h1>

                    <p>@{user.login}</p>

                    {user.bio && (
                        <p>{user.bio}</p>
                    )}

                    {user.location && (
                        <p>📍 {user.location}</p>
                    )}

                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View GitHub profile
                    </a>
                </div>
            </div>

            <div className="profile-stats">
                <div>
                    <strong>
                        {user.followers.toLocaleString()}
                    </strong>
                    <span>Followers</span>
                </div>

                <div>
                    <strong>
                        {user.following.toLocaleString()}
                    </strong>
                    <span>Following</span>
                </div>

                <div>
                    <strong>
                        {user.public_repos.toLocaleString()}
                    </strong>
                    <span>Repositories</span>
                </div>
            </div>

            <RepoList repos={repos} />
        </section>
    );
}

export default ProfileView;