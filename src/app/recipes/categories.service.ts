import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'https://localhost:44346/api/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}`);
  }
  getCategory(id: number): Observable<Category>{
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.url}/${category.categoryId}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.url}`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.url}/${category.categoryId}`, category);
  }
}
