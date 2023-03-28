import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(public auth: LoginService, public router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      tap((isLoggedIn: boolean) => {
        if(!isLoggedIn){
          this.router.navigate(['login']);
        }
      })
    );
  }
}
