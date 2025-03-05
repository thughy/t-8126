
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import Header from '@/components/Header';
import { useSpoonacular } from '@/hooks/useSpoonacular';
import { useFavorites, Recipe } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Heart, 
  Clock, 
  Utensils, 
  ArrowLeft,
  Star,
  Loader2, 
  DollarSign,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, isLoading } = useSpoonacular();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const data = await getRecipeById(parseInt(id, 10));
        if (data) {
          setRecipe(data);
        }
      }
    };

    fetchRecipe();
  }, [id, getRecipeById]);

  const handleToggleFavorite = () => {
    if (!recipe) return;
    
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <PageTransition>
          <div className="container max-w-4xl pt-24 pb-16 flex justify-center items-center min-h-screen">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        </PageTransition>
      </>
    );
  }

  if (!recipe && !isLoading) {
    return (
      <>
        <Header />
        <PageTransition>
          <div className="container max-w-4xl pt-24 pb-16 text-center">
            <h1 className="text-2xl font-semibold mb-4">Recipe Not Found</h1>
            <p className="mb-8 text-muted-foreground">
              The recipe you're looking for doesn't exist or there was an error loading it.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recipes
            </Button>
          </div>
        </PageTransition>
      </>
    );
  }

  return (
    <>
      <Header />
      <PageTransition>
        <div className="container max-w-4xl pt-24 pb-16">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {recipe && (
            <>
              {/* Hero section */}
              <motion.div 
                className="relative mb-8 overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{recipe.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {recipe.readyInMinutes && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {recipe.readyInMinutes} minutes
                      </div>
                    )}
                    
                    {recipe.servings && (
                      <div className="flex items-center">
                        <Utensils className="h-4 w-4 mr-1" />
                        {recipe.servings} servings
                      </div>
                    )}
                    
                    {recipe.spoonacularScore && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        {Math.round(recipe.spoonacularScore) / 10}/10
                      </div>
                    )}
                    
                    {recipe.pricePerServing && (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        ${(recipe.pricePerServing / 100).toFixed(2)} per serving
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  size="icon"
                  variant={isFavorite(recipe.id) ? "default" : "outline"}
                  className={cn(
                    "absolute top-4 right-4 z-10",
                    isFavorite(recipe.id) ? 'bg-red-500 hover:bg-red-600 text-white border-none' : 'bg-white hover:bg-white/90'
                  )}
                  onClick={handleToggleFavorite}
                >
                  <Heart className={cn("h-4 w-4", isFavorite(recipe.id) ? "fill-white" : "")} />
                </Button>
              </motion.div>

              {/* Tags */}
              {(recipe.diets?.length > 0 || recipe.dishTypes?.length > 0 || recipe.cuisines?.length > 0) && (
                <motion.div 
                  className="flex flex-wrap gap-2 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {recipe.diets?.map(diet => (
                    <Badge key={diet} variant="secondary">
                      {diet}
                    </Badge>
                  ))}
                  
                  {recipe.cuisines?.map(cuisine => (
                    <Badge key={cuisine} variant="outline">
                      {cuisine}
                    </Badge>
                  ))}
                  
                  {recipe.dishTypes?.map(type => (
                    <Badge key={type} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </motion.div>
              )}

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div 
                  className="lg:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {/* Summary */}
                  <Card className="mb-8">
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">About</h2>
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: recipe.summary || '' }}
                      />
                    </CardContent>
                  </Card>

                  {/* Instructions */}
                  {recipe.instructions && (
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                        <div 
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                        />
                      </CardContent>
                    </Card>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {/* Actions */}
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <Button 
                        className="w-full mb-3"
                        variant={isFavorite(recipe.id) ? "destructive" : "default"}
                        onClick={handleToggleFavorite}
                      >
                        <Heart className={cn("h-4 w-4 mr-2", isFavorite(recipe.id) ? "fill-current" : "")} />
                        {isFavorite(recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                      </Button>
                      
                      {recipe.sourceUrl && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => window.open(recipe.sourceUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Original Recipe
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Health info */}
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Health</h2>
                      
                      {recipe.healthScore !== undefined && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-1">Health Score</p>
                          <div className="flex items-center">
                            <div className="w-full bg-secondary rounded-full h-2 mr-2">
                              <div 
                                className={cn(
                                  "h-2 rounded-full",
                                  recipe.healthScore >= 70 ? "bg-green-500" : 
                                  recipe.healthScore >= 40 ? "bg-amber-500" : "bg-red-500"
                                )}
                                style={{ width: `${recipe.healthScore}%` }}
                              />
                            </div>
                            <span className="font-medium">{recipe.healthScore}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </PageTransition>
    </>
  );
};

export default RecipeDetail;
