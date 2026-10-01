import ProfileView from "./ProfileView";
import { useFetch } from "../hooks/useFetch";
import type {
    GitHubRepo,
    GitHubUser,
} from "../types/github";

interface UserProfileProps {
    username: string;
    onBack: () => void;
}

function UserProfile({
                         username,
                         onBack,
                     }: UserProfileProps) {
    const userUrl =
        `https://api.github.com/users/${encodeURIComponent(username)}`;

    const reposUrl =
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`;

    const userState =
        useFetch<GitHubUser>(userUrl);

    const reposState =
        useFetch<GitHubRepo[]>(reposUrl);

    if (
        userState.status === "loading" ||
        reposState.status === "loading"
    ) {
        return (
            <section className="profile-loading">
                <div className="loading-spinner" />

                <h2>Loading profile...</h2>

                <p>
                    Fetching profile information and repositories.
                </p>
            </section>
        );
    }

    if (userState.status === "error") {
        return (
            <section className="profile-error">
                <div className="state-icon">!</div>

                <h2>Unable to load profile</h2>

                <p>
                    {userState.message}
                </p>

                <button
                    type="button"
                    onClick={onBack}
                >
                    ← Back to search
                </button>
            </section>
        );
    }

    if (reposState.status === "error") {
        return (
            <section className="profile-error">
                <div className="state-icon">!</div>

                <h2>Unable to load repositories</h2>

                <p>
                    {reposState.message}
                </p>

                <button
                    type="button"
                    onClick={onBack}
                >
                    ← Back to search
                </button>
            </section>
        );
    }

    if (
        userState.status === "success" &&
        reposState.status === "success"
    ) {
        return (
            <ProfileView
                user={userState.data}
                repos={reposState.data}
                onBack={onBack}
            />
        );
    }

    return null;
}

export default UserProfile;