import { Foodstuff } from './foodstuff.model';
import { Recipe } from './recipe.model';

export interface Ingredient {
    ingredientId: number;
    foodstuffId: number;
    foodstuff: Foodstuff;
    quantity: number;
    recipeID: number;
    recipe: Recipe;
}
