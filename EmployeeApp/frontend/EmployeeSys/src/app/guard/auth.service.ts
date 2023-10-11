import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token';
  private isAuthenticatedValue = false;
  constructor() {}

  // Store the JWT token in local storage
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get the JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setAuthenticated(status: boolean) {
    this.isAuthenticatedValue = status;
    console.log('Authentication Status: ', this.isAuthenticated)
  }
  // Check if the user is authenticated (has a valid JWT token)
  isAuthenticated() {
    return this.isAuthenticatedValue; // Returns true if the token exists, false otherwise
  }

  // Log the user out by removing the JWT token from local storage
  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
