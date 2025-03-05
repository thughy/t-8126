
import { useState, useEffect } from 'react';
import { SPOONACULAR_API_KEY_STORAGE } from '@/lib/constants';
import { toast } from 'sonner';

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedKey = localStorage.getItem(SPOONACULAR_API_KEY_STORAGE);
    if (storedKey) {
      setApiKey(storedKey);
    }
    setIsLoading(false);
  }, []);

  const saveApiKey = (key: string) => {
    if (!key.trim()) {
      toast.error('Please enter a valid API key');
      return false;
    }
    
    try {
      localStorage.setItem(SPOONACULAR_API_KEY_STORAGE, key.trim());
      setApiKey(key.trim());
      toast.success('API key saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API key');
      return false;
    }
  };

  const clearApiKey = () => {
    try {
      localStorage.removeItem(SPOONACULAR_API_KEY_STORAGE);
      setApiKey('');
      toast.success('API key removed');
      return true;
    } catch (error) {
      console.error('Error removing API key:', error);
      toast.error('Failed to remove API key');
      return false;
    }
  };

  return { apiKey, isLoading, saveApiKey, clearApiKey };
}
