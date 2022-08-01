import { Category } from './category.model';

export interface Recipe {
  recipeId: number;
  recipeTitle: string;
  imageUrl: string;
  recipeIngredients: string;
  categoryId: number;
  category: Category;
}
