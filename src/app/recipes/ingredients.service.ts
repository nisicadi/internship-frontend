import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from './ingredient.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  url = 'https://localhost:44346/api/ingredients';

  constructor(private http: HttpClient) { }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.url}`);
  }
  getIngredient(id: number): Observable<Ingredient>{
    return this.http.get<Ingredient>(`${this.url}/${id}`);
  }

  deleteIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.delete<Ingredient>(`${this.url}/${ingredient.ingredientId}`);
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.url}`, ingredient);
  }

  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.url}/${ingredient.ingredientId}`, ingredient);
  }
}
