import { formatNumber, formatNumberWithCommas } from '../utils/formatters.js';
import { formatRelativeDate } from '../utils/dateUtils.js';
import { calculatePopularityScore } from '../utils/analytics.js';

const RepositoryTable = ({ repositories }) => {
  if (!repositories || repositories.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Repository</th>
              <th>Language</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Watchers</th>
              <th>Issues</th>
              <th>Popularity</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {repositories.map((repo) => {
              const popularityScore = calculatePopularityScore(repo);
              
              return (
                <tr key={repo.id}>
                  <td>
                    <div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fw-semibold text-decoration-none"
                      >
                        {repo.name}
                      </a>
                      {repo.description && (
                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                          {repo.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {repo.language ? (
                      <span className="badge badge-primary">{repo.language}</span>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ color: '#e3b341' }}>
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.245 2.188a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.245-2.188-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                      </svg>
                      <span>{formatNumber(repo.stargazers_count)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.5 2.5 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.5 2.5 0 1 1 1.5 0ZM5 3.25a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM5 10.25a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"></path>
                      </svg>
                      <span>{formatNumber(repo.forks_count)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
                        <path d="M8 2a1.5 1.5 0 0 1 1.5 1.5V4h1a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 1 11.5v-6A1.5 1.5 0 0 1 2.5 4h1V3.5A1.5 1.5 0 0 1 5 2a1.5 1.5 0 0 1 1.5 1.5V4h1V3.5A1.5 1.5 0 0 1 8 2ZM3.5 5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-8Z"></path>
                      </svg>
                      <span>{formatNumber(repo.watchers_count)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
                        <path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.075 1.038.848 2.407 1.24 3.016 1.24.609 0 1.978-.392 3.016-1.24.56-.45.984-1.09.984-2.075C12 3.19 10.363 1.5 8 1.5ZM8 0c3.095 0 5.5 2.284 5.5 5.25 0 1.378-.633 2.628-1.672 3.693-1.276 1.312-3.086 1.833-3.828 1.833-.742 0-2.552-.521-3.828-1.833C2.633 7.878 2 6.628 2 5.25 2 2.284 4.405 0 8 0Z"></path>
                        <path d="M7 10.5v-2h2v2H7Zm0 3v-2h2v2H7Z"></path>
                      </svg>
                      <span>{formatNumber(repo.open_issues_count)}</span>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="badge badge-primary" 
                      title="Calculated using GitHub stars, forks, and watchers"
                    >
                      {formatNumberWithCommas(popularityScore)}
                    </span>
                  </td>
                  <td>
                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                      {formatRelativeDate(repo.updated_at)}
                    </span>
                  </td>
                  <td>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                      aria-label={`View ${repo.name} repository`}
                    >
                      View →
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepositoryTable;
