import { Recipe } from './recipe.model';

export interface Ingredient {
    ingredientID: number;
    ingredientName: string;
    quantity: number;
    recipeID: number;
    recipe: Recipe;
}
