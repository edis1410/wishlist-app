import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'wishlist-app';
  public showDropdown = false;
  public email: string = ""


  constructor(public login: LoginService, private router: Router) {}
  public logOutTry(): void {
    this.login.logOut().then(
      () => this.router.navigate(['login']),
      () => console.log('failed logout')
    );
  }
  

  public dropdownToggle(): void {
    this.showDropdown = !this.showDropdown;
  }
}
