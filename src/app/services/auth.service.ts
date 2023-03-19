import { Injectable } from '@angular/core';
import User from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HTTPResponse } from '../models/http';

import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api/v1/';

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  public isAuthenticated(): boolean {
    let token = this.getToken();
    if (!token) return false;
    let data: {exp: number} = jwt_decode(token);
    return (data.exp > Date.now() / 1000);
  }

  public getUser(): User | null {
    let token = this.getToken();
    if (!token) return null;
    if (!this.isAuthenticated()) return null;
    return jwt_decode(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  public login(username: string, password: string): Observable<HTTPResponse> {
    return this.http.post<HTTPResponse>(this.API_URL + 'login', {username, password});
  }

  public register(username: string, name:string, password: string): Observable<HTTPResponse> {
    return this.http.post<HTTPResponse>(this.API_URL + 'register', {username,name, password});
  }

  public changePassword(password: string, newPassword: string): Observable<HTTPResponse> {
    return this.http.post<HTTPResponse>(this.API_URL + 'password', {password, newPassword});
  }

  public logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
