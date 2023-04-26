import { Injectable } from '@angular/core';

import { EMPTY } from 'rxjs';

import { CookieService } from 'ngx-cookie';

export interface User {
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private cookieService: CookieService) {}

  login(params: any) {
    // return this.http.post<never>('/auth', params)

    this.cookieService.put('user', JSON.stringify({ username: 'tracywilk' }));

    return EMPTY;
  }

  logout() {
    // return this.http.delete<never>('/auth')

    this.cookieService.remove('user');

    return EMPTY;
  }

  getCurrentUser() {
    // return this.http.get<User>('/auth')

    const user = this.cookieService.get('user') as string | undefined; // Incorrect typing fix

    return typeof user === 'undefined' ? user : JSON.parse(user) as User;
  }
}
