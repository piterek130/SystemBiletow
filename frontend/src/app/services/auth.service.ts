import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  message: string;
  token?: string;
  username?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUsername = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    if (token && username) {
      this.loggedIn.next(true);
      this.currentUsername.next(username);
    }
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const loginRequest: LoginRequest = { username, password };
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginRequest).pipe(
        tap(response => {
          if (response.message === 'Login successful' && response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('username', username);
            this.loggedIn.next(true);
            this.currentUsername.next(username);
          }
        })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    this.loggedIn.next(false);
    this.currentUsername.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.currentUsername.asObservable();
  }
}
