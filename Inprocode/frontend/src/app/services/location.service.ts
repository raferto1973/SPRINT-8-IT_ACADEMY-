


// location.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private myappUrl = environment.endpoint;
  private myApiUrl = 'api/markers/';

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.myappUrl + this.myApiUrl);
  }

  saveLocation(marker: Location): Observable<Location> {
    console.log("Guardando marcador");
    console.log(marker);
    return this.http.post<Location>( `${this.myappUrl}${this.myApiUrl}`, marker);
  }

  updateLocation(id: number, marker: Location): Observable<Location> {
    return this.http.put<Location>(
      `${this.myappUrl}${this.myApiUrl}${id}`,
      marker
    );
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myappUrl}${this.myApiUrl}${id}`);
  }

  testPost(): Observable<any> {
    return this.http.post<any>(`${this.myappUrl}${this.myApiUrl}`, {
      name: "Test Marker",
      latitude: 41.0,
      longitude: 2.0,
      category: "Test"
    });
  }

}


