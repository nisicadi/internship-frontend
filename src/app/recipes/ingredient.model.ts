import { Recipe } from './recipe.model';

export interface Ingredient {
    ingredientId: number;
    ingredientName: string;
    quantity: number;
    recipeID: number;
    recipe: Recipe;
}
