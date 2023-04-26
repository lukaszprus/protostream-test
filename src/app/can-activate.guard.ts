import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot) {
    const ac: 'loggedIn' | 'notLoggedIn' | undefined = next.data.ac;
    const currentUser = !!this.authService.getCurrentUser();

    console.log('CanActivateGuard');

    if (ac === 'loggedIn') {
      return currentUser || this.router.createUrlTree(['/login']);
    } else {
      return !currentUser || this.router.createUrlTree(['/']);
    }
  }
}
