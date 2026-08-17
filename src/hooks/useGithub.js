import { useState, useCallback } from 'react';
import { githubApi, getErrorMessage } from '../services/githubApi.js';

export const useGithub = () => {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async (username) => {
    if (!username || username.trim() === '') {
      setError({
        title: 'Invalid username',
        message: 'Please enter a valid GitHub username.',
        action: 'Try Again'
      });
      return;
    }

    setLoading(true);
    setError(null);
    setProfile(null);
    setRepositories([]);

    try {
      const [profileData, reposData] = await Promise.all([
        githubApi.getUserProfile(username),
        githubApi.getAllRepositories(username)
      ]);

      setProfile(profileData);
      setRepositories(reposData);
    } catch (err) {
      const errorInfo = getErrorMessage(err);
      setError(errorInfo);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setProfile(null);
    setRepositories([]);
    setError(null);
  }, []);

  return {
    profile,
    repositories,
    loading,
    error,
    fetchUserData,
    resetError,
    clearData
  };
};
