const GITHUB_API_BASE = 'https://api.github.com';

export const githubApi = {
  async getUserProfile(username) {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('USER_NOT_FOUND');
        }
        if (response.status === 403) {
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
        throw new Error('API_ERROR');
      }
      
      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('NETWORK_ERROR');
      }
      throw error;
    }
  },

  async getUserRepositories(username, page = 1, perPage = 100) {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('USER_NOT_FOUND');
        }
        if (response.status === 403) {
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
        throw new Error('API_ERROR');
      }
      
      const repositories = await response.json();
      
      // Check if there are more pages
      const linkHeader = response.headers.get('Link');
      const hasNextPage = linkHeader && linkHeader.includes('rel="next"');
      
      return {
        repositories,
        hasNextPage,
        currentPage: page
      };
    } catch (error) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('NETWORK_ERROR');
      }
      throw error;
    }
  },

  async getAllRepositories(username) {
    let allRepositories = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      const result = await this.getUserRepositories(username, page, 100);
      allRepositories = [...allRepositories, ...result.repositories];
      hasMore = result.hasNextPage;
      page++;
      
      // Safety limit to prevent infinite loops
      if (page > 10) {
        break;
      }
    }
    
    return allRepositories;
  }
};

export const getErrorMessage = (error) => {
  switch (error.message) {
    case 'USER_NOT_FOUND':
      return {
        title: 'GitHub user not found',
        message: "We couldn't find a GitHub account with that username. Check the username and try again.",
        action: 'Try Again'
      };
    case 'RATE_LIMIT_EXCEEDED':
      return {
        title: 'GitHub API rate limit reached',
        message: 'Please wait a little while before trying again.',
        action: 'Try Again'
      };
    case 'NETWORK_ERROR':
      return {
        title: 'Unable to connect to GitHub',
        message: 'Check your internet connection and try again.',
        action: 'Try Again'
      };
    default:
      return {
        title: 'An error occurred',
        message: 'Something went wrong. Please try again.',
        action: 'Try Again'
      };
  }
};
