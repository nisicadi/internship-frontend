import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  url = 'https://localhost:44346';

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/recipes`);
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
