import { Injectable } from '@angular/core';
import { identity } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Pasta',
      imageUrl: 'https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-close.jpg',
      ingredients: ['Cherry tomatoes', 'Olive oil', 'Feta cheese']
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl: 'https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-3-1200.jpg',
      ingredients: ['Spaghetti', 'Olive oil', 'Meet']
    }
    ];
  constructor() { }
  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string){
    return {...this.recipes.find(recipe => recipe.id === recipeId)};
  }

  deleteRecipe(recipeId: string){
    this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
  }
  addRecipe(recipeId: string, recipeName: string, recipeUrl: string, recipeIngredient: string)
  {
    const newRecipe: Recipe ={
      id: recipeId,
      title: recipeName,
      imageUrl: recipeUrl,
      ingredients: [recipeIngredient]
    };

    this.recipes.push(newRecipe);
  }
  updateRecipe(recipeId: string, recipeName: string, recipeUrl: string, recipeIngredient: string)
  {
    this.recipes.find(recipe => recipe.id === recipeId).title=recipeName;
    this.recipes.find(recipe => recipe.id === recipeId).imageUrl=recipeUrl;
    this.recipes.find(recipe => recipe.id === recipeId).ingredients[0]=recipeIngredient;//Losa implementacija, samo prvi clan se mijenja
  }
}
