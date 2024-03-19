

// calendar.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Calendar } from '../models/calendarEvent.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private myappUrl = environment.endpoint;
  private myApiUrl = 'api/events/';

  constructor(private http: HttpClient) {}

  // Obtiene todos los eventos
  getEvents(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.myappUrl + this.myApiUrl);
  }

  // Obtiene un evento específico por su ID
  getEvent(id: string): Observable<Calendar> {
    return this.http.get<Calendar>(`${this.myappUrl}${this.myApiUrl}${id}`);
  }

  // Añade un nuevo evento
  addEvent(eventData: Calendar): Observable<Calendar> {
    return this.http.post<Calendar>(`${this.myappUrl}${this.myApiUrl}`, eventData);
  }

  // Actualiza un evento existente por su ID
  updateEvent(id: string, eventData: Calendar): Observable<Calendar> {
    return this.http.put<Calendar>(`${this.myappUrl}${this.myApiUrl}${id}`, eventData);
  }

  // Elimina un evento por su ID
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myappUrl}${this.myApiUrl}${id}`);
  }
}
