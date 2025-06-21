import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, updateUserPreferences } from '../../../store/slices/userSlice';

export const useProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would make an API call
      dispatch(updateUserProfile(profileData));
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const updatePreferences = useCallback(async (preferences) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would make an API call
      dispatch(updateUserPreferences(preferences));
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const uploadDocument = useCallback(async (file, type) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would upload the file to a server
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      // Mock upload
      const document = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        url: URL.createObjectURL(file),
      };
      
      dispatch(uploadDocument({ type, document }));
      
      return { success: true, document };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    updateProfile,
    updatePreferences,
    uploadDocument,
  };
};