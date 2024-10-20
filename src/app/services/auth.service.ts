import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://fakestoreapi.com/auth/login';

  constructor() {}

  login(username: string, password: string): Promise<boolean> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          localStorage.setItem('authToken', json.token);
          return true; 
        }
        return false;
      })
      .catch((error) => {
        console.error('Login error:', error);
        return false; 
      });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; 
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
