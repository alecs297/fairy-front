import { Injectable } from '@angular/core';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    return false;
  }

  public getUser(): User | null {
    return null;
  }

  public login(username: string, password: string): void {

  }

  public register(username: string, password: string): void {
  }

  public logout(): void {

  }
}
