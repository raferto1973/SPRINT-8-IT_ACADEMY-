
// user.service.ts

import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/user';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private readonly baseUrl = environment.baseUrl;



  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/users`, { headers: this.getHeaders() });
  }

  getUser(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  createUser(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/users`, user, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.baseUrl}/users/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders() });
  }

}



