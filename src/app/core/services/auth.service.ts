import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserDto,
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(StorageService);

  private readonly baseUrl = `${environment.apiUrl}/auth`;

  currentUser = signal<UserDto | null>(null);

  constructor() {
    if (this.isLoggedIn()) {
      this.http.get<UserDto>(`${this.baseUrl}/me`).subscribe({
        next: (user) => this.currentUser.set(user),
        error: () => this.storage.clearTokens(),
      });
    }
  }

  isLoggedIn(): boolean {
    return !!this.storage.getAccessToken();
  }

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        this.storage.setTokens(res.accessToken, res.refreshToken);
        this.currentUser.set(res.user);
      }),
    );
  }

  register(data: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data).pipe(
      tap((res) => {
        this.storage.setTokens(res.accessToken, res.refreshToken);
        this.currentUser.set(res.user);
      }),
    );
  }

  refresh() {
    const refreshToken = this.storage.getRefreshToken();
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/refresh`, { refreshToken })
      .pipe(
        tap((res) => {
          this.storage.setTokens(res.accessToken, res.refreshToken);
        }),
      );
  }

  logout() {
    const refreshToken = this.storage.getRefreshToken();
    this.http
      .post(`${this.baseUrl}/revoke`, { refreshToken })
      .subscribe({ error: () => {} });
    this.storage.clearTokens();
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }
}
