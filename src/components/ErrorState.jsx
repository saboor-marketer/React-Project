const ErrorState = ({ error, onRetry }) => {
  if (!error) return null;

  const getIcon = () => {
    switch (error.title) {
      case 'GitHub user not found':
        return (
          <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
        );
      case 'GitHub API rate limit reached':
        return (
          <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--warning)' }}>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
          </svg>
        );
      case 'Unable to connect to GitHub':
        return (
          <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--danger)' }}>
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
          </svg>
        );
      default:
        return (
          <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
        );
    }
  };

  return (
    <div className="container py-5">
      <div className="card text-center py-5" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="mb-4 d-flex justify-content-center">
          {getIcon()}
        </div>
        
        <h3 className="h4 mb-3">{error.title}</h3>
        
        <p className="text-secondary mb-4">
          {error.message}
        </p>
        
        <button
          onClick={onRetry}
          className="btn btn-primary"
        >
          {error.action}
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
