import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeasurementUnit } from './measurement-unit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {
  url = 'https://localhost:44346/api/MeasurementUnit';

  constructor(private http: HttpClient) { }

  getAllMeasurementUnits(): Observable<MeasurementUnit[]> {
    return this.http.get<MeasurementUnit[]>(`${this.url}`);
  }
  getMeasurementUnit(id: number): Observable<MeasurementUnit>{
    return this.http.get<MeasurementUnit>(`${this.url}/${id}`);
  }

  deleteMeasurementUnit(measurement: MeasurementUnit): Observable<MeasurementUnit> {
    return this.http.delete<MeasurementUnit>(`${this.url}/${measurement.measurementId}`);
  }

  addMeasurementUnit(measurement: MeasurementUnit): Observable<MeasurementUnit> {
    return this.http.post<MeasurementUnit>(`${this.url}`, measurement);
  }

  updateMeasurementUnit(measurement: MeasurementUnit): Observable<MeasurementUnit> {
    return this.http.put<MeasurementUnit>(`${this.url}/${measurement.measurementId}`, measurement);
  }
}
