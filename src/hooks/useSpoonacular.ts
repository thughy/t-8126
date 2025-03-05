import { useState } from 'react';
import { useApiKey } from './useApiKey';
import { SPOONACULAR_API_BASE_URL } from '@/lib/constants';
import { toast } from 'sonner';
import { Recipe } from './useFavorites';

interface SearchParams {
  query?: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  type?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  offset?: number;
  number?: number;
}

interface SearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export function useSpoonacular() {
  const { apiKey } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRecipes = async (params: SearchParams): Promise<SearchResponse | null> => {
    if (!apiKey) {
      toast.error('API key is required. Please add your API key in settings.');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      
      queryParams.append('apiKey', apiKey);
      
      queryParams.append('addRecipeInformation', 'true');
      queryParams.append('fillIngredients', 'false');
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });

      const response = await fetch(`${SPOONACULAR_API_BASE_URL}/recipes/complexSearch?${queryParams}`);
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Invalid API key. Please check your API key in settings.');
        } else if (response.status === 402) {
          throw new Error('API quota exceeded. Please try again tomorrow or upgrade your plan.');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipeById = async (id: number): Promise<Recipe | null> => {
    if (!apiKey) {
      toast.error('API key is required. Please add your API key in settings.');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${SPOONACULAR_API_BASE_URL}/recipes/${id}/information?apiKey=${apiKey}`
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Invalid API key. Please check your API key in settings.');
        } else if (response.status === 402) {
          throw new Error('API quota exceeded. Please try again tomorrow or upgrade your plan.');
        } else if (response.status === 404) {
          throw new Error('Recipe not found.');
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchRecipes,
    getRecipeById,
    isLoading,
    error
  };
}
