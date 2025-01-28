import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/services/auth.service";
import {Student} from "../../models/auth.models";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  student: Student = {
    name: '',
    email: '',
    password: '',
    enrollmentDate: new Date().toISOString().split('T')[0], // Default to today's date
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.student).subscribe({
      next: () => this.router.navigate(['/login']), // Redirect to login
      error: () => alert('Registration failed'),
    });
  }
}
