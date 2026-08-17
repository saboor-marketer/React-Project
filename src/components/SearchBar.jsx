import { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  const handleExampleClick = () => {
    setUsername('octocat');
  };

  return (
    <section className="py-5 px-4 text-center">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="mb-3">
          Turn GitHub Repositories
          <br />
          Into Meaningful Insights
        </h2>
        <p className="text-secondary mb-4" style={{ fontSize: '1.125rem' }}>
          Enter a GitHub username to explore repository performance,
          popularity, languages, and activity.
        </p>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <div className="position-relative" style={{ flex: '1', minWidth: '280px', maxWidth: '500px' }}>
              <svg
                className="position-absolute start-0 top-50 translate-middle-y ms-3"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="currentColor"
                style={{ color: 'var(--text-muted)' }}
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                aria-label="GitHub username"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !username.trim()}
              style={{ minWidth: '120px' }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Analyzing...
                </>
              ) : (
                'Analyze'
              )}
            </button>
          </div>
        </form>

        <button
          onClick={handleExampleClick}
          className="btn btn-ghost btn-sm"
          type="button"
          disabled={loading}
        >
          Try example: <span className="text-accent fw-semibold">octocat</span>
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
