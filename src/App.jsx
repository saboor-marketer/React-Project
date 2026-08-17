import { useState, useMemo } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import StatCard from './components/StatCard.jsx';
import TopRepositoryCard from './components/TopRepositoryCard.jsx';
import LanguageChart from './components/LanguageChart.jsx';
import ActivityChart from './components/ActivityChart.jsx';
import RepositoryTable from './components/RepositoryTable.jsx';
import RepositoryFilters from './components/RepositoryFilters.jsx';
import LoadingSkeleton from './components/LoadingSkeleton.jsx';
import ErrorState from './components/ErrorState.jsx';
import EmptyState from './components/EmptyState.jsx';
import { useGithub } from './hooks/useGithub.js';
import {
  calculateTotalStars,
  calculateTotalForks,
  calculateTotalWatchers,
  getTopRepositories,
  getMostStarredRepository,
  getUniqueLanguages,
  getPopularRepositories,
  filterRepositories,
  sortRepositories,
  generateInsights
} from './utils/analytics.js';
import { formatNumber } from './utils/formatters.js';

function App() {
  const { profile, repositories, loading, error, fetchUserData, resetError, clearData } = useGithub();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [sortBy, setSortBy] = useState('Recently Updated');

  const handleSearch = (username) => {
    setSearchTerm('');
    setSelectedLanguage('All Languages');
    setSortBy('Recently Updated');
    fetchUserData(username);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('All Languages');
    setSortBy('Recently Updated');
  };

  const filteredAndSortedRepositories = useMemo(() => {
    let filtered = filterRepositories(repositories, searchTerm, selectedLanguage);
    filtered = sortRepositories(filtered, sortBy);
    return filtered;
  }, [repositories, searchTerm, selectedLanguage, sortBy]);

  const analytics = useMemo(() => {
    if (!repositories || repositories.length === 0) return null;

    return {
      totalStars: calculateTotalStars(repositories),
      totalForks: calculateTotalForks(repositories),
      totalWatchers: calculateTotalWatchers(repositories),
      topRepo: getMostStarredRepository(repositories),
      uniqueLanguages: getUniqueLanguages(repositories).length,
      popularRepos: getPopularRepositories(repositories).length
    };
  }, [repositories]);

  const topRepositories = useMemo(() => {
    if (!repositories || repositories.length === 0) return [];
    return getTopRepositories(repositories, 3);
  }, [repositories]);

  const insights = useMemo(() => {
    if (!profile || !repositories || repositories.length === 0) return [];
    return generateInsights(profile, repositories);
  }, [profile, repositories]);

  const showDashboard = profile && repositories.length > 0;

  return (
    <div className="min-vh-100">
      <Header />
      
      <main>
        {!showDashboard && !loading && !error && (
          <SearchBar onSearch={handleSearch} loading={loading} />
        )}

        {loading && <LoadingSkeleton />}

        {error && <ErrorState error={error} onRetry={() => resetError()} />}

        {showDashboard && (
          <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button 
                onClick={() => clearData()}
                className="btn btn-ghost btn-sm"
              >
                ← Search another user
              </button>
            </div>

            <ProfileCard profile={profile} />

            {analytics && (
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-4 col-lg-2">
                  <StatCard
                    icon={
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8zM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.25.25 0 0 1 .3 0L8.6 15.7a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25z"></path>
                      </svg>
                    }
                    value={repositories.length}
                    label="Public repositories"
                  />
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <StatCard
                    icon={
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.245 2.188a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.245-2.188-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                      </svg>
                    }
                    value={formatNumber(analytics.totalStars)}
                    label="Total stars"
                  />
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <StatCard
                    icon={
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.5 2.5 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.5 2.5 0 1 1 1.5 0ZM5 3.25a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM5 10.25a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"></path>
                      </svg>
                    }
                    value={formatNumber(analytics.totalForks)}
                    label="Total forks"
                  />
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <StatCard
                    icon={
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8zM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.25.25 0 0 1 .3 0L8.6 15.7a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25z"></path>
                      </svg>
                    }
                    value={analytics.topRepo ? analytics.topRepo.name : 'N/A'}
                    label="Top repository"
                    subtitle={analytics.topRepo ? `★ ${analytics.topRepo.stargazers_count} stars` : ''}
                    highlight={true}
                  />
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <StatCard
                    icon={
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.075 1.038.848 2.407 1.24 3.016 1.24.609 0 1.978-.392 3.016-1.24.56-.45.984-1.09.984-2.075C12 3.19 10.363 1.5 8 1.5ZM8 0c3.095 0 5.5 2.284 5.5 5.25 0 1.378-.633 2.628-1.672 3.693-1.276 1.312-3.086 1.833-3.828 1.833-.742 0-2.552-.521-3.828-1.833C2.633 7.878 2 6.628 2 5.25 2 2.284 4.405 0 8 0Z"></path>
                      </svg>
                    }
                    value={analytics.uniqueLanguages}
                    label="Languages"
                  />
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <StatCard
                    icon={
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.245 2.188a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.245-2.188-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                      </svg>
                    }
                    value={analytics.popularRepos}
                    label="Popular repositories"
                    subtitle="Popularity score ≥ 50"
                  />
                </div>
              </div>
            )}

            {topRepositories.length > 0 && (
              <div className="mb-4">
                <h3 className="h5 mb-3">Top Repositories</h3>
                <div className="row g-3">
                  {topRepositories.map((repo, index) => (
                    <div key={repo.id} className="col-md-4">
                      <TopRepositoryCard repository={repo} rank={index + 1} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <LanguageChart repositories={repositories} />
              </div>
              <div className="col-md-6">
                <ActivityChart repositories={repositories} />
              </div>
            </div>

            {insights.length > 0 && (
              <div className="card mb-4">
                <h5 className="mb-3">Key Insights</h5>
                <div className="d-flex flex-column gap-2">
                  {insights.map((insight, index) => (
                    <div key={index} className="d-flex align-items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '4px' }}>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                      </svg>
                      <span className="text-secondary">{insight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="h5 mb-3">All Repositories</h3>
            
            <RepositoryFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              sortBy={sortBy}
              onSortChange={setSortBy}
              repositories={repositories}
            />

            {filteredAndSortedRepositories.length === 0 ? (
              <EmptyState 
                type={searchTerm || selectedLanguage !== 'All Languages' ? 'no-search-results' : 'no-repositories'}
                onReset={handleResetFilters}
              />
            ) : (
              <RepositoryTable repositories={filteredAndSortedRepositories} />
            )}
          </div>
        )}

        {profile && repositories.length === 0 && !loading && !error && (
          <div className="container py-4">
            <ProfileCard profile={profile} />
            <EmptyState type="no-repositories" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
