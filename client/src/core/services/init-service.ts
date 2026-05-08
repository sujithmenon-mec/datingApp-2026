import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AccountService } from './account-service';
import { LikesService } from './likes-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private likesService = inject(LikesService);
  private accountService = inject(AccountService);

  init() {
    const userString = localStorage.getItem('user');
    if(!userString) return of(null);
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user); 
    this.likesService.getLikeIds();
    return of(null);
  }
}
