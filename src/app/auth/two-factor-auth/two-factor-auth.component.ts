import {Component} from '@angular/core';
import {AuthService} from "../../services/services/auth.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-two-factor-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './two-factor-auth.component.html',
  styleUrl: './two-factor-auth.component.scss'
})
export class TwoFactorAuthComponent {
  code: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.email = this.authService.getEmailFor2FA();
  }

  onVerifyCode() {
    this.authService.verifyCode({ email: this.email, code: this.code }).subscribe({
      next: (response) => {
        this.authService.setToken(response.token); 
        this.router.navigate(['/profile']); 
      },
      error: () => {
        alert('Code verification failed');
      },
    });
  }

  resendCode() {
    this.authService.resendCode(this.email).subscribe({
      next: () => console.log('Code resent successfully'),
      error: () => alert('Failed to resend code'),
    });
  }
}
