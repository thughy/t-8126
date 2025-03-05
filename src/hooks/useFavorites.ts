
import { useState, useEffect } from 'react';
import { FAVORITES_STORAGE_KEY } from '@/lib/constants';
import { toast } from 'sonner';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  servings?: number;
  readyInMinutes?: number;
  healthScore?: number;
  spoonacularScore?: number;
  pricePerServing?: number;
  diets?: string[];
  summary?: string;
  instructions?: string;
  sourceUrl?: string;
  cuisines?: string[];
  dishTypes?: string[];
  likes?: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        toast.error('Failed to load favorites');
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const saveFavorites = (recipes: Recipe[]) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(recipes));
      setFavorites(recipes);
    } catch (error) {
      console.error('Error saving favorites:', error);
      toast.error('Failed to save favorites');
    }
  };

  const addFavorite = (recipe: Recipe) => {
    if (favorites.some(fav => fav.id === recipe.id)) {
      toast.info('Recipe already in favorites');
      return;
    }
    
    const newFavorites = [...favorites, recipe];
    saveFavorites(newFavorites);
    toast.success('Recipe added to favorites');
  };

  const removeFavorite = (recipeId: number) => {
    const newFavorites = favorites.filter(recipe => recipe.id !== recipeId);
    saveFavorites(newFavorites);
    toast.success('Recipe removed from favorites');
  };

  const isFavorite = (recipeId: number) => {
    return favorites.some(recipe => recipe.id === recipeId);
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite
  };
}
