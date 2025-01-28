import {computed, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Credentials, Student, TwoFactorAuth} from "../../models/auth.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private isAuthenticated = signal<boolean>(false);
  public isLoggedIn = computed(() => this.isAuthenticated());
  private emailFor2FA = signal<string>('');


  constructor(private http: HttpClient, private router: Router) {
    // Initialize authentication state based on token presence
    this.isAuthenticated.set(!!this.getToken());
  }

  register(student: Student) {
    return this.http.post(`${this.apiUrl}/register`, student);
  }

  login(credentials: Credentials) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  setEmailFor2FA(email: string) {
    this.emailFor2FA.set(email);
  }

  getEmailFor2FA(): string {
    return this.emailFor2FA();
  }

  verifyCode(data: TwoFactorAuth) {
    return this.http.post<{token: string}>(`${this.apiUrl}/verify-code`, data);
  }

  resendCode(email: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/resend-code`, { email });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.isAuthenticated.set(true); // Update signal
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false); // Update signal
    this.router.navigate(['/login']);
  }
}
