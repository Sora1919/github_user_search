import type { GitHubRepo } from "../types/github";

interface RepoCardProps {
    repo: GitHubRepo;
}

function RepoCard({
                      repo,
                  }: RepoCardProps) {
    return (
        <article className="repo-card">
            <h3>{repo.name}</h3>

            <p>
                {repo.description ?? "No description provided."}
            </p>

            <div className="repo-meta">

                <span>
                  ⭐ {repo.stargazers_count}
                </span>

                <span>
                    {repo.language ?? "Unknown language"}
                </span>

                <span>
                  Updated:{" "}
                  {new Date(repo.updated_at).toLocaleDateString()}
                </span>

            </div>

                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    View repository
                </a>
        </article>
    );
}

export default RepoCard;