import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(public login: LoginService, private router: Router) {}

  ngOnInit(){
    this.logOutTry();
  }
  
  public logOutTry(): void {
    this.login.logOut().then(
      () => this.router.navigate(['']),
      () => console.log('failed logout')
    );
  }

}
