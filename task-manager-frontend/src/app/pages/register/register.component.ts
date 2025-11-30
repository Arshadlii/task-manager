import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData = {
    name: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.signup(this.registerData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        // After signup, send them to login page
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.errorMessage = err.error.message || 'Registration failed.';
      }
    });
  }
}