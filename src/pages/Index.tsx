
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import RecipeCard from '@/components/RecipeCard';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { useSpoonacular } from '@/hooks/useSpoonacular';
import { useFavorites, Recipe } from '@/hooks/useFavorites';
import { useApiKey } from '@/hooks/useApiKey';
import { RECIPES_PER_PAGE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChefHat, Search, Settings, Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchRecipes, isLoading } = useSpoonacular();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { apiKey } = useApiKey();

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get('query') || '';
  const dietParam = searchParams.get('diet') || '';
  const cuisineParam = searchParams.get('cuisine') || '';
  const typeParam = searchParams.get('type') || '';
  const offsetParam = parseInt(searchParams.get('offset') || '0', 10);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [offset, setOffset] = useState(offsetParam);
  const [hasSearched, setHasSearched] = useState(false);

  // Effects
  useEffect(() => {
    // If there's a query in the URL, run the search
    if (queryParam || dietParam || cuisineParam || typeParam) {
      performSearch();
    }
  }, [apiKey, queryParam, dietParam, cuisineParam, typeParam, offset]);

  // Search functionality
  const performSearch = async () => {
    if (!apiKey) {
      navigate('/settings');
      return;
    }

    const searchParams: any = {
      number: RECIPES_PER_PAGE,
      offset,
    };

    if (queryParam) {
      searchParams.includeIngredients = queryParam;
    }

    if (dietParam) {
      searchParams.diet = dietParam;
    }

    if (cuisineParam) {
      searchParams.cuisine = cuisineParam;
    }

    if (typeParam) {
      searchParams.type = typeParam;
    }

    const result = await searchRecipes(searchParams);
    
    if (result) {
      setRecipes(result.results);
      setTotalResults(result.totalResults);
      setHasSearched(true);
    }
  };

  // Handler functions
  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (dietParam) params.set('diet', dietParam);
    if (cuisineParam) params.set('cuisine', cuisineParam);
    if (typeParam) params.set('type', typeParam);
    
    // Reset offset when performing a new search
    setOffset(0);
    navigate(`/?${params.toString()}`);
  };

  const handleFilterChange = (filters: {
    diet?: string;
    cuisine?: string;
    type?: string;
  }) => {
    const params = new URLSearchParams();
    if (queryParam) params.set('query', queryParam);
    if (filters.diet) params.set('diet', filters.diet);
    if (filters.cuisine) params.set('cuisine', filters.cuisine);
    if (filters.type) params.set('type', filters.type);
    
    // Reset offset when changing filters
    setOffset(0);
    navigate(`/?${params.toString()}`);
  };

  const handleLoadMore = () => {
    const newOffset = offset + RECIPES_PER_PAGE;
    setOffset(newOffset);
    
    const params = new URLSearchParams(location.search);
    params.set('offset', newOffset.toString());
    navigate(`/?${params.toString()}`);
  };

  const handleToggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  // Determine the content to show
  let content;
  
  if (!apiKey) {
    content = (
      <EmptyState
        title="API Key Required"
        description="To use Recipe Explorer, you need to add your Spoonacular API key in the settings."
        icon={<Settings className="h-6 w-6" />}
        action={{
          label: "Go to Settings",
          onClick: () => navigate('/settings')
        }}
      />
    );
  } else if (!hasSearched) {
    content = (
      <div className="flex flex-col items-center justify-center py-12">
        <EmptyState
          title="Find Your Next Meal"
          description="Search by ingredients to discover recipes you can make with what you have."
          icon={<Search className="h-6 w-6" />}
        />
      </div>
    );
  } else if (recipes.length === 0 && !isLoading) {
    content = (
      <EmptyState
        title="No Recipes Found"
        description="Try adjusting your search or filters to find more recipes."
        icon={<ChefHat className="h-6 w-6" />}
      />
    );
  } else {
    content = (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={isFavorite(recipe.id)}
              onToggleFavorite={() => handleToggleFavorite(recipe)}
              index={index}
            />
          ))}
        </div>

        {recipes.length < totalResults && (
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleLoadMore} 
              disabled={isLoading}
              className="relative"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Header />
      <PageTransition>
        <div className="container max-w-7xl pt-24 pb-16">
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              onSearch={handleSearch}
              initialQuery={queryParam}
              placeholder="Search by ingredients (e.g., chicken, tomato)"
            />
            
            <FilterBar onFilterChange={handleFilterChange} />
          </div>

          {/* Loading indicator */}
          {isLoading && recipes.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {content}
        </div>
      </PageTransition>
    </>
  );
};

export default Index;
