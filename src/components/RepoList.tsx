import RepoCard from "./RepoCard";
import type { GitHubRepo } from "../types/github";

interface RepoListProps {
    repos: GitHubRepo[];
}

function RepoList({
                      repos,
                  }: RepoListProps) {
    if (repos.length === 0) {
        return (
            <section className="repo-list">
                <h2>Recently Updated Repositories</h2>

                <div className="state-card">
                    <div className="state-icon">⌘</div>

                    <h2>No public repositories</h2>

                    <p>
                        This GitHub user doesn't currently have any
                        public repositories.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="repo-list">
            <h2>Recently Updated Repositories</h2>

            <div className="repo-grid">
                {repos.map((repo) => (
                    <RepoCard
                        key={repo.id}
                        repo={repo}
                    />
                ))}
            </div>
        </section>
    );
}

export default RepoList;