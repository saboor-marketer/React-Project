import { getUniqueLanguages } from '../utils/analytics.js';

const RepositoryFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedLanguage, 
  onLanguageChange, 
  sortBy, 
  onSortChange, 
  repositories 
}) => {
  const languages = ['All Languages', ...getUniqueLanguages(repositories)];

  const sortOptions = [
    'Recently Updated',
    'Most Stars',
    'Most Forks',
    'Most Watchers',
    'Highest Popularity',
    'Repository Name'
  ];

  return (
    <div className="card mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label htmlFor="search" className="form-label text-secondary mb-2">
            Search repositories
          </label>
          <div className="position-relative">
            <svg
              className="position-absolute start-0 top-50 translate-middle-y ms-3"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ color: 'var(--text-muted)' }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
            <input
              id="search"
              type="text"
              className="form-control ps-5"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search repositories"
            />
          </div>
        </div>

        <div className="col-md-3">
          <label htmlFor="language" className="form-label text-secondary mb-2">
            Language
          </label>
          <select
            id="language"
            className="form-select"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            aria-label="Filter by language"
          >
            {languages.map(language => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="sort" className="form-label text-secondary mb-2">
            Sort by
          </label>
          <select
            id="sort"
            className="form-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort repositories"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-outline w-100"
            onClick={() => {
              onSearchChange('');
              onLanguageChange('All Languages');
              onSortChange('Recently Updated');
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepositoryFilters;
