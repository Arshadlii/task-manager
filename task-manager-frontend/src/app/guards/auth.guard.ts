import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true; // Token exists, let them in!
    } else {
      // No token? Kick them out to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}