
// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root',
})


export class ActivityService {
  private myappUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myappUrl = environment.endpoint;
    this.myApiUrl = 'api/activities/';
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.myappUrl + this.myApiUrl);
  }

  deleteActivity(id: number): Observable<Activity> {
    return this.http.delete<Activity>(`${this.myappUrl}${this.myApiUrl}${id}`);
  }

  addActivity(activity: Activity): Observable<void> {
    return this.http.post<void>(`${this.myappUrl}${this.myApiUrl}`, activity);
  }

  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.myappUrl}${this.myApiUrl}${id}`);
  }

  updateActivity(id: number, activity: Activity): Observable<void> {
    return this.http.put<void>(
      `${this.myappUrl}${this.myApiUrl}${id}`,
      activity
    );
  }
}
