
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/hooks/useFavorites';
import { Heart, Clock, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  index?: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  index = 0
}) => {
  // Create a truncated summary without HTML tags
  const truncatedSummary = recipe.summary
    ? recipe.summary.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
    >
      <Card className="h-full overflow-hidden group transform transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Button
            size="icon"
            variant={isFavorite ? "default" : "outline"}
            className={`absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
              ${isFavorite ? 'bg-red-500 hover:bg-red-600 text-white border-none' : 'bg-white/80 hover:bg-white'}`}
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`} />
          </Button>
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2">
            {recipe.readyInMinutes && (
              <Badge variant="outline" className="font-normal text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {recipe.readyInMinutes} min
              </Badge>
            )}
            
            {recipe.servings && (
              <Badge variant="outline" className="font-normal text-xs flex items-center gap-1">
                <Utensils className="h-3 w-3" />
                {recipe.servings} serv
              </Badge>
            )}
          </div>
          
          <Link to={`/recipe/${recipe.id}`} className="block">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
            
            {recipe.diets && recipe.diets.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {recipe.diets.slice(0, 2).map((diet) => (
                  <Badge key={diet} variant="secondary" className="text-xs">
                    {diet}
                  </Badge>
                ))}
                {recipe.diets.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{recipe.diets.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecipeCard;
