import { Injectable } from '@angular/core';
import User from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api/v1/auth';

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  public isAuthenticated(): boolean {
    return true;
  }

  public getUser(): User | null {
    return null;
  }

  getToken(): string | null {
    return null;
  }

  public login(username: string, password: string): string | null {
    return null;
  }

  public register(username: string, name:string, password: string): string | null {
    return null;
  }

  public logout(): void {

  }
}
