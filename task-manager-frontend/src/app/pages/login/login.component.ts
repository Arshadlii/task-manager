import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Object to store form data
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  // Inject AuthService to talk to API, Router to redirect pages
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Call the login method from our service
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        // Redirect the user to the Tasks page after success
        this.router.navigate(['/tasks']); 
      },
      error: (err) => {
        console.error('Login failed', err);
        // Show the error message from the backend (e.g., "Invalid email or password")
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
      }
    });
  }
}