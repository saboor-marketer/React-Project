export const calculateTotalStars = (repositories) => {
  return repositories.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
};

export const calculateTotalForks = (repositories) => {
  return repositories.reduce((total, repo) => total + (repo.forks_count || 0), 0);
};

export const calculateTotalWatchers = (repositories) => {
  return repositories.reduce((total, repo) => total + (repo.watchers_count || 0), 0);
};

export const calculateTotalOpenIssues = (repositories) => {
  return repositories.reduce((total, repo) => total + (repo.open_issues_count || 0), 0);
};

export const calculatePopularityScore = (repository) => {
  const stars = repository.stargazers_count || 0;
  const forks = repository.forks_count || 0;
  const watchers = repository.watchers_count || 0;
  
  return (stars * 5) + (forks * 3) + watchers;
};

export const getTopRepositories = (repositories, limit = 3) => {
  return [...repositories]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);
};

export const getMostStarredRepository = (repositories) => {
  if (repositories.length === 0) return null;
  return getTopRepositories(repositories, 1)[0];
};

export const getLanguageDistribution = (repositories) => {
  const languageCount = {};
  
  repositories.forEach(repo => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });
  
  const total = Object.values(languageCount).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(languageCount)
    .map(([language, count]) => ({
      language,
      count,
      percentage: ((count / total) * 100).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count);
};

export const getActivityDistribution = (repositories) => {
  const now = new Date();
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  
  const activity = {
    recently: 0,
    thisMonth: 0,
    oneToSixMonths: 0,
    moreThanSixMonths: 0
  };
  
  repositories.forEach(repo => {
    if (!repo.updated_at) return;
    
    const updatedDate = new Date(repo.updated_at);
    const daysDiff = (now - updatedDate) / (1000 * 60 * 60 * 24);
    
    if (daysDiff <= 7) {
      activity.recently++;
    } else if (daysDiff <= 30) {
      activity.thisMonth++;
    } else if (daysDiff <= 180) {
      activity.oneToSixMonths++;
    } else {
      activity.moreThanSixMonths++;
    }
  });
  
  return [
    { label: 'Updated recently', count: activity.recently },
    { label: 'Updated this month', count: activity.thisMonth },
    { label: 'Updated 1–6 months ago', count: activity.oneToSixMonths },
    { label: 'Updated more than 6 months ago', count: activity.moreThanSixMonths }
  ];
};

export const getUniqueLanguages = (repositories) => {
  const languages = new Set();
  repositories.forEach(repo => {
    if (repo.language) {
      languages.add(repo.language);
    }
  });
  return Array.from(languages).sort();
};

export const getPopularRepositories = (repositories, threshold = 50) => {
  return repositories.filter(repo => calculatePopularityScore(repo) >= threshold);
};

export const filterRepositories = (repositories, searchTerm, language) => {
  return repositories.filter(repo => {
    const matchesSearch = !searchTerm || 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = !language || language === 'All Languages' || repo.language === language;
    
    return matchesSearch && matchesLanguage;
  });
};

export const sortRepositories = (repositories, sortBy) => {
  const sorted = [...repositories];
  
  switch (sortBy) {
    case 'Recently Updated':
      return sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    case 'Most Stars':
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case 'Most Forks':
      return sorted.sort((a, b) => b.forks_count - a.forks_count);
    case 'Most Watchers':
      return sorted.sort((a, b) => b.watchers_count - a.watchers_count);
    case 'Highest Popularity':
      return sorted.sort((a, b) => calculatePopularityScore(b) - calculatePopularityScore(a));
    case 'Repository Name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

import { formatNumber } from './formatters';

export const generateInsights = (profile, repositories) => {
  const insights = [];
  
  if (repositories.length === 0) {
    return insights;
  }
  
  const mostPopular = getMostStarredRepository(repositories);
  if (mostPopular) {
    insights.push({
      type: 'popular',
      text: `Your most popular repository is ${mostPopular.name} with ${mostPopular.stargazers_count} stars.`
    });
  }
  
  const languageDist = getLanguageDistribution(repositories);
  if (languageDist.length > 0) {
    insights.push({
      type: 'language',
      text: `${languageDist[0].language} is your most common repository language.`
    });
  }
  
  const activityDist = getActivityDistribution(repositories);
  const recentActivity = activityDist[0].count + activityDist[1].count;
  const activityPercentage = ((recentActivity / repositories.length) * 100).toFixed(0);
  insights.push({
    type: 'activity',
    text: `${activityPercentage}% of your repositories were updated within the last month.`
  });
  
  const totalStars = calculateTotalStars(repositories);
  insights.push({
    type: 'stars',
    text: `Your repositories have received ${formatNumber(totalStars)} stars in total.`
  });
  
  return insights;
};
