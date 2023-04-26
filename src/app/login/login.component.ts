import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {
  actionInProgress = false;
  error = false;
  private subs: Subscription | undefined;

  email = new FormControl('', Validators.email);
  password = new FormControl('', Validators.required);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (this.actionInProgress) {
      return;
    }

    this.actionInProgress = true;

    this.subs = this.authService.login(this.loginForm.value)
      .subscribe({
        error: err => {
          this.actionInProgress = false;
          this.error = true;

          throw err;
        },
        complete: () => {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}
