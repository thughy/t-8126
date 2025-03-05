
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import RecipeCard from '@/components/RecipeCard';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, isLoading, removeFavorite, isFavorite } = useFavorites();

  return (
    <>
      <Header />
      <PageTransition>
        <div className="container max-w-7xl pt-24 pb-16">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold mb-2">Your Favorite Recipes</h1>
            <p className="text-muted-foreground">
              Quickly access your favorite recipes all in one place.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : favorites.length === 0 ? (
            <EmptyState
              title="No Favorites Yet"
              description="Add some recipes to your favorites to see them here."
              icon={<Heart className="h-6 w-6" />}
              action={{
                label: "Discover Recipes",
                onClick: () => navigate('/')
              }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {favorites.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={isFavorite(recipe.id)}
                  onToggleFavorite={() => removeFavorite(recipe.id)}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </>
  );
};

export default Favorites;
