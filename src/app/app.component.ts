import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'wishlist-app';
  isLoggedIn$: Observable<boolean> = this.login.isLoggedIn();

  constructor(public login: LoginService, private router: Router) {}
  public logOutTry(): void {
    this.login.logOut().then(
      () => this.router.navigate(['login']),
      () => console.log('failed logout')
    );
  }
}
