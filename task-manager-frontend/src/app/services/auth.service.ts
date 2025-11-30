import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = 'https://task-manager-3pkj.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  // 1. Signup
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // 2. Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          // Save the token to LocalStorage so we stay logged in
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  // 3. Logout
  logout(): void {
    localStorage.removeItem('token');
  }

  // 4. Get Token (for adding to headers later)
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
