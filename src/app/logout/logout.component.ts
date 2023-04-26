import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit, OnDestroy {
  user: User | undefined;
  private subs: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.subs && this.subs.unsubscribe();

    this.subs = this.authService.logout()
      .subscribe({
        complete: () => {
          this.router.navigate(['/login']);
        }
      });
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}
