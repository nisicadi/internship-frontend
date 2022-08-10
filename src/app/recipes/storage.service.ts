import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  url = 'https://localhost:44346/api/storage';

  constructor(private http: HttpClient) { }

  getAllStorages(): Observable<Storage[]> {
    return this.http.get<Storage[]>(`${this.url}`);
  }
  getStorage(id: number): Observable<Storage>{
    return this.http.get<Storage>(`${this.url}/${id}`);
  }
}
