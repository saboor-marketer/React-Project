const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="card mb-4">
      <div className="d-flex flex-column flex-md-row gap-4 align-items-start align-items-md-center">
        <img
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          className="rounded-circle"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
        
        <div className="flex-grow-1">
          <h3 className="h4 mb-1">{profile.name || profile.login}</h3>
          <p className="text-muted mb-2">@{profile.login}</p>
          
          {profile.bio && (
            <p className="mb-3" style={{ fontSize: '0.95rem' }}>
              {profile.bio}
            </p>
          )}
          
          <div className="d-flex flex-wrap gap-3 mb-3">
            {profile.location && (
              <div className="d-flex align-items-center gap-2 text-secondary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                </svg>
                <span>{profile.location}</span>
              </div>
            )}
            
            {profile.company && (
              <div className="d-flex align-items-center gap-2 text-secondary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
                </svg>
                <span>{profile.company}</span>
              </div>
            )}
          </div>
          
          <div className="d-flex flex-wrap gap-3 mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold">{profile.followers}</span>
              <span className="text-secondary">Followers</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold">{profile.following}</span>
              <span className="text-secondary">Following</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold">{profile.public_repos}</span>
              <span className="text-secondary">Public Repositories</span>
            </div>
          </div>
          
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
          >
            View GitHub Profile →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
