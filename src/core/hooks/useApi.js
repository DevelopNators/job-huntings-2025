import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(...args);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'An error occurred');
      }
      
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { data, loading, error, execute };
};

export const usePaginatedApi = (apiCall, initialFilters = {}) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (newFilters = {}, newPagination = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedFilters = { ...filters, ...newFilters };
      const mergedPagination = { ...pagination, ...newPagination };
      
      const response = await apiCall(mergedFilters, mergedPagination);
      
      if (response.success) {
        setData(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
        setFilters(mergedFilters);
      } else {
        setError(response.message || 'An error occurred');
      }
      
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [apiCall, filters, pagination]);

  const updateFilters = useCallback((newFilters) => {
    fetchData(newFilters, { page: 1 });
  }, [fetchData]);

  const changePage = useCallback((page) => {
    fetchData({}, { page });
  }, [fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    pagination,
    filters,
    loading,
    error,
    updateFilters,
    changePage,
    refresh,
    fetchData,
  };
};