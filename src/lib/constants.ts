
// API Related
export const SPOONACULAR_API_BASE_URL = "https://api.spoonacular.com";
export const SPOONACULAR_API_KEY_STORAGE = "spoonacular-api-key";
export const RECIPES_PER_PAGE = 12;

// Diet Options
export const DIET_OPTIONS = [
  { id: "glutenFree", label: "Gluten Free" },
  { id: "ketogenic", label: "Ketogenic" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "lactoVegetarian", label: "Lacto-Vegetarian" },
  { id: "ovoVegetarian", label: "Ovo-Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "pescetarian", label: "Pescetarian" },
  { id: "paleo", label: "Paleo" },
  { id: "primal", label: "Primal" },
  { id: "lowFODMAP", label: "Low FODMAP" },
  { id: "whole30", label: "Whole30" },
];

// Cuisine Options
export const CUISINE_OPTIONS = [
  { id: "african", label: "African" },
  { id: "american", label: "American" },
  { id: "british", label: "British" },
  { id: "cajun", label: "Cajun" },
  { id: "caribbean", label: "Caribbean" },
  { id: "chinese", label: "Chinese" },
  { id: "eastern-european", label: "Eastern European" },
  { id: "european", label: "European" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "greek", label: "Greek" },
  { id: "indian", label: "Indian" },
  { id: "irish", label: "Irish" },
  { id: "italian", label: "Italian" },
  { id: "japanese", label: "Japanese" },
  { id: "jewish", label: "Jewish" },
  { id: "korean", label: "Korean" },
  { id: "latin-american", label: "Latin American" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "mexican", label: "Mexican" },
  { id: "middle-eastern", label: "Middle Eastern" },
  { id: "nordic", label: "Nordic" },
  { id: "southern", label: "Southern" },
  { id: "spanish", label: "Spanish" },
  { id: "thai", label: "Thai" },
  { id: "vietnamese", label: "Vietnamese" },
];

// Meal Type Options
export const MEAL_TYPE_OPTIONS = [
  { id: "main course", label: "Main Course" },
  { id: "side dish", label: "Side Dish" },
  { id: "dessert", label: "Dessert" },
  { id: "appetizer", label: "Appetizer" },
  { id: "salad", label: "Salad" },
  { id: "bread", label: "Bread" },
  { id: "breakfast", label: "Breakfast" },
  { id: "soup", label: "Soup" },
  { id: "beverage", label: "Beverage" },
  { id: "sauce", label: "Sauce" },
  { id: "marinade", label: "Marinade" },
  { id: "fingerfood", label: "Fingerfood" },
  { id: "snack", label: "Snack" },
  { id: "drink", label: "Drink" },
];

// Local Storage Keys
export const FAVORITES_STORAGE_KEY = "recipe-favorites";

// API Key Instructions
export const API_KEY_INSTRUCTIONS = `
To use this app, you'll need a Spoonacular API key. You can get a free key by:

1. Creating an account at [Spoonacular API Portal](https://spoonacular.com/food-api)
2. Go to your profile after login
3. Click on "API Console" 
4. Copy your API key and paste it below

The free plan allows 150 requests per day, which should be enough for personal use.
`;
