
// marker.service.ts


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarkerIcon } from '../models/markerIcon.model'; // Asegúrate de importar correctamente tu interfaz

@Injectable({
  providedIn: 'root',
})
export class MarkerService {

  private apiUrl: string = 'http://localhost:4000/api/markers'; // Actualiza con la URL de tu API real

  constructor(private http: HttpClient) {}

  getMarkers(): Observable<MarkerIcon[]> {
    return this.http.get<MarkerIcon[]>(this.apiUrl);
  }

  addMarker(marker: MarkerIcon): Observable<MarkerIcon> {
    return this.http.post<MarkerIcon>(this.apiUrl, marker);
  }

  updateMarker(id: number, marker: MarkerIcon): Observable<MarkerIcon> {
    return this.http.put<MarkerIcon>(`${this.apiUrl}/${id}`, marker);
  }

  deleteMarker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
