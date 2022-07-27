import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identity, Observable } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  // private recipes: Recipe[] = [
  //   {
  //     id: 'r1',
  //     title: 'Pasta',
  //     imageUrl: 'https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-close.jpg',
  //     ingredients: ['Cherry tomatoes', 'Olive oil', 'Feta cheese']
  //   },
  //   {
  //     id: 'r2',
  //     title: 'Spaghetti',
  //     imageUrl: 'https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-3-1200.jpg',
  //     ingredients: ['Spaghetti', 'Olive oil', 'Meet']
  //   }
  //   ];
  // constructor() { }
  // getAllRecipes() {
  //   return [...this.recipes];
  // }

  // getRecipe(recipeId: string){
  //   return {...this.recipes.find(recipe => recipe.id === recipeId)};
  // }

  // deleteRecipe(recipeId: string){
  //   this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
  // }
  // addRecipe(recipeId: string, recipeName: string, recipeUrl: string, recipeIngredient: string)
  // {
  //   const newRecipe: Recipe ={
  //     id: recipeId,
  //     title: recipeName,
  //     imageUrl: recipeUrl,
  //     ingredients: [recipeIngredient]
  //   };

  //   this.recipes.push(newRecipe);
  // }
  // updateRecipe(recipeId: string, recipeName: string, recipeUrl: string, recipeIngredient: string)
  // {
  //   this.recipes.find(recipe => recipe.id === recipeId).title=recipeName;
  //   this.recipes.find(recipe => recipe.id === recipeId).imageUrl=recipeUrl;
  //   this.recipes.find(recipe => recipe.id === recipeId).ingredients[0]=recipeIngredient;//Losa implementacija, samo prvi clan se mijenja
  // }
  url = 'https://localhost:44346';

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<any> {
    return this.http.get(`${this.url}/api/recipes`);
  }
  getRecipe(id: number): Observable<Recipe>{
    return this.http.get<Recipe>(`${this.url}/api/recipes/${id}`);
  }

  deleteRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.url}/api/recipes/${recipe.recipeId}`);
  }
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.url}/api/recipes`, recipe);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.url}/api/recipes/${recipe.recipeId}`, recipe);
  }
}
