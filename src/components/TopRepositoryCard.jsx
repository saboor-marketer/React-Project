import { formatNumber, formatNumberWithCommas } from '../utils/formatters.js';
import { formatRelativeDate } from '../utils/dateUtils.js';
import { calculatePopularityScore } from '../utils/analytics.js';

const TopRepositoryCard = ({ repository, rank }) => {
  if (!repository) return null;

  const popularityScore = calculatePopularityScore(repository);

  return (
    <div className={`card ${rank === 1 ? 'border-primary' : ''}`} style={{ height: '100%' }}>
      <div className="d-flex flex-column h-100">
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="badge badge-primary fw-bold" style={{ fontSize: '1.5rem', minWidth: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {String(rank).padStart(2, '0')}
            </span>
          </div>
          {repository.language && (
            <span className="badge badge-primary">{repository.language}</span>
          )}
        </div>

        <h4 className="h5 mb-2">
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            {repository.name}
          </a>
        </h4>

        {repository.description && (
          <p className="text-secondary mb-3" style={{ fontSize: '0.9rem', flex: 1 }}>
            {repository.description}
          </p>
        )}

        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="d-flex align-items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ color: '#e3b341' }}>
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.245 2.188a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.245-2.188-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
            </svg>
            <span className="fw-semibold">{formatNumber(repository.stargazers_count)}</span>
            <span className="text-secondary">Stars</span>
          </div>

          <div className="d-flex align-items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.5 2.5 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.5 2.5 0 1 1 1.5 0ZM5 3.25a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM5 10.25a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"></path>
            </svg>
            <span className="fw-semibold">{formatNumber(repository.forks_count)}</span>
            <span className="text-secondary">Forks</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-between mb-1">
            <span className="text-secondary" style={{ fontSize: '0.8rem' }}>Popularity Score</span>
            <span className="badge badge-primary" title="Calculated using GitHub stars, forks, and watchers">
              {formatNumberWithCommas(popularityScore)}
            </span>
          </div>
          <div className="progress" style={{ height: '4px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${Math.min((popularityScore / 5000) * 100, 100)}%`, backgroundColor: 'var(--accent)' }}
              aria-valuenow={popularityScore}
              aria-valuemin="0"
              aria-valuemax="5000"
            ></div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-auto">
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>
            {formatRelativeDate(repository.updated_at)}
          </span>
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >
            View Repository →
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopRepositoryCard;
