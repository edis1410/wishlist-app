import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'wishlist-app';
  public showDropdown = false;
  availableLangs: string[] | { id: string; label: string; }[] | undefined;
  activeLang: string | undefined;

  constructor(public login: LoginService, private router: Router, private tran: TranslocoService) {}

  ngOnInit(){
    this.activeLang = this.tran.getActiveLang();
    this.availableLangs = this.tran.getAvailableLangs();
  }

  changeLang(lang: string){
    this.tran.setActiveLang(lang);
    this.activeLang = lang;
  }

  public logOutTry(): void {
    this.login.logOut().then(
      () => this.router.navigate(['']),
      () => console.log('failed logout')
    );
  }

  public dropdownToggle(): void {
    this.showDropdown = !this.showDropdown;
  }
}
