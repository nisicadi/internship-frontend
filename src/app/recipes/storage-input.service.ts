import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageInput } from './storage-input.model';

@Injectable({
  providedIn: 'root'
})
export class StorageInputService {
  url = 'https://localhost:44346/api/storageinput';

  constructor(private http: HttpClient) { }

  addStorageInput(storageInput: StorageInput): Observable<StorageInput> {
    return this.http.post<StorageInput>(`${this.url}`, storageInput);
  }
}
