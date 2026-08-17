const EmptyState = ({ type, onReset }) => {
  const getContent = () => {
    switch (type) {
      case 'no-repositories':
        return {
          icon: (
            <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
            </svg>
          ),
          title: 'No public repositories',
          message: 'This user has no public repositories to analyze.'
        };
      case 'no-search-results':
        return {
          icon: (
            <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
          ),
          title: 'No repositories found',
          message: 'No repositories match your search criteria. Try adjusting your filters.'
        };
      case 'no-language-results':
        return {
          icon: (
            <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
            </svg>
          ),
          title: 'No repositories with this language',
          message: 'No repositories use the selected programming language.'
        };
      default:
        return {
          icon: (
            <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
            </svg>
          ),
          title: 'No data available',
          message: 'There is no data to display at this time.'
        };
    }
  };

  const content = getContent();

  return (
    <div className="card text-center py-5">
      <div className="mb-4 d-flex justify-content-center">
        {content.icon}
      </div>
      
      <h3 className="h5 mb-3">{content.title}</h3>
      
      <p className="text-secondary mb-4">
        {content.message}
      </p>
      
      {onReset && (
        <button
          onClick={onReset}
          className="btn btn-outline"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
