import {Component} from '@angular/core';
import {AuthService} from "../../services/services/auth.service";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Credentials, TwoFactorAuth} from "../../models/auth.models";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials: Credentials = {
    email: '',
    password: '',
  };

  showCodeInput = false;
  twoFactorData: TwoFactorAuth = {email: '', code: ''};

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.authService.setEmailFor2FA(this.credentials.email); 
        this.router.navigate(['/two-factor-auth']); 
      },
      error: () => alert('Login failed'),
    });
  }
  onVerifyCode() {
    this.twoFactorData.email = this.credentials.email;    this.authService.verifyCode(this.twoFactorData).subscribe({
      next: (response) => {
        this.authService.setToken(response.token); 
        this.router.navigate(['/profile']); 
      },
      error: () => alert('Code verification failed'),
    });
  }

}
