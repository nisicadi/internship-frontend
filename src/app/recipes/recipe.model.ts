import { Category } from './category.model';
import { Ingredient } from './ingredient.model';

export interface Recipe {
  recipeId: number;
  recipeTitle: string;
  imageUrl: string;
  recipeDescription: string;
  categoryId: number;
  category: Category;
  ingredients: Ingredient[];
  recipePrice: number;
}
