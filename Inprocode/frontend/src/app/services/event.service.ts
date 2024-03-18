
// event.service.ts


// Asegúrate de que las rutas de importación sean correctas
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../models/event.model'; // Asegúrate de que la ruta sea correcta
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private myappUrl = environment.endpoint;
  private myApiUrl = 'api/events/';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.myappUrl + this.myApiUrl);
  }

  getEvent(id: string): Observable<CalendarEvent> {
    return this.http.get<CalendarEvent>(`${this.myappUrl}${this.myApiUrl}${id}`);
  }

  createEvent(eventData: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(`${this.myappUrl}${this.myApiUrl}`, eventData);
  }

  updateEvent(id: string, eventData: CalendarEvent): Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(`${this.myappUrl}${this.myApiUrl}${id}`, eventData);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myappUrl}${this.myApiUrl}${id}`);
  }
}

