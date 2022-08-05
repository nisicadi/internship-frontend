import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foodstuff } from './foodstuff.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodstuffService {
  url = 'https://localhost:44346/api/foodstuff';

  constructor(private http: HttpClient) { }

  getAllFoodstuff(): Observable<Foodstuff[]> {
    return this.http.get<Foodstuff[]>(`${this.url}`);
  }
  getFoodstuff(id: number): Observable<Foodstuff>{
    return this.http.get<Foodstuff>(`${this.url}/${id}`);
  }

  deleteFoodstuff(foodstuff: Foodstuff): Observable<Foodstuff> {
    return this.http.delete<Foodstuff>(`${this.url}/${foodstuff.foodstuffId}`);
  }

  addFoodstuff(foodstuff: Foodstuff): Observable<Foodstuff> {
    return this.http.post<Foodstuff>(`${this.url}`, foodstuff);
  }

  updateFoodstuff(foodstuff: Foodstuff): Observable<Foodstuff> {
    return this.http.put<Foodstuff>(`${this.url}/${foodstuff.foodstuffId}`, foodstuff);
  }
}
