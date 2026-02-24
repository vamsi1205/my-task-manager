import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData).pipe(
      tap((user: any) => {
        this.saveUser(user);
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((user: any) => {
        this.saveUser(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  private saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getToken() {
    const user = this.currentUserSubject.value;
    return user ? user.token : null;
  }

  getUser() {
    return this.currentUserSubject.value;
  }
}
